<template>
  <NuxtLayout name="admin">
    <div class="users-shell">

      <!-- ── LEFT PANEL: user list ─────────────────────────── -->
      <div class="panel panel--list">

        <div class="panel-head">
          <span>Utilisateurs</span>
          <span v-if="users?.length" class="badge">
            {{ users.length }}
          </span>
        </div>

        <!-- Loading skeleton: same shimmer pattern as messages.vue -->
        <div v-if="pending" class="user-list">
          <div v-for="n in 5" :key="n" class="user-row skeleton">
            <div class="skel-line skel-line--name"></div>
            <div class="skel-line skel-line--meta"></div>
          </div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="panel-empty">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 mb-2 text-gray-400" />
          <p>Impossible de charger les utilisateurs.</p>
        </div>

        <!-- Empty state -->
        <div v-else-if="!users?.length" class="panel-empty">
          <UIcon name="i-heroicons-users" class="w-6 h-6 mb-2 text-gray-400" />
          <p>Aucun utilisateur.</p>
        </div>

        <!-- User list -->
        <!--
          Same click-to-select pattern as messages.vue.
          :class applies classes conditionally — 'is-active' highlights
          the row that is currently shown on the right panel.
        -->
        <div v-else class="user-list">
          <div
            v-for="user in users"
            :key="user.id"
            class="user-row"
            :class="{ 'is-active': selectedUser?.id === user.id }"
            @click="selectedUser = user"
          >
            <!-- Avatar initial + name -->
            <div class="user-row__name">
              <div class="user-avatar user-avatar--sm" aria-hidden="true">
                {{ user.username.charAt(0).toUpperCase() }}
              </div>
              <div>
                <span class="user-row__username">{{ user.username }}</span>
                <!-- Role badge inline in the list -->
                <span class="role-badge" :class="user.role === 'admin' ? 'role-badge--admin' : 'role-badge--user'">
                  {{ user.role }}
                </span>
              </div>
            </div>
            <div class="user-row__meta">{{ user.email }}</div>
          </div>
        </div>
      </div>

      <!-- ── RIGHT PANEL: user detail ──────────────────────── -->
      <div class="panel panel--detail">

        <!-- Nothing selected yet -->
        <div v-if="!selectedUser" class="panel-empty">
          <UIcon name="i-heroicons-user-circle" class="w-8 h-8 mb-3 text-gray-300" />
          <p>Sélectionnez un utilisateur pour voir ses détails.</p>
        </div>

        <template v-else>
          <div class="panel-head">
            <span>Détail de l'utilisateur</span>
          </div>

          <div class="detail">

            <!-- ── User identity block ───────────────────── -->
            <div class="detail-header">
              <div class="user-avatar user-avatar--lg" aria-hidden="true">
                {{ selectedUser.username.charAt(0).toUpperCase() }}
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <p class="detail-name">{{ selectedUser.username }}</p>
                  <span class="role-badge" :class="selectedUser.role === 'admin' ? 'role-badge--admin' : 'role-badge--user'">
                    {{ selectedUser.role }}
                  </span>
                  <!--
                    "You" badge: highlights the currently logged-in admin
                    so they know they cannot delete or demote themselves.
                    We compare with currentUserId fetched from /api/auth/me.
                  -->
                  <span v-if="selectedUser.id === currentUserId" class="role-badge role-badge--you">
                    Vous
                  </span>
                </div>
                <p class="detail-meta">{{ selectedUser.email }}</p>
              </div>
            </div>

            <!-- ── Info grid ─────────────────────────────── -->
            <!--
              A simple 2-column grid of label/value pairs.
              Like a struct printed to the screen.
            -->
            <div class="info-grid">
              <div class="info-cell">
                <span class="info-label">ID</span>
                <span class="info-value">#{{ selectedUser.id }}</span>
              </div>
              <div class="info-cell">
                <span class="info-label">Rôle</span>
                <span class="info-value">{{ selectedUser.role }}</span>
              </div>
              <div class="info-cell">
                <span class="info-label">Inscrit le</span>
                <span class="info-value">{{ formatDate(selectedUser.createdAt) }}</span>
              </div>
              <div class="info-cell">
                <span class="info-label">Mis à jour</span>
                <span class="info-value">{{ formatDate(selectedUser.updateAt) }}</span>
              </div>
            </div>

            <!-- ── Action buttons ────────────────────────── -->
            <!--
              We disable both buttons if the selected user is the logged-in admin.
              That prevents them from shooting themselves in the foot.

              `busy` is a ref<boolean> that goes true while any request is in flight,
              preventing double-clicks (same pattern as `toggling` in messages.vue).
            -->
            <div
              v-if="selectedUser.id !== currentUserId"
              class="actions"
            >
              <!-- Toggle admin / user role -->
              <UButton
                :loading="busy"
                :disabled="busy"
                variant="outline"
                color="neutral"
                :icon="selectedUser.role === 'admin'
                  ? 'i-heroicons-arrow-down-circle'
                  : 'i-heroicons-arrow-up-circle'"
                @click="toggleRole(selectedUser)"
              >
                {{
                  selectedUser.role === 'admin'
                    ? 'Retirer le rôle admin'
                    : 'Promouvoir en admin'
                }}
              </UButton>

              <!-- Delete user — wrapped in a confirmation step -->
              <!--
                Two-step delete: the user clicks once → button turns red and shows
                "Confirmer la suppression". A second click actually fires the request.
                This avoids accidental deletions without needing a modal component.

                `confirmDelete` is a ref<boolean> that acts as the "are you sure?" flag.
              -->
              <div class="delete-group">
                <UButton
                  v-if="!confirmDelete"
                  :disabled="busy"
                  variant="outline"
                  color="error"
                  icon="i-heroicons-trash"
                  @click="confirmDelete = true"
                >
                  Supprimer l'utilisateur
                </UButton>

                <template v-else>
                  <UButton
                    :loading="busy"
                    :disabled="busy"
                    color="error"
                    icon="i-heroicons-trash"
                    @click="deleteUser(selectedUser)"
                  >
                    Confirmer la suppression
                  </UButton>
                  <UButton
                    :disabled="busy"
                    variant="ghost"
                    color="neutral"
                    @click="confirmDelete = false"
                  >
                    Annuler
                  </UButton>
                </template>
              </div>
            </div>

            <!-- Self-action warning -->
            <div v-else class="self-warning">
              <UIcon name="i-heroicons-information-circle" class="w-4 h-4 shrink-0" />
              <span>Vous ne pouvez pas modifier ou supprimer votre propre compte depuis cette interface.</span>
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
  Mirrors the User row from server/db/schema.ts.
  We omit `password` — the GET /api/users endpoint never returns it.
*/
interface User {
  id: number
  username: string
  email: string
  role: 'admin' | 'user'
  createdAt: string | number
  updateAt: string | number
}

// ── Protect the page (same as other admin pages) ──────────────────────────────
definePageMeta({ middleware: 'admin' })
useHead({ title: 'Utilisateurs — Administration', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

// ── Fetch all users ───────────────────────────────────────────────────────────
/*
  GET /api/users returns users ordered by username (see server/api/users/index.get.ts).
  We use `users` (renamed from `data`) to avoid a naming clash with the DB schema import.
*/
const { data: users, pending, error, refresh } = await useFetch<User[]>('/api/users')

// ── Fetch the current admin's own ID ─────────────────────────────────────────
/*
  We need to know who the logged-in admin is so we can disable
  the delete/role buttons when they select themselves.
  /api/auth/me returns { id, username, email, role }.
*/
const { data: me } = await useFetch<{ id: number }>('/api/auth/me')
const currentUserId = computed(() => me.value?.id)

// ── Selection state ───────────────────────────────────────────────────────────
/*
  ref<User | null> — like a pointer that starts as nullptr.
  Clicking a row sets this; the right panel renders based on it.
*/
const selectedUser  = ref<User | null>(null)

// ── Request in-flight flag ────────────────────────────────────────────────────
/*
  While a PATCH or DELETE is running we lock the buttons.
  Same pattern as `toggling` in messages.vue.
*/
const busy          = ref(false)

// ── Two-step delete confirmation ──────────────────────────────────────────────
/*
  false  → shows the normal "Supprimer" button
  true   → shows "Confirmer" + "Annuler"
  
  We reset it whenever the selected user changes, so switching rows
  never leaves a stale confirmation state open.
*/
const confirmDelete = ref(false)

watch(selectedUser, () => { confirmDelete.value = false })

// ── Toast (Nuxt UI notification system) ──────────────────────────────────────
const toast = useToast()

// ── Toggle admin ↔ user role ──────────────────────────────────────────────────
/*
  Sends PATCH /api/users/:id with the *new* role (opposite of current).
  On success:
    1. Updates the item in the local array in-place (no full re-fetch needed).
    2. Updates selectedUser so the detail panel reflects the change immediately.
*/
async function toggleRole(user: User) {
  busy.value = true
  const newRole = user.role === 'admin' ? 'user' : 'admin'

  try {
    await $fetch(`/api/users/${user.id}`, {
      method: 'PATCH',
      body: { role: newRole }
    })

    // Update in the list array
    const item = users.value?.find(u => u.id === user.id)
    if (item) item.role = newRole

    // Update the right panel
    if (selectedUser.value?.id === user.id) {
      selectedUser.value = { ...selectedUser.value, role: newRole }
    }

    toast.add({
      title: 'Rôle mis à jour',
      description: `${user.username} est maintenant "${newRole}".`,
      color: 'success'
    })
  } catch (e: any) {
    toast.add({
      title: 'Erreur',
      description: e?.data?.message ?? 'Impossible de modifier le rôle.',
      color: 'error'
    })
  } finally {
    busy.value = false
  }
}

// ── Delete user ───────────────────────────────────────────────────────────────
/*
  Sends DELETE /api/users/:id.
  On success:
    1. Removes the user from the local array by filtering it out.
    2. Clears selectedUser so the right panel goes back to the empty state.
  
  filter() returns a new array without the deleted item — like erasing from
  a std::vector by value in C++.
*/
async function deleteUser(user: User) {
  busy.value = true
  try {
    await $fetch(`/api/users/${user.id}`, { method: 'DELETE' })

    // Remove from local list without re-fetching the whole list
    if (users.value) {
      users.value = users.value.filter(u => u.id !== user.id)
    }

    // Clear the right panel
    selectedUser.value = null
    confirmDelete.value = false

    toast.add({
      title: 'Utilisateur supprimé',
      description: `${user.username} a été supprimé.`,
      color: 'success'
    })
  } catch (e: any) {
    toast.add({
      title: 'Erreur',
      description: e?.data?.message ?? 'Impossible de supprimer l\'utilisateur.',
      color: 'error'
    })
  } finally {
    busy.value = false
  }
}

// ── Date formatter ────────────────────────────────────────────────────────────
/*
  Same helper as messages.vue — converts a Unix timestamp or ISO string
  to a human-readable Belgian French date.
*/
function formatDate(raw: string | number): string {
  const date = new Date(raw)
  return new Intl.DateTimeFormat('fr-BE', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(date)
}
</script>

<style scoped>
/* ── Layout: same two-panel grid as messages.vue ────────── */
.users-shell {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1rem;
  height: calc(100vh - 4rem);
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .users-shell {
    grid-template-columns: 1fr;
    height: auto;
  }
}

/* ── Panels ─────────────────────────────────────────────── */
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

/* ── Badge (user count) ─────────────────────────────────── */
.badge {
  font-size: 0.6875rem;
  font-weight: 600;
  background: #f3f4f6;
  color: #374151;
  padding: 0.1875rem 0.5rem;
  border-radius: 999px;
}

/* ── User list ──────────────────────────────────────────── */
.user-list {
  flex: 1;
  overflow-y: auto;
}

.user-row {
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid #f9fafb;
  cursor: pointer;
  transition: background 0.15s;
}
.user-row:hover { background: #f9fafb; }
.user-row.is-active {
  background: #eff6ff;
  border-left: 3px solid #3b82f6;
}

.user-row__name {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 0.25rem;
}

.user-row__username {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
}

.user-row__meta {
  font-size: 0.75rem;
  color: #9ca3af;
  padding-left: calc(1.75rem + 0.625rem); /* align under username, past the avatar */
}

/* ── Avatar ─────────────────────────────────────────────── */
/*
  Two sizes: sm (list rows) and lg (detail header).
  Same concept as the avatars in messages.vue and testimonials.vue.
*/
.user-avatar {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  background: #e5e7eb;
  color: #374151;
  flex-shrink: 0;
}
.user-avatar--sm { width: 1.75rem; height: 1.75rem; font-size: 0.75rem; }
.user-avatar--lg { width: 3rem;    height: 3rem;    font-size: 1.125rem; }

/* ── Role badges ────────────────────────────────────────── */
.role-badge {
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
}
.role-badge--admin { background: #fef3c7; color: #92400e; }
.role-badge--user  { background: #f3f4f6; color: #374151; }
.role-badge--you   { background: #dbeafe; color: #1d4ed8; }

/* ── Detail panel ───────────────────────────────────────── */
.detail {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.detail-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.125rem;
}

.detail-meta {
  font-size: 0.8125rem;
  color: #9ca3af;
  margin: 0;
}

/* ── Info grid ──────────────────────────────────────────── */
/*
  A 2-column grid of label/value pairs.
  Each cell is a flex column (label on top, value below).
*/
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.info-cell {
  background: #f9fafb;
  border: 1px solid #f3f4f6;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #9ca3af;
}

.info-value {
  font-size: 0.875rem;
  color: #111827;
  font-weight: 500;
}

/* ── Action buttons container ───────────────────────────── */
.actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid #f3f4f6;
}

/* Confirm/cancel sit side by side */
.delete-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* ── Self-action warning ────────────────────────────────── */
.self-warning {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 0.8125rem;
  color: #1e40af;
  line-height: 1.6;
  margin-top: 0.5rem;
}

/* ── Loading skeleton ───────────────────────────────────── */
.skeleton { cursor: default; pointer-events: none; }

.skel-line {
  height: 10px;
  background: #f3f4f6;
  border-radius: 4px;
  margin-bottom: 6px;
  animation: shimmer 1.4s ease-in-out infinite;
}
.skel-line--name { width: 55%; }
.skel-line--meta { width: 70%; height: 8px; }

@keyframes shimmer {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.45; }
}
</style>