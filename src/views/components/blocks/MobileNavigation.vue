<template>
	<nav class="mobile-menu" :class="{active: mobileMenuVisible}">
		<div class="links">
			<router-link :to="{name: 'home'}" class="link" @click="$emit('close')">Home</router-link>
			<router-link :to="{name: 'top'}" class="link" @click="$emit('close')">Top</router-link>
			<router-link v-if="authStore.isAuthed" :to="{name: 'liked'}" class="link" @click="$emit('close')">Liked</router-link>
			<router-link v-if="authStore.isAuthed" :to="{name: 'profile'}" class="link" @click="$emit('close')">Profile</router-link>
			<router-link v-if="!authStore.isAuthed" :to="{name: 'login'}" class="link" @click="$emit('close')">Login</router-link>
			<router-link v-if="!authStore.isAuthed" :to="{name: 'register'}" class="link" @click="$emit('close')">Register</router-link>
			<a href="#" v-if="authStore.isAuthed" class="link" @click.prevent="logout" @click="$emit('close')">Logout</a>
		</div>
	</nav>
</template>

<script setup>
import {useAuthStore} from "../../../state/auth.js";
import {useRouter} from "vue-router";
const router = useRouter();

const props = defineProps({
	mobileMenuVisible: {
		type: Boolean,
		required: true,
	}
});
const emit = defineEmits(['close']);

const authStore = useAuthStore();

async function logout() {
	const response = await authStore.logout();

	router.push(
			{
				name: 'login',
			}
	);
}

</script>

<style scoped>
.mobile-menu {
	position: fixed;
	background-color: rgba(13, 12, 15, 0.9);
	top: 0;
	left: 0;
	width: 40vw;
	height: 100vh;
	padding: 100px 0px 0px 20px;
	transform: translateX(-100%);
	transition: transform .2s ease;
}

.mobile-menu.active {
	transform: translate(0);
}

.mobile-menu .links {
	display: flex;
	gap: 10px;
	flex-direction: column;
}
.mobile-menu .link {
	font-size: 1.2rem;
}

.link.active {
	color: #ff514f;
}

</style>