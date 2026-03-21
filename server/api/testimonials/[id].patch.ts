import { db } from '../../db/index'
import { testimonials } from '../../db/schema'
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
        .update(testimonials)
        .set({ status: body.status })
        .where(eq(testimonials.id, id))
        .returning()

    if (!updated) {
        throw createError({ statusCode: 404, message: 'Testimonial not found' })
    }

    return updated
})