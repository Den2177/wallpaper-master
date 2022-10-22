<template>
	<header class="header">
		<div class="container">

			<header-burger @click.stop :active="mobileMenuVisible" @toggle="mobileMenuVisible = !mobileMenuVisible"></header-burger>

			<user-info @click="$router.push('/profile')" class="user-info-header" :user="authStore.userInfo"></user-info>

			<search-input v-model="searchValue"></search-input>
		</div>

		<mobile-navigation @click.stop :mobile-menu-visible="mobileMenuVisible" @close="mobileMenuVisible = !mobileMenuVisible"></mobile-navigation>
	</header>
</template>

<script setup>
import UserInfo from "./UserInfo.vue";
import SearchInput from "../elements/inputs/SearchInput.vue";
import {onMounted, onUnmounted, ref, watch} from "vue";
import {useRouter, useRoute} from "vue-router";
import {useImageStore} from "../../../state/image";
import {useAuthStore} from "../../../state/auth";
import MobileNavigation from "./MobileNavigation.vue";
import HeaderBurger from "../elements/burgers/HeaderBurger.vue";
import LoadSpinner from "../elements/spinners/LoadSpinner.vue";

const router = useRouter();
const route = useRoute;
const imageStore = useImageStore();
const authStore = useAuthStore();

let searchValue = ref('');

let mobileMenuVisible = ref(false);
let disableMobileMenu = () => mobileMenuVisible.value = false;

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

onMounted(() => document.body.addEventListener('click', disableMobileMenu));
onUnmounted(() => document.body.removeEventListener('click', disableMobileMenu));

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