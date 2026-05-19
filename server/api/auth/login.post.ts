import { db } from '../../db/index'
import { users } from '../../db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'
import { z } from 'zod'

const schema = z.object({
    email: z.email(),
    password: z.string().min(1)
})

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const result = schema.safeParse(body)
    if (!result.success) {
        throw createError({
            statusCode: 400,
            message: result.error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
        })
    }

    const user = await db.select().from(users).where(eq(users.email, result.data.email)).get()

    if (!user) {
        throw createError({ statusCode: 401, message: "Invalid credentials" })
    }

    const valid = await bcrypt.compare(result.data.password, user.password)

    if (!valid) {
        throw createError({ statusCode: 401, message: "Invalid credentials" })
    }

    const session = await useSession(event, {
        password: process.env.SESSION_SECRET!
    })

    await session.update({
        userId: user.id,
        role: user.role
    })

    return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    }
})