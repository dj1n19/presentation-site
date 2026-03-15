<template>
  <div class="page">
    <!-- Animated grid background -->
    <div class="grid-bg" aria-hidden="true"></div>

    <!-- Floating blobs -->
    <div class="blob blob-1" aria-hidden="true"></div>
    <div class="blob blob-2" aria-hidden="true"></div>

    <main class="content">
      <!-- Top label -->
      <div class="label">
        <span class="dot"></span>
        En préparation
      </div>

      <!-- Main heading -->
      <h1 class="heading">
        Quelque chose<br>
        <em>d'important</em><br>
        arrive bientôt.
      </h1>

      <!-- Divider -->
      <div class="divider"></div>

      <!-- Description -->
      <p class="description">
        Notre site de gestion administrative est en cours de construction.<br>
        Revenez nous voir très prochainement.
      </p>

      <!-- Contact nudge -->
      <a href="mailto:e.mail@domain.ext" class="cta">
        <span>Nous contacter dès maintenant</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </main>

    <!-- Bottom signature -->
    <footer class="footer">
      © {{ new Date().getFullYear() }} — Gestion Administrative Professionnelle
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Site en construction — Gestion Administrative',
  meta: [
    { name: 'description', content: 'Notre site est en cours de construction. Revenez bientôt.' },
    { name: 'robots', content: 'noindex, nofollow' }
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap'
    }
  ]
})
</script>

<style scoped>
/* ── Reset & base ─────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.page {
  position: relative;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #0d0f14;
  color: #e8e4dc;
  overflow: hidden;
  font-family: 'DM Sans', sans-serif;
  padding: 2rem;
}

/* ── Grid background ──────────────────────────── */
.grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
}

/* ── Blobs ────────────────────────────────────── */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.18;
  animation: drift 12s ease-in-out infinite alternate;
}
.blob-1 {
  width: 500px; height: 500px;
  background: #c9a96e;
  top: -120px; left: -100px;
  animation-duration: 14s;
}
.blob-2 {
  width: 400px; height: 400px;
  background: #4a6fa5;
  bottom: -100px; right: -80px;
  animation-duration: 10s;
  animation-delay: -5s;
}
@keyframes drift {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(40px, 30px) scale(1.08); }
}

/* ── Content ──────────────────────────────────── */
.content {
  position: relative;
  z-index: 1;
  max-width: 680px;
  width: 100%;
  text-align: left;
  animation: fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Label ────────────────────────────────────── */
.label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #c9a96e;
  margin-bottom: 1.75rem;
  animation: fadeUp 0.9s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #c9a96e;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.75); }
}

/* ── Heading ──────────────────────────────────── */
.heading {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(2.4rem, 6vw, 4rem);
  font-weight: 400;
  line-height: 1.15;
  color: #f0ece3;
  margin-bottom: 2rem;
  animation: fadeUp 0.9s 0.2s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.heading em {
  font-style: italic;
  color: #c9a96e;
}

/* ── Divider ──────────────────────────────────── */
.divider {
  width: 48px;
  height: 2px;
  background: linear-gradient(90deg, #c9a96e, transparent);
  margin-bottom: 1.75rem;
  animation: fadeUp 0.9s 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* ── Description ──────────────────────────────── */
.description {
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.75;
  color: #9a9589;
  margin-bottom: 2.5rem;
  animation: fadeUp 0.9s 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* ── CTA ──────────────────────────────────────── */
.cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #e8e4dc;
  text-decoration: none;
  border: 1px solid rgba(201, 169, 110, 0.35);
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
  animation: fadeUp 0.9s 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.cta:hover {
  background: rgba(201, 169, 110, 0.12);
  border-color: #c9a96e;
  color: #c9a96e;
}
.cta svg {
  transition: transform 0.2s;
}
.cta:hover svg {
  transform: translateX(4px);
}

/* ── Footer ───────────────────────────────────── */
.footer {
  position: absolute;
  bottom: 1.5rem;
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  color: #3e3c38;
  z-index: 1;
}
</style>