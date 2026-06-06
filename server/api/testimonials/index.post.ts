// server/api/testimonials/index.post.ts
//
// Same pattern as messages/index.post.ts — attach userId if logged in.

import { db } from '../../db/index'
import { testimonials } from '../../db/schema'
import { z } from 'zod'

const schema = z.object({
    username: z.string().min(1, ""),
    testimonial: z.string().min(1, ""),
    ratingContact:    z.number().min(1).max(5, "Les notations doivent être comprises entre 1 et 5."),
    ratingPayment:    z.number().min(1).max(5, "Les notations doivent être comprises entre 1 et 5."),
    ratingFollowup:   z.number().min(1).max(5, "Les notations doivent être comprises entre 1 et 5."),
    ratingEfficiency: z.number().min(1).max(5, "Les notations doivent être comprises entre 1 et 5.")
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

    const session = await useSession(event, {
        password: process.env.SESSION_SECRET!
    })

    const userId = session.data.userId ?? null

    const [newTestimonial] = await db
        .insert(testimonials)
        .values({ ...result.data, userId })
        .returning()

    setResponseStatus(event, 201)
    return newTestimonial
})