<template>
	<div class="image-item">
		<UseImage :src="api.host + image.url">
			<template #loading>
				<div class="load-box">
				</div>
			</template>

			<template #error>
				Failed
			</template>
		</UseImage>
	</div>
</template>

<script async setup>
import api from '/src/api/config/api.js';
import { UseImage } from '@vueuse/components'

const props = defineProps({
	image: {
		type: Object,
		required: true,
	}
});

</script>

<style scoped>
.image-item {
	width: 100%;
	transition: transform .2s linear;
	cursor: pointer;
	height: 220px;
	border-radius: 20px;
	overflow: hidden;
}

.image-item:hover {
	transform: scale(1.02);
}
.load-box {
	width: 100%;
	height: 100%;
	border-radius: 20px;
	animation: 1s shine linear infinite;
	background: linear-gradient(110deg, #1a161f 8%, #18141c 18%, #151218 33%);
	background-size: 200% 100%;
}
@keyframes shine {
	to {
		background-position-x: -200%;
	}
}

</style>