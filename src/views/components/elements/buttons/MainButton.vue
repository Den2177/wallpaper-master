<template>
	<button class="btn" :class="{reversed: props.reversed, disabled: isDisable}">
		<slot>
		</slot>
	</button>
</template>

<script setup>
const props = defineProps({
	reversed: {
		type: Boolean,
		required: false,
		default: false,
	},
	isDisable: {
		type: Boolean,
		required: false,
		default: false,
	}
})
</script>

<style scoped>

.btn {
	background-color: #ff514f;
	color: #fff;
	border-radius: 20px;
	padding: .8rem 1.6rem;
	font-weight: 700;
	font-size: 1rem;
	cursor: pointer;
	border: 1px solid #ff514f;
	outline: none;
	transition: color .2s ease, background-color .2s ease;
}

.btn:hover {
	color: #ff514f;
	background-color: transparent;
}

.btn.reversed {
	color: #ff514f;
	background-color: transparent;
}
.btn.reversed:hover {
	color: #fff;
	background-color: #ff514f;
}

.btn.disabled {
	pointer-events: none;
	opacity: .3;
}

</style>