<template>
  <NuxtLayout name="user">
    <div class="p-6 md:p-10">

      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">Documents</h1>
        <p class="text-sm text-gray-500 mt-1">
          Documents mis à disposition par votre gestionnaire administratif.
        </p>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="flex flex-col gap-2">
        <div v-for="n in 4" :key="n" class="bg-white border border-gray-100 rounded-xl p-4 animate-pulse flex items-center gap-4">
          <div class="w-10 h-10 bg-gray-200 rounded-lg shrink-0"></div>
          <div class="flex-1">
            <div class="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-16 text-gray-500">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-8 h-8 mx-auto mb-3 text-gray-300" />
        <p>Impossible de charger les documents.</p>
      </div>

      <!-- Empty -->
      <div v-else-if="!documents?.length" class="text-center py-16 text-gray-500">
        <UIcon name="i-heroicons-folder-open" class="w-10 h-10 mx-auto mb-3 text-gray-300" />
        <p class="font-medium text-gray-700 mb-1">Aucun document disponible</p>
        <p class="text-sm">Vos documents apparaîtront ici dès que votre gestionnaire en aura ajouté.</p>
      </div>

      <!-- Documents table / list -->
      <div v-else class="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div class="border-b border-gray-100 px-5 py-3 flex items-center justify-between">
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {{ documents.length }} document{{ documents.length > 1 ? 's' : '' }}
          </span>
        </div>

        <div class="divide-y divide-gray-50">
          <div
            v-for="doc in documents"
            :key="doc.id"
            class="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
          >
            <!-- File icon (varies by MIME type) -->
            <div class="shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <UIcon :name="mimeIcon(doc.mimeType)" class="w-5 h-5 text-gray-600" />
            </div>

            <!-- Name and meta -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">{{ doc.name }}</p>
              <p class="text-xs text-gray-400">
                {{ formatSize(doc.size) }} · {{ formatDate(doc.createdAt) }}
              </p>
            </div>

            <!-- Download button -->
            <!--
              We link to the download endpoint directly.
              The server sets Content-Disposition: attachment so the browser
              saves the file instead of opening it.
              :disabled prevents double-clicks during download.
            -->
            <a
              :href="`/api/user/documents/${doc.id}/download`"
              download
              class="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                     border border-gray-200 text-xs font-medium text-gray-700
                     hover:bg-gray-100 hover:border-gray-300 transition-colors"
            >
              <UIcon name="i-heroicons-arrow-down-tray" class="w-3.5 h-3.5" />
              Télécharger
            </a>
          </div>
        </div>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
useHead({ title: 'Documents' })

interface Document {
  id: number
  name: string
  mimeType: string
  size: number
  createdAt: string | number
}

const { data: documents, pending, error } = await useFetch<Document[]>('/api/user/documents')

function formatDate(raw: string | number): string {
  return new Intl.DateTimeFormat('fr-BE', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(new Date(raw))
}

// Convert bytes to a human-readable string: 1048576 → "1.0 Mo"
function formatSize(bytes: number): string {
  if (bytes < 1024)        return `${bytes} o`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`
}

// Pick a Heroicons icon name based on the MIME type
function mimeIcon(mime: string): string {
  if (mime === 'application/pdf')                          return 'i-heroicons-document-text'
  if (mime.startsWith('image/'))                           return 'i-heroicons-photo'
  if (mime.includes('spreadsheet') || mime.includes('excel')) return 'i-heroicons-table-cells'
  if (mime.includes('word') || mime.includes('document'))  return 'i-heroicons-document'
  return 'i-heroicons-paper-clip'
}
</script>