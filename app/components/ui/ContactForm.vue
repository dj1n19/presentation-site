<script setup lang="ts">

	import type { FormError, FormSubmitEvent } from '@nuxt/ui'

	const state = reactive({
		firstName: undefined,
		lastName: undefined,
		email: undefined,
		phone: undefined,
		message: undefined,
	})

	type Schema = typeof state

	function validate(state: Partial<Schema>): FormError[] {
		const errors = []
		if (!state.firstName) errors.push({ name: 'firstName', message: 'required'})
		if (!state.lastName) errors.push({ name: 'lastName', message: 'required'})
		if (!state.email) errors.push({ name: 'email', message: 'required'})
		if (!state.phone) errors.push({ name: 'phone', message: 'required'})
		if (!state.message) errors.push({ name: 'message', message: 'required'})

		return errors
	}

	const toast = useToast()
	const loading = ref(false)

	async function onSubmit(event: FormSubmitEvent<Schema>) {
		loading.value = true
		try {
			await $fetch('/api/messages', {
				method: 'POST',
				body: {
					firstName: event.data.firstName,
					lastName: event.data.lastName,
					email: event.data.email,
					phone: event.data.phone,
					message: event.data.message
				}
			})
			
			toast.add({ 
				title: "Merci !",
				description: "Votre message a bien été envoyé.",
				color: "success"
			})
		
			state.firstName = undefined
			state.lastName = undefined
			state.email = undefined
			state.phone = undefined
			state.message = undefined
		} catch {
			console.log('MAIS !')
			toast.add({
				open: false,
				title: 'Erreur',
				description: 'Une erreur est survenue. Veuillez réessayer.',
				color: 'error'
			})
		} finally {
			loading.value = false
		}
		
		console.log(event.data)
	}

</script>

<template>
	<UForm :validate="validate" :state="state" @submit="onSubmit">
		<UFormField label="Prenom" name="firstName" required>
			<UInput v-model="state.firstName"
					type="text" 
					color="success" 
					variant="outline" 
					placeholder="Your first name" 
					class="w-full outline-none rounded-sm p-1 my-2"/>
		</UFormField>
		<UFormField label="Nom" name="lastName" required>
			<UInput v-model="state.lastName"
					type="text" 
					color="success" 
					variant="outline" 
					placeholder="Your last name" 
					class="w-full outline-none rounded-sm p-1 my-2"/>
		</UFormField>
		<UFormField label="Email" name="email" required>
			<UInput v-model="state.email" 
					type="email" 
					color="success" 
					variant="outline" 
					placeholder="Your email" 
					class="w-full outline-none rounded-sm p-1 my-2 focus:outline-2 focus:outline-blue-500"/>
		</UFormField>
		<UFormField label="Phone" name="phone" required>
			<UInput v-model="state.phone" 
					type="text" 
					color="success" 
					variant="outline" 
					placeholder="Your phone" 
					class="w-full outline-none rounded-sm p-1 my-2 focus:outline-2 focus:outline-blue-500"/>
		</UFormField>
		<UFormField label="Message" name="message" required>
			<UTextarea 	v-model="state.message" 
						:rows="10" 
						autoresize 
						variant="outline"
						placeholder="Your message"
						class="w-full rounded-sm p-1 my-2"/>
		</UFormField>
		<UButton 	type="submit" 
					variant="outline" 
					color="success"
					:loading="loading"
					:disabled="loading"
					class="rounded-md p-1 my-2">
			Submit
		</UButton>
	</UForm>
</template>