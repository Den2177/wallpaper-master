<template>
	<div class="images-list" v-if="images.length">
		<TransitionGroup name="list">
			<div class="image-item" v-for="image in images" :key="image.id" @click="$router.push(`/images/${image.id}`)">
				<img :src="api.host + image.url" alt="image">
			</div>
		</TransitionGroup>
	</div>
	<empty-message v-else props="images"></empty-message>
</template>

<script setup>
import EmptyMessage from "../templates/EmptyMessage.vue";
import api from '/src/api/config/api.js';

const props = defineProps({
	images: {
		type: Array,
		required: true,
	}
});

</script>

<style scoped>

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
	transition: opacity .1s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */

.images-list {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 10px;
}

.image-item {
	width: 100%;
	transition: transform .2s linear;
	cursor: pointer;
	height: 220px;
}

.image-item:hover {
	transform: scale(1.02);
}

.image-item img {
	border-radius: 20px;
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