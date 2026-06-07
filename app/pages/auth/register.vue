<script setup lang="ts">
const state = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
})

const loading = ref(false)
const toast = useToast()
const router = useRouter()

async function onSubmit() {
    // Client-side check: passwords must match before we even hit the server.
    // This avoids a round-trip for a trivially detectable mistake.
    if (state.password !== state.confirmPassword) {
        toast.add({
            title: 'Erreur',
            description: 'Les mots de passe ne correspondent pas.',
            color: 'error'
        })
        return
    }

    loading.value = true
    try {
        // POST to our new API route (created below).
        // On success the server creates the user, opens a session, and returns
        // the user object — same shape as login.post.ts.
        const user = await $fetch('/api/auth/register', {
            method: 'POST',
            body: {
                username: state.username,
                email: state.email,
                password: state.password
            }
        })
        // Navigate exactly like the login page does.
        await router.push((user as any).role === 'admin' ? '/admin' : '/user')
    } catch (e: any) {
        toast.add({
            title: 'Erreur',
            description: e?.data?.message ?? 'Une erreur est survenue.',
            color: 'error'
        })
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="w-full max-w-sm bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h1 class="text-2xl font-bold text-gray-900 mb-2 text-center">
                Créer un compte
            </h1>
            <p class="text-sm text-gray-500 text-center mb-6">
                Déjà inscrit ?
                <NuxtLink to="/auth/login" class="text-gray-700 underline underline-offset-2 hover:text-gray-900">
                    Se connecter
                </NuxtLink>
            </p>

            <!--
                UForm handles submission and wires the @submit event.
                We don't use the built-in validate prop here — validation is
                intentionally simple (just the password-match check above),
                keeping this consistent with how login.vue works.
            -->
            <UForm :state="state" @submit="onSubmit" class="flex flex-col gap-4">
                <UFormField label="Nom d'utilisateur" name="username" required>
                    <UInput
                        v-model="state.username"
                        type="text"
                        placeholder="john_doe"
                        class="w-full"
                    />
                </UFormField>

                <UFormField label="Email" name="email" required>
                    <UInput
                        v-model="state.email"
                        type="email"
                        placeholder="vous@exemple.com"
                        class="w-full"
                    />
                </UFormField>

                <UFormField label="Mot de passe" name="password" required>
                    <UInput
                        v-model="state.password"
                        type="password"
                        placeholder="Minimum 8 caractères"
                        class="w-full"
                    />
                </UFormField>

                <UFormField label="Confirmer le mot de passe" name="confirmPassword" required>
                    <UInput
                        v-model="state.confirmPassword"
                        type="password"
                        placeholder="Répétez le mot de passe"
                        class="w-full"
                    />
                </UFormField>

                <UButton
                    type="submit"
                    :loading="loading"
                    :disabled="loading"
                    class="w-full justify-center mt-2"
                >
                    Créer mon compte
                </UButton>
            </UForm>
        </div>
    </div>
</template>