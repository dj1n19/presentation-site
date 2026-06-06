<template>
  <div class="user-shell">
    <!--
      UserSidebar receives:
        v-model:collapsed → two-way binding to our `collapsed` ref
        :username         → the logged-in user's name (one-way, read-only)
      
      v-model:collapsed is shorthand for:
        :collapsed="collapsed" @update:collapsed="v => collapsed = v"
    -->
    <UserSidebar v-model:collapsed="collapsed" :username="user?.username" />

    <!--
      :style binds inline CSS. We shift the main content right by the
      sidebar width so it's never hidden behind it.
      collapsed ? '4rem' : '15rem' matches the sidebar's w-16 / w-60 classes.
      (Tailwind: w-16 = 4rem, w-60 = 15rem)
    -->
    <main
      class="user-main"
      :style="{ marginLeft: collapsed ? '4rem' : '15rem' }"
    >
      <!--
        <slot /> is where the page content goes.
        Think of it like a template hole: each /user/*.vue page fills this slot.
        Same concept as a pure virtual render() in C++.
      -->
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
/*
  This layout fetches the current user's profile once, then passes
  the username down to the sidebar. All /user/* pages share this layout,
  so the fetch only happens once per layout mount (not per page navigation).
*/

const collapsed = ref(false)

// useFetch at layout level — runs when the layout mounts.
// We ignore pending/error here to keep it simple; the sidebar shows '?'
// as a fallback if the fetch hasn't completed yet.
const { data: user } = await useFetch<{ username: string; email: string; role: string }>(
  '/api/auth/me'
)
</script>

<style scoped>
.user-shell {
  min-height: 100vh;
  background: #f9fafb;
}

.user-main {
  transition: margin-left 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  min-height: 100vh;
}
</style>