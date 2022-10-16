<template>
	<div class="tag" style="background: #6349d9;">
		{{tag.name}}
	</div>
</template>

<script setup>
const props = defineProps({
	tag: {
		required: true,
		type: Object,
	}
})
</script>

<style scoped>
.tag {
	background-color: #6f4fff;
	color: #fff;
	border-radius: 4px;
	cursor: pointer;
	padding: 5px 10px;
	word-break: break-word;
}
</style>