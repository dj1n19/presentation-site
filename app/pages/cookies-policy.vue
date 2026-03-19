<template>
  <div class="policy-page">

    <!-- Hero -->
    <header class="policy-hero">
      <div class="policy-container">
        <div class="policy-breadcrumb">
          <NuxtLink to="/" class="breadcrumb-link">Accueil</NuxtLink>
          <span class="breadcrumb-sep" aria-hidden="true">›</span>
          <span>Politique des cookies</span>
        </div>
        <h1 class="policy-title">Politique des cookies</h1>
        <p class="policy-subtitle">
          Conformément au RGPD et à la loi belge du 13 juin 2005 relative aux communications
          électroniques, nous vous informons de l'utilisation des cookies sur ce site.
        </p>
        <p class="policy-updated">Dernière mise à jour&nbsp;: {{ lastUpdated }}</p>
      </div>
    </header>

    <!-- Main content -->
    <main class="policy-main">
      <div class="policy-container policy-layout">

        <!-- Sticky TOC sidebar -->
        <aside class="policy-toc" aria-label="Table des matières">
          <p class="toc-heading">Sur cette page</p>
          <nav>
            <ol class="toc-list">
              <li v-for="section in sections" :key="section.id">
                <a :href="`#${section.id}`" class="toc-link">{{ section.label }}</a>
              </li>
            </ol>
          </nav>
        </aside>

        <!-- Article -->
        <article class="policy-article">

          <!-- 1. Qu'est-ce qu'un cookie -->
          <section id="definition" class="policy-section">
            <h2 class="section-title">1. Qu'est-ce qu'un cookie&nbsp;?</h2>
            <p>
              Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur,
              tablette, smartphone) lorsque vous visitez un site web. Il permet au site de
              mémoriser vos préférences, de mesurer l'audience ou de vous proposer des
              publicités personnalisées.
            </p>
            <p>
              En Belgique, le cadre légal applicable est le RGPD (Règlement (UE) 2016/679),
              la loi du 13 juin 2005 relative aux communications électroniques, ainsi que les
              recommandations de l'Autorité de protection des données (APD/GBA).
            </p>
          </section>

          <!-- 2. Cookies nécessaires -->
          <section id="necessaires" class="policy-section">
            <h2 class="section-title">2. Cookies strictement nécessaires</h2>
            <p>
              Ces cookies sont indispensables au fonctionnement du site. Ils ne requièrent
              pas votre consentement conformément à l'article 129 §1 de la loi du 13 juin 2005.
            </p>
            <div class="cookie-table-wrapper">
              <table class="cookie-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Finalité</th>
                    <th>Durée</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="c in necessaryCookies" :key="c.name">
                    <td><code>{{ c.name }}</code></td>
                    <td>{{ c.purpose }}</td>
                    <td class="nowrap">{{ c.duration }}</td>
                    <td><span class="badge badge--green">{{ c.type }}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- 3. Cookies analytiques -->
          <section id="analytiques" class="policy-section">
            <h2 class="section-title">3. Cookies analytiques</h2>
            <p>
              Ces cookies nous permettent de mesurer l'audience du site (pages visitées,
              durée, origine des visites) afin d'en améliorer le contenu et l'ergonomie.
              <strong>Votre consentement est requis</strong> avant leur activation.
            </p>
            <div class="cookie-table-wrapper">
              <table class="cookie-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Émetteur</th>
                    <th>Finalité</th>
                    <th>Durée</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="c in analyticsCookies" :key="c.name">
                    <td><code>{{ c.name }}</code></td>
                    <td>{{ c.provider }}</td>
                    <td>{{ c.purpose }}</td>
                    <td class="nowrap">{{ c.duration }}</td>
                    <td><span class="badge badge--blue">{{ c.type }}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- 4. Cookies marketing -->
          <section id="marketing" class="policy-section">
            <h2 class="section-title">4. Cookies marketing &amp; réseaux sociaux</h2>
            <p>
              Ces cookies sont utilisés pour afficher des publicités personnalisées ou
              pour permettre le partage de contenu sur les réseaux sociaux. Ils peuvent
              être déposés par des tiers et croiser des données provenant d'autres sites.
              <strong>Votre consentement explicite est requis.</strong>
            </p>
            <div class="cookie-table-wrapper">
              <table class="cookie-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Émetteur</th>
                    <th>Finalité</th>
                    <th>Durée</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="c in marketingCookies" :key="c.name">
                    <td><code>{{ c.name }}</code></td>
                    <td>{{ c.provider }}</td>
                    <td>{{ c.purpose }}</td>
                    <td class="nowrap">{{ c.duration }}</td>
                    <td><span class="badge badge--orange">{{ c.type }}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- 5. Gérer vos préférences -->
          <section id="gestion" class="policy-section">
            <h2 class="section-title">5. Gérer vos préférences</h2>
            <p>
              Vous pouvez à tout moment modifier vos choix en cliquant sur le bouton
              ci-dessous, ou en effaçant les cookies dans les paramètres de votre
              navigateur.
            </p>
            <button class="btn-reset" @click="resetConsent">
              Modifier mes préférences de cookies
            </button>
            <p class="mt-4">
              Vous pouvez également désactiver les cookies directement dans votre
              navigateur&nbsp;:
            </p>
            <ul class="browser-list">
              <li>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Google Chrome</a>
              </li>
              <li>
                <a href="https://support.mozilla.org/fr/kb/protection-renforcee-contre-pistage-firefox" target="_blank" rel="noopener">Mozilla Firefox</a>
              </li>
              <li>
                <a href="https://support.apple.com/fr-be/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari</a>
              </li>
              <li>
                <a href="https://support.microsoft.com/fr-fr/windows/supprimer-et-g%C3%A9rer-les-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener">Microsoft Edge</a>
              </li>
            </ul>
            <div class="info-box">
              <strong>⚠️ Attention&nbsp;:</strong> la désactivation des cookies nécessaires
              peut perturber le bon fonctionnement du site.
            </div>
          </section>

          <!-- 6. Droits -->
          <section id="droits" class="policy-section">
            <h2 class="section-title">6. Vos droits</h2>
            <p>
              Conformément au RGPD (articles 15 à 22), vous disposez des droits suivants
              concernant vos données personnelles collectées via les cookies&nbsp;:
            </p>
            <ul class="rights-list">
              <li><strong>Droit d'accès</strong> — obtenir une copie de vos données</li>
              <li><strong>Droit de rectification</strong> — corriger des données inexactes</li>
              <li><strong>Droit à l'effacement</strong> — demander la suppression de vos données</li>
              <li><strong>Droit d'opposition</strong> — vous opposer au traitement à des fins de marketing</li>
              <li><strong>Droit à la limitation</strong> — restreindre temporairement le traitement</li>
              <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré</li>
              <li><strong>Droit de retirer le consentement</strong> — à tout moment, sans effet rétroactif</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à&nbsp;:
              <a href="mailto:e.mail@domain.ext" class="text-link">e.mail@domain.ext</a>
            </p>
            <p>
              Vous avez également le droit d'introduire une réclamation auprès de
              l'Autorité de protection des données belge (APD)&nbsp;:
            </p>
            <div class="apd-card">
              <p class="apd-name">Autorité de protection des données (APD)</p>
              <p>Rue de la Presse 35 — 1000 Bruxelles</p>
              <p>
                <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener" class="text-link">
                  www.autoriteprotectiondonnees.be
                </a>
              </p>
              <p>
                <a href="mailto:contact@apd-gba.be" class="text-link">contact@apd-gba.be</a>
              </p>
            </div>
          </section>

          <!-- 7. Contact -->
          <section id="contact" class="policy-section">
            <h2 class="section-title">7. Contact</h2>
            <p>
              Pour toute question relative à cette politique, contactez le responsable
              du traitement&nbsp;:
            </p>
            <div class="contact-card">
              <p><strong>Gestionnaire administratif·ve</strong></p>
              <p>
                <a href="mailto:e.mail@domain.ext" class="text-link">e.mail@domain.ext</a>
              </p>
              <p>Tel.&nbsp;: 0456/12.34.56</p>
            </div>
          </section>

        </article>
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Politique des cookies',
  meta: [
    {
      name: 'description',
      content: 'Politique des cookies conforme au RGPD et à la législation belge. Détail de tous les cookies utilisés sur ce site.'
    }
  ]
})

const lastUpdated = new Date().toLocaleDateString('fr-BE', {
  year: 'numeric', month: 'long', day: 'numeric'
})

const sections = [
  { id: 'definition',   label: '1. Qu\'est-ce qu\'un cookie ?' },
  { id: 'necessaires',  label: '2. Cookies nécessaires' },
  { id: 'analytiques',  label: '3. Cookies analytiques' },
  { id: 'marketing',    label: '4. Cookies marketing' },
  { id: 'gestion',      label: '5. Gérer vos préférences' },
  { id: 'droits',       label: '6. Vos droits' },
  { id: 'contact',      label: '7. Contact' },
]

// ── Cookie data ──────────────────────────────────────────────────────────────

const necessaryCookies = [
  {
    name: 'cookie_consent',
    purpose: 'Mémorise vos préférences de consentement aux cookies',
    duration: '12 mois',
    type: 'First-party',
  },
  {
    name: 'PHPSESSID / nuxt-session',
    purpose: 'Session utilisateur côté serveur (sécurité et navigation)',
    duration: 'Session',
    type: 'First-party',
  },
  {
    name: 'XSRF-TOKEN',
    purpose: 'Protection contre les attaques CSRF (sécurité des formulaires)',
    duration: 'Session',
    type: 'First-party',
  },
  {
    name: '__Host-*',
    purpose: 'Cookies sécurisés de session liés au domaine hôte',
    duration: 'Session',
    type: 'First-party',
  },
]

const analyticsCookies = [
  {
    name: '_ga',
    provider: 'Google Analytics',
    purpose: 'Identifie de manière unique les visiteurs pour mesurer l\'audience',
    duration: '2 ans',
    type: 'Third-party',
  },
  {
    name: '_ga_XXXXXXXX',
    provider: 'Google Analytics 4',
    purpose: 'Maintient l\'état de session Google Analytics 4',
    duration: '2 ans',
    type: 'Third-party',
  },
  {
    name: '_gid',
    provider: 'Google Analytics',
    purpose: 'Distingue les utilisateurs pour les statistiques de navigation',
    duration: '24 h',
    type: 'Third-party',
  },
  {
    name: '_gat',
    provider: 'Google Analytics',
    purpose: 'Limite le taux de requêtes envoyées à Google Analytics',
    duration: '1 min',
    type: 'Third-party',
  },
  {
    name: '_pk_id.*',
    provider: 'Matomo',
    purpose: 'Identifiant visiteur unique pour la mesure d\'audience (auto-hébergé)',
    duration: '13 mois',
    type: 'First-party',
  },
  {
    name: '_pk_ses.*',
    provider: 'Matomo',
    purpose: 'Cookie de session Matomo',
    duration: '30 min',
    type: 'First-party',
  },
]

const marketingCookies = [
  {
    name: '_fbp',
    provider: 'Meta (Facebook)',
    purpose: 'Identifie les navigateurs pour cibler les publicités Facebook/Instagram',
    duration: '3 mois',
    type: 'Third-party',
  },
  {
    name: '_fbc',
    provider: 'Meta (Facebook)',
    purpose: 'Stocke les paramètres de clic Facebook (fbclid) pour le suivi des conversions',
    duration: '2 ans',
    type: 'Third-party',
  },
  {
    name: 'fr',
    provider: 'Meta (Facebook)',
    purpose: 'Publicités ciblées et mesure de leur efficacité',
    duration: '3 mois',
    type: 'Third-party',
  },
  {
    name: '_gcl_au',
    provider: 'Google Ads',
    purpose: 'Mesure des conversions et expériences AdSense',
    duration: '3 mois',
    type: 'Third-party',
  },
  {
    name: 'IDE',
    provider: 'Google DoubleClick',
    purpose: 'Publicités personnalisées et mesure de leur efficacité',
    duration: '13 mois',
    type: 'Third-party',
  },
  {
    name: 'NID / CONSENT',
    provider: 'Google',
    purpose: 'Personnalisation des services Google (Maps, YouTube embarqué)',
    duration: '6 mois',
    type: 'Third-party',
  },
  {
    name: 'ln_or',
    provider: 'LinkedIn',
    purpose: 'Suivi des conversions issues des campagnes LinkedIn',
    duration: '1 jour',
    type: 'Third-party',
  },
  {
    name: 'bcookie / li_gc',
    provider: 'LinkedIn',
    purpose: 'Identifier les membres LinkedIn à des fins publicitaires',
    duration: '2 ans',
    type: 'Third-party',
  },
]

function resetConsent() {
  localStorage.removeItem('cookie_consent')
  window.location.reload()
}
</script>

<style scoped>
/* ── Page shell ─────────────────────────────────────────── */
.policy-page {
  min-height: 100vh;
  background: #f9fafb;
  font-family: 'DM Sans', Georgia, sans-serif;
}

/* ── Hero ────────────────────────────────────────────────── */
.policy-hero {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  padding: 3rem 1rem 2.5rem;
}

.policy-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.policy-breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: #9ca3af;
  margin-bottom: 1.25rem;
}
.breadcrumb-link {
  color: #6b7280;
  text-decoration: none;
}
.breadcrumb-link:hover { color: #111827; text-decoration: underline; }
.breadcrumb-sep { font-size: 1rem; }

.policy-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 0 0 0.75rem;
}

.policy-subtitle {
  font-size: 0.9375rem;
  color: #6b7280;
  line-height: 1.7;
  max-width: 640px;
  margin: 0 0 0.75rem;
}

.policy-updated {
  font-size: 0.8125rem;
  color: #9ca3af;
  margin: 0;
}

/* ── Main layout ─────────────────────────────────────────── */
.policy-main {
  padding: 3rem 1rem 5rem;
}

.policy-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 3rem;
  align-items: start;
}

@media (max-width: 860px) {
  .policy-layout { grid-template-columns: 1fr; }
  .policy-toc { display: none; }
}

/* ── TOC ─────────────────────────────────────────────────── */
.policy-toc {
  position: sticky;
  top: 2rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.625rem;
  padding: 1.25rem;
}

.toc-heading {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #9ca3af;
  margin: 0 0 0.875rem;
}

.toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.toc-link {
  display: block;
  font-size: 0.8125rem;
  color: #6b7280;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.3125rem;
  transition: background 0.15s, color 0.15s;
  line-height: 1.4;
}
.toc-link:hover {
  background: #f3f4f6;
  color: #111827;
}

/* ── Article ─────────────────────────────────────────────── */
.policy-article {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* ── Section ─────────────────────────────────────────────── */
.policy-section {
  scroll-margin-top: 2rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 1rem;
  padding-bottom: 0.625rem;
  border-bottom: 2px solid #f3f4f6;
}

.policy-section p {
  font-size: 0.9rem;
  color: #4b5563;
  line-height: 1.75;
  margin: 0 0 0.875rem;
}
.policy-section p:last-child { margin-bottom: 0; }

/* ── Cookie table ────────────────────────────────────────── */
.cookie-table-wrapper {
  overflow-x: auto;
  margin-top: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.cookie-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;
  white-space: normal;
}

.cookie-table thead tr {
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.cookie-table th {
  padding: 0.625rem 0.875rem;
  font-weight: 600;
  color: #374151;
  text-align: left;
  font-size: 0.75rem;
  letter-spacing: 0.02em;
}

.cookie-table td {
  padding: 0.625rem 0.875rem;
  color: #4b5563;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: top;
  line-height: 1.5;
}

.cookie-table tbody tr:last-child td {
  border-bottom: none;
}

.cookie-table tbody tr:hover td {
  background: #fafafa;
}

.cookie-table code {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.775rem;
  background: #f3f4f6;
  color: #1f2937;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  white-space: nowrap;
}

.nowrap { white-space: nowrap; }

/* ── Badges ──────────────────────────────────────────────── */
.badge {
  display: inline-block;
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.1875rem 0.5rem;
  border-radius: 999px;
  white-space: nowrap;
}
.badge--green  { background: #dcfce7; color: #15803d; }
.badge--blue   { background: #dbeafe; color: #1d4ed8; }
.badge--orange { background: #ffedd5; color: #c2410c; }

/* ── Reset button ────────────────────────────────────────── */
.btn-reset {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background: #111827;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.6rem 1.25rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.15s;
  margin-top: 0.25rem;
}
.btn-reset::before { content: '⚙'; font-size: 0.875rem; }
.btn-reset:hover { background: #1f2937; }

/* ── Browser list ────────────────────────────────────────── */
.browser-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.browser-list li a {
  display: inline-block;
  font-size: 0.8125rem;
  color: #374151;
  text-decoration: none;
  padding: 0.25rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 999px;
  transition: border-color 0.15s, background 0.15s;
}
.browser-list li a:hover {
  border-color: #9ca3af;
  background: #f9fafb;
}

/* ── Info box ────────────────────────────────────────────── */
.info-box {
  margin-top: 1rem;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 0.8125rem;
  color: #92400e;
  line-height: 1.6;
}

/* ── Rights list ─────────────────────────────────────────── */
.rights-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.rights-list li {
  font-size: 0.875rem;
  color: #4b5563;
  padding-left: 1.25rem;
  position: relative;
  line-height: 1.6;
}
.rights-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #9ca3af;
  font-size: 0.75rem;
  top: 0.1rem;
}

/* ── APD & Contact cards ─────────────────────────────────── */
.apd-card,
.contact-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.7;
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}
.apd-card p, .contact-card p { margin: 0; }

.apd-name {
  font-weight: 600;
  color: #111827;
}

/* ── Links ───────────────────────────────────────────────── */
.text-link {
  color: #374151;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.text-link:hover { color: #111827; }

/* ── Utility ─────────────────────────────────────────────── */
.mt-4 { margin-top: 1rem; }
</style>