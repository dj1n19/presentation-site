<template>
  <!-- The aside is the sidebar container.
       :class applies multiple Tailwind classes conditionally.
       When collapsed=true, width shrinks from w-60 to w-16.
       transition-[width] animates only the width change smoothly. -->
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

      <!--
        <Transition> is Vue's built-in animation wrapper.
        enter-from-class / leave-to-class define start/end states.
        Vue automatically adds/removes these classes during the transition.
        This makes the label text slide in/out when collapsing.
      -->
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
    <!--
      NuxtLink renders as an <a> tag but uses the Vue Router under the hood.
      It prevents full page reloads (like SPA navigation).
      :title shows a tooltip in collapsed mode (the label is hidden).
    -->
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
        <!-- Active indicator bar on the left edge -->
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
    <!--
      We show the first letter of the username as an avatar.
      username comes from the prop passed by the layout.
      .charAt(0).toUpperCase() = first character, uppercased.
    -->
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

    <!-- ── COLLAPSE TOGGLE ───────────────────────────────────────────────── -->
    <!--
      $emit('update:collapsed', !collapsed) is Vue's way of notifying the parent
      that the collapsed value should change. The parent uses v-model:collapsed
      which wires this up automatically.
      Think of it like a callback: parent passes "onChange" → child calls it.
    -->
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
/*
  defineProps — declares what data the parent passes in.
  withDefaults — provides fallback values when the parent doesn't pass them.
  
  In C++ terms: this is the constructor signature of this component.
  collapsed:  bool   — is the sidebar narrow or wide?
  username:   string — shown in the user block at the bottom.
*/
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

/*
  defineEmits — declares the events this component can fire upward.
  'update:collapsed' is the conventional name for v-model two-way binding.
  When the parent writes v-model:collapsed="myVar", Vue wires:
    - :collapsed="myVar"          (prop flowing down)
    - @update:collapsed="v => myVar = v"  (event flowing up)
*/
defineEmits<{
  'update:collapsed': [value: boolean]
}>()

const route = useRoute()

// navItems is a plain array (not reactive) because it never changes.
// If you needed it to react to props, you'd wrap it in computed().
const navItems = [
  { to: '/user',             icon: 'i-heroicons-squares-2x2',         label: 'Tableau de bord' },
  { to: '/user/messages',    icon: 'i-heroicons-envelope',             label: 'Mes messages' },
  { to: '/user/testimonials', icon: 'i-heroicons-chat-bubble-left-right', label: 'Mon témoignage' },
  { to: '/user/documents',   icon: 'i-heroicons-folder-open',          label: 'Documents' },
  { to: '/user/profile',     icon: 'i-heroicons-user-circle',          label: 'Mon profil' },
]

/*
  isActive: returns true if the current route matches this nav item's path.
  For /user exactly, we check for exact match (otherwise /user/messages
  would also highlight the dashboard link).
  For others, startsWith covers nested routes if you ever add them.
*/
function isActive(path: string): boolean {
  if (path === '/users') return route.path === '/users'
  return route.path.startsWith(path)
}
</script>