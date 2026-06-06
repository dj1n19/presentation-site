export default defineNuxtRouteMiddleware(async () => {
    try {
        await $fetch('/api/auth/me')
        // If we reach here, the user is authenticated — let them through
    } catch {
        // 401 or network error — send them to login
        return navigateTo('/auth/login')
    }
})