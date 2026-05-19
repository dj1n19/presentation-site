<template>
  <NuxtLayout name="admin">
    <div class="p-6 md:p-10 min-h-screen bg-[#0d0f14]">

      <!-- ── Page header ─────────────────────────────────────── -->
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-[#e8e4dc] tracking-wide">
          Témoignages
        </h1>
        <p class="text-sm text-[#6b6860] mt-1">
          Modérez les témoignages soumis par vos clients.
        </p>
      </div>

      <!-- ── Filter tabs ─────────────────────────────────────── -->
      <!--
        This is a simple tab bar to filter by status.
        `activeFilter` is a ref (reactive variable). When you click a tab,
        we set activeFilter.value to that filter's key.
        `filteredTestimonials` is a computed property that re-runs automatically
        whenever activeFilter or testimonials changes — like a derived value.
      -->
      <div class="flex gap-2 mb-6 flex-wrap">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeFilter = tab.key"
          :class="[
            'px-4 py-1.5 rounded text-xs font-semibold tracking-wide uppercase transition-colors duration-150 border',
            activeFilter === tab.key
              ? 'bg-[#c9a96e]/15 border-[#c9a96e]/40 text-[#c9a96e]'
              : 'bg-transparent border-white/[0.06] text-[#6b6860] hover:text-[#e8e4dc] hover:border-white/20'
          ]"
        >
          {{ tab.label }}
          <!-- Badge showing count per status -->
          <span
            v-if="tab.key !== 'all'"
            class="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold"
            :class="tab.badgeClass"
          >
            {{ countByStatus(tab.key) }}
          </span>
          <span v-else class="ml-1.5 text-[10px] font-bold text-[#6b6860]">
            {{ testimonials?.length ?? 0 }}
          </span>
        </button>
      </div>

      <!-- ── Loading state ───────────────────────────────────── -->
      <!--
        `pending` is true while the initial fetch is in progress.
        We show skeleton cards so the layout doesn't jump.
      -->
      <div v-if="pending" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div
          v-for="n in 4"
          :key="n"
          class="rounded-xl border border-white/[0.06] bg-[#13151c] p-6 animate-pulse"
        >
          <div class="h-3 bg-white/10 rounded mb-3 w-1/3"></div>
          <div class="h-3 bg-white/10 rounded mb-2 w-full"></div>
          <div class="h-3 bg-white/10 rounded mb-2 w-4/5"></div>
          <div class="h-3 bg-white/10 rounded w-2/3"></div>
        </div>
      </div>

      <!-- ── Error state ─────────────────────────────────────── -->
      <div v-else-if="error" class="text-center py-16">
        <p class="text-red-400 text-sm">Impossible de charger les témoignages.</p>
        <button
          @click="refresh()"
          class="mt-4 text-[#c9a96e] text-xs underline underline-offset-2 hover:opacity-70"
        >
          Réessayer
        </button>
      </div>

      <!-- ── Empty state ─────────────────────────────────────── -->
      <div
        v-else-if="filteredTestimonials.length === 0"
        class="text-center py-16 text-[#6b6860] text-sm"
      >
        Aucun témoignage {{ activeFilter !== 'all' ? 'dans cette catégorie' : '' }}.
      </div>

      <!-- ── Testimonial cards grid ──────────────────────────── -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div
          v-for="t in filteredTestimonials"
          :key="t.id"
          class="rounded-xl border border-white/[0.06] bg-[#13151c] p-6 flex flex-col gap-4
                 transition-colors duration-200 hover:border-white/[0.10]"
        >

          <!-- Card top row: username + date + status badge -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-2.5">
              <!-- Avatar initial circle, same style as sidebar -->
              <div
                class="shrink-0 w-9 h-9 rounded-full flex items-center justify-center
                       bg-[#1a1d24] border border-[#c9a96e]/25
                       text-[#c9a96e] text-sm font-semibold"
              >
                {{ t.username.charAt(0).toUpperCase() }}
              </div>
              <div>
                <p class="text-[#e8e4dc] text-sm font-semibold">{{ t.username }}</p>
                <p class="text-[#6b6860] text-xs">
                  <!--
                    toLocaleDateString converts a JS Date object to a human-readable string.
                    The testimonials API returns timestamps. We wrap in new Date() to parse them.
                    'fr-BE' = Belgian French locale (day/month/year format).
                  -->
                  {{ new Date(t.createdAt).toLocaleDateString('fr-BE', { day: 'numeric', month: 'long', year: 'numeric' }) }}
                </p>
              </div>
            </div>

            <!-- Status badge -->
            <span
              class="shrink-0 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
              :class="statusBadgeClass(t.status)"
            >
              {{ statusLabel(t.status) }}
            </span>
          </div>

          <!-- Testimonial text -->
          <p class="text-[#9a9589] text-sm leading-relaxed italic border-l-2 border-[#c9a96e]/30 pl-3">
            "{{ t.testimonial }}"
          </p>

          <!-- Ratings row -->
          <!--
            We store ratings as a little array of objects so we can loop over them
            instead of writing 4 almost-identical blocks of HTML.
            Each rating is a number from 1 to 5.
          -->
          <div class="grid grid-cols-2 gap-2">
            <div
              v-for="rating in getRatings(t)"
              :key="rating.label"
              class="bg-[#0d0f14] rounded-lg px-3 py-2 flex items-center justify-between"
            >
              <span class="text-[#6b6860] text-xs">{{ rating.label }}</span>
              <div class="flex gap-0.5">
                <!--
                  v-for with a range trick: Array.from({length: 5}) creates an array of 5 items.
                  We use the index (i, 0-based) to decide if a star is filled or not.
                  i < rating.value means "this star position is within the rating".
                  Example: rating.value = 3 → stars 0,1,2 are filled, 3,4 are not.
                -->
                <span
                  v-for="i in 5"
                  :key="i"
                  class="text-[10px] leading-none"
                  :class="i <= rating.value ? 'text-[#c9a96e]' : 'text-white/10'"
                >★</span>
              </div>
            </div>
          </div>

          <!-- Action buttons -->
          <!--
            `updating` is a Set of IDs currently being updated.
            We use it to disable buttons and show a spinner while the PATCH request runs.
            A Set is like a hashset in C++: fast O(1) lookup for "is this ID being updated?"
          -->
          <div class="flex gap-2 pt-1">
            <button
              v-if="t.status !== 'approved'"
              @click="updateStatus(t.id, 'approved')"
              :disabled="updating.has(t.id)"
              class="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded
                     text-xs font-semibold
                     bg-emerald-500/10 text-emerald-400 border border-emerald-500/20
                     hover:bg-emerald-500/20 hover:border-emerald-500/40
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-colors duration-150"
            >
              <UIcon name="i-heroicons-check" class="w-3.5 h-3.5" />
              Approuver
            </button>

            <button
              v-if="t.status !== 'rejected'"
              @click="updateStatus(t.id, 'rejected')"
              :disabled="updating.has(t.id)"
              class="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded
                     text-xs font-semibold
                     bg-red-500/10 text-red-400 border border-red-500/20
                     hover:bg-red-500/20 hover:border-red-500/40
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-colors duration-150"
            >
              <UIcon name="i-heroicons-x-mark" class="w-3.5 h-3.5" />
              Rejeter
            </button>

            <button
              v-if="t.status !== 'pending'"
              @click="updateStatus(t.id, 'pending')"
              :disabled="updating.has(t.id)"
              class="flex items-center justify-center gap-1.5 px-3 py-2 rounded
                     text-xs font-semibold
                     bg-white/[0.04] text-[#6b6860] border border-white/[0.06]
                     hover:bg-white/[0.08] hover:text-[#e8e4dc]
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-colors duration-150"
            >
              <UIcon name="i-heroicons-arrow-uturn-left" class="w-3.5 h-3.5" />
              En attente
            </button>
          </div>

        </div>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">

// ── Type ─────────────────────────────────────────────────────────────────────
/*
  This mirrors the Testimonial type from server/db/schema.ts.
  TypeScript interfaces are purely compile-time — they vanish at runtime.
  Think of them like structs in C++ that only exist for the type checker.

  `status` uses a union type: the value can only be one of those three strings.
  This is like an enum in C++.
*/
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

// ── Data fetching ─────────────────────────────────────────────────────────────
/*
  useFetch is Nuxt's built-in composable for HTTP requests.
  It returns:
    - data:    the response body (reactive, updates when refresh() is called)
    - pending: boolean, true while the request is in flight
    - error:   the error object if the request failed
    - refresh: a function you can call to re-fetch

  The generic <Testimonial[]> tells TypeScript what shape `data` will have.
  This is server-side rendered on first load, then hydrated on the client.
*/
const { data: testimonials, pending, error, refresh } = await useFetch<Testimonial[]>('/api/testimonials')

// ── Filter state ──────────────────────────────────────────────────────────────
/*
  ref() creates a reactive variable. Like a pointer to a value that Vue watches.
  When you write `activeFilter.value = 'approved'`, Vue automatically re-renders
  anything in the template that depends on it.

  In the template, Vue unwraps refs automatically — you write `activeFilter`
  not `activeFilter.value`. In <script> you always need `.value`.
*/
type FilterKey = 'all' | 'pending' | 'approved' | 'rejected'
const activeFilter = ref<FilterKey>('all')

const tabs = [
  { key: 'all' as FilterKey,      label: 'Tous',       badgeClass: '' },
  { key: 'pending' as FilterKey,  label: 'En attente', badgeClass: 'bg-yellow-500/15 text-yellow-400' },
  { key: 'approved' as FilterKey, label: 'Approuvés',  badgeClass: 'bg-emerald-500/15 text-emerald-400' },
  { key: 'rejected' as FilterKey, label: 'Rejetés',    badgeClass: 'bg-red-500/15 text-red-400' },
]

/*
  computed() creates a derived value that is automatically recalculated
  when its dependencies change (here: activeFilter or testimonials).
  Like a cached getter in C++.
*/
const filteredTestimonials = computed<Testimonial[]>(() => {
  if (!testimonials.value) return []
  if (activeFilter.value === 'all') return testimonials.value
  return testimonials.value.filter(t => t.status === activeFilter.value)
})

function countByStatus(status: string): number {
  return testimonials.value?.filter(t => t.status === status).length ?? 0
}

// ── Updating state ────────────────────────────────────────────────────────────
/*
  Set<number> is like std::unordered_set<int> in C++.
  We store the IDs of testimonials currently being updated.
  When the PATCH request completes, we remove the ID from the set.
  This lets us disable buttons per-card instead of blocking the whole page.

  ref() wraps it so Vue can track changes to the Set.
*/
const updating = ref<Set<number>>(new Set())
const toast = useToast()

async function updateStatus(id: number, status: 'approved' | 'rejected' | 'pending') {
  // Add to the "in progress" set — disables the buttons on that card
  updating.value.add(id)

  try {
    /*
      $fetch is Nuxt's fetch wrapper (similar to fetch() but with better DX).
      PATCH is the HTTP verb for partial updates — we only change the status field.
      The server handler is server/api/testimonials/[id].patch.ts
    */
    await $fetch(`/api/testimonials/${id}`, {
      method: 'PATCH',
      body: { status }
    })

    /*
      After a successful update, we refresh the full list from the server.
      This keeps the client in sync with the database.
      Alternatively we could mutate `testimonials.value` locally, but
      refreshing is simpler and guaranteed to be correct.
    */
    await refresh()

    toast.add({
      title: 'Mis à jour',
      description: `Témoignage marqué comme "${statusLabel(status)}".`,
      color: 'success'
    })
  } catch {
    toast.add({
      title: 'Erreur',
      description: 'La mise à jour a échoué. Veuillez réessayer.',
      color: 'error'
    })
  } finally {
    // Always remove from the set, even if there was an error
    updating.value.delete(id)
  }
}

// ── Helper functions ──────────────────────────────────────────────────────────
/*
  Pure utility functions — no side effects, no reactivity.
  These are just called from the template to map data to display values.
*/

function statusLabel(status: string): string {
  const map: Record<string, string> = {
    pending:  'En attente',
    approved: 'Approuvé',
    rejected: 'Rejeté',
  }
  return map[status] ?? status
}

function statusBadgeClass(status: string): string {
  const map: Record<string, string> = {
    pending:  'bg-yellow-500/15 text-yellow-400',
    approved: 'bg-emerald-500/15 text-emerald-400',
    rejected: 'bg-red-500/15 text-red-400',
  }
  return map[status] ?? ''
}

/*
  Converts the flat rating fields on a testimonial into an array of objects,
  so the template can use v-for instead of repeating the same HTML 4 times.
  This is a common "normalize data for display" pattern.
*/
function getRatings(t: Testimonial) {
  return [
    { label: 'Premier contact',  value: t.ratingContact },
    { label: 'Paiement',         value: t.ratingPayment },
    { label: 'Suivi de dossier', value: t.ratingFollowup },
    { label: 'Efficacité',       value: t.ratingEfficiency },
  ]
}

// ── SEO ───────────────────────────────────────────────────────────────────────
useHead({
  title: 'Témoignages — Administration',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})
</script>