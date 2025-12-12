<script setup lang="ts">

	import type { FormError, FormSubmitEvent } from '@nuxt/ui'

	const state = reactive({
		name: undefined,
		email: undefined,
		message: undefined,
	})

	type Schema = typeof state

	function validate(state: Partial<Schema>): FormError[] {
		const errors = []
		if (!state.name) errors.push({ name: 'name', message: 'required'})
		if (!state.email) errors.push({ name: 'email', message: 'required'})
		if (!state.message) errors.push({ name: 'message', message: 'required'})

		return errors
	}

	const toast = useToast()
	async function onSubmit(event: FormSubmitEvent<Schema>) {
		toast.add({ title: "Success", description: "The form has been submitted.", color: "success"})
		console.log(event.data)
	}

</script>

<template>
	<UForm :validate="validate" :state="state" @submit="onSubmit">
		<UFormField label="Nom" name="name" required>
			<UInput v-model="state.name" type="text" color="success" variant="none" placeholder="Your name" class="outline outline-solid rounded-sm p-1 my-2"/>
		</UFormField>
		<UFormField label="Email" name="email" required>
			<UInput v-model="state.email" type="email" placeholder="Your email" class="outline outline-solid rounded-sm p-1 my-2"/>
		</UFormField>
		<UFormField label="Message" name="message" required>
			<UInput v-model="state.message" type="text" size="xl" placeholder="Your message" class="outline outline-solid rounded-sm p-1 my-2"/>
		</UFormField>
		<UButton type="submit" variant="outline" color="success" class="outline outline-solid rounded-md p-1 my-2">
			Submit
		</UButton>
	</UForm>
</template>