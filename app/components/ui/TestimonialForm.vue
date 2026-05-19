<script setup lang="ts">
	import type { FormError, FormSubmitEvent } from '@nuxt/ui'

	const state = reactive({
		username: undefined,
		testimonial: undefined,
		ratingContact: undefined,
		ratingPayment: undefined,
		ratingFollowup: undefined,
		ratingEfficiency: undefined
	})

	type Schema = typeof state

	function validate(state: Partial<Schema>): FormError[] {
		const errors = []
		if (!state.username) errors.push({ name: 'username', message: 'required' })
		if (!state.testimonial) errors.push({ name: 'testimonial', message: 'required' })
		if (!state.ratingContact) errors.push({ name: 'ratingContact', message: 'required' })
		if (!state.ratingPayment) errors.push({ name: 'ratingPayment', message: 'required' })
		if (!state.ratingFollowup) errors.push({ name: 'ratingFollowup', message: 'required' })
		if (!state.ratingEfficiency) errors.push({ name: 'ratingEfficiency', message: 'required' })
		return errors
	}

	const toast = useToast()
	const loading = ref(false)
	const serverError = ref<string | null>(null)

	async function onSubmit(event: FormSubmitEvent<Schema>) {
		loading.value = true
		try {
			await $fetch('/api/testimonials', {
				method: 'POST',
				body: {
					username: event.data.username,
					testimonial: event.data.testimonial,
					ratingContact: event.data.ratingContact,
					ratingPayment: event.data.ratingPayment,
					ratingFollowup: event.data.ratingFollowup,
					ratingEfficiency: event.data.ratingEfficiency
				},
			})

			toast.add({
				title: 'Merci !',
				description: 'Votre témoignage a bien été envoyé.',
				color: 'success',
			})

			state.username = undefined
			state.testimonial = undefined
			state.ratingContact = undefined
			state.ratingPayment = undefined
			state.ratingFollowup = undefined
			state.ratingEfficiency = undefined
		} catch (e: any){
			toast.add({
				title: 'Erreur',
				description: "Une erreur est survenue. Veuillez réessayer.",
				color: 'error',
			})
			serverError.value = e?.data?.message ?? "Une erreur est survenue."
		} finally {
			loading.value = false
		}
	}
</script>

<template>
	<UForm :validate="validate" :state="state" @submit="onSubmit">
		<UFormField label="Nom" name="username" required>
			<UInput
				v-model="state.username"
				type="text"
				color="success"
				variant="outline"
				placeholder="Votre nom"
				class="w-full outline-none rounded-sm p-1 my-2"
			/>
		</UFormField>
		<UFormField label="Votre témoignage" name="testimonial" required>
			<UTextarea
				v-model="state.testimonial"
				:rows="5"
				autoresize
				placeholder="Partagez votre expérience..."
				variant="outline"
				class="w-full rounded-sm p-1 my-2"
			/>
		</UFormField>
		<UFormField label="Premier contact" name="ratingContact">
			<UInput
				v-model="state.ratingContact"
				type="number"
				color="success"
				variant="outline"
				placeholder="1-5"
				class="w-full outline-none rounded-sm p-1 my-2"
			/>
		</UFormField>
		<UFormField label="Facilité de paiement" name="ratingPayment">
			<UInput
				v-model="state.ratingPayment"
				type="number"
				color="success"
				variant="outline"
				placeholder="1-5"
				class="w-full outline-none rounded-sm p-1 my-2"
			/>
		</UFormField>
		<UFormField label="Suivi de dossier" name="ratingFollowup">
			<UInput
				v-model="state.ratingFollowup"
				type="number"
				color="success"
				variant="outline"
				placeholder="1-5"
				class="w-full outline-none rounded-sm p-1 my-2"
			/>
		</UFormField>
		<UFormField label="Rapidité et efficacité" name="ratingEfficiency">
			<UInput
				v-model="state.ratingEfficiency"
				type="number"
				color="success"
				variant="outline"
				placeholder="1-5"
				class="w-full outline-none rounded-sm p-1 my-2"
			/>
		</UFormField>
		<UButton
			type="submit"
			variant="outline"
			color="success"
			:loading="loading"
			:disabled="loading"
			class="rounded-md p-1 my-2"
		>
			Envoyer
		</UButton>
	</UForm>
	<p v-if="serverError" class="text-red-600 text-sm mt-2">
		{{ serverError }}
	</p>
</template>