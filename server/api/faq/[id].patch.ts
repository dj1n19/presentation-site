import { db } from '../../db/index'
import { faq_entries } from '../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const session = await useSession(event, {
        password: process.env.SESSION_SECRET!
    })

    if (!session.data.userId || session.data.role !== 'admin') {
        throw createError({ statusCode: 402, message: "Access forbidden" })
    }

    const id = Number(getRouterParam(event, 'id'))
    if (isNaN(id)) {
        throw createError({ statusCode: 400, message: 'Invalid ID' })
    }

    const body = await readBody(event)

    const updated = await db
        .update(faq_entries)
        .set({ visible: body.visible })
        .where(eq(faq_entries.id, id))
        .returning()

    if (!updated) {
        throw createError({ statusCode: 404, message: 'FAQ Entry not found' })
    }

    return updated
})