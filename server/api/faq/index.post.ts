import { db } from '../../db/index'
import { faq_entries } from '../../db/schema'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.question || !body.answer || !body.category) {
        throw createError({ statusCode: 400, message: 'Question, answer and category are required' })
    }

    const [newFaqEntry] = await db
        .insert(faq_entries)
        .values({
            question: body.question,
            answer: body.answer,
            category: body.category
        })
        .returning()

    setResponseStatus(event, 201)
    return newFaqEntry
})