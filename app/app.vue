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
							<UButton to="#about" color="gray" variant="outline" size="lg" icon="i-heroicons-briefcase"
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
				<!-- CALL-TO-ACTION BUTTON: -->
				<div class="text-center mt-12">
					<UButton to="/about" color="gray" size="lg" variant="outline"
						trailing-icon="i-heroicons-arrow-right">
						Learn More About Me
					</UButton>
				</div>
			</div>
		</section>

		<!-- SERVICES SECTION -->
		<section class="py-20 bg-gray-50" id="services">
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
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
				<!-- SERVICES CTA BUTTON -->
				<div class="text-center mt-12">
					<UButton to="/services" color="gray" size="lg" trailing-icon="i-heroicons-arrow-right">
						View All Services
					</UButton>
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
							<ContactForm></ContactForm>
						</div>
					</div>
				</div>
			</div>
		</section>

		<footer class="py-20 bg-gray-900 text-white">
			<div class="container mx-auto px-4 text-center max-w-4xl">
				<div class="grid grid-cols-2">
					<div id="site-map" class="grid grid-cols-1">
						<p>About Me</p>
						<p>Services</p>
						<p>Contact</p>
					</div>
					<div id="networks" class="grid grid-cols-1">
						<p>Facebook</p>
						<p>Instagram</p>
					</div>
				</div>
				<div class="copyright text-center my-8">
					<p>Copyright 2157-3410</p>
				</div>
			</div>
		</footer>
	</div>
</template>

<script setup>
/* 
  SCRIPT SECTION (COMPOSITION API):
  This is where the JavaScript logic lives. Think of it as your "main()" function.
  
  Vue 3 uses the Composition API (setup() function style).
  It's more similar to functional programming than class-based (Vue 2).
  
  Key concepts:
  - No need to return values - they're automatically available in template
  - Use const for variables (like const in C++)
  - Use ref() or reactive() for state that can change (mutable variables)
*/

// ============================================================================
// SEO (Search Engine Optimization)
// ============================================================================
/*
  useHead() is a Nuxt composable (reusable function).
  - Composables are functions that start with "use"
  - They're like utility functions but with special framework powers
  
  This sets the page <title> and <meta> tags for SEO.
  Search engines read this to understand and rank your page.
*/
useHead({
	title: 'Home | Professional Administrative Manager',
	meta: [
		{
			name: 'description',
			content: 'Professional administrative management services. Expert in operations, team coordination, and business efficiency.'
		}
	]
})

// ============================================================================
// DATA STRUCTURES
// ============================================================================
/*
  These are your data sources - like arrays/structs in C++.
  
  const = immutable reference (pointer can't change)
  - The array reference is constant
  - But you could mutate array contents if needed
  
  Similar to: const vector<Stat> stats in C++
*/

// ----------------------------------------------------------------------------
// STRENGTHS ARRAY
// ----------------------------------------------------------------------------
/*
  Array of strength objects - each has icon, title, description
  
  icon: string identifier for heroicons library
  - 'i-heroicons-chart-bar' references a specific icon
  - The library loads the actual SVG icon
*/
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

// ----------------------------------------------------------------------------
// SERVICES ARRAY
// ----------------------------------------------------------------------------
/*
  Array of service offerings
  Each service has: icon, title, description
  
  These populate the service cards in the grid
*/
const services = [
	{
		icon: 'i-heroicons-clipboard-document-list',
		title: 'Démarches administratives',
		description: 'gestion des relations avec les administrations.'
	},
	{
		icon: 'i-heroicons-calendar',
		title: 'Organisation personnelle',
		description: 'planification de rendez-vous'
	},
	{
		icon: 'i-heroicons-document-text',
		title: 'Gestion des documents',
		description: 'Obtention, completion et envoie de documents administratifs.'
	},
	{
		icon: 'i-heroicons-user-group',
		title: 'Scheduling & Planning',
		description: '[Brief description of scheduling services]'
	},
	{
		icon: 'i-heroicons-chart-pie',
		title: 'Budget Management',
		description: '[Brief description of budget management services]'
	},
	{
		icon: 'i-heroicons-light-bulb',
		title: 'Process Improvement',
		description: '[Brief description of process improvement services]'
	}
]

// ----------------------------------------------------------------------------
// TESTIMONIALS ARRAY
// ----------------------------------------------------------------------------
/*
  Array of client testimonials
  Each has: text (the quote), author (name), role (position/company)
  
  Social proof to build trust with potential clients
*/
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

/*
  IMPORTANT NOTES FOR C++ DEVELOPERS:
  
  1. NO SEMICOLONS NEEDED (usually):
	 - JavaScript has automatic semicolon insertion
	 - Most modern style guides omit them
  
  2. NO TYPE DECLARATIONS:
	 - JavaScript is dynamically typed (like Python)
	 - TypeScript adds types if you need them
  
  3. OBJECTS USE : NOT =
	 - { key: value } not { key = value }
	 - Similar to JSON format
  
  4. STRING LITERALS:
	 - Can use 'single', "double", or `backticks`
	 - Backticks allow ${variable} interpolation
  
  5. ARRAYS ARE DYNAMIC:
	 - No fixed size like C++ arrays
	 - Can grow/shrink automatically (like std::vector)
  
  6. THIS IS ALL CLIENT-SIDE:
	 - Runs in the browser, not on a server
	 - Like JavaScript in a <script> tag
	 - Nuxt can pre-render it to HTML for speed
*/
</script>

<style scoped>
/*
  STYLE SECTION (CSS):
  
  "scoped" means these styles ONLY apply to this component.
  - Won't leak to other components
  - Like having private member styles in C++
  
  However, we're using Tailwind CSS (utility classes in template),
  so we rarely need custom CSS here.
  
  You could add custom styles if needed:
  
  .custom-class {
	property: value;
  }
  
  But Tailwind handles 95% of styling needs with utility classes.
*/
</style>

<!--
  ============================================================================
  ARCHITECTURE OVERVIEW (for C++ developers):
  ============================================================================
  
  1. COMPONENT STRUCTURE:
	 - <template>: The view (what user sees) - like rendering code
	 - <script>: The logic (data and functions) - like your class/functions
	 - <style>: The styling (how it looks) - like themes/colors
  
  2. DATA FLOW:
	 - Data defined in <script> (arrays/objects)
	 - Referenced in <template> with {{ }} or v-bind
	 - Changes to data automatically update the view (reactive)
  
  3. REACTIVITY:
	 - Vue tracks data changes and updates DOM automatically
	 - Like having automatic observers on variables
	 - No manual DOM manipulation needed (unlike vanilla JavaScript)
  
  4. COMPONENTS:
	 - UButton, UCard, UIcon are imported components
	 - Like using library classes in C++
	 - They encapsulate behavior and styling
  
  5. DIRECTIVES:
	 - v-for: Loop directive (like for loops)
	 - v-if: Conditional rendering (like if statements)
	 - v-bind or :: Bind data to attributes (dynamic attributes)
	 - @: Event handler shorthand (v-on:click → @click)
  
  6. ROUTING:
	 - <NuxtLink to="/path"> creates links
	 - Changes URL without page reload (SPA - Single Page Application)
	 - Like switching between views in a desktop app
  
  7. BUILD PROCESS:
	 - Nuxt compiles this .vue file into optimized JavaScript
	 - Tailwind processes utility classes into minimal CSS
	 - Result: fast, small bundle for the browser
	 
  8. COMPARISON TO C++:
	 ┌─────────────────┬──────────────────────────┐
	 │ C++ Concept     │ Vue/Web Equivalent       │
	 ├─────────────────┼──────────────────────────┤
	 │ struct/class    │ JavaScript object {}     │
	 │ vector<T>       │ Array []                 │
	 │ for loop        │ v-for directive          │
	 │ if statement    │ v-if directive           │
	 │ cout << x       │ {{ x }} interpolation    │
	 │ function        │ const func = () => {}    │
	 │ member variable │ const variable = value   │
	 │ include library │ import from 'library'    │
	 │ pointer         │ ref() (reactive)         │
	 │ reference       │ const (immutable ref)    │
	 └─────────────────┴──────────────────────────┘
-->