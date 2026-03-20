import { db } from '../../db/index'
import { messages } from '../../db/schema'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const session = await useSession(event, {
        password: process.env.SESSION_SECRET!
    })

    if (!session.data.userId || session.data.role !== 'admin') {
        throw createError({ statusCode: 403, message: 'Access forbidden' })
    }

    const allMessages = await db
        .select()
        .from(messages)
        .orderBy(desc(messages.createdAt))

    return allMessages
})