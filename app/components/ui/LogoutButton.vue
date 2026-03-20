<script lang="ts" setup>
	const router = useRouter()
	const toast = useToast()

	async function logout() {
		try {
			await $fetch('/api/auth/logout', {
				method: 'POST'
			})
			await router.push('/');
		}
		catch (e: any) {
			toast.add({
				title: 'Erreur',
				description: e?.data?.message ?? 'Logout failed',
				color: 'error'
			})
		}
	}
</script>

<template>
    <UButton @click="logout">Logout</UButton>
</template>