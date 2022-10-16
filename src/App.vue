<script setup>
import {RouterView, useRoute, useRouter} from 'vue-router';
import {computed} from "vue";
import NotifiactionBlock from "./views/./components/blocks/NotifiactionBlock.vue";
import LoadSpinner from "./views/components/elements/spinners/LoadSpinner.vue";
import {useLoaderStore} from "./stores/loader";

const router = useRouter();
const route = useRoute();
const loaderState = useLoaderStore();

const layout = computed(() => {
	const {meta} = useRoute();
	return meta.layout ?? 'default-layout';
});

</script>

<template>
	<div>
		<component :is="layout">
			<RouterView v-slot="{ Component }">
				<template v-if="Component">
					<Transition name="page" mode="out-in">
						<Suspense>
							<component :is="Component"></component>
							<template #fallback>
								<load-spinner></load-spinner>
							</template>
						</Suspense>
					</Transition>
				</template>
			</RouterView>
		</component>

		<NotifiactionBlock></NotifiactionBlock>
	</div>

</template>

<style>
.page-enter-active,
.page-leave-active {
	transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
	opacity: 0;
}

.container {
	max-width: 1260px;
	margin: 0 auto;
	padding: 0 20px;
	box-sizing: content-box;
}

body {
	color: #fff;
	background-color: #0d0c0f;
	font-family: Roboto, sans-serif;
}

.card {
	border-radius: 20px;
	background-color: #1a161f;
}

.burger {
	display: none;
}

.center {
	text-align: center;
}

.mb20 {
	margin-bottom: 20px;
}

.mt10 {
	margin-top: 10px;
}

.flex-row {
	align-items: center;
	display: flex;
	gap: 10px;
}

.avatar {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: #ff514f;
	cursor: pointer;
}

.upper {
	text-transform: uppercase;
}

h1, h2, h3, h4 {
	color: #fff;
}

h2 {
	font-weight: 700;
	font-size: 2rem;
}

h3 {
	font-size: 1.5rem;
	font-weight: 700;
}

h4 {
	font-weight: 700;
	font-size: 1.2rem;
}

.grey {
	color: #636269;
}

input {
	outline: none;
	border: none;
	color: #fff;
	background-color: #0d0c0f;
}

.mt20 {
	margin-top: 20px;
}

div img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.header-block {
	margin-bottom: 10px;
}

.mt10 {
	margin-top: 10px;
}

.sb {
	justify-content: space-between;
}

.vertical {
	display: flex;
	flex-direction: column;
	gap: 5px;
}

.card {
	padding: 25px;
}

</style>
