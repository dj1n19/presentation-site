import { db } from '../../db/index'
import { users } from '../../db/schema'

export default defineEventHandler(async (event) => {
    const session = await useSession(event, {
        password: process.env.SESSION_SECRET!
    })

    if (!session.data.userId) {
        throw createError({ statusCode: 401, message: 'Not authenticated' })
    }
    else if (session.data.role !== 'admin') {
        throw createError({ statusCode: 403, message: 'Access forbidden' })
    }

    const allUsers = await db.select().from(users).orderBy(users.username)
    
    return allUsers
})