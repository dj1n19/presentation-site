import { db } from '../../db/index'
import { messages } from '../../db/schema'
import { z } from 'zod'

const schema = z.object({
    firstName: z.string().min(1, ""),
    lastName: z.string().min(1, ""),
    email: z.email("email invalide"),
    phone: z.e164("Numéro invalide"),
    message: z.string().min(1, "")
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

    const [newMessage] = await db
        .insert(messages)
        .values(result.data)
        .returning()

    setResponseStatus(event, 201)
    return newMessage
})