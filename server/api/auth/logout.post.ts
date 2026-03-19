export default defineEventHandler(async (event) => {
    const session = await useSession(event, {
        password: process.env.SESSION_SECRET!
    })

    await session.clear()

    return {message: 'Logged out'}
})