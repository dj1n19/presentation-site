export default defineEventHandler(async (event) => {
    const url = getRequestURL(event)
    
    if (!url.pathname.startsWith('/admin')) {
        return
    }

    const session = await useSession(event, {
        password: process.env.SESSION_SECRET!
    })

    if (!session.data.userId) {
        throw createError({ statusCode: 401, message: "Not Authenticated"})
    }

    if (session.data.role !== 'admin') {
        throw createError({ statusCode: 403, message: "Access forbidden" })
    }
})