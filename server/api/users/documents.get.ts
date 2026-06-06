import { db } from '../../db/index'
import { documents } from '../../db/schema'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const session = await useSession(event, {
        password: process.env.SESSION_SECRET!
    })

    if (!session.data.userId) {
        throw createError({ statusCode: 401, message: "Not authenticated !"})
    }

    const docs = await db
        .select({
            id: documents.id,
            name: documents.name,
            mimeType: documents.mimeType,
            uploadedAt: documents.uploadedAt
        })
        .from(documents)
        .orderBy(desc(documents.uploadedAt))

    return docs
})