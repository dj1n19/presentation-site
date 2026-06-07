<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 flex flex-col z-[100] overflow-hidden',
      'transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
      'bg-[#0d0f14] border-r border-white/[0.06]',
      collapsed ? 'w-16' : 'w-60',
    ]"
    :aria-expanded="!collapsed"
  >

    <!-- ── BRAND / LOGO ──────────────────────────────────────────────────── -->
    <div class="flex items-center gap-3 px-4 py-5 min-h-[72px]">
      <div
        class="shrink-0 w-8 h-8 rounded flex items-center justify-center
               bg-[#c9a96e]/15 border border-[#c9a96e]/25
               text-[#c9a96e] font-serif text-xs tracking-wide"
        aria-hidden="true"
      >
        GA
      </div>

      <Transition
        enter-active-class="transition-[opacity,transform] duration-150 ease-out"
        leave-active-class="transition-[opacity,transform] duration-150 ease-in"
        enter-from-class="opacity-0 -translate-x-2"
        leave-to-class="opacity-0 -translate-x-2"
      >
        <div v-if="!collapsed" class="flex flex-col gap-0.5 overflow-hidden whitespace-nowrap">
          <span class="text-[13px] font-semibold text-[#e8e4dc] tracking-wide">
            Administration
          </span>
          <span class="text-[11px] uppercase tracking-[0.08em] text-[#c9a96e]">
            Espace privé
          </span>
        </div>
      </Transition>
    </div>

    <!-- ── DIVIDER ───────────────────────────────────────────────────────── -->
    <div
      class="shrink-0 h-px mx-0"
      style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)"
      aria-hidden="true"
    />

    <!-- ── NAVIGATION ────────────────────────────────────────────────────── -->
    <nav class="flex-1 overflow-y-auto py-2 px-2.5" aria-label="Navigation principale">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :title="collapsed ? item.label : undefined"
        :class="[
          'relative flex items-center gap-2.5 px-2.5 py-2 mb-0.5',
          'rounded transition-colors duration-200',
          'text-[13px] font-medium tracking-[0.01em]',
          'whitespace-nowrap overflow-hidden',
          isActive(item.to)
            ? 'bg-[#1e2235] text-[#c9a96e]'
            : 'text-[#6b6860] hover:bg-[#1f2330] hover:text-[#e8e4dc]',
        ]"
      >
        <span
          v-if="isActive(item.to)"
          class="absolute left-0 top-[20%] bottom-[20%] w-0.5 rounded-r bg-[#c9a96e]"
          aria-hidden="true"
        />

        <UIcon :name="item.icon" class="shrink-0 w-[18px] h-[18px]" />

        <Transition
          enter-active-class="transition-[opacity,transform] duration-150 ease-out"
          leave-active-class="transition-[opacity,transform] duration-150 ease-in"
          enter-from-class="opacity-0 -translate-x-2"
          leave-to-class="opacity-0 -translate-x-2"
        >
          <span v-if="!collapsed" class="flex-1">{{ item.label }}</span>
        </Transition>

        <Transition
          enter-active-class="transition-[opacity,transform] duration-150 ease-out"
          leave-active-class="transition-[opacity,transform] duration-150 ease-in"
          enter-from-class="opacity-0 -translate-x-2"
          leave-to-class="opacity-0 -translate-x-2"
        >
          <span
            v-if="!collapsed && item.badge > 0"
            class="ml-auto shrink-0 bg-[#c9a96e] text-[#0a0c10]
                   text-[10px] font-bold leading-relaxed
                   px-1.5 rounded-full"
          >
            {{ item.badge }}
          </span>
        </Transition>
      </NuxtLink>
    </nav>

    <!-- ── DIVIDER ───────────────────────────────────────────────────────── -->
    <div
      class="shrink-0 h-px"
      style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)"
      aria-hidden="true"
    />

    <!-- ── USER BLOCK ────────────────────────────────────────────────────── -->
    <div class="flex items-center gap-2.5 px-4 py-3 overflow-hidden whitespace-nowrap">
      <div
        class="shrink-0 w-8 h-8 rounded-full flex items-center justify-center
               bg-[#1a1d24] border border-[#c9a96e]/25
               text-[#c9a96e] text-[13px] font-semibold"
        aria-hidden="true"
      >
        A
      </div>

      <Transition
        enter-active-class="transition-[opacity,transform] duration-150 ease-out"
        leave-active-class="transition-[opacity,transform] duration-150 ease-in"
        enter-from-class="opacity-0 -translate-x-2"
        leave-to-class="opacity-0 -translate-x-2"
      >
        <div v-if="!collapsed" class="flex flex-col gap-0.5 overflow-hidden">
          <span class="text-[13px] font-medium text-[#e8e4dc]">Admin</span>
          <span class="flex items-center gap-1 text-[11px] text-[#6b6860]">
            <span class="shrink-0 w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            En ligne
          </span>
        </div>
      </Transition>
    </div>

    <!-- ── LOGOUT BUTTON ─────────────────────────────────────────────────── -->
    <!--
      This button calls logout() defined in <script setup> below.
      
      In collapsed mode:  icon only, tooltip via `title` attribute.
      In expanded mode:   icon + "Déconnexion" label.
      
      :disabled prevents double-clicks while the POST request is in flight.
      The `loggingOut` ref tracks that state (like a bool flag in C++).
      
      Color intent: red-tinted on hover to signal "destructive action",
      but subtle by default so it doesn't grab attention away from navigation.
    -->
    <div class="px-2.5 pb-2">
      <button
        :title="collapsed ? 'Déconnexion' : undefined"
        :disabled="loggingOut"
        class="w-full flex items-center gap-2.5 px-2.5 py-2 rounded
               text-[13px] font-medium tracking-[0.01em]
               whitespace-nowrap overflow-hidden
               text-[#6b6860] cursor-pointer
               border border-transparent
               hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20
               disabled:opacity-40 disabled:cursor-not-allowed
               transition-colors duration-200"
        @click="logout"
      >
        <!-- Spinner while logging out, arrow-right-on-rectangle when idle -->
        <UIcon
          :name="loggingOut ? 'i-heroicons-arrow-path' : 'i-heroicons-arrow-right-on-rectangle'"
          :class="['shrink-0 w-[18px] h-[18px]', loggingOut && 'animate-spin']"
        />

        <Transition
          enter-active-class="transition-[opacity,transform] duration-150 ease-out"
          leave-active-class="transition-[opacity,transform] duration-150 ease-in"
          enter-from-class="opacity-0 -translate-x-2"
          leave-to-class="opacity-0 -translate-x-2"
        >
          <span v-if="!collapsed">{{ loggingOut ? 'Déconnexion…' : 'Déconnexion' }}</span>
        </Transition>
      </button>
    </div>

    <!-- ── COLLAPSE TOGGLE ───────────────────────────────────────────────── -->
    <button
      :title="collapsed ? 'Déplier le menu' : 'Réduire le menu'"
      :aria-expanded="!collapsed"
      :aria-label="collapsed ? 'Déplier le menu' : 'Réduire le menu'"
      class="shrink-0 mx-2.5 my-2 p-1.5 rounded
             border border-white/[0.06] bg-transparent
             text-[#6b6860] cursor-pointer
             flex items-center justify-center
             hover:bg-[#1f2330] hover:text-[#e8e4dc] hover:border-[#c9a96e]/25
             transition-colors duration-200"
      @click="$emit('update:collapsed', !collapsed)"
    >
      <UIcon
        :name="collapsed ? 'i-heroicons-chevron-right' : 'i-heroicons-chevron-left'"
        class="w-4 h-4"
      />
    </button>

  </aside>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    collapsed: boolean
    unreadCount?: number
  }>(),
  {
    collapsed: false,
    unreadCount: 0,
  }
)

defineEmits<{
  'update:collapsed': [value: boolean]
}>()

const route = useRoute()
const router = useRouter()
const toast = useToast()

// ── Logout ────────────────────────────────────────────────────────────────────
/*
  loggingOut is a reactive boolean (like bool loggingOut = false in C++).
  We set it to true while the POST is in flight so the button shows a spinner
  and the :disabled attribute prevents double-clicks.
*/
const loggingOut = ref(false)

async function logout() {
  loggingOut.value = true
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
    await router.push('/')
  } catch (e: any) {
    toast.add({
      title: 'Erreur',
      description: e?.data?.message ?? 'Déconnexion échouée.',
      color: 'error',
    })
  } finally {
    loggingOut.value = false
  }
}

// ── Nav items ─────────────────────────────────────────────────────────────────
const navItems = computed(() => [
  {
    to:    '/admin',
    icon:  'i-heroicons-squares-2x2',
    label: 'Tableau de bord',
    badge: 0,
  },
  {
    to:    '/admin/messages',
    icon:  'i-heroicons-envelope',
    label: 'Messages',
    badge: props.unreadCount ?? 0,
  },
  {
    to:    '/admin/testimonials',
    icon:  'i-heroicons-chat-bubble-left-right',
    label: 'Témoignages',
    badge: 0,
  },
  {
    to:    '/admin/documents',
    icon:  'i-heroicons-folder-open',
    label: 'Documents',
    badge: 0,
  },
  {
    to:    '/admin/faq',
    icon:  'i-heroicons-question-mark-circle',
    label: 'FAQ',
    badge: 0,
  },
])

function isActive(path: string): boolean {
  if (path === '/admin') return route.path === '/admin'
  return route.path.startsWith(path)
}
</script>