import { db } from '../../db/index'
import { users } from '../../db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'
import { z } from 'zod'

const schema = z.object({
    username: z.string().min(1).optional(),
    email: z.email().optional(),
    currentPassword: z.string().min(1).optional(),
    newPassword: z.string().min(8).optional()
})

export default defineEventHandler(async (event) => {
    const userId = event.context.userId as number

    const body = await readBody(event)

    const result = schema.safeParse(body)
    if (!result.success) {
        throw createError({
            statusCode: 400,
            message: result.error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
        })
    }

    const { username, email, currentPassword, newPassword } = result.data

    const updates: Record<string, unknown> = {
        updateAt: new Date()
    }

    if (username) updates.username = username
    if (email) updates.email = email

    if (newPassword) {
        if (!currentPassword) {
            throw createError({
                statusCode: 400,
                message: 'Current password is required to set a new password'
            })
        }

        const user = await db
            .select()
            .from(users)
            .where(eq(users.id, userId))
            .get()
        if (!user) {
            throw createError({ statusCode: 404, message: 'User not found' })
        }
        
        const valid = await bcrypt.compare(currentPassword, user.password)
        if (!valid) {
            throw createError({ statusCode: 401, message: 'Current password is incorrect' })
        }

        updates.password = await bcrypt.hash(newPassword, 10)
    }

    const [updated] = await db
        .update(users)
        .set(updates)
        .where(eq(users.id, userId))
        .returning()

    if (!updated) {
        throw createError({ statusCode: 404, message: 'User not found' })
    }
    const { password, ...safeUser } = updated
    return safeUser
})