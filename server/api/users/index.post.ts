import { db } from '../../db/index'
import { users } from '../../db/schema'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.username || !body.email || !body.password) {
        throw createError({ statusCode: 400, message: 'Name, email and password are required' })
    }

    const hashedPassword = await bcrypt.hash(body.password, 10)

    const [newUser] = await db
        .insert(users)
        .values({
            username: body.username,
            email: body.email,
            password: hashedPassword,
        })
        .returning()

    setResponseStatus(event, 201)

    const { password, ...userWithoutPassword} = newUser
    return userWithoutPassword
})