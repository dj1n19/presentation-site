import { db } from '../../db/index'
import { faq_entries } from '../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const session = await useSession(event, {
        password: process.env.SESSION_SECRET!
    })

    if (!session.data.UserId && session.data.role === 'admin') {
        return await db.select().from(faq_entries)
    }

    return await db.select().from(faq_entries).where(eq(faq_entries.visible, true))
})