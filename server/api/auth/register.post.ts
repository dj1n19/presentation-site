// server/api/auth/register.post.ts
//
// Creates a new user, then immediately opens a session for them
// so they land on their dashboard without a separate login step.

import { db } from '../../db/index'
import { users } from '../../db/schema'
import bcrypt from 'bcrypt'
import { z } from 'zod'

// Same validation schema as users/index.post.ts.
// z.string().min(1) = "must be a non-empty string"
// z.email()         = built-in Zod email format check
// z.string().min(8) = password must be at least 8 characters
const schema = z.object({
    username: z.string().min(1, 'Le nom d\'utilisateur est requis'),
    email:    z.email('Adresse email invalide'),
    password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères')
})

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // safeParse = validate without throwing.
    // If the data is invalid, result.success is false and result.error has details.
    // This is like a try/catch around a strict parser in C++.
    const result = schema.safeParse(body)
    if (!result.success) {
        throw createError({
            statusCode: 400,
            message: result.error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
        })
    }

    // bcrypt.hash(password, saltRounds)
    // saltRounds = 10 is the standard cost factor — same as the rest of the project.
    // Never store plain-text passwords; bcrypt is a one-way slow hash designed for this.
    const hashedPassword = await bcrypt.hash(result.data.password, 10)

    let newUser
    try {
        // db.insert().values().returning() is Drizzle's INSERT … RETURNING syntax.
        // The destructuring [newUser] pulls the first (and only) returned row.
        // The unique constraints on username and email (from schema.ts) will throw
        // a SQLite error if either already exists — caught below.
        ;[newUser] = await db
            .insert(users)
            .values({
                username: result.data.username,
                email:    result.data.email,
                password: hashedPassword,
                // role defaults to 'user' as defined in schema.ts
            })
            .returning()
    } catch (e: any) {
        // SQLite unique constraint violations surface as SQLITE_CONSTRAINT errors.
        // The message contains "UNIQUE constraint failed: users.email" etc.
        // We catch them here and return a friendly 409 Conflict instead of a 500.
        if (e?.message?.includes('UNIQUE constraint failed')) {
            throw createError({
                statusCode: 409,
                message: 'Ce nom d\'utilisateur ou cet email est déjà utilisé.'
            })
        }
        throw e  // re-throw anything unexpected
    }

    // Open a session immediately — same call as login.post.ts.
    // useSession reads (or creates) the session cookie from the request.
    // session.update() writes new data into it and sets the cookie on the response.
    const session = await useSession(event, {
        password: process.env.SESSION_SECRET!
    })

    await session.update({
        userId: newUser.id,
        role:   newUser.role   // will be 'user' for all self-registered accounts
    })

    // Return the same shape as login.post.ts so the frontend can treat both
    // responses identically (role-based redirect).
    // We never return the hashed password to the client.
    return {
        id:       newUser.id,
        username: newUser.username,
        email:    newUser.email,
        role:     newUser.role
    }
})