<!--
<template>
	<div class="min-h-0 flex-1 overflow-hidden">
		<nav aria-label="Sidebar" class="hidden lg:block flex-shrink-0 bg-gray-800 overflow-y-auto">
			<div class="relative w-20 flex space-y-16 flex-col p-3">
				<NuxtLink to="/admin/messages">Messages</NuxtLink>
				<NuxtLink to="/admin/testimonials">Témoignages</NuxtLink>
				<NuxtLink to="/admin/documents">Documents</NuxtLink>
				<NuxtLink to="/admin/faq">FAQ</NuxtLink>
			</div>
		</nav>
	</div>
</template>
-->
<!--
  app/components/admin/AdminSidebar.vue

  A self-contained sidebar component.
  NO <style> tag — every visual is expressed with Tailwind utility classes.

  ── PROPS & EMITS (the component's "interface") ──────────────────────────────
  In C++ terms, this is the public API of the class:

    class AdminSidebar {
      public:
        bool collapsed;           // INPUT  — read from parent
        int  unreadCount;         // INPUT  — read from parent
        void emit("update:collapsed", bool)  // OUTPUT — tells parent to change collapsed
    };

  The parent (admin.vue) OWNS the `collapsed` state.
  The sidebar READS it (prop) and REQUESTS changes (emit).
  Vue calls this pattern "v-model" — identical to two-way data binding.

  Usage in admin.vue:
    <AdminSidebar v-model:collapsed="collapsed" :unread-count="unreadCount" />
-->

<template>
  <!--
    OUTER SHELL
    ───────────────────────────────────────────────────────────────────────────
    fixed inset-y-0 left-0  → pinned to the left edge, full height, doesn't scroll
    flex flex-col            → children stack vertically
    z-[100]                  → above the main content (z-index: 100)
    overflow-hidden          → clips text that peeks out while collapsing
    transition-[width]       → animates only the width property
    duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]  → same easing as the public site

    Width switches between w-60 (240px) and w-16 (64px) based on `collapsed` prop.
    bg-[#0d0f14]  → matches the public site's dark background exactly
    border-r border-white/[0.06]  → very subtle right border (white at 6% opacity)
  -->
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
    <!--
      flex items-center gap-3  → row, vertically centered, 12px gap
      px-4 py-5                → 16px horizontal, 20px vertical padding
      min-h-[72px]             → fixed height so it doesn't jump when text fades
    -->
    <div class="flex items-center gap-3 px-4 py-5 min-h-[72px]">

      <!--
        The "GA" monogram badge.
        shrink-0  → never squishes when the sidebar collapses
        rounded   → 6px border radius
        bg-[#c9a96e]/15  → gold at 15% opacity (Tailwind opacity modifier syntax)
        border border-[#c9a96e]/25
        text-[#c9a96e]  → gold text
        font-serif  → DM Serif Display (loaded via useHead in the layout)
        text-xs tracking-wide  → small, slightly spaced letters
      -->
      <div
        class="shrink-0 w-8 h-8 rounded flex items-center justify-center
               bg-[#c9a96e]/15 border border-[#c9a96e]/25
               text-[#c9a96e] font-serif text-xs tracking-wide"
        aria-hidden="true"
      >
        GA
      </div>

      <!--
        Text only visible when NOT collapsed.
        Transition wraps it so it fades + slides left when collapsing.
        overflow-hidden whitespace-nowrap  → prevents text wrapping or overflowing
      -->
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
    <!--
      A gold-to-transparent gradient line, like on the public site.
      h-px = 1px tall, no border, just a background gradient.
      mx-0 shrink-0 = full width, doesn't compress
    -->
    <div
      class="shrink-0 h-px mx-0"
      style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)"
      aria-hidden="true"
    />

    <!-- ── NAVIGATION ────────────────────────────────────────────────────── -->
    <!--
      flex-1  → takes all remaining vertical space
      overflow-y-auto  → scroll if nav items overflow (future-proof)
      py-2 px-2.5  → breathing room around the links
    -->
    <nav class="flex-1 overflow-y-auto py-2 px-2.5" aria-label="Navigation principale">

      <!--
        v-for loop — like: for (const item of navItems)
        Each iteration renders one NuxtLink.

        NuxtLink is Nuxt's router-aware anchor tag.
        :to="item.to"  → destination route
        :title  → tooltip shown when collapsed (icon-only mode)

        Dynamic classes via the ternary:
          - active:   gold text + dark blue-tinted background + gold left border
          - inactive: muted text, hover adds a slightly lighter background
      -->
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :title="collapsed ? item.label : undefined"
        :class="[
          // Base layout for every link
          'relative flex items-center gap-2.5 px-2.5 py-2 mb-0.5',
          'rounded transition-colors duration-200',
          'text-[13px] font-medium tracking-[0.01em]',
          'whitespace-nowrap overflow-hidden',

          // Active vs inactive state
          isActive(item.to)
            ? 'bg-[#1e2235] text-[#c9a96e]'
            : 'text-[#6b6860] hover:bg-[#1f2330] hover:text-[#e8e4dc]',
        ]"
      >

        <!--
          Gold left-edge indicator bar for the active link.
          absolute left-0 inset-y-[20%]  → vertically centered on the left edge
          v-if renders it only when active (cheaper than always rendering + hiding)
        -->
        <span
          v-if="isActive(item.to)"
          class="absolute left-0 top-[20%] bottom-[20%] w-0.5 rounded-r bg-[#c9a96e]"
          aria-hidden="true"
        />

        <!-- Icon — always visible, even when collapsed -->
        <UIcon :name="item.icon" class="shrink-0 w-[18px] h-[18px]" />

        <!--
          Label text — fades in/out with the same Transition as the brand text.
          flex-1 = takes remaining width (pushes badge to the right)
        -->
        <Transition
          enter-active-class="transition-[opacity,transform] duration-150 ease-out"
          leave-active-class="transition-[opacity,transform] duration-150 ease-in"
          enter-from-class="opacity-0 -translate-x-2"
          leave-to-class="opacity-0 -translate-x-2"
        >
          <span v-if="!collapsed" class="flex-1">{{ item.label }}</span>
        </Transition>

        <!--
          Badge (e.g. unread message count).
          Only rendered when: not collapsed AND badge > 0
          ml-auto pushes it to the far right of the row.
          rounded-full px-1.5 → pill shape
        -->
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
    <!--
      Shows the current user's avatar initial + name + online status.
      px-4 py-3  → consistent padding
      overflow-hidden whitespace-nowrap  → text clipped when collapsing
    -->
    <div class="flex items-center gap-2.5 px-4 py-3 overflow-hidden whitespace-nowrap">

      <!--
        Avatar circle with the user's initial.
        w-8 h-8 rounded-full  → 32px circle
        border border-[#c9a96e]/25  → subtle gold ring
        shrink-0  → never squishes
      -->
      <div
        class="shrink-0 w-8 h-8 rounded-full flex items-center justify-center
               bg-[#1a1d24] border border-[#c9a96e]/25
               text-[#c9a96e] text-[13px] font-semibold"
        aria-hidden="true"
      >
        A
      </div>

      <!-- Name + status, hidden when collapsed -->
      <Transition
        enter-active-class="transition-[opacity,transform] duration-150 ease-out"
        leave-active-class="transition-[opacity,transform] duration-150 ease-in"
        enter-from-class="opacity-0 -translate-x-2"
        leave-to-class="opacity-0 -translate-x-2"
      >
        <div v-if="!collapsed" class="flex flex-col gap-0.5 overflow-hidden">
          <span class="text-[13px] font-medium text-[#e8e4dc]">Admin</span>
          <span class="flex items-center gap-1 text-[11px] text-[#6b6860]">
            <!--
              Pulsing green dot — same animation keyword as the public site.
              animate-pulse is Tailwind's built-in pulse (opacity 1 → 0.5 → 1)
            -->
            <span class="shrink-0 w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            En ligne
          </span>
        </div>
      </Transition>

    </div>

    <!-- ── COLLAPSE TOGGLE ───────────────────────────────────────────────── -->
    <!--
      mx-2.5 my-2  → margin inside the sidebar edges
      p-1.5        → padding inside the button
      rounded       → 6px corners
      border border-white/[0.06]  → very faint border
      text-[#6b6860]  → muted icon color
      hover:bg-[#1f2330] hover:text-[#e8e4dc] hover:border-[#c9a96e]/25  → hover glow
      flex items-center justify-center  → centers the icon
      cursor-pointer  → hand cursor on hover
      transition-colors duration-200  → smooth color change
      shrink-0  → never squishes

      @click emits the new value to the parent via v-model:collapsed.
      $emit('update:collapsed', !collapsed) is the Vue v-model contract:
        - The parent passed collapsed as a prop
        - We signal back "please set it to !collapsed"
        - The parent decides to update or not (it always does here)
    -->
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
/*
  SCRIPT SECTION
  ─────────────────────────────────────────────────────────────────────────────
  This component has NO internal state for `collapsed` — it's fully controlled
  by the parent via props. This is the "controlled component" pattern.

  Think of it in C++ terms:
    - The component is a pure function of its inputs (props)
    - It doesn't own the data; it just displays it and requests changes
    - The parent is the single source of truth
*/

// ── Props ─────────────────────────────────────────────────────────────────────
/*
  defineProps defines the inputs this component accepts from its parent.
  TypeScript interface syntax: { propName: Type }

  withDefaults sets fallback values if the parent doesn't pass them.
  Like default parameter values in C++: void fn(bool x = false)
*/
const props = withDefaults(
  defineProps<{
    collapsed: boolean     // Is the sidebar in narrow/icon-only mode?
    unreadCount?: number   // How many unread messages (shown on Messages badge)
  }>(),
  {
    collapsed:   false,
    unreadCount: 0,
  }
)

// ── Emits ─────────────────────────────────────────────────────────────────────
/*
  defineEmits declares the events this component can fire.
  'update:collapsed' is the Vue v-model convention:
    parent writes:  <AdminSidebar v-model:collapsed="myVar" />
    component emits: $emit('update:collapsed', newValue)
    Vue automatically: myVar = newValue

  Like an observer/callback in C++:
    std::function<void(bool)> onCollapsedChange;
*/
defineEmits<{
  'update:collapsed': [value: boolean]
}>()

// ── Router ────────────────────────────────────────────────────────────────────
/*
  useRoute() gives us the current URL info.
  We need it to highlight the active nav link.
*/
const route = useRoute()

// ── Navigation items ──────────────────────────────────────────────────────────
/*
  computed() recalculates when props.unreadCount changes.
  The badge on "Messages" shows the live unread count from the parent.
*/
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

// ── Active link detection ─────────────────────────────────────────────────────
/*
  Returns true if the given path matches the current URL.
  Exact match for '/admin' (to avoid matching all /admin/* routes).
  Prefix match for sub-pages (/admin/messages, /admin/faq, etc.).
*/
function isActive(path: string): boolean {
  if (path === '/admin') return route.path === '/admin'
  return route.path.startsWith(path)
}
</script>