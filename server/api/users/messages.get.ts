import { db } from '../../db/index'
import { messages } from '../../db/schema'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const userId = event.context.userId as number
 
    const userMessages = await db
        .select()
        .from(messages)
        .where(eq(messages.userId, userId))
        .orderBy(desc(messages.createdAt))
 
    return userMessages
})