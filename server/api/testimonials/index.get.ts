import { db } from '../../db/index'
import { testimonials } from '../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const session = await useSession(event, {
        password: process.env.SESSION_SECRET!
    })

    if (session.data.userId && session.data.role === 'admin') {
        return await db.select().from(testimonials)    
    }

    return await db.select().from(testimonials).where(eq(testimonials.status, 'approved'))
})