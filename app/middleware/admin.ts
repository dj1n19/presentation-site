export default defineNuxtRouteMiddleware(async () => {
    try {
        const user = await $fetch('/api/auth/me')
        // $fetch returns the JSON body. We check the role field.
        if ((user as any).role !== 'admin') {
            // Logged in but not admin → send to their own space
            return navigateTo('/user')
        }
    } catch {
        return navigateTo('/auth/login')
    }
})