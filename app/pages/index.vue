<template>
	<div class="min-h-screen" style="font-family: 'Lato', sans-serif; background-color: #FAF7F0;">

		<!-- ══════════════════════════════════════════════
		     NAV BAR
		════════════════════════════════════════════════ -->
		<nav class="sticky top-0 z-50 border-b border-amber-200/60 bg-[#FAF7F0]/90 backdrop-blur-sm">
			<div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
				<!-- Logo / brand -->
				<span style="font-family: 'Playfair Display', serif;"
					class="text-xl font-bold tracking-wide text-[#4A5E3A]">
					Gestion Administrative
				</span>
				<!-- Nav links + auth buttons -->
				<div class="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase text-[#6B7F5E]">
					<a href="#about"        class="hover:text-[#C9A45C] transition-colors duration-200">À propos</a>
					<a href="#services"     class="hover:text-[#C9A45C] transition-colors duration-200">Services</a>
					<a href="#testimonials" class="hover:text-[#C9A45C] transition-colors duration-200">Témoignages</a>
					<a href="#contact"      class="hover:text-[#C9A45C] transition-colors duration-200">Contact</a>

					<!-- Thin vertical separator -->
					<div class="h-4 w-px bg-[#C9A45C]/30"></div>

					<!-- Se connecter — outline -->
					<NuxtLink to="/auth/login"
						class="px-4 py-1.5 rounded-sm border border-[#6B7F5E] text-[#4A5E3A]
						       hover:border-[#C9A45C] hover:text-[#C9A45C]
						       transition-colors duration-200 normal-case tracking-normal font-medium">
						Se connecter
					</NuxtLink>

					<!-- S'inscrire — filled -->
					<NuxtLink to="/auth/register"
						class="px-4 py-1.5 rounded-sm bg-[#4A5E3A] text-[#FAF7F0]
						       hover:bg-[#3A4D2C] transition-colors duration-200
						       normal-case tracking-normal font-medium">
						S'inscrire
					</NuxtLink>
				</div>

				<!-- Mobile: hamburger placeholder + auth icon buttons -->
				<div class="flex md:hidden items-center gap-3">
					<NuxtLink to="/auth/login"
						class="text-xs px-3 py-1.5 border border-[#6B7F5E] rounded-sm text-[#4A5E3A]
						       hover:border-[#C9A45C] hover:text-[#C9A45C] transition-colors duration-200">
						Connexion
					</NuxtLink>
					<NuxtLink to="/auth/register"
						class="text-xs px-3 py-1.5 bg-[#4A5E3A] text-[#FAF7F0] rounded-sm
						       hover:bg-[#3A4D2C] transition-colors duration-200">
						Inscription
					</NuxtLink>
				</div>
			</div>
		</nav>


		<!-- ══════════════════════════════════════════════
		     HERO
		════════════════════════════════════════════════ -->
		<section id="hero" class="relative overflow-hidden">

			<!-- Subtle background pattern — dots grid -->
			<div class="absolute inset-0 opacity-[0.04]"
				style="background-image: radial-gradient(#4A5E3A 1px, transparent 1px); background-size: 28px 28px;">
			</div>

			<!-- Decorative corner flourish top-right -->
			<div class="absolute top-0 right-0 w-72 h-72 opacity-10 pointer-events-none"
				style="background: radial-gradient(circle at top right, #C9A45C 0%, transparent 70%);">
			</div>
			<!-- Decorative corner flourish bottom-left -->
			<div class="absolute bottom-0 left-0 w-72 h-72 opacity-10 pointer-events-none"
				style="background: radial-gradient(circle at bottom left, #6B7F5E 0%, transparent 70%);">
			</div>

			<div class="relative max-w-6xl mx-auto px-6 py-24 md:py-36
			            grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

				<!-- LEFT: text content -->
				<div>
					<!-- Overline label -->
					<div class="flex items-center gap-3 mb-6">
						<div class="h-px w-10 bg-[#C9A45C]"></div>
						<span class="text-xs uppercase tracking-[0.2em] text-[#C9A45C] font-semibold">
							Gestionnaire administrative
						</span>
					</div>

					<!-- Main heading -->
					<h1 style="font-family: 'Playfair Display', serif;"
						class="text-4xl md:text-6xl font-bold leading-tight text-[#2C3A20] mb-6">
						[Your Name]
					</h1>

					<!-- Sub-heading -->
					<p style="font-family: 'Playfair Display', serif;"
						class="text-xl md:text-2xl italic text-[#6B7F5E] mb-6">
						Professional Administrative Manager
					</p>

					<!-- Ornamental divider -->
					<div class="flex items-center gap-3 mb-6">
						<div class="h-px flex-1 bg-gradient-to-r from-[#C9A45C]/60 to-transparent"></div>
						<span class="text-[#C9A45C] text-lg">❧</span>
						<div class="h-px flex-1 bg-gradient-to-l from-[#C9A45C]/60 to-transparent"></div>
					</div>

					<!-- Description -->
					<p class="text-base text-[#5A6B50] leading-relaxed mb-10 max-w-md">
						[Brief tagline about your expertise — e.g., "Accompagnement administratif
						personnalisé, avec rigueur et bienveillance, pour simplifier vos démarches
						du quotidien."]
					</p>

					<!-- CTAs -->
					<div class="flex flex-wrap gap-4">
						<a href="#about"
							class="inline-flex items-center gap-2 px-6 py-3 rounded-sm
							       border border-[#6B7F5E] text-[#4A5E3A] text-sm tracking-wide uppercase
							       hover:bg-[#6B7F5E] hover:text-white transition-all duration-200">
							À propos
						</a>
						<a href="#contact"
							class="inline-flex items-center gap-2 px-6 py-3 rounded-sm
							       bg-[#4A5E3A] text-[#FAF7F0] text-sm tracking-wide uppercase
							       hover:bg-[#3A4D2C] transition-all duration-200">
							Me contacter
						</a>
					</div>
				</div>

				<!-- RIGHT: portrait -->
				<div class="flex justify-center md:justify-end">
					<div class="relative">
						<!-- Gold border frame, slightly offset -->
						<div class="absolute -inset-3 rounded-full border border-[#C9A45C]/40"></div>
						<div class="absolute -inset-6 rounded-full border border-[#C9A45C]/15"></div>

						<div class="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden
						            ring-4 ring-[#C9A45C]/50 ring-offset-4 ring-offset-[#FAF7F0]">
							<img
								class="w-full h-full object-cover"
								src="~/assets/images/princesse.jpg"
								alt="Photo de profil"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>


		<!-- ══════════════════════════════════════════════
		     SECTION DIVIDER — ornamental
		════════════════════════════════════════════════ -->
		<div class="flex items-center gap-4 max-w-2xl mx-auto px-6 py-2">
			<div class="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A45C]/40 to-transparent"></div>
			<span style="font-family: 'Playfair Display', serif;"
				class="text-[#C9A45C]/70 text-xl tracking-widest">✦ ✦ ✦</span>
			<div class="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A45C]/40 to-transparent"></div>
		</div>


		<!-- ══════════════════════════════════════════════
		     ABOUT
		════════════════════════════════════════════════ -->
		<section id="about" class="py-24 bg-[#F3F0E8]">
			<div class="max-w-6xl mx-auto px-6">

				<!-- Section header -->
				<div class="text-center mb-16">
					<p class="text-xs uppercase tracking-[0.25em] text-[#C9A45C] font-semibold mb-3">
						Qui suis-je
					</p>
					<h2 style="font-family: 'Playfair Display', serif;"
						class="text-3xl md:text-4xl font-bold text-[#2C3A20] mb-4">
						À propos
					</h2>
					<div class="flex items-center justify-center gap-3 mb-6">
						<div class="h-px w-16 bg-[#C9A45C]/50"></div>
						<span class="text-[#C9A45C]">❧</span>
						<div class="h-px w-16 bg-[#C9A45C]/50"></div>
					</div>
					<p class="text-[#5A6B50] text-base leading-relaxed max-w-2xl mx-auto">
						[Brief introduction paragraph about your background, experience, and approach
						to administrative management. Highlight what makes you unique and the value
						you bring to those you assist.]
					</p>
				</div>

				<!-- Strengths grid -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div v-for="strength in strengths" :key="strength.title"
						class="text-center p-8 bg-[#FAF7F0] border border-[#C9A45C]/20 rounded-sm
						       hover:border-[#C9A45C]/60 hover:shadow-md transition-all duration-300">

						<!-- Icon circle with gold ring -->
						<div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5
						            bg-[#F3F0E8] ring-1 ring-[#C9A45C]/40">
							<UIcon :name="strength.icon" class="w-7 h-7 text-[#6B7F5E]" />
						</div>

						<h3 style="font-family: 'Playfair Display', serif;"
							class="text-lg font-bold text-[#2C3A20] mb-3">
							{{ strength.title }}
						</h3>
						<p class="text-sm text-[#6B7F5E] leading-relaxed">
							{{ strength.description }}
						</p>
					</div>
				</div>
			</div>
		</section>


		<!-- Section divider -->
		<div class="flex items-center gap-4 max-w-2xl mx-auto px-6 py-2">
			<div class="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A45C]/40 to-transparent"></div>
			<span style="font-family: 'Playfair Display', serif;"
				class="text-[#C9A45C]/70 text-xl tracking-widest">✦ ✦ ✦</span>
			<div class="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A45C]/40 to-transparent"></div>
		</div>


		<!-- ══════════════════════════════════════════════
		     SERVICES
		════════════════════════════════════════════════ -->
		<section id="services" class="py-24">
			<div class="max-w-6xl mx-auto px-6">

				<!-- Section header -->
				<div class="text-center mb-16">
					<p class="text-xs uppercase tracking-[0.25em] text-[#C9A45C] font-semibold mb-3">
						Ce que je propose
					</p>
					<h2 style="font-family: 'Playfair Display', serif;"
						class="text-3xl md:text-4xl font-bold text-[#2C3A20] mb-4">
						Services
					</h2>
					<div class="flex items-center justify-center gap-3 mb-6">
						<div class="h-px w-16 bg-[#C9A45C]/50"></div>
						<span class="text-[#C9A45C]">❧</span>
						<div class="h-px w-16 bg-[#C9A45C]/50"></div>
					</div>
					<p class="text-[#5A6B50] text-base max-w-xl mx-auto leading-relaxed">
						Un accompagnement humain et professionnel pour chacune de vos démarches administratives.
					</p>
				</div>

				<!-- Services grid -->
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
					<div v-for="service in services" :key="service.title"
						class="group p-7 bg-[#FAF7F0] border border-[#C9A45C]/20 rounded-sm
						       hover:border-[#6B7F5E]/50 hover:bg-[#F3F0E8]
						       transition-all duration-300 cursor-default">

						<!-- Top row: icon + title -->
						<div class="flex items-start gap-4 mb-4">
							<div class="shrink-0 w-10 h-10 rounded-sm flex items-center justify-center
							            bg-[#6B7F5E]/10 border border-[#6B7F5E]/25
							            group-hover:bg-[#6B7F5E]/20 transition-colors duration-200">
								<UIcon :name="service.icon" class="w-5 h-5 text-[#4A5E3A]" />
							</div>
							<h3 style="font-family: 'Playfair Display', serif;"
								class="text-base font-bold text-[#2C3A20] leading-snug pt-1">
								{{ service.title }}
							</h3>
						</div>

						<!-- Thin gold accent line -->
						<div class="h-px w-10 bg-[#C9A45C]/50 mb-4
						            group-hover:w-full transition-all duration-500"></div>

						<p class="text-sm text-[#6B7F5E] leading-relaxed">
							{{ service.description }}
						</p>
					</div>
				</div>

				<!-- Disclaimer box — parchment style -->
				<div class="border border-[#C9A45C]/30 bg-[#F8F4E8] rounded-sm p-8 max-w-3xl mx-auto">
					<div class="flex items-center gap-3 mb-4">
						<div class="h-px flex-1 bg-[#C9A45C]/30"></div>
						<h3 style="font-family: 'Playfair Display', serif;"
							class="text-lg font-bold text-[#4A5E3A] italic">
							Avertissement important
						</h3>
						<div class="h-px flex-1 bg-[#C9A45C]/30"></div>
					</div>

					<p class="text-sm text-[#5A6B50] leading-relaxed mb-3">
						Le service de gestion administrative proposé est un service d'assistance et
						d'accompagnement administratif destiné aux particuliers. Le ou la gestionnaire
						administratif·ve n'est pas avocat·e, notaire, huissier de justice ou conseiller
						juridique agréé.
					</p>
					<p class="text-sm text-[#5A6B50] leading-relaxed mb-2">À ce titre :</p>
					<ul class="text-sm text-[#5A6B50] leading-relaxed list-none space-y-1 mb-3 pl-4">
						<li class="flex items-start gap-2">
							<span class="text-[#C9A45C] mt-0.5 shrink-0">›</span>
							aucun conseil juridique personnalisé ou avis légal ne peut être fourni
						</li>
						<li class="flex items-start gap-2">
							<span class="text-[#C9A45C] mt-0.5 shrink-0">›</span>
							aucune représentation juridique devant les tribunaux n'est assurée
						</li>
						<li class="flex items-start gap-2">
							<span class="text-[#C9A45C] mt-0.5 shrink-0">›</span>
							aucune interprétation officielle des lois ou règlements ne peut être donnée
						</li>
					</ul>
					<p class="text-sm text-[#5A6B50] leading-relaxed">
						En cas de litige juridique complexe, il est recommandé de faire appel à un
						avocat ou à un professionnel du droit compétent.
					</p>
				</div>
			</div>
		</section>


		<!-- Section divider -->
		<div class="flex items-center gap-4 max-w-2xl mx-auto px-6 py-2">
			<div class="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A45C]/40 to-transparent"></div>
			<span style="font-family: 'Playfair Display', serif;"
				class="text-[#C9A45C]/70 text-xl tracking-widest">✦ ✦ ✦</span>
			<div class="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A45C]/40 to-transparent"></div>
		</div>


		<!-- ══════════════════════════════════════════════
		     TESTIMONIALS (dynamic from DB)
		════════════════════════════════════════════════ -->
		<section id="testimonials" class="py-24 bg-[#F3F0E8]">
			<div class="max-w-6xl mx-auto px-6">

				<div class="text-center mb-16">
					<p class="text-xs uppercase tracking-[0.25em] text-[#C9A45C] font-semibold mb-3">
						Ils témoignent
					</p>
					<h2 style="font-family: 'Playfair Display', serif;"
						class="text-3xl md:text-4xl font-bold text-[#2C3A20] mb-4">
						Témoignages
					</h2>
					<div class="flex items-center justify-center gap-3">
						<div class="h-px w-16 bg-[#C9A45C]/50"></div>
						<span class="text-[#C9A45C]">❧</span>
						<div class="h-px w-16 bg-[#C9A45C]/50"></div>
					</div>
				</div>

				<!-- Loading skeletons -->
				<div v-if="testimonialsPending" class="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div v-for="n in 3" :key="n"
						class="bg-[#FAF7F0] border border-[#C9A45C]/15 rounded-sm p-7 animate-pulse">
						<div class="h-3 bg-[#C9A45C]/10 rounded mb-3 w-3/4"></div>
						<div class="h-3 bg-[#C9A45C]/10 rounded mb-3 w-full"></div>
						<div class="h-3 bg-[#C9A45C]/10 rounded mb-6 w-2/3"></div>
						<div class="flex items-center gap-3 mt-4">
							<div class="w-10 h-10 rounded-full bg-[#C9A45C]/10"></div>
							<div class="flex-1 space-y-2">
								<div class="h-2.5 bg-[#C9A45C]/10 rounded w-1/2"></div>
								<div class="h-2.5 bg-[#C9A45C]/10 rounded w-1/3"></div>
							</div>
						</div>
					</div>
				</div>

				<!-- Error -->
				<div v-else-if="testimonialsError" class="text-center text-[#6B7F5E] py-8">
					<p>Impossible de charger les témoignages.</p>
				</div>

				<!-- Empty -->
				<div v-else-if="!approvedTestimonials?.length" class="text-center text-[#6B7F5E] py-8">
					<p class="italic">Aucun témoignage pour le moment.</p>
				</div>

				<!-- Cards -->
				<div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div v-for="t in approvedTestimonials" :key="t.id"
						class="bg-[#FAF7F0] border border-[#C9A45C]/20 rounded-sm p-7
						       flex flex-col hover:border-[#C9A45C]/50
						       hover:shadow-md transition-all duration-300">

						<!-- Opening quote mark -->
						<div style="font-family: 'Playfair Display', serif;"
							class="text-5xl leading-none text-[#C9A45C]/25 mb-2 -mt-2">
							"
						</div>

						<!-- Quote text -->
						<p class="text-sm text-[#5A6B50] leading-relaxed italic flex-grow mb-5">
							{{ t.testimonial }}
						</p>

						<!-- Divider -->
						<div class="h-px bg-[#C9A45C]/20 mb-4"></div>

						<!-- Author -->
						<div class="flex items-center gap-3">
							<div class="w-9 h-9 rounded-full bg-[#6B7F5E]/15 border border-[#C9A45C]/25
							            flex items-center justify-center shrink-0">
								<span class="text-sm font-semibold text-[#4A5E3A]">
									{{ t.username.charAt(0).toUpperCase() }}
								</span>
							</div>
							<div>
								<p class="text-sm font-semibold text-[#2C3A20]">{{ t.username }}</p>
								<p v-if="t.role" class="text-xs text-[#8A9B80]">{{ t.role }}</p>
							</div>
						</div>
					</div>
				</div>

			</div>
		</section>


		<!-- Section divider -->
		<div class="flex items-center gap-4 max-w-2xl mx-auto px-6 py-2">
			<div class="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A45C]/40 to-transparent"></div>
			<span style="font-family: 'Playfair Display', serif;"
				class="text-[#C9A45C]/70 text-xl tracking-widest">✦ ✦ ✦</span>
			<div class="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A45C]/40 to-transparent"></div>
		</div>


		<!-- ══════════════════════════════════════════════
		     CONTACT
		════════════════════════════════════════════════ -->
		<section id="contact" class="py-24">
			<div class="max-w-6xl mx-auto px-6">

				<div class="text-center mb-16">
					<p class="text-xs uppercase tracking-[0.25em] text-[#C9A45C] font-semibold mb-3">
						Prenez contact
					</p>
					<h2 style="font-family: 'Playfair Display', serif;"
						class="text-3xl md:text-4xl font-bold text-[#2C3A20] mb-4">
						Contact
					</h2>
					<div class="flex items-center justify-center gap-3">
						<div class="h-px w-16 bg-[#C9A45C]/50"></div>
						<span class="text-[#C9A45C]">❧</span>
						<div class="h-px w-16 bg-[#C9A45C]/50"></div>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-4xl mx-auto">

					<!-- Left: contact info -->
					<div class="space-y-6">
						<div v-for="info in contactInfos" :key="info.label"
							class="flex items-start gap-4 p-5
							       border border-[#C9A45C]/20 bg-[#FAF7F0] rounded-sm">
							<div class="w-9 h-9 shrink-0 flex items-center justify-center
							            bg-[#6B7F5E]/10 border border-[#6B7F5E]/25 rounded-sm">
								<UIcon :name="info.icon" class="w-4 h-4 text-[#4A5E3A]" />
							</div>
							<div>
								<p class="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-0.5">
									{{ info.label }}
								</p>
								<p class="text-sm text-[#4A5E3A] font-medium">{{ info.value }}</p>
							</div>
						</div>
					</div>

					<!-- Right: contact form -->
					<div class="border border-[#C9A45C]/20 bg-[#FAF7F0] rounded-sm p-8">
						<UiContactForm />
					</div>
				</div>
			</div>
		</section>


		<!-- Section divider -->
		<div class="flex items-center gap-4 max-w-2xl mx-auto px-6 py-2">
			<div class="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A45C]/40 to-transparent"></div>
			<span style="font-family: 'Playfair Display', serif;"
				class="text-[#C9A45C]/70 text-xl tracking-widest">✦ ✦ ✦</span>
			<div class="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A45C]/40 to-transparent"></div>
		</div>


		<!-- ══════════════════════════════════════════════
		     TESTIMONIAL FORM
		════════════════════════════════════════════════ -->
		<section id="testimonial" class="py-24 bg-[#F3F0E8]">
			<div class="max-w-2xl mx-auto px-6">

				<div class="text-center mb-12">
					<p class="text-xs uppercase tracking-[0.25em] text-[#C9A45C] font-semibold mb-3">
						Votre avis compte
					</p>
					<h2 style="font-family: 'Playfair Display', serif;"
						class="text-3xl font-bold text-[#2C3A20] mb-4">
						Laisser un témoignage
					</h2>
					<div class="flex items-center justify-center gap-3 mb-6">
						<div class="h-px w-16 bg-[#C9A45C]/50"></div>
						<span class="text-[#C9A45C]">❧</span>
						<div class="h-px w-16 bg-[#C9A45C]/50"></div>
					</div>
					<p class="text-sm text-[#6B7F5E] leading-relaxed">
						Partagez votre expérience. Votre témoignage sera examiné avant publication.
					</p>
				</div>

				<div class="border border-[#C9A45C]/20 bg-[#FAF7F0] rounded-sm p-8">
					<UiTestimonialForm />
				</div>
			</div>
		</section>


		<!-- ══════════════════════════════════════════════
		     FOOTER
		════════════════════════════════════════════════ -->
		<footer class="bg-[#2C3A20] text-[#A8B89A]">

			<!-- Main footer content -->
			<div class="max-w-6xl mx-auto px-6 py-16
			            grid grid-cols-1 md:grid-cols-3 gap-10">

				<!-- Brand column -->
				<div>
					<div class="flex items-center gap-3 mb-4">
						<div class="h-px w-8 bg-[#C9A45C]/60"></div>
						<span style="font-family: 'Playfair Display', serif;"
							class="text-lg font-bold text-[#EDE8DE] tracking-wide">
							Gestion Administrative
						</span>
					</div>
					<p class="text-sm leading-relaxed text-[#8A9B80]">
						Accompagnement administratif professionnel et bienveillant pour particuliers en Belgique.
					</p>
				</div>

				<!-- Sitemap -->
				<div>
					<p class="text-xs uppercase tracking-[0.2em] text-[#C9A45C] font-semibold mb-4">
						Navigation
					</p>
					<ul class="space-y-2 text-sm">
						<li><a href="#about"    class="hover:text-[#C9A45C] transition-colors duration-150">À propos</a></li>
						<li><a href="#services" class="hover:text-[#C9A45C] transition-colors duration-150">Services</a></li>
						<li><a href="#contact"  class="hover:text-[#C9A45C] transition-colors duration-150">Contact</a></li>
					</ul>
				</div>

				<!-- Legal -->
				<div>
					<p class="text-xs uppercase tracking-[0.2em] text-[#C9A45C] font-semibold mb-4">
						Légal
					</p>
					<ul class="space-y-2 text-sm">
						<li>
							<NuxtLink to="/cookies-policy"
								class="hover:text-[#C9A45C] transition-colors duration-150">
								Politique des cookies
							</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/privacy-policy"
								class="hover:text-[#C9A45C] transition-colors duration-150">
								Politique de confidentialité
							</NuxtLink>
						</li>
					</ul>
				</div>
			</div>

			<!-- Bottom bar -->
			<div class="border-t border-white/[0.06]">
				<div class="max-w-6xl mx-auto px-6 py-5
				            flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#5A6B50]">
					<span>© {{ new Date().getFullYear() }} — Gestion Administrative Professionnelle</span>
					<div class="flex items-center gap-3">
						<span class="text-[#C9A45C]/30">✦</span>
						<span>Belgique</span>
					</div>
				</div>
			</div>
		</footer>

	</div>
</template>

<script setup>
// ── SEO ──────────────────────────────────────────────────────────────────────
useHead({
	title: 'Accueil | Gestion Administrative Professionnelle',
	meta: [
		{
			name: 'description',
			content: 'Accompagnement administratif professionnel et bienveillant pour particuliers en Belgique.'
		}
	],
	link: [
		{
			rel: 'preconnect',
			href: 'https://fonts.googleapis.com'
		},
		{
			rel: 'preconnect',
			href: 'https://fonts.gstatic.com',
			crossorigin: ''
		},
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,400;1,700&family=Lato:wght@300;400;700&display=swap'
		}
	]
})

// ── Testimonials (from DB, approved only) ────────────────────────────────────
// The existing API already filters to approved-only for non-admin users.
const {
	data: rawTestimonials,
	pending: testimonialsPending,
	error: testimonialsError
} = await useFetch('/api/testimonials')

// The API returns approved testimonials for anonymous visitors.
// We alias to make the template readable.
const approvedTestimonials = rawTestimonials

// ── Strengths ─────────────────────────────────────────────────────────────────
const strengths = [
	{
		icon: 'i-heroicons-chart-bar',
		title: 'Rigueur & Organisation',
		description: '[Description de vos capacités en planification et organisation stratégique.]'
	},
	{
		icon: 'i-heroicons-users',
		title: 'Écoute & Bienveillance',
		description: '[Description de votre approche humaine et de votre sens du service.]'
	},
	{
		icon: 'i-heroicons-cog',
		title: 'Expertise Administrative',
		description: '[Description de votre maîtrise des démarches et procédures administratives.]'
	}
]

// ── Services ──────────────────────────────────────────────────────────────────
const services = [
	{
		icon: 'i-heroicons-building-library',
		title: 'Démarches auprès des services publics',
		description: 'Accompagnement dans les démarches communales, fiscales, sociales ou liées à l\'emploi.'
	},
	{
		icon: 'i-heroicons-calendar',
		title: 'Accompagnement des personnes vulnérables',
		description: 'Soutien administratif pour les personnes âgées, isolées ou en situation de précarité.'
	},
	{
		icon: 'i-heroicons-document-text',
		title: 'Rédaction de courriers officiels',
		description: 'Rédaction de lettres, contestations, demandes ou réclamations auprès des administrations.'
	},
	{
		icon: 'i-heroicons-user-group',
		title: 'Relations avec les propriétaires',
		description: 'Assistance dans les échanges administratifs liés au logement (baux, courriers, etc.).'
	},
	{
		icon: 'i-heroicons-clipboard-document-list',
		title: 'Assistance administrative générale',
		description: 'Aide ponctuelle ou régulière pour comprendre et transmettre des documents administratifs.'
	},
	{
		icon: 'i-heroicons-light-bulb',
		title: 'Conseil & Orientation',
		description: 'Orientation vers les organismes compétents et explication des droits et démarches possibles.'
	}
]

// ── Contact infos ─────────────────────────────────────────────────────────────
const contactInfos = [
	{ icon: 'i-heroicons-envelope', label: 'Email',  value: 'e.mail@domain.ext' },
	{ icon: 'i-heroicons-phone',    label: 'Téléphone', value: '0456/12.34.56' },
	{ icon: 'i-heroicons-currency-euro', label: 'Tarif', value: '10 € / heure' },
]
</script>