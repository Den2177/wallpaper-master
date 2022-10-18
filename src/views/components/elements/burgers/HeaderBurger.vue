<template>
	<div class="burger" :class="{active: active}" @click="toggle">
		<span></span>
	</div>
</template>

<script setup>

const props = defineProps({
	active: {
		type: Boolean,
		required: true,
	}
});

const emit = defineEmits(['toggle']);
function toggle() {
	emit('toggle');
}

</script>

<style scoped>
.burger {
	display: none;
}

@media(max-width: 950px) {
	.burger {
		display: block;
		position: relative;
		width: 25px;
		height: 22px;
	}
	.burger::before, .burger::after {
		content: "";
		position: absolute;
	}
	.burger span, .burger::before, .burger::after {
		position: absolute;
		background-color: #fff;
		height: 2px;
		width: 100%;
		transition: transform .2s ease;
	}
	.burger::before {
		top: 0;
		left: 0;
	}
	.burger span {
		top: 50%;
		left: 0;
		transform: translate(0%, -50%);
	}
	.burger::after {
		bottom: 0;
		left: 0;
	}

	.burger.active span {
		display: none;
	}

	.burger.active::before {
		top: 50%;
		transform: translate(0, -50%) rotate(-45deg);
	}

	.burger.active::after {
		top: 50%;
		transform: translate(0, -50%) rotate(45deg);
	}

	.burger {
		z-index: 1001;
	}
}

</style>