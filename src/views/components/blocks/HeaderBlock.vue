<template>
	<header class="header">
		<div class="container">

			<header-burger :active="mobileMenuVisible" @toggle="mobileMenuVisible = !mobileMenuVisible"></header-burger>

			<user-info @click="$router.push('/profile')" class="user-info-header" :user="authStore.userInfo"></user-info>

			<search-input v-model="searchValue"></search-input>
		</div>

		<mobile-navigation :mobile-menu-visible="mobileMenuVisible" @close="mobileMenuVisible = !mobileMenuVisible"></mobile-navigation>
	</header>
</template>

<script setup>
import UserInfo from "./UserInfo.vue";
import SearchInput from "../elements/inputs/SearchInput.vue";
import {ref, watch, watchEffect} from "vue";
import {useRouter, useRoute} from "vue-router";
import {useImageStore} from "../../../state/image";
import {useAuthStore} from "../../../state/auth";
import LoadSpinner from "../elements/spinners/LoadSpinner.vue";
import MobileNavigation from "./MobileNavigation.vue";
import HeaderBurger from "../elements/burgers/HeaderBurger.vue";

let searchValue = ref('');
const router = useRouter();
const route = useRoute;
const imageStore = useImageStore();
const authStore = useAuthStore();
let mobileMenuVisible = ref(false);

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
	.user-info-header {
		display: none;
	}
}


</style>