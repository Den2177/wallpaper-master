<template>
	<div class="like-wrapper" :class="{disabled: isDisable}">
		<svg class="like-svg" xmlns="http://www.w3.org/2000/svg" width="752pt" height="752pt" version="1.1"
				 viewBox="0 0 752 752">
			<path d="m369.84 550.28c0.47266 0.47266 0.94531 0.47266 0.94531 0.94531 65.355-51.621 193.7-148.23 193.7-249.11 0-55.883-45.465-101.35-101.35-101.35-39.781 0-74.352 23.207-90.926 56.828-0.47266 0.94531-1.4219 3.3164-1.4219 3.3164s-0.94531-1.8945-0.94531-2.3672c-16.102-34.09-50.672-57.77-90.926-57.77-55.883 0-101.35 45.461-101.35 101.34 0 101.82 127.87 197.01 192.27 248.16z"/>
		</svg>
		<div class="like-number">{{counter}}</div>
	</div>
</template>

<script setup>
const props = defineProps({
	counter: {
		type: Number,
		required: true,
	},
	isDisable: {
		type: Boolean,
		required: true,
	}
})
</script>

<style scoped>
.like-wrapper {
	position: relative;
}

.like-svg {
	width: 50px;
	height: 50px;
	fill: #5f5e65;
	border-radius: 20px;
	cursor: pointer;
	background-color: #1a161f;
	transition: fill .2s ease, transform .2s ease;
}
.like-svg:hover {
	fill: #ff514f;
}
.like-svg:hover {
	transform: scale(1.05);
}
.like-wrapper.active .like-svg {
	fill: #ff514f;
}
.like-number {
	position: absolute;
	bottom: 7px;
	right: 7px;
	color: #a4a4a4;
	font-weight: 700;
	transition: color .2s ease;
}
.like-wrapper.active .like-number {
	color: #ff514f;
}
.disabled {
	pointer-events: none;
	opacity: .3;
}
</style>