<template>
	<div class="tag-list">
		<tag-item v-for="tag in tags" :tag="tag"></tag-item>
	</div>
</template>

<script setup>
import TagItem from "./TagItem.vue";
const props = defineProps({
	tags: {
		type: Array,
		required: true,
	}
});
</script>

<style scoped>

.tag-list {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 6px;
	width: 100%;
}


</style>