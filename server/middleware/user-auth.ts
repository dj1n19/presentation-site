export default defineEventHandler(async (event) => {
    const url = getRequestURL(event)

    if (!url.pathname.startsWith('/api/user')) {
        return
    }

    const session = await useSession(event, {
        password: process.env.SESSION_SECRET!
    })

    if (!session.data.userId) {
        throw createError({ statusCode: 401, message: 'Not Authenticated' })
    }

    event.context.userId = session.data.userId
    event.context.role = session.data.role
})