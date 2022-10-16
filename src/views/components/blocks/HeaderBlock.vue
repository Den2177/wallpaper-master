<template>
	<header class="header">
		<div class="container">

			<div class="burger">
				<span></span>
			</div>

			<user-info @click="$router.push('/profile')" class="user-info-header" :user="authStore.user"></user-info>

			<search-input v-model="searchValue"></search-input>
		</div>
	</header>
</template>

<script setup>
import UserInfo from "./UserInfo.vue";
import SearchInput from "../elements/inputs/SearchInput.vue";
import {ref, watch, watchEffect} from "vue";
import {useRouter, useRoute} from "vue-router";
import {useImageStore} from "../../../stores/image";
import {useAuthStore} from "../../../stores/auth";
import LoadSpinner from "../elements/spinners/LoadSpinner.vue";

let searchValue = ref('');
const router = useRouter();
const route = useRoute;
const imageStore = useImageStore();
const authStore = useAuthStore();

watch(searchValue,  (newValue) => {
	imageStore.setSearchedImages(newValue);

	if (route.name !== 'top') {
		router.push(
				{
					name: 'top',
				}
		);
	}

});

</script>

<style scoped>

.burger {
	display: none;
}

.header {
	background-color: rgba(26, 22, 31, 0.7);
	padding: 15px 0;
	position: fixed;
	top: 0;
	width: 100%;
	left: 0;
	z-index: 2000;
}

.header > .container {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

header .input {
	position: relative;
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

	@media(max-width: 950px) {
		.user-info-header {
			display: none;
		}
	}

}

</style>