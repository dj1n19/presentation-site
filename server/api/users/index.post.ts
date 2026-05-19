import { db } from '../../db/index'
import { users } from '../../db/schema'
import bcrypt from 'bcrypt'
import { z } from 'zod'

const schema = z.object({
    username: z.string().min(1),
    email: z.email(),
    password: z.string().min(8)
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

    const hashedPassword = await bcrypt.hash(result.data.password, 10)

    const [newUser] = await db
        .insert(users)
        .values({
            username: result.data.username,
            email: result.data.email,
            password: hashedPassword,
        })
        .returning()

    setResponseStatus(event, 201)

    const { password, ...userWithoutPassword} = newUser
    return userWithoutPassword
})