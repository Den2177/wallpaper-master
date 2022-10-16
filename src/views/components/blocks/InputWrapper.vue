<template>
<div class="input-wrap">
		<div>{{hint}}:</div>
		<slot></slot>
</div>
</template>

<script setup>
const props = defineProps({
	hint: {
		type: String,
		required: true,
	}
})
</script>

<style scoped>
.input-wrap {
	display: flex;
	flex-direction: column;
	gap: 5px;
}
</style>