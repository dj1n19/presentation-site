import { getDb } from '../db/index'

export default defineEventHandler(() => {
  const db = getDb()

  const testimonials = db.prepare(`
    SELECT id, text, author, role, created_at
    FROM testimonials
    WHERE visible = 1
    ORDER BY created_at ASC
  `).all()

  return testimonials
})