import { db } from '../../db/index'
import { messages } from '../../db/schema'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.firstName || !body.lastName || !body.email || !body.phone || !body.message) {
        throw createError({ statusCode: 400, message: 'Name, email, phone and message are required.' })
    }

    const [newMessage] = await db
        .insert(messages)
        .values({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phone: body.phone,
            message: body.message
        })
        .returning()

    setResponseStatus(event, 201)
    return newMessage
})