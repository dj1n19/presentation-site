<template>
  <div class="admin-shell">
    <AdminSidebar v-model:collapsed="collapsed" :unread-count="unreadCount" />

    <main
      class="admin-main"
      :style="{ marginLeft: collapsed ? '4rem' : '15rem' }"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const collapsed = ref(false)

/*
  unreadCount will eventually come from a useFetch('/api/messages') call here,
  so every page using this layout shows the live badge.
  For now it's 0 — we'll wire it up when you want.
*/
const unreadCount = ref(0)
</script>

<style scoped>
.admin-shell {
  min-height: 100vh;
  background: #f9fafb;
}

.admin-main {
  transition: margin-left 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  min-height: 100vh;
}
</style>