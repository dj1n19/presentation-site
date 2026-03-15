import { getDb } from '../db/index'

interface TestimonialBody {
  text: string
  author: string
  role?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<TestimonialBody>(event)

  if (!body?.text?.trim() || !body?.author?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Les champs "text" et "author" sont obligatoires.'
    })
  }

  const db = getDb()

  const stmt = db.prepare(`
    INSERT INTO testimonials (text, author, role)
    VALUES (?, ?, ?)
  `)

  const result = stmt.run(
    body.text.trim(),
    body.author.trim(),
    (body.role ?? '').trim()
  )

  return {
    id: result.lastInsertRowid,
    text: body.text.trim(),
    author: body.author.trim(),
    role: (body.role ?? '').trim()
  }
})