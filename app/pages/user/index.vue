<template>
  <NuxtLayout name="user">
    <div class="p-6 md:p-10">

      <!-- Page header -->
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">
          Bonjour, {{ user?.username ?? '…' }} 👋
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          Bienvenue dans votre espace personnel.
        </p>
      </div>

      <!-- Stats cards -->
      <!--
        This is a CSS grid with 2 columns on small screens, 4 on large.
        Each card is a simple div styled with Tailwind utility classes.
      -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div
          v-for="card in statCards"
          :key="card.label"
          class="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-2 shadow-sm"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold uppercase tracking-wide text-gray-400">
              {{ card.label }}
            </span>
            <UIcon :name="card.icon" class="w-5 h-5 text-gray-300" />
          </div>
          <span class="text-3xl font-bold text-gray-900">{{ card.value }}</span>
          <NuxtLink :to="card.to" class="text-xs text-gray-400 hover:text-gray-700 transition-colors">
            Voir →
          </NuxtLink>
        </div>
      </div>

      <!-- Quick links -->
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">
        Accès rapide
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <NuxtLink
          v-for="link in quickLinks"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-3 bg-white rounded-xl border border-gray-100
                 px-4 py-3 shadow-sm hover:shadow-md hover:border-gray-200
                 transition-all duration-200 group"
        >
          <div class="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center
                      group-hover:bg-gray-200 transition-colors">
            <UIcon :name="link.icon" class="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-900">{{ link.label }}</p>
            <p class="text-xs text-gray-400">{{ link.description }}</p>
          </div>
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 text-gray-300 ml-auto
                       group-hover:text-gray-500 transition-colors" />
        </NuxtLink>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
// Protect this page: redirect to login if not authenticated.
// definePageMeta is a Nuxt macro — it sets page-level configuration.
// 'auth' refers to app/middleware/auth.ts.
definePageMeta({ middleware: 'auth' })

useHead({ title: 'Mon espace — Tableau de bord' })

// Fetch the logged-in user's profile and their data counts
const { data: user }         = await useFetch<{ username: string; email: string }>('/api/auth/me')
const { data: messages }     = await useFetch<any[]>('/api/user/messages')
const { data: testimonials } = await useFetch<any[]>('/api/user/testimonials')
const { data: documents }    = await useFetch<any[]>('/api/user/documents')

/*
  computed() creates a derived value that updates automatically.
  Here we build the stat cards from the fetched data.
  ?? 0 is the nullish coalescing operator — returns 0 if the left side is null/undefined.
  Like: (messages.value != nullptr) ? messages.value->size() : 0
*/
const statCards = computed(() => [
  {
    label: 'Messages envoyés',
    value: messages.value?.length ?? 0,
    icon: 'i-heroicons-envelope',
    to: '/user/messages',
  },
  {
    label: 'Témoignage',
    value: testimonials.value?.length ?? 0,
    icon: 'i-heroicons-chat-bubble-left-right',
    to: '/user/testimonial',
  },
  {
    label: 'Documents',
    value: documents.value?.length ?? 0,
    icon: 'i-heroicons-folder-open',
    to: '/user/documents',
  },
  {
    label: 'Compte',
    value: '✓',
    icon: 'i-heroicons-user-circle',
    to: '/user/profile',
  },
])

const quickLinks = [
  {
    to: '/user/messages',
    icon: 'i-heroicons-envelope',
    label: 'Mes messages',
    description: 'Voir vos demandes de contact',
  },
  {
    to: '/user/testimonial',
    icon: 'i-heroicons-chat-bubble-left-right',
    label: 'Mon témoignage',
    description: 'Consulter son statut de modération',
  },
  {
    to: '/user/documents',
    icon: 'i-heroicons-folder-open',
    label: 'Documents',
    description: 'Télécharger les fichiers partagés',
  },
  {
    to: '/user/profile',
    icon: 'i-heroicons-user-circle',
    label: 'Mon profil',
    description: 'Modifier vos informations',
  },
]
</script>