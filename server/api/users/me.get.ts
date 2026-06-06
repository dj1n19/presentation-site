import { db } from '../../db/index'
import { users } from '../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const userId = event.context.userId as number
    // const session = await useSession(event, {
    //     password: process.env.SESSION_SECRET!
    // })

    // if (!session.data.userId) {
    //     throw createError({ statusCode: 401, message: "Not authenticated !" })
    // }

    const user = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .get()
    
    if (!user) {
        throw createError({ statusCode: 404, message: 'User not found' })
    }

    const { password, ...safeUser } = user
    return safeUser
})