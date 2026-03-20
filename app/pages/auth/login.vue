<script setup lang="ts">
    const state = reactive({
        email: '',
        password: ''
    })

    const loading = ref(false)
    const toast = useToast()
    const router = useRouter()

    async function onSubmit() {
        loading.value = true
        try {
            await $fetch('/api/auth/login', {
                method: 'POST',
                body: {
                    email: state.email,
                    password: state.password
                }
            })
            await router.push('/admin')
        }
        catch (e: any) {
            toast.add({
                title: 'Erreur',
                description: e?.data?.message ?? 'Identifiants incorrects.',
                color: 'error'
            })
        }
        finally {
            loading.value = false
        }
    }
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="w-full max-w-sm bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h1 class="text-2xl font-bold text-gray-900 mb-6 text-center">
                Connexion
            </h1>
            <UForm :state="state" @submit="onSubmit" class="flex flex-col gap-4">
                <UFormField label="Email" name="email" required>
                    <UInput
                        v-model="state.email"
                        type="email"
                        placeholder="admin@example.com"
                        class="w-full"
                    />
                </UFormField>
                <UFormField label="Mot de passe" name="password" required>
                    <UInput
                        v-model="state.password"
                        type="password"
                        placeholder="••••••••"
                        class="w-full"
                    />
                </UFormField>
                <UButton
                    type="submit"
                    :loading="loading"
                    :disabled="loading"
                    class="w-full justify-center mt-2"
                >
                    Se connecter
                </UButton>
            </UForm>
        </div>
    </div>
</template>