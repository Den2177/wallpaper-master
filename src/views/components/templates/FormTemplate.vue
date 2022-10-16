<template>
	<form action="#" class="form card" @submit.prevent="$emit('submit')">
		<slot></slot>
	</form>
</template>

<script setup>
const event = defineEmits(['submit']);


</script>

<style scoped>
.form {
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
	margin: 0 auto;
	max-width: 430px;
}
</style>