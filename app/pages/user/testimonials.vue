<template>
  <NuxtLayout name="user">
    <div class="p-6 md:p-10">

      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">Mes témoignages</h1>
        <p class="text-sm text-gray-500 mt-1">
          Témoignages que vous avez soumis et leur statut de modération.
        </p>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="n in 2" :key="n" class="bg-white border border-gray-100 rounded-xl p-6 animate-pulse">
          <div class="h-3 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div class="h-3 bg-gray-200 rounded w-full mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-4/5"></div>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-16 text-gray-500">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-8 h-8 mx-auto mb-3 text-gray-300" />
        <p>Impossible de charger vos témoignages.</p>
      </div>

      <!-- Empty -->
      <div v-else-if="!testimonials?.length" class="text-center py-16 text-gray-500">
        <UIcon name="i-heroicons-chat-bubble-left-right" class="w-10 h-10 mx-auto mb-3 text-gray-300" />
        <p class="font-medium text-gray-700 mb-1">Aucun témoignage soumis</p>
        <p class="text-sm mb-4">Partagez votre expérience avec nos services.</p>
        <NuxtLink
          to="/#testimonial"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm
                 hover:bg-gray-700 transition-colors"
        >
          <UIcon name="i-heroicons-pencil-square" class="w-4 h-4" />
          Laisser un témoignage
        </NuxtLink>
      </div>

      <!-- Testimonial cards -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="t in testimonials"
          :key="t.id"
          class="bg-white border border-gray-100 rounded-xl p-6 flex flex-col gap-4
                 hover:border-gray-200 transition-colors"
        >
          <!-- Header row -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-2.5">
              <div class="shrink-0 w-9 h-9 rounded-full bg-gray-100 border border-gray-200
                          flex items-center justify-center text-sm font-semibold text-gray-600">
                {{ t.username.charAt(0).toUpperCase() }}
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-900">{{ t.username }}</p>
                <p class="text-xs text-gray-400">
                  {{ formatDate(t.createdAt) }}
                </p>
              </div>
            </div>
            <!-- Moderation status badge -->
            <span
              class="shrink-0 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
              :class="statusClass(t.status)"
            >
              {{ statusLabel(t.status) }}
            </span>
          </div>

          <!-- Testimonial text -->
          <p class="text-sm text-gray-600 leading-relaxed italic border-l-2 border-gray-200 pl-3">
            "{{ t.testimonial }}"
          </p>

          <!-- Ratings grid -->
          <div class="grid grid-cols-2 gap-2">
            <div
              v-for="rating in getRatings(t)"
              :key="rating.label"
              class="bg-gray-50 rounded-lg px-3 py-2 flex items-center justify-between"
            >
              <span class="text-xs text-gray-500">{{ rating.label }}</span>
              <div class="flex gap-0.5">
                <span
                  v-for="i in 5"
                  :key="i"
                  class="text-[10px] leading-none"
                  :class="i <= rating.value ? 'text-yellow-400' : 'text-gray-200'"
                >★</span>
              </div>
            </div>
          </div>

          <!-- Status explanation -->
          <p v-if="t.status === 'pending'" class="text-xs text-gray-400 italic">
            Votre témoignage est en attente de validation par l'administrateur.
          </p>
          <p v-else-if="t.status === 'rejected'" class="text-xs text-red-400 italic">
            Ce témoignage n'a pas été retenu pour publication.
          </p>
        </div>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
useHead({ title: 'Mes témoignages' })

interface Testimonial {
  id: number
  username: string
  testimonial: string
  ratingContact: number
  ratingPayment: number
  ratingFollowup: number
  ratingEfficiency: number
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string | number
}

const { data: testimonials, pending, error } = await useFetch<Testimonial[]>('/api/user/testimonials')

function formatDate(raw: string | number): string {
  return new Intl.DateTimeFormat('fr-BE', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(new Date(raw))
}

function statusLabel(status: string): string {
  return { pending: 'En attente', approved: 'Publié', rejected: 'Refusé' }[status] ?? status
}

function statusClass(status: string): string {
  return {
    pending:  'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  }[status] ?? ''
}

function getRatings(t: Testimonial) {
  return [
    { label: 'Premier contact',  value: t.ratingContact },
    { label: 'Paiement',         value: t.ratingPayment },
    { label: 'Suivi de dossier', value: t.ratingFollowup },
    { label: 'Efficacité',       value: t.ratingEfficiency },
  ]
}
</script>