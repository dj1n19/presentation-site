<template>
	<section class="py-20 bg-gray-50 border-b border-gray-100" id="testimonials">
		<div class="container mx-auto px-4 max-w-6xl">

			<!-- Section Header -->
			<div class="text-center mb-14">
				<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
					Témoignages
				</h2>
				<p class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
					Ce que disent nos clients de notre accompagnement administratif.
				</p>
			</div>

			<!-- Loading state -->
			<div v-if="pending" class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div
					v-for="n in 3"
					:key="n"
					class="bg-white rounded-xl p-8 border border-gray-100 animate-pulse"
				>
					<div class="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
					<div class="h-4 bg-gray-200 rounded mb-3 w-full"></div>
					<div class="h-4 bg-gray-200 rounded mb-6 w-2/3"></div>
					<div class="flex items-center gap-3 mt-4">
						<div class="w-10 h-10 rounded-full bg-gray-200"></div>
						<div class="flex-1">
							<div class="h-3 bg-gray-200 rounded mb-2 w-1/2"></div>
							<div class="h-3 bg-gray-200 rounded w-1/3"></div>
						</div>
					</div>
				</div>
			</div>

			<!-- Error state -->
			<div v-else-if="error" class="text-center text-gray-500 py-8">
				<UIcon name="i-heroicons-exclamation-triangle" class="w-8 h-8 mx-auto mb-2 text-gray-400" />
				<p>Impossible de charger les témoignages.</p>
			</div>

			<!-- Empty state -->
			<div v-else-if="!testimonials?.length" class="text-center text-gray-500 py-8">
				<p>Aucun témoignage pour le moment.</p>
			</div>

			<!-- Testimonials Grid -->
			<div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div
					v-for="testimonial in testimonials"
					:key="testimonial.id"
					class="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300"
				>
					<!-- Quote Icon -->
					<div class="text-gray-300">
						<UIcon name="i-heroicons-chat-bubble-left-right" class="w-8 h-8" />
					</div>

					<!-- Quote Text -->
					<p class="text-gray-600 leading-relaxed italic flex-grow">
						"{{ testimonial.text }}"
					</p>

					<!-- Divider -->
					<hr class="border-gray-100" />

					<!-- Author -->
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
							<span class="text-sm font-semibold text-gray-500">
								{{ testimonial.author.charAt(0).toUpperCase() }}
							</span>
						</div>
						<div>
							<p class="font-semibold text-gray-900 text-sm">{{ testimonial.author }}</p>
							<p v-if="testimonial.role" class="text-gray-500 text-xs">{{ testimonial.role }}</p>
						</div>
					</div>
				</div>
			</div>

		</div>
	</section>
</template>

<script setup lang="ts">
interface Testimonial {
  id: number
  text: string
  author: string
  role: string
  created_at: string
}

const { data: testimonials, pending, error } = await useFetch<Testimonial[]>('/api/testimonials')
</script>