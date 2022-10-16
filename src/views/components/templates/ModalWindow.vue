<template>
	<Transition name="fade">
		<div class="backdrop" v-if="isOpen" @click="close">
			<div class="card content" @click.stop>
				<slot></slot>
				<div class="flex-row mt20">
					<main-button :reversed="true" @click="close">cancel</main-button>
					<main-button @click="confirm">ok</main-button>
				</div>
				<div class="cancel-btn" @click="close">
					X
				</div>
			</div>
		</div>
	</Transition>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import MainButton from "../elements/buttons/MainButton.vue";

let isOpen = ref(false);
let popupController = {};

const closeEscape = (event) => {
	if (event.key !== 'Escape') return;

	close();
	return true;
}

onMounted(() => window.addEventListener('keydown', closeEscape));
onUnmounted(() => window.removeEventListener('keydown', closeEscape));

function open() {
	isOpen.value = true;
	console.log(isOpen.value);
	return new Promise((res, rej) => {
		popupController.resolve = res;
		popupController.reject = rej;
	});
}

function confirm() {
	popupController.resolve(true);
	isOpen.value = false;
}

function close() {
	isOpen.value = false;
}

defineExpose({
	open,
});

</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.card.content {
	position: relative;
	padding-top: 40px;
	max-width: 450px;
	margin: 0 auto;
}

.backdrop {
	position: absolute;
	top: 20%;
	left: 50%;
	transform: translate(-50%, 0);
	height: 100%;
	width: 100%;
	z-index: 1001;
	background-color: rgba(13, 12, 15, 0.4);
}

.cancel-btn {
	position: absolute;
	right: 20px;
	top: 20px;
	color: #ff514f;
	cursor: pointer;
	font-weight: 700;
	font-size: 1.5rem;

}
@media (max-width: 520px) {
	.content {
		margin: 0 20px;
	}
}
</style>