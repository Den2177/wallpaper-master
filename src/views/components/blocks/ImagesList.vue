<template>
	<div>
		<div class="images-list" v-if="images.length">
			<TransitionGroup name="list">
				<image-item v-for="image in images" :image="image" @click="$router.push(`/images/${image.id}`)" :key="image.id"></image-item>
			</TransitionGroup>
		</div>
		<empty-message v-else props="images"></empty-message>
	</div>
</template>

<script setup>
import EmptyMessage from "../templates/EmptyMessage.vue";
import ImageItem from "./ImageItem.vue";

const props = defineProps({
	images: {
		type: Array,
		required: true,
	}
});

const emit = defineEmits({});

</script>

<style scoped>

.list-move,
.list-enter-active,
.list-leave-active {
	transition: opacity .1s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
}

.images-list {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 10px;
}

@media (max-width: 950px) {
	.images-list {
		grid-template-columns: 1fr 1fr;
	}
}

@media (max-width: 560px) {
	.images-list {
		grid-template-columns: 1fr;
	}

	.image-item {
		height: 200px;
	}
}

</style>