import { db } from '../../db/index'
import { users } from '../../db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event)

    if (!email || !password) {
        throw createError({ statusCode: 400, message: "Email and Password are required" })
    }

    const user = await db.select().from(users).where(eq(users.email, email)).get()

    if (!user) {
        throw createError({ statusCode: 401, message: "Invalid credentials" })
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
        throw createError({ statusCode: 401, message: "Invalid credentials" })
    }

    const session = await useSession(event, {
        password: process.env.SESSION_SECRET!
    })

    await session.update({
        userId: user.id,
        role: user.role
    })

    return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    }
})