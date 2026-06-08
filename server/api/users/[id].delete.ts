import { db } from '../../db/index'
import { users } from '../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const session = await useSession(event, {
        password: process.env.SESSION_SECRET!
    })

    // Only admins may delete users
    if (!session.data.userId || session.data.role !== 'admin') {
        throw createError({ statusCode: 403, message: 'Access forbidden' })
    }

    const id = Number(getRouterParam(event, 'id'))
    if (isNaN(id)) {
        throw createError({ statusCode: 400, message: 'Invalid ID' })
    }

    // Prevent an admin from deleting their own account
    if (id === session.data.userId) {
        throw createError({ statusCode: 400, message: 'You cannot delete your own account' })
    }

    const [deleted] = await db
        .delete(users)
        .where(eq(users.id, id))
        .returning()

    if (!deleted) {
        throw createError({ statusCode: 404, message: 'User not found' })
    }

    // 200 with the deleted user's id so the frontend can remove it from the list
    return { id: deleted.id }
})