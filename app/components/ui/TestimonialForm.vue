<script setup lang="ts">
	import type { FormError, FormSubmitEvent } from '@nuxt/ui'

	const state = reactive({
		text: undefined,
		author: undefined,
		role: undefined,
	})

	type Schema = typeof state

	function validate(state: Partial<Schema>): FormError[] {
		const errors = []
		if (!state.text) errors.push({ name: 'text', message: 'required' })
		if (!state.author) errors.push({ name: 'author', message: 'required' })
		return errors
	}

	const toast = useToast()
	const loading = ref(false)

	async function onSubmit(event: FormSubmitEvent<Schema>) {
		loading.value = true
		try {
			await $fetch('/api/testimonials', {
				method: 'POST',
				body: {
					text: event.data.text,
					author: event.data.author,
					role: event.data.role ?? '',
				},
			})

			toast.add({
				title: 'Merci !',
				description: 'Votre témoignage a bien été envoyé.',
				color: 'success',
			})

			state.text = undefined
			state.author = undefined
			state.role = undefined
		} catch {
			toast.add({
				title: 'Erreur',
				description: "Une erreur est survenue. Veuillez réessayer.",
				color: 'error',
			})
		} finally {
			loading.value = false
		}
	}
</script>

<template>
	<UForm :validate="validate" :state="state" @submit="onSubmit">
		<UFormField label="Votre témoignage" name="text" required>
			<UTextarea
				v-model="state.text"
				:rows="5"
				autoresize
				placeholder="Partagez votre expérience..."
				class="w-full outline outline-solid rounded-sm p-1 my-2"
			/>
		</UFormField>
		<UFormField label="Nom" name="author" required>
			<UInput
				v-model="state.author"
				type="text"
				color="success"
				variant="outline"
				placeholder="Votre nom"
				class="w-full outline rounded-sm p-1 my-2"
			/>
		</UFormField>
		<UFormField label="Fonction / Entreprise" name="role">
			<UInput
				v-model="state.role"
				type="text"
				color="success"
				variant="outline"
				placeholder="ex: Directeur, Acme SA (optionnel)"
				class="w-full outline rounded-sm p-1 my-2"
			/>
		</UFormField>
		<UButton
			type="submit"
			variant="outline"
			color="success"
			:loading="loading"
			:disabled="loading"
			class="outline outline-solid rounded-md p-1 my-2"
		>
			Envoyer
		</UButton>
	</UForm>
</template>