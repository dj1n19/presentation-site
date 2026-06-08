<template>
	<div>
		<section class="bg-white py-20 md:py-32 border-b border-gray-100" id="hero">
			<div class="container mx-auto px-4 max-w-6xl">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					<!-- LEFT COLUMN -->
					<div>
						<!-- TITLE -->
						<h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
							[Your Name]
						</h1>
						<!-- SUBTITLE: -->
						<p class="text-xl md:text-2xl text-gray-600 mb-4">
							Professional Administrative Manager
						</p>
						<!-- DESCRIPTION PARAGRAPH: -->
						<p class="text-lg text-gray-600 mb-8 leading-relaxed">
							[Brief tagline about your expertise - e.g., "Streamlining operations and empowering teams to
							achieve excellence through strategic administrative leadership"]
						</p>
						<!-- BUTTON CONTAINER: -->
						<div class="flex flex-wrap gap-4">
							<UButton to="#about" color="gray" variant="outline" size="lg" icon="i-heroicons-user"
								class="outline-solid rounded-md p-2">
								About Me
							</UButton>
							<UButton to="#contact" color="gray" size="lg" icon="i-heroicons-envelope"
								class="outline-solid rounded-md p-2">
								Get in Touch
							</UButton>
							<UButton to="#services" color="gray" variant="outline" size="lg"
								icon="i-heroicons-briefcase" class="outline-solid rounded-md p-2">
								View Services
							</UButton>

							<!--
								Sign In / Sign Up buttons.

								These use NuxtLink instead of UButton's `to` prop so I can apply
								exactly the Tailwind classes I want without fighting UButton's
								default styling.

								Sign In: subtle outline — doesn't compete with the main CTAs above.
								Sign Up: slightly more prominent (dark background) to encourage
								         new visitors to create an account.

								`shrink-0` prevents the buttons from squishing on narrow screens.
								The `flex items-center gap-2` pattern mirrors how UButton renders
								its icon + label internally, so they look consistent.
							-->
							<div class="flex items-center gap-3 mt-1 w-full border-t border-gray-100 pt-4">
								<span class="text-sm text-gray-400">Espace client :</span>
								<NuxtLink
									to="/auth/login"
									class="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
									       border border-gray-300 text-gray-700 bg-white
									       hover:bg-gray-50 hover:border-gray-400 transition-colors duration-150"
								>
									<UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-4 h-4" />
									Se connecter
								</NuxtLink>
								<NuxtLink
									to="/auth/register"
									class="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
									       bg-gray-900 text-white
									       hover:bg-gray-700 transition-colors duration-150"
								>
									<UIcon name="i-heroicons-user-plus" class="w-4 h-4" />
									Créer un compte
								</NuxtLink>
							</div>
						</div>
					</div>
					<!-- RIGHT COLUMN: Profile Image Placeholder -->
					<div class="flex justify-center">
						<!-- IMAGE PLACEHOLDER: -->
						<div
							class="w-64 h-64 md:w-96 md:h-96 bg-gray-100 rounded-full flex items-center justify-center border-4 border-gray-200">

							<img class="w-64 h-64 md:w-96 md:h-96 rounded-full" src="~/assets/images/princesse.jpg"
								alt="Profile picture">

							<span class="sr-only">Profile photo</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ABOUT PREVIEW SECTION -->
		<section class="py-20 bg-gray-50 border-b border-gray-100" id="about">
			<div class="container mx-auto px-4 max-w-6xl">
				<!-- SECTION HEADER: -->
				<div class="max-w-3xl mx-auto text-center mb-12">
					<!-- SECTION TITLE: -->
					<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
						About Me
					</h2>
					<!-- SECTION DESCRIPTION -->
					<p class="text-lg text-gray-600 leading-relaxed">
						[Brief introduction paragraph about your background, experience, and approach to administrative
						management. Highlight what makes you unique and the value you bring to organizations.]
					</p>
				</div>
				<!-- STRENGTHS GRID: -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
					<!-- STRENGTH CARD: -->
					<div v-for="strength in strengths" :key="strength.title" class="text-center">
						<!-- ICON CONTAINER: -->
						<div class="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
							<UIcon :name="strength.icon" class="w-8 h-8 text-gray-700" />
						</div>
						<!-- STRENGTH TITLE -->
						<h3 class="text-xl font-semibold text-gray-900 mb-2">
							{{ strength.title }}
						</h3>
						<!-- STRENGTH DESCRIPTION -->
						<p class="text-gray-600 leading-relaxed">
							{{ strength.description }}
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- SERVICES SECTION -->
		<section class="py-20 bg-white" id="services">
			<div class="container mx-auto px-4 max-w-6xl">
				<!-- SECTION HEADER -->
				<div class="text-center mb-12">
					<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
						Services
					</h2>
					<p class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
						[Brief description of your service philosophy and how you help organizations]
					</p>
				</div>
				<!-- SERVICES GRID: -->
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
					<UCard v-for="service in services" :key="service.title"
						class="hover:shadow-md transition-shadow border border-gray-200">
						<!-- CARD HEADER SLOT: -->
						<template #header>
							<div class="flex items-center gap-3">
								<!-- SERVICE ICON CONTAINER: -->
								<div class="bg-gray-100 p-3 rounded-lg">
									<UIcon :name="service.icon" class="w-6 h-6 text-gray-700" />
								</div>
								<!-- SERVICE TITLE -->
								<h3 class="text-xl font-semibold text-gray-900">
									{{ service.title }}
								</h3>
							</div>
						</template>
						<!-- CARD BODY (default slot): -->
						<p class="text-gray-600 leading-relaxed p-2">
							{{ service.description }}
						</p>
					</UCard>
				</div>
				<!-- DISCLAIMER -->
				<div class="text-center mb-12">
					<h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
						Disclaimer
					</h3>
					<p class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
						Le service de gestion administrative proposé est un service d'assistance et d'accompagnement administratif destiné aux particuliers.
						Le ou la gestionnaire administratif·ve n'est pas avocat·e, notaire, huissier de justice ou conseiller juridique agréé.
					</p>
					<p class="text-lg text-left text-gray-600 max-w-2xl mx-auto leading-relaxed">
						À ce titre :
					</p>
						<ul class="list-disc list-inside text-left text-lg text-gray-600 max-w-2xl mb-4 mx-auto leading-relaxed">
							<li>aucun conseil juridique personnalisé ou avis légal ne peut être fourni</li>
							<li>aucune représentation juridique devant les tribunaux n'est assurée</li>
							<li>aucune interprétation officielle des lois ou règlements ne peut être donnée</li>
						</ul>
					<p class="text-lg text-left text-gray-600 max-w-2xl mx-auto leading-relaxed">
						L'accompagnement consiste à :
					</p>
						<ul class="list-disc list-inside text-left text-lg text-gray-600 max-w-2xl mb-4 mx-auto leading-relaxed">
							<li>aider à comprendre des courriers et démarches administratives</li>
							<li>assister dans la constitution et le suivi de dossiers</li>
							<li>rédiger des documents administratifs sur base des informations fournies par le client</li>
							<li>faciliter les échanges avec les organismes et institutions concernés</li>
						</ul>
					<p class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
						En cas de litige juridique complexe, de procédure judiciaire ou de besoin de conseil légal, il est recommandé de faire appel à un avocat ou à un professionnel du droit compétent.
					</p>
				</div>
			</div>
		</section>

		<!-- CONTACT FORM -->
		<section id="contact" class="py-20 bg-gray-50 border-b border-gray-100">
			<div class="container mx-auto px-4 max-w-6xl items-center">
				<div class="text-center mb-12">
					<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
						Contact
					</h2>
					<div class="flex mx-auto">
						<div class="p-3 mr-4 flex-auto text-left">
							<p class="font-bold row-start-1">Email:</p>
							<p> e.mail@domain.ext</p>
							<p class="font-bold row-start-2">Tel.:</p>
							<p> 0456/12.34.56</p>
							<p class="font-bold row-start-3">Tarif:</p>
							<p> 10€/h</p>
						</div>
						<div class="p-2 ml-4 flex-auto">
							<UiContactForm />
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- TESTIMONIAL FORM -->
		<section id="testimonial" class="py-20 bg-gray-50 border-b border-gray-100">
			<div class="container mx-auto px-4 max-w-6xl items-center">
				<div class="text-center mb-12">
					<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
						Témoignage
					</h2>
					<div class="flex mx-auto">
						<div class="p-2 ml-4 flex-auto">
							<UiTestimonialForm />
						</div>
					</div>
				</div>
			</div>
		</section>

		<!--
			FOOTER
			──────
			Three rows:
			  1. Site map + social networks (your existing content, unchanged)
			  2. Legal links — cookies policy and privacy policy.
			     NuxtLink is used here because these are internal routes
			     (defined in nuxt.config.ts as prerendered). Using <a href>
			     would do a full page reload; NuxtLink does a client-side
			     navigation, which is faster and consistent with the rest of
			     the app.
			  3. Copyright line (unchanged content, just cleaned up the year).
		-->
		<footer class="py-20 bg-gray-900 text-white">
			<div class="container mx-auto px-4 text-center max-w-4xl">
				<div class="grid grid-cols-2 mb-10">
					<div id="site-map" class="grid grid-cols-1 gap-2 text-gray-400 text-sm">
						<p>About Me</p>
						<p>Services</p>
						<p>Contact</p>
					</div>
					<div id="networks" class="grid grid-cols-1 gap-2 text-gray-400 text-sm">
						<p>Facebook</p>
						<p>Instagram</p>
					</div>
				</div>

				<!--
					Legal links row.
					`border-t border-gray-800` visually separates this from the
					site map above without being too heavy.
					`text-gray-500` is intentionally dimmer than body text — these
					are required by law but shouldn't dominate the footer visually.
					`hover:text-gray-300` gives clear interactive feedback.
					`underline underline-offset-2` makes it obvious these are links
					even without color, which helps accessibility.
				-->
				<div class="border-t border-gray-800 pt-6 mb-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
					<NuxtLink
						to="/cookies-policy"
						class="text-xs text-gray-500 hover:text-gray-300 underline underline-offset-2 transition-colors duration-150"
					>
						Politique des cookies
					</NuxtLink>
					<NuxtLink
						to="/privacy-policy"
						class="text-xs text-gray-500 hover:text-gray-300 underline underline-offset-2 transition-colors duration-150"
					>
						Politique de confidentialité
					</NuxtLink>
				</div>

				<div class="copyright text-center">
					<p class="text-xs text-gray-600">
						© {{ new Date().getFullYear() }} — Gestion Administrative Professionnelle
					</p>
				</div>
			</div>
		</footer>
	</div>
</template>

<script setup>
import TestimonialForm from '~/components/ui/TestimonialForm.vue';

useHead({
	title: 'Home | Professional Administrative Manager',
	meta: [
		{
			name: 'description',
			content: 'Professional administrative management services. Expert in operations, team coordination, and business efficiency.'
		}
	]
})

const strengths = [
	{
		icon: 'i-heroicons-chart-bar',
		title: 'Strategic Planning',
		description: '[Description of your strategic planning capabilities]'
	},
	{
		icon: 'i-heroicons-users',
		title: 'Team Leadership',
		description: '[Description of your team leadership approach]'
	},
	{
		icon: 'i-heroicons-cog',
		title: 'Process Optimization',
		description: '[Description of your process optimization expertise]'
	}
]

const services = [
	{
		icon: 'i-heroicons-building-library',
		title: 'Démarches auprès des services publics',
		description: 'Accompagnement dans les démarches communales, fiscales, sociales ou liées à l\'emploi (allocations, attestations, changements de situation, etc.).'
	},
	{
		icon: 'i-heroicons-calendar',
		title: 'Accompagnement des personnes en difficulté',
		description: 'Soutien administratif pour les personnes âgées, isolées, en situation de précarité ou dépassées par les démarches.'
	},
	{
		icon: 'i-heroicons-document-text',
		title: 'Rédaction et mise en forme de courriers',
		description: 'Rédaction de lettres officielles, contestations, demandes, réclamations ou réponses à des administrations.'
	},
	{
		icon: 'i-heroicons-user-group',
		title: 'Relations avec propriétaires',
		description: 'Assistance dans les échanges administratifs liés au logement (baux, courriers, litiges administratifs simples).'
	},
	{
		icon: 'i-heroicons-clipboard-document-list',
		title: 'Assistance administrative générale',
		description: 'Aide ponctuelle ou régulière pour comprendre, compléter et transmettre des documents administratifs.'
	},
	{
		icon: 'i-heroicons-light-bulb',
		title: 'Accompagnement des personnes en difficulté',
		description: 'Soutien administratif pour les personnes âgées, isolées, en situation de précarité ou dépassées par les démarches.'
	}
]

const testimonials = [
	{
		text: '[Testimonial text from a satisfied client about your work and impact]',
		author: '[Client Name]',
		role: '[Position, Company]'
	},
	{
		text: '[Another testimonial highlighting specific achievements or qualities]',
		author: '[Client Name]',
		role: '[Position, Company]'
	},
	{
		text: '[Third testimonial emphasizing results and professionalism]',
		author: '[Client Name]',
		role: '[Position, Company]'
	}
]
</script>