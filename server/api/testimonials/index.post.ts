import { db } from '../../db/index'
import { testimonials } from '../../db/schema'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.username
        || !body.testimonial
        || !body.ratingContact
        || !body.ratingPayment
        || !body.ratingFollowup
        || !body.ratingEfficiency) {
        throw createError({ statusCode: 400, message: 'Name, testimonials and ratings are required' })
    }

    const [newTestimonial] = await db
        .insert(testimonials)
        .values({
            username: body.username,
            testimonial: body.testimonial,
            ratingContact: body.ratingContact,
            ratingPayment: body.ratingPayment,
            ratingFollowup: body.ratingFollowup,
            ratingEfficiency: body.ratingEfficiency
        })
        .returning()

    setResponseStatus(event, 201)
    return newTestimonial
})