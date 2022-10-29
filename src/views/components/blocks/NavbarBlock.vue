<template>
	<nav class="nav-bar card">
		<div class="menu-title">MENU</div>
		<div class="menu-sections">
			<div class="links">
				<router-link :to="{name: 'home'}" class="link">Home</router-link>
				<router-link :to="{name: 'top'}" class="link">Top</router-link>
				<router-link v-if="authStore.isAuthed" :to="{name: 'liked'}" class="link">Liked</router-link>
				<router-link v-if="authStore.isAuthed" :to="{name: 'profile'}" class="link">Profile</router-link>
				<router-link v-if="!authStore.isAuthed" :to="{name: 'login'}" class="link">Login</router-link>
				<router-link v-if="!authStore.isAuthed" :to="{name: 'register'}" class="link">Register</router-link>
				<a href="#" v-if="authStore.isAuthed" class="link" @click.prevent="logout">Logout</a>
			</div>
		</div>
		<modal-window ref="popup">
			<h3 class="center pt10">Are you sure you want to get out?</h3>
		</modal-window>
	</nav>
</template>

<script setup>
import {useAuthStore} from "../../../state/auth";
import {useRouter} from "vue-router";
import {ref} from "vue";
import ModalWindow from "../templates/ModalWindow.vue";

const authStore = useAuthStore();
const router = useRouter();
const popup = ref(null);
let mobileMenuVisible = ref(false);

async function logout() {
	const response = await popup.value.open();
	if (!response) return;

	await authStore.logout();
	router.push('/');
	location.reload();


}

</script>

<style scoped>
.nav-bar {
	padding: 30px 0 30px 30px;
	height: fit-content;
}

.link {
	color: #5f5e65;
}

.links {
	display: flex;
	flex-direction: column;
	gap: 15px;
	transition: font-weight .2s ease, color .2s ease;
}

.link.active {
	color: #ff514f;
	position: relative;
	font-weight: 700;
}

.menu-title {
	margin-bottom: 20px;
	color: #6b6a6f;
}

@media (max-width: 950px) {
	.nav-bar {
		display: none;
	}

	.main {
		margin-top: 120px;
	}

	.main-body {
		display: block
	}

	.images-list {
		grid-template-columns: 1fr 1fr;
	}

	.menu-title {
		color: #9f9f9f;
		margin-bottom: 20px;
	}

	.link.active::after {
		content: "";
		height: 100%;
		width: 3px;
		background-color: #ff514f;
		position: absolute;
		right: 0;
		top: 0;
		border-radius: 4px;
	}

	.menu-sections {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}


}

</style>