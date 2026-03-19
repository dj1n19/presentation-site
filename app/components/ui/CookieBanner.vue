<script setup lang="ts">
const COOKIE_KEY = 'cookie_consent'

const visible = ref(false)
const showDetails = ref(false)

const preferences = reactive({
  necessary: true,     // always on, cannot be toggled
  analytics: false,
  marketing: false,
})

onMounted(() => {
  const stored = localStorage.getItem(COOKIE_KEY)
  if (!stored) {
    // Small delay so the page loads first
    setTimeout(() => { visible.value = true }, 800)
  }
})

function acceptAll() {
  preferences.analytics = true
  preferences.marketing = true
  save()
}

function rejectAll() {
  preferences.analytics = false
  preferences.marketing = false
  save()
}

function savePreferences() {
  save()
}

function save() {
  localStorage.setItem(COOKIE_KEY, JSON.stringify({
    necessary: true,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    timestamp: new Date().toISOString(),
  }))
  visible.value = false
}
</script>

<template>
  <Transition name="banner">
    <div
      v-if="visible"
      role="dialog"
      aria-modal="true"
      aria-label="Gestion des cookies"
      class="cookie-banner"
    >
      <div class="cookie-inner">

        <!-- Header -->
        <div class="cookie-header">
          <span class="cookie-icon" aria-hidden="true">🍪</span>
          <h2 class="cookie-title">Ce site utilise des cookies</h2>
        </div>

        <!-- Body -->
        <p class="cookie-desc">
          Nous utilisons des cookies pour assurer le bon fonctionnement du site.
          Conformément au RGPD et à la législation belge, votre consentement est
          requis pour les cookies non essentiels.
          <a href="/politique-cookies" class="cookie-link" target="_blank" rel="noopener">
            En savoir plus
          </a>
        </p>

        <!-- Expandable preferences -->
        <div v-if="showDetails" class="cookie-details">
          <label class="cookie-row cookie-row--disabled">
            <span class="cookie-row__label">
              <strong>Nécessaires</strong>
              <span>Indispensables au fonctionnement du site</span>
            </span>
            <span class="cookie-toggle cookie-toggle--on" aria-label="Toujours actif">
              Toujours actif
            </span>
          </label>

          <label class="cookie-row">
            <span class="cookie-row__label">
              <strong>Analytiques</strong>
              <span>Mesure d'audience anonymisée</span>
            </span>
            <button
              type="button"
              role="switch"
              :aria-checked="preferences.analytics"
              class="cookie-toggle-btn"
              :class="{ 'cookie-toggle-btn--on': preferences.analytics }"
              @click="preferences.analytics = !preferences.analytics"
            >
              <span class="cookie-toggle-thumb" />
            </button>
          </label>

          <label class="cookie-row">
            <span class="cookie-row__label">
              <strong>Marketing</strong>
              <span>Publicités personnalisées</span>
            </span>
            <button
              type="button"
              role="switch"
              :aria-checked="preferences.marketing"
              class="cookie-toggle-btn"
              :class="{ 'cookie-toggle-btn--on': preferences.marketing }"
              @click="preferences.marketing = !preferences.marketing"
            >
              <span class="cookie-toggle-thumb" />
            </button>
          </label>
        </div>

        <!-- Actions -->
        <div class="cookie-actions">
          <button class="btn btn--ghost" @click="showDetails = !showDetails">
            {{ showDetails ? 'Masquer les options' : 'Personnaliser' }}
          </button>

          <div class="cookie-actions__right">
            <button class="btn btn--outline" @click="rejectAll">
              Refuser
            </button>
            <button v-if="showDetails" class="btn btn--outline" @click="savePreferences">
              Enregistrer
            </button>
            <button class="btn btn--primary" @click="acceptAll">
              Tout accepter
            </button>
          </div>
        </div>

      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* ── Banner shell ───────────────────────────────────────── */
.cookie-banner {
  position: fixed;
  bottom: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  width: calc(100% - 2rem);
  max-width: 640px;
}

.cookie-inner {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.10), 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

/* ── Header ─────────────────────────────────────────────── */
.cookie-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cookie-icon {
  font-size: 1.1rem;
  line-height: 1;
}

.cookie-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

/* ── Description ────────────────────────────────────────── */
.cookie-desc {
  font-size: 0.8125rem;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

.cookie-link {
  color: #374151;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.cookie-link:hover { color: #111827; }

/* ── Detail rows ────────────────────────────────────────── */
.cookie-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-top: 1px solid #f3f4f6;
  padding-top: 0.875rem;
}

.cookie-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.375rem 0;
}

.cookie-row__label {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.cookie-row__label strong {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #374151;
}

.cookie-row__label span {
  font-size: 0.75rem;
  color: #9ca3af;
}

/* Always-on badge */
.cookie-toggle {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #6b7280;
  white-space: nowrap;
}

/* Toggle switch */
.cookie-toggle-btn {
  position: relative;
  width: 2.25rem;
  height: 1.25rem;
  border-radius: 999px;
  background: #d1d5db;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s;
  padding: 0;
}

.cookie-toggle-btn--on {
  background: #374151;
}

.cookie-toggle-thumb {
  position: absolute;
  top: 0.1875rem;
  left: 0.1875rem;
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.cookie-toggle-btn--on .cookie-toggle-thumb {
  transform: translateX(1rem);
}

/* ── Actions ────────────────────────────────────────────── */
.cookie-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 0.25rem;
}

.cookie-actions__right {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* Buttons */
.btn {
  font-size: 0.8125rem;
  font-weight: 500;
  border-radius: 0.4375rem;
  padding: 0.4375rem 0.875rem;
  cursor: pointer;
  border: none;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  white-space: nowrap;
  line-height: 1;
}

.btn--ghost {
  background: transparent;
  color: #6b7280;
  padding-left: 0;
  padding-right: 0;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.btn--ghost:hover { color: #111827; }

.btn--outline {
  background: transparent;
  color: #374151;
  border: 1px solid #d1d5db;
}
.btn--outline:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.btn--primary {
  background: #111827;
  color: #fff;
}
.btn--primary:hover { background: #1f2937; }

/* ── Transition ─────────────────────────────────────────── */
.banner-enter-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.banner-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.banner-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(1.5rem);
}
.banner-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(0.5rem);
}

/* ── Responsive ─────────────────────────────────────────── */
@media (max-width: 480px) {
  .cookie-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .cookie-actions__right {
    flex-direction: column;
  }
  .btn {
    text-align: center;
  }
  .btn--ghost {
    padding-left: 0;
  }
}
</style>