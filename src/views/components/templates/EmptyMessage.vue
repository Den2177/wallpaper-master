<template>
<div class="card">
	<i class="grey">List of {{item}} is empty. </i>
</div>
</template>

<script setup>
const props = defineProps({
	item: {
		required: false,
		type: String,
		default: 'items',

	}
});
</script>

<style scoped>

</style>