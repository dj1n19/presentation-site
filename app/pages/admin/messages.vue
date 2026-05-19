<template>
  <NuxtLayout name="admin">
    <div class="messages-shell">

      <!-- ── LEFT PANEL: message list ─────────────────────────── -->
      <div class="panel panel--list">

        <!-- Header -->
        <div class="panel-head">
          <span>Messages</span>
          <span v-if="unreadCount > 0" class="badge">
            {{ unreadCount }} non lu{{ unreadCount > 1 ? 's' : '' }}
          </span>
        </div>

        <!-- Loading skeleton -->
        <div v-if="pending" class="msg-list">
          <div v-for="n in 4" :key="n" class="msg-row skeleton">
            <div class="skel-line skel-line--name"></div>
            <div class="skel-line skel-line--meta"></div>
            <div class="skel-line skel-line--preview"></div>
          </div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="panel-empty">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 mb-2 text-gray-400" />
          <p>Impossible de charger les messages.</p>
        </div>

        <!-- Empty state -->
        <div v-else-if="!messages?.length" class="panel-empty">
          <UIcon name="i-heroicons-inbox" class="w-6 h-6 mb-2 text-gray-400" />
          <p>Aucun message.</p>
        </div>

        <!-- List -->
        <!--
          v-for loops over the messages array.
          :key tells Vue how to track each row (like a unique ID for the VDOM diff algorithm).
          @click sets the selected message — like: selectedId = msg.id
          :class applies CSS classes conditionally:
            'is-active'  → this row is the one currently open on the right
            'is-unread'  → msg.read === false
        -->
        <div v-else class="msg-list">
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="msg-row"
            :class="{
              'is-active': selectedMessage?.id === msg.id,
              'is-unread': !msg.read,
            }"
            @click="selectMessage(msg)"
          >
            <div class="msg-row__name">
              <span v-if="!msg.read" class="unread-dot" aria-label="Non lu"></span>
              {{ msg.firstName }} {{ msg.lastName }}
            </div>
            <div class="msg-row__meta">
              {{ msg.email }} · {{ formatDate(msg.createdAt) }}
            </div>
            <div class="msg-row__preview">{{ msg.message }}</div>
          </div>
        </div>
      </div>

      <!-- ── RIGHT PANEL: message detail ──────────────────────── -->
      <div class="panel panel--detail">

        <!-- Nothing selected yet -->
        <div v-if="!selectedMessage" class="panel-empty">
          <UIcon name="i-heroicons-envelope-open" class="w-8 h-8 mb-3 text-gray-300" />
          <p>Sélectionnez un message pour le lire.</p>
        </div>

        <!-- Detail view -->
        <template v-else>
          <div class="panel-head">
            <span>Détail du message</span>
            <!--
              Toggle read/unread.
              :loading passes the loading state to UButton so it shows a spinner.
              @click calls our async function.
            -->
            <UButton
              size="xs"
              variant="outline"
              color="neutral"
              :loading="toggling"
              @click="toggleRead(selectedMessage)"
            >
              {{ selectedMessage.read ? 'Marquer comme non lu' : 'Marquer comme lu' }}
            </UButton>
          </div>

          <div class="detail">
            <!-- Sender info -->
            <div class="detail-header">
              <div class="detail-avatar" aria-hidden="true">
                {{ selectedMessage.firstName.charAt(0).toUpperCase() }}
              </div>
              <div>
                <p class="detail-name">
                  {{ selectedMessage.firstName }} {{ selectedMessage.lastName }}
                </p>
                <p class="detail-meta">
                  {{ selectedMessage.email }}
                  <span v-if="selectedMessage.phone"> · {{ selectedMessage.phone }}</span>
                  <span> · {{ formatDate(selectedMessage.createdAt) }}</span>
                </p>
              </div>
              <!-- Read status badge -->
              <span class="status-badge" :class="selectedMessage.read ? 'status-badge--read' : 'status-badge--unread'">
                {{ selectedMessage.read ? 'Lu' : 'Non lu' }}
              </span>
            </div>

            <!-- Message body -->
            <div class="detail-body">
              {{ selectedMessage.message }}
            </div>
          </div>
        </template>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
/*
  TYPE DEFINITION
  ───────────────
  This mirrors the Message type from server/db/schema.ts.
  In C++ terms: a struct.

  We redeclare it here because the frontend doesn't import server code directly.
  The server returns JSON; we tell TypeScript what shape to expect.
*/
interface Message {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  read: boolean
  createdAt: string  // JSON serializes dates as strings
}

/*
  useFetch
  ────────
  Nuxt's data-fetching composable.
  It returns:
    data    → ref<Message[] | null>  — the response body (reactive)
    pending → ref<boolean>           — true while the request is in-flight
    error   → ref<Error | null>      — set if the request failed
    refresh → () => Promise<void>    — call to re-fetch (like refreshing the list)

  In C++ mental model: it's like an async function that continuously publishes
  its state to three observable variables.
*/
const { data: messages, pending, error, refresh } = await useFetch<Message[]>('/api/messages')

/*
  selectedMessage
  ───────────────
  ref<Message | null> — mutable reactive variable.
  null = nothing selected (show the empty state on the right panel).
  Setting it to a message object shows that message's detail.

  Like: Message* selectedMessage = nullptr;
*/
const selectedMessage = ref<Message | null>(null)

/*
  toggling
  ────────
  Boolean flag to show a loading spinner on the button while the PATCH is in flight.
  Like: bool toggling = false;
*/
const toggling = ref(false)

/*
  unreadCount
  ───────────
  computed() re-evaluates automatically whenever `messages` changes.
  Like a cached getter in C++: const int unreadCount = ...; that auto-updates.

  The ?. is optional chaining — safe null check:
    messages.value?.filter(...)  ≡  messages.value !== null ? messages.value.filter(...) : undefined
*/
const unreadCount = computed(() =>
  messages.value?.filter(m => !m.read).length ?? 0
)

/*
  selectMessage
  ─────────────
  Called when the user clicks a row.
  If the message is unread, we also mark it as read immediately.
*/
async function selectMessage(msg: Message) {
  selectedMessage.value = msg
  if (!msg.read) {
    await toggleRead(msg, true)  // true = force to "read"
  }
}

/*
  toggleRead
  ──────────
  Sends a PATCH request to the server to flip the read flag.
  Then calls refresh() to re-fetch the list from the server (keeps data in sync).
  Also updates selectedMessage so the UI reflects the change immediately.

  forceRead?: boolean — optional param, used by selectMessage to always set read=true.
  Like an overloaded function in C++.
*/
const toast = useToast()

async function toggleRead(msg: Message, forceRead?: boolean) {
  toggling.value = true
  try {
    const newRead = forceRead !== undefined ? forceRead : !msg.read

    /*
      $fetch is a one-shot HTTP call (no reactivity, unlike useFetch).
      Use it for mutations (POST, PATCH, DELETE).
      Use useFetch for data you want to display and keep watching.
    */
    await $fetch(`/api/messages/${msg.id}`, {
      method: 'PATCH',
      body: { read: newRead }
    })

    /*
      After the server confirms the change, update the local copies.
      We update the array item in-place so the list re-renders.
      We also update selectedMessage so the detail panel re-renders.
    */
    if (messages.value) {
      const item = messages.value?.find(m => m.id === msg.id)
      if (item) {
        item.read = newRead
      }
    }

    if (selectedMessage.value?.id === msg.id) {
      selectedMessage.value = { ...selectedMessage.value, read: newRead }
    }

  } catch (e: any) {
    toast.add({
      title: 'Erreur',
      description: e?.data?.message ?? 'Impossible de mettre à jour le message.',
      color: 'error'
    })
  } finally {
    toggling.value = false
  }
}

/*
  formatDate
  ──────────
  The server returns createdAt as a Unix timestamp (integer) or ISO string.
  Intl.DateTimeFormat formats it in French for Belgian locale.
*/
function formatDate(raw: string | number): string {
  const date = new Date(raw)
  return new Intl.DateTimeFormat('fr-BE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

useHead({ title: 'Messages — Administration' })
</script>

<style scoped>
/* ── Layout shell ──────────────────────────────────────── */
.messages-shell {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 1rem;
  height: calc(100vh - 4rem);  /* fill the viewport below whatever header your admin layout adds */
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .messages-shell {
    grid-template-columns: 1fr;
    height: auto;
  }
}

/* ── Panels ────────────────────────────────────────────── */
.panel {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid #f3f4f6;
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  flex-shrink: 0;
}

.panel-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 0.875rem;
  gap: 0.25rem;
  padding: 2rem;
  text-align: center;
}

/* ── Message list ──────────────────────────────────────── */
.msg-list {
  flex: 1;
  overflow-y: auto;
}

.msg-row {
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid #f9fafb;
  cursor: pointer;
  transition: background 0.15s;
}

.msg-row:hover {
  background: #f9fafb;
}

.msg-row.is-active {
  background: #eff6ff;
  border-left: 3px solid #3b82f6;
}

.msg-row__name {
  font-size: 0.875rem;
  color: #374151;
  margin-bottom: 0.2rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

/* Unread rows: darker name */
.msg-row.is-unread .msg-row__name {
  font-weight: 600;
  color: #111827;
}

.msg-row__meta {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-bottom: 0.25rem;
}

.msg-row__preview {
  font-size: 0.8125rem;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Unread indicator dot ──────────────────────────────── */
.unread-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #3b82f6;
  flex-shrink: 0;
}

/* ── Badge (unread count) ──────────────────────────────── */
.badge {
  font-size: 0.6875rem;
  font-weight: 600;
  background: #dbeafe;
  color: #1d4ed8;
  padding: 0.1875rem 0.5rem;
  border-radius: 999px;
}

/* ── Detail panel ──────────────────────────────────────── */
.detail {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.detail-header {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
}

.detail-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  flex-shrink: 0;
}

.detail-name {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.25rem;
}

.detail-meta {
  font-size: 0.8125rem;
  color: #9ca3af;
  margin: 0;
}

.status-badge {
  margin-left: auto;
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  white-space: nowrap;
}

.status-badge--read {
  background: #dcfce7;
  color: #15803d;
}

.status-badge--unread {
  background: #dbeafe;
  color: #1d4ed8;
}

.detail-body {
  font-size: 0.9375rem;
  line-height: 1.75;
  color: #374151;
  background: #f9fafb;
  border: 1px solid #f3f4f6;
  border-radius: 0.5rem;
  padding: 1.25rem;
  white-space: pre-wrap;  /* preserves line breaks from the textarea */
  flex: 1;
}

/* ── Loading skeleton ──────────────────────────────────── */
.skeleton {
  cursor: default;
  pointer-events: none;
}

.skel-line {
  height: 10px;
  background: #f3f4f6;
  border-radius: 4px;
  margin-bottom: 6px;
  animation: shimmer 1.4s ease-in-out infinite;
}

.skel-line--name   { width: 55%; }
.skel-line--meta   { width: 75%; height: 8px; }
.skel-line--preview { width: 90%; height: 8px; }

@keyframes shimmer {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.45; }
}
</style>