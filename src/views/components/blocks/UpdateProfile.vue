<template>
	<div>
		<div class="center mt20" @click="edit">
			<main-button>Update profile</main-button>
		</div>

		<modal-window ref="popup">
			<form-template>
				<input-wrapper hint="Name">
					<main-input v-model="profileFields.name"></main-input>
				</input-wrapper>
				<input-wrapper hint="Lastname">
					<main-input v-model="profileFields.lastname"></main-input>
				</input-wrapper>
				<input-wrapper hint="Email">
					<main-input type="email" v-model="profileFields.email"></main-input>
				</input-wrapper>
				<input-wrapper hint="Avatar">
					<file-input @change-file="setFile" :value="authStore.user.avatar ? authStore.user.avatar.filename : ''">
					</file-input>
				</input-wrapper>
			</form-template>
		</modal-window>
	</div>
</template>

<script setup>
import ModalWindow from "../templates/ModalWindow.vue";
import FormTemplate from "../templates/FormTemplate.vue";
import InputWrapper from "./InputWrapper.vue";
import FileInput from "../elements/inputs/FileInput.vue";
import MainButton from "../elements/buttons/MainButton.vue";
import MainInput from "../elements/inputs/MainInput.vue";
import {reactive, ref} from "vue";
import {useProfileStore} from "../../../state/profile";
import {useAuthStore} from "../../../state/auth";
import {useNotification} from "../../../composables/notification";
import {formatErrorMessage} from "../../../services/functions";

const {showNotification} = useNotification();

const popup = ref(null);
const profileStore = useProfileStore();
const authStore = useAuthStore();


const profileFields = reactive({
	name: authStore.user.name,
	lastname: authStore.user.lastname,
	email: authStore.user.email,
	avatar: '',
});

function setFile(file) {
	profileFields.avatar = file;
}

async function edit() {
	let userInfo = await popup.value.open();
	if (!userInfo) return;

	update();
}

async function update() {
	try {
		await profileStore.updateProfile(profileFields);
	} catch (err){
		console.log(err.response.data.errors);

		showNotification({
			isError: true,
			message: formatErrorMessage(err.response.data.errors),
		});
	}
}

</script>

<style scoped>

</style>