<template>
  <NuxtLayout name="user">
    <div class="p-6 md:p-10 max-w-xl">

      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">Mon profil</h1>
        <p class="text-sm text-gray-500 mt-1">
          Modifiez vos informations personnelles et votre mot de passe.
        </p>
      </div>

      <!-- Loading -->
      <div v-if="userPending" class="bg-white border border-gray-100 rounded-xl p-6 animate-pulse">
        <div class="h-3 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div class="h-8 bg-gray-200 rounded mb-4"></div>
        <div class="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div class="h-8 bg-gray-200 rounded"></div>
      </div>

      <template v-else>

        <!-- ── Identity section ──────────────────────────────── -->
        <div class="bg-white border border-gray-100 rounded-xl p-6 mb-4">
          <h2 class="text-sm font-semibold text-gray-900 mb-5 uppercase tracking-wide">
            Informations générales
          </h2>

          <div class="flex flex-col gap-4">
            <UFormField label="Nom d'utilisateur" name="username">
              <UInput
                v-model="form.username"
                type="text"
                placeholder="Votre nom d'utilisateur"
                class="w-full"
              />
            </UFormField>

            <UFormField label="Adresse e-mail" name="email">
              <UInput
                v-model="form.email"
                type="email"
                placeholder="votre@email.com"
                class="w-full"
              />
            </UFormField>
          </div>
        </div>

        <!-- ── Password section ──────────────────────────────── -->
        <div class="bg-white border border-gray-100 rounded-xl p-6 mb-6">
          <h2 class="text-sm font-semibold text-gray-900 mb-1 uppercase tracking-wide">
            Changer de mot de passe
          </h2>
          <p class="text-xs text-gray-400 mb-5">
            Laissez ces champs vides si vous ne souhaitez pas changer de mot de passe.
          </p>

          <div class="flex flex-col gap-4">
            <UFormField label="Mot de passe actuel" name="currentPassword">
              <UInput
                v-model="form.currentPassword"
                type="password"
                placeholder="••••••••"
                class="w-full"
              />
            </UFormField>

            <UFormField label="Nouveau mot de passe" name="newPassword">
              <UInput
                v-model="form.newPassword"
                type="password"
                placeholder="Minimum 8 caractères"
                class="w-full"
              />
            </UFormField>
          </div>
        </div>

        <!-- Error message from server -->
        <div v-if="serverError" class="mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
          {{ serverError }}
        </div>

        <!-- Submit button -->
        <UButton
          :loading="saving"
          :disabled="saving"
          class="w-full justify-center"
          @click="save"
        >
          Enregistrer les modifications
        </UButton>

      </template>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
useHead({ title: 'Mon profil' })

const toast = useToast()

// Fetch the current user to pre-fill the form
const { data: user, pending: userPending } = await useFetch('/api/auth/me')

// Reactive form state — like a struct you can mutate
// We use watch to fill the form once `user` data arrives from the server
const form = reactive({
  username:        '',
  email:           '',
  currentPassword: '',
  newPassword:     '',
})

// watch() runs a callback whenever the watched value changes.
// { immediate: true } means it also runs once immediately after setup.
// This fills the form with the current user's data when the page loads.
watch(user, (u) => {
  if (u) {
    form.username = (u as any).username ?? ''
    form.email    = (u as any).email    ?? ''
  }
}, { immediate: true })

const saving     = ref(false)
const serverError = ref<string | null>(null)

async function save() {
  saving.value = true
  serverError.value = null

  // Build the payload: only include fields that have changed or are filled
  // We never send an empty password — that would overwrite with nothing
  const payload: Record<string, string> = {}

  if (form.username) payload.username = form.username
  if (form.email)    payload.email    = form.email

  // Only include password fields if the user typed a new password
  if (form.newPassword) {
    payload.currentPassword = form.currentPassword
    payload.newPassword     = form.newPassword
  }

  try {
    await $fetch('/api/user/profile', {
      method: 'PATCH',
      body: payload,
    })

    toast.add({
      title: 'Profil mis à jour',
      description: 'Vos informations ont bien été enregistrées.',
      color: 'success',
    })

    // Clear password fields after successful save
    form.currentPassword = ''
    form.newPassword     = ''

  } catch (e: any) {
    serverError.value = e?.data?.message ?? 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    saving.value = false
  }
}
</script>