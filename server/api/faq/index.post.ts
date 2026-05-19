import { db } from '../../db/index'
import { faq_entries } from '../../db/schema'
import { z } from 'zod'

const schema = z.object({
    question: z.string().min(1),
    answer: z.string().min(1),
    category: z.enum(['general'])
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

    const [newFaqEntry] = await db
        .insert(faq_entries)
        .values(result.data)
        .returning()

    setResponseStatus(event, 201)
    return newFaqEntry
})