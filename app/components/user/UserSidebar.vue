<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 flex flex-col z-[100] overflow-hidden',
      'transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
      'bg-white border-r border-gray-200',
      collapsed ? 'w-16' : 'w-60',
    ]"
    :aria-expanded="!collapsed"
  >

    <!-- ── BRAND ─────────────────────────────────────────────────────────── -->
    <div class="flex items-center gap-3 px-4 py-5 min-h-[72px]">
      <div
        class="shrink-0 w-8 h-8 rounded flex items-center justify-center
               bg-gray-100 border border-gray-200
               text-gray-700 font-serif text-xs tracking-wide"
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
          <span class="text-[13px] font-semibold text-gray-900 tracking-wide">
            Mon espace
          </span>
          <span class="text-[11px] uppercase tracking-[0.08em] text-gray-400">
            Espace personnel
          </span>
        </div>
      </Transition>
    </div>

    <!-- ── DIVIDER ───────────────────────────────────────────────────────── -->
    <div class="shrink-0 h-px bg-gray-100" aria-hidden="true" />

    <!-- ── NAVIGATION ────────────────────────────────────────────────────── -->
    <nav class="flex-1 overflow-y-auto py-2 px-2.5" aria-label="Navigation utilisateur">
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
            ? 'bg-gray-100 text-gray-900'
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800',
        ]"
      >
        <span
          v-if="isActive(item.to)"
          class="absolute left-0 top-[20%] bottom-[20%] w-0.5 rounded-r bg-gray-800"
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
      </NuxtLink>
    </nav>

    <!-- ── DIVIDER ───────────────────────────────────────────────────────── -->
    <div class="shrink-0 h-px bg-gray-100" aria-hidden="true" />

    <!-- ── USER BLOCK ────────────────────────────────────────────────────── -->
    <div class="flex items-center gap-2.5 px-4 py-3 overflow-hidden whitespace-nowrap">
      <div
        class="shrink-0 w-8 h-8 rounded-full flex items-center justify-center
               bg-gray-100 border border-gray-200
               text-gray-600 text-[13px] font-semibold"
        aria-hidden="true"
      >
        {{ username ? username.charAt(0).toUpperCase() : '?' }}
      </div>

      <Transition
        enter-active-class="transition-[opacity,transform] duration-150 ease-out"
        leave-active-class="transition-[opacity,transform] duration-150 ease-in"
        enter-from-class="opacity-0 -translate-x-2"
        leave-to-class="opacity-0 -translate-x-2"
      >
        <div v-if="!collapsed" class="flex flex-col gap-0.5 overflow-hidden">
          <span class="text-[13px] font-medium text-gray-900 truncate">{{ username ?? 'Utilisateur' }}</span>
          <NuxtLink to="/" class="text-[11px] text-gray-400 hover:text-gray-600 transition-colors">
            ← Retour au site
          </NuxtLink>
        </div>
      </Transition>
    </div>

    <!-- ── LOGOUT BUTTON ─────────────────────────────────────────────────── -->
    <!--
      Same structure as the admin version but using the light color scheme.
      Red hover tint is lighter (red-50 bg, red-500 text) to match the
      overall softer look of the user sidebar.
    -->
    <div class="px-2.5 pb-2">
      <button
        :title="collapsed ? 'Déconnexion' : undefined"
        :disabled="loggingOut"
        class="w-full flex items-center gap-2.5 px-2.5 py-2 rounded
               text-[13px] font-medium tracking-[0.01em]
               whitespace-nowrap overflow-hidden
               text-gray-400 cursor-pointer
               border border-transparent
               hover:bg-red-50 hover:text-red-500 hover:border-red-100
               disabled:opacity-40 disabled:cursor-not-allowed
               transition-colors duration-200"
        @click="logout"
      >
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
             border border-gray-200 bg-transparent
             text-gray-400 cursor-pointer
             flex items-center justify-center
             hover:bg-gray-50 hover:text-gray-700
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
    username?: string
  }>(),
  {
    collapsed: false,
    username: undefined,
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
  Same pattern as the admin sidebar.
  After a successful logout the server clears the session cookie,
  then we navigate back to the home page.
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
const navItems = [
  { to: '/user',              icon: 'i-heroicons-squares-2x2',            label: 'Tableau de bord' },
  { to: '/user/messages',     icon: 'i-heroicons-envelope',                label: 'Mes messages' },
  { to: '/user/testimonials', icon: 'i-heroicons-chat-bubble-left-right',  label: 'Mon témoignage' },
  { to: '/user/documents',    icon: 'i-heroicons-folder-open',             label: 'Documents' },
  { to: '/user/profile',      icon: 'i-heroicons-user-circle',             label: 'Mon profil' },
]

function isActive(path: string): boolean {
  if (path === '/user') return route.path === '/user'
  return route.path.startsWith(path)
}
</script>