import { db } from '../../db/index'
import { testimonials } from '../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const userId = event.context.userId as number

    const userTestimonials = await db
        .select()
        .from(testimonials)
        .where(eq(testimonials.userId, userId))

    return userTestimonials
})