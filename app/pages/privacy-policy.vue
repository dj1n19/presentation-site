<template>
  <div class="policy-page">

    <!-- Hero -->
    <header class="policy-hero">
      <div class="policy-container">
        <div class="policy-breadcrumb">
          <NuxtLink to="/" class="breadcrumb-link">Accueil</NuxtLink>
          <span class="breadcrumb-sep" aria-hidden="true">›</span>
          <span>Politique de confidentialité</span>
        </div>
        <h1 class="policy-title">Politique de confidentialité</h1>
        <p class="policy-subtitle">
          Conformément au Règlement Général sur la Protection des Données (RGPD – Règlement (UE) 2016/679)
          et à la loi belge du 30 juillet 2018 relative à la protection des personnes physiques
          à l'égard des traitements de données à caractère personnel.
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

          <!-- 1. Responsable du traitement -->
          <section id="responsable" class="policy-section">
            <h2 class="section-title">1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement de vos données personnelles est le/la gestionnaire
              administratif·ve exploitant ce site web.
            </p>
            <div class="contact-card">
              <p><strong>Gestionnaire administratif·ve</strong></p>
              <p>Belgique</p>
              <p>
                <a href="mailto:e.mail@domain.ext" class="text-link">e.mail@domain.ext</a>
              </p>
              <p>Tel.&nbsp;: 0456/12.34.56</p>
            </div>
          </section>

          <!-- 2. Données collectées -->
          <section id="donnees" class="policy-section">
            <h2 class="section-title">2. Données collectées</h2>
            <p>
              Nous collectons uniquement les données strictement nécessaires aux finalités décrites
              ci-dessous. Voici les catégories de données traitées&nbsp;:
            </p>
            <div class="data-table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Catégorie</th>
                    <th>Données</th>
                    <th>Source</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="d in dataCollected" :key="d.category">
                    <td><strong>{{ d.category }}</strong></td>
                    <td>{{ d.data }}</td>
                    <td><span class="badge badge--gray">{{ d.source }}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- 3. Finalités et bases légales -->
          <section id="finalites" class="policy-section">
            <h2 class="section-title">3. Finalités et bases légales du traitement</h2>
            <p>
              Conformément à l'article 6 du RGPD, chaque traitement repose sur une base légale
              explicite&nbsp;:
            </p>
            <div class="purpose-list">
              <div v-for="purpose in purposes" :key="purpose.title" class="purpose-item">
                <div class="purpose-header">
                  <span class="purpose-title">{{ purpose.title }}</span>
                  <span class="badge" :class="purpose.badgeClass">{{ purpose.basis }}</span>
                </div>
                <p class="purpose-desc">{{ purpose.description }}</p>
              </div>
            </div>
          </section>

          <!-- 4. Durées de conservation -->
          <section id="conservation" class="policy-section">
            <h2 class="section-title">4. Durées de conservation</h2>
            <p>
              Vos données ne sont conservées que le temps nécessaire aux finalités pour lesquelles
              elles ont été collectées, conformément à l'article 5(1)(e) du RGPD.
            </p>
            <div class="data-table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Type de données</th>
                    <th>Durée de conservation</th>
                    <th>Justification</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="r in retentionPeriods" :key="r.type">
                    <td>{{ r.type }}</td>
                    <td class="nowrap"><strong>{{ r.duration }}</strong></td>
                    <td>{{ r.reason }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- 5. Destinataires -->
          <section id="destinataires" class="policy-section">
            <h2 class="section-title">5. Destinataires des données</h2>
            <p>
              Vos données personnelles ne sont pas vendues, louées ni cédées à des tiers à des
              fins commerciales.
            </p>
            <p>
              Elles peuvent toutefois être partagées avec les catégories de destinataires
              suivantes, dans les limites strictement nécessaires&nbsp;:
            </p>
            <ul class="recipients-list">
              <li>
                <strong>Hébergeur du site</strong> — pour assurer le fonctionnement technique
                du site. Ce prestataire agit en qualité de sous-traitant et est soumis à des
                obligations de confidentialité.
              </li>
              <li>
                <strong>Outils analytiques (si activés)</strong> — uniquement avec votre
                consentement préalable, dans les limites décrites dans notre
                <NuxtLink to="/cookies-policy" class="text-link">politique des cookies</NuxtLink>.
              </li>
              <li>
                <strong>Autorités compétentes</strong> — uniquement en cas d'obligation légale
                ou judiciaire.
              </li>
            </ul>
            <p>
              Aucun transfert de données vers des pays hors de l'Espace Économique Européen (EEE)
              n'est effectué sans garanties appropriées (clauses contractuelles types ou décision
              d'adéquation de la Commission européenne).
            </p>
          </section>

          <!-- 6. Vos droits -->
          <section id="droits" class="policy-section">
            <h2 class="section-title">6. Vos droits RGPD</h2>
            <p>
              Conformément aux articles 15 à 22 du RGPD et à la loi belge du 30 juillet 2018,
              vous disposez des droits suivants&nbsp;:
            </p>
            <ul class="rights-list">
              <li>
                <strong>Droit d'accès (art. 15)</strong> — obtenir confirmation que vos données
                sont traitées et en recevoir une copie.
              </li>
              <li>
                <strong>Droit de rectification (art. 16)</strong> — faire corriger des données
                inexactes ou incomplètes.
              </li>
              <li>
                <strong>Droit à l'effacement (art. 17)</strong> — demander la suppression de vos
                données lorsque leur conservation n'est plus justifiée.
              </li>
              <li>
                <strong>Droit à la limitation (art. 18)</strong> — suspendre temporairement le
                traitement dans certaines circonstances.
              </li>
              <li>
                <strong>Droit à la portabilité (art. 20)</strong> — recevoir vos données dans un
                format structuré, couramment utilisé et lisible par machine.
              </li>
              <li>
                <strong>Droit d'opposition (art. 21)</strong> — vous opposer au traitement de vos
                données, notamment à des fins de prospection commerciale.
              </li>
              <li>
                <strong>Droit de retrait du consentement</strong> — retirer à tout moment un
                consentement préalablement donné, sans effet rétroactif.
              </li>
              <li>
                <strong>Droit de ne pas faire l'objet d'une décision automatisée (art. 22)</strong>
                — aucune décision vous concernant n'est prise sur la seule base d'un traitement
                automatisé.
              </li>
            </ul>
            <div class="info-box">
              <strong>Comment exercer vos droits&nbsp;?</strong><br>
              Envoyez votre demande par e-mail à
              <a href="mailto:e.mail@domain.ext" class="text-link">e.mail@domain.ext</a>
              en précisant votre identité. Nous répondrons dans un délai d'<strong>un mois</strong>
              (art. 12 RGPD), prolongeable de deux mois supplémentaires en cas de complexité.
            </div>
          </section>

          <!-- 7. Sécurité -->
          <section id="securite" class="policy-section">
            <h2 class="section-title">7. Sécurité des données</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
              protéger vos données contre tout accès non autorisé, perte, destruction ou divulgation
              accidentelle, conformément à l'article 32 du RGPD. Ces mesures comprennent notamment&nbsp;:
            </p>
            <ul class="security-list">
              <li>Chiffrement des mots de passe (hachage bcrypt)</li>
              <li>Accès à l'interface d'administration protégé par authentification</li>
              <li>Connexions sécurisées via HTTPS</li>
              <li>Accès aux données limité aux seules personnes habilitées</li>
              <li>Tokens de protection contre les attaques CSRF</li>
            </ul>
            <p>
              En cas de violation de données susceptible d'engendrer un risque pour vos droits et
              libertés, nous notifierons l'Autorité de protection des données dans un délai de
              72 heures conformément à l'article 33 du RGPD.
            </p>
          </section>

          <!-- 8. Cookies -->
          <section id="cookies" class="policy-section">
            <h2 class="section-title">8. Cookies</h2>
            <p>
              Ce site utilise des cookies. Pour une information complète sur les cookies déposés,
              leurs finalités et la manière de gérer vos préférences, veuillez consulter notre&nbsp;
              <NuxtLink to="/cookies-policy" class="text-link">politique des cookies</NuxtLink>.
            </p>
          </section>

          <!-- 9. Réclamation -->
          <section id="reclamation" class="policy-section">
            <h2 class="section-title">9. Droit de réclamation</h2>
            <p>
              Si vous estimez que le traitement de vos données n'est pas conforme au RGPD, vous
              avez le droit d'introduire une réclamation auprès de l'autorité de contrôle
              compétente&nbsp;:
            </p>
            <div class="apd-card">
              <p class="apd-name">Autorité de protection des données (APD / GBA)</p>
              <p>Rue de la Presse 35 — 1000 Bruxelles</p>
              <p>
                <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener"
                  class="text-link">
                  www.autoriteprotectiondonnees.be
                </a>
              </p>
              <p>
                <a href="mailto:contact@apd-gba.be" class="text-link">contact@apd-gba.be</a>
              </p>
            </div>
          </section>

          <!-- 10. Modifications -->
          <section id="modifications" class="policy-section">
            <h2 class="section-title">10. Modifications de la présente politique</h2>
            <p>
              Nous nous réservons le droit de mettre à jour cette politique de confidentialité à
              tout moment, notamment pour nous conformer à l'évolution de la législation ou de
              nos pratiques. La date de dernière mise à jour figurant en haut de cette page sera
              actualisée en conséquence.
            </p>
            <p>
              En cas de modification substantielle, nous vous en informerons par un avis visible
              sur le site avant l'entrée en vigueur des changements.
            </p>
          </section>

        </article>
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Politique de confidentialité',
  meta: [
    {
      name: 'description',
      content: 'Politique de confidentialité conforme au RGPD et à la législation belge. Détail du traitement de vos données personnelles.'
    }
  ]
})

const lastUpdated = new Date().toLocaleDateString('fr-BE', {
  year: 'numeric', month: 'long', day: 'numeric'
})

const sections = [
  { id: 'responsable',   label: '1. Responsable du traitement' },
  { id: 'donnees',       label: '2. Données collectées' },
  { id: 'finalites',     label: '3. Finalités et bases légales' },
  { id: 'conservation',  label: '4. Durées de conservation' },
  { id: 'destinataires', label: '5. Destinataires' },
  { id: 'droits',        label: '6. Vos droits RGPD' },
  { id: 'securite',      label: '7. Sécurité' },
  { id: 'cookies',       label: '8. Cookies' },
  { id: 'reclamation',   label: '9. Droit de réclamation' },
  { id: 'modifications', label: '10. Modifications' },
]

// ── Data tables ──────────────────────────────────────────────────────────────

const dataCollected = [
  {
    category: 'Identité',
    data: 'Prénom, nom',
    source: 'Formulaire de contact',
  },
  {
    category: 'Coordonnées',
    data: 'Adresse e-mail, numéro de téléphone',
    source: 'Formulaire de contact',
  },
  {
    category: 'Message',
    data: 'Contenu du message envoyé via le formulaire',
    source: 'Formulaire de contact',
  },
  {
    category: 'Témoignage',
    data: 'Nom d\'utilisateur, texte du témoignage, notes attribuées',
    source: 'Formulaire de témoignage',
  },
  {
    category: 'Navigation',
    data: 'Adresse IP, pages visitées, horodatage (anonymisé)',
    source: 'Cookies analytiques (si consentis)',
  },
  {
    category: 'Authentification',
    data: 'E-mail, mot de passe haché (administrateurs uniquement)',
    source: 'Interface d\'administration',
  },
]

const purposes = [
  {
    title: 'Traitement des demandes de contact',
    basis: 'Intérêt légitime',
    badgeClass: 'badge--blue',
    description: 'Vos coordonnées et votre message sont traités afin de répondre à votre demande. Base légale : article 6(1)(f) RGPD — intérêt légitime à répondre aux sollicitations.',
  },
  {
    title: 'Publication des témoignages',
    basis: 'Consentement',
    badgeClass: 'badge--green',
    description: 'La soumission d\'un témoignage vaut consentement à sa publication sur le site (après modération). Base légale : article 6(1)(a) RGPD.',
  },
  {
    title: 'Mesure d\'audience',
    basis: 'Consentement',
    badgeClass: 'badge--green',
    description: 'Des statistiques de visites anonymisées sont collectées uniquement si vous avez accepté les cookies analytiques. Base légale : article 6(1)(a) RGPD.',
  },
  {
    title: 'Sécurité et administration du site',
    basis: 'Intérêt légitime',
    badgeClass: 'badge--blue',
    description: 'Les journaux techniques et les données de session sont conservés pour assurer la sécurité et le bon fonctionnement du site. Base légale : article 6(1)(f) RGPD.',
  },
  {
    title: 'Respect des obligations légales',
    basis: 'Obligation légale',
    badgeClass: 'badge--orange',
    description: 'Certaines données peuvent être conservées pour satisfaire à des obligations légales ou réglementaires. Base légale : article 6(1)(c) RGPD.',
  },
]

const retentionPeriods = [
  {
    type: 'Messages de contact',
    duration: '3 ans',
    reason: 'Délai de prescription contractuelle belge',
  },
  {
    type: 'Témoignages approuvés',
    duration: 'Jusqu\'au retrait du consentement',
    reason: 'Consentement révocable à tout moment',
  },
  {
    type: 'Témoignages refusés / en attente',
    duration: '30 jours',
    reason: 'Suppression automatique après modération',
  },
  {
    type: 'Données de session (connexion admin)',
    duration: 'Durée de la session',
    reason: 'Supprimées à la déconnexion',
  },
  {
    type: 'Données analytiques',
    duration: '13 mois maximum',
    reason: 'Recommandation CNIL / APD',
  },
  {
    type: 'Préférences cookies',
    duration: '12 mois',
    reason: 'Renouvellement annuel du consentement',
  },
]
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

/* ── Tables ──────────────────────────────────────────────── */
.data-table-wrapper {
  overflow-x: auto;
  margin-top: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;
  white-space: normal;
}

.data-table thead tr {
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.data-table th {
  padding: 0.625rem 0.875rem;
  font-weight: 600;
  color: #374151;
  text-align: left;
  font-size: 0.75rem;
  letter-spacing: 0.02em;
}

.data-table td {
  padding: 0.625rem 0.875rem;
  color: #4b5563;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: top;
  line-height: 1.5;
}

.data-table tbody tr:last-child td { border-bottom: none; }
.data-table tbody tr:hover td { background: #fafafa; }

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
.badge--gray   { background: #f3f4f6; color: #374151; }

/* ── Purpose list ────────────────────────────────────────── */
.purpose-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.purpose-item {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
}

.purpose-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.purpose-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
}

.purpose-desc {
  font-size: 0.8125rem;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 !important;
}

/* ── Lists ───────────────────────────────────────────────── */
.rights-list,
.security-list,
.recipients-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rights-list li,
.security-list li,
.recipients-list li {
  font-size: 0.875rem;
  color: #4b5563;
  padding-left: 1.25rem;
  position: relative;
  line-height: 1.6;
}

.rights-list li::before,
.recipients-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #9ca3af;
  font-size: 0.75rem;
  top: 0.1rem;
}

.security-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #15803d;
  font-size: 0.75rem;
  top: 0.1rem;
}

/* ── Info box ────────────────────────────────────────────── */
.info-box {
  margin-top: 1rem;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 0.8125rem;
  color: #1e40af;
  line-height: 1.6;
}

/* ── Cards ───────────────────────────────────────────────── */
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
</style>