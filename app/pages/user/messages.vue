<template>
  <NuxtLayout name="user">
    <div class="p-6 md:p-10">

      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">Mes messages</h1>
        <p class="text-sm text-gray-500 mt-1">
          Vos demandes de contact envoyées via le site.
        </p>
      </div>

      <!-- Loading skeleton -->
      <div v-if="pending" class="flex flex-col gap-4">
        <div
          v-for="n in 3" :key="n"
          class="bg-white rounded-xl border border-gray-100 p-6 animate-pulse"
        >
          <div class="h-3 bg-gray-200 rounded w-1/4 mb-3"></div>
          <div class="h-3 bg-gray-200 rounded w-full mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-16 text-gray-400 text-sm">
        Impossible de charger vos messages.
      </div>

      <!-- Empty state -->
      <div v-else-if="!messages?.length" class="text-center py-20">
        <UIcon name="i-heroicons-envelope" class="w-10 h-10 text-gray-200 mx-auto mb-3" />
        <p class="text-gray-500 text-sm font-medium">Aucun message envoyé.</p>
        <NuxtLink to="/#contact" class="text-sm text-gray-400 hover:text-gray-700 mt-2 inline-block underline underline-offset-2">
          Envoyer un message →
        </NuxtLink>
      </div>

      <!-- Messages list -->
      <!--
        Each message is a card showing who sent it, when, and the message body.
        We also show the "read" status so the user knows if admin has seen it.
      -->
      <div v-else class="flex flex-col gap-4">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm"
        >
          <!-- Card header: date + read badge -->
          <div class="flex items-start justify-between gap-4 mb-4">
            <div>
              <p class="text-sm font-semibold text-gray-900">
                {{ msg.firstName }} {{ msg.lastName }}
              </p>
              <p class="text-xs text-gray-400 mt-0.5">
                {{ msg.email }}
                <span v-if="msg.phone"> · {{ msg.phone }}</span>
              </p>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <!-- Read/unread badge so user knows admin's status -->
              <span
                class="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                :class="msg.read
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-blue-50 text-blue-600'"
              >
                {{ msg.read ? 'Lu par l\'admin' : 'En attente de lecture' }}
              </span>
              <span class="text-xs text-gray-400">{{ formatDate(msg.createdAt) }}</span>
            </div>
          </div>

          <!-- Message body -->
          <p class="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-lg p-4 whitespace-pre-wrap">
            {{ msg.message }}
          </p>
        </div>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
useHead({ title: 'Mes messages — Espace personnel' })

interface Message {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  read: boolean
  createdAt: string | number
}

const { data: messages, pending, error } = await useFetch<Message[]>('/api/user/messages')

function formatDate(raw: string | number): string {
  return new Intl.DateTimeFormat('fr-BE', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(new Date(raw))
}
</script>