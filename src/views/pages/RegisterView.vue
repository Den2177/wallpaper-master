<template>
	<form-template @submit="submit">
		<h3 class="mb20">Register</h3>

		<input-wrapper hint="Name">
			<main-input type="name" v-model="userFields.name"></main-input>
		</input-wrapper>
		<input-wrapper hint="Lastname">
			<main-input type="lastname" v-model="userFields.lastname"></main-input>
		</input-wrapper>
		<input-wrapper hint="Email">
			<main-input type="email" v-model="userFields.email"></main-input>
		</input-wrapper>
		<input-wrapper hint="Password">
			<main-input type="password" v-model="userFields.password"></main-input>
		</input-wrapper>
		<input-wrapper hint="Repeat Password">
			<main-input type="password" v-model="userFields.password_repeat"></main-input>
		</input-wrapper>

		<main-button type="submit">Register</main-button>
		<router-link class="link center mt20" :to="{name: 'login'}">Or login</router-link>
	</form-template>
</template>

<script async setup>
import MainButton from "../components/elements/buttons/MainButton.vue";
import InputWrapper from "../components/blocks/InputWrapper.vue";
import MainInput from "../components/elements/inputs/MainInput.vue";
import FormTemplate from '../components/templates/FormTemplate.vue';
import {useAuthStore} from "../../state/auth.js";
import {useAuthFields} from "../../composables/auth";
import {useRouter} from "vue-router";
import {formatErrorMessage} from "../../services/functions.js";
import {useNotification} from "../../composables/notification";
const {userFields, clearFields} = useAuthFields();

const store = useAuthStore();
const router = useRouter();
const {showNotification} = useNotification();

function submit() {
	store.userRegister(userFields.value)
			.then(response => {
				router.push(
						{
							name: 'home',
						}
				);

				clearFields();
			})
			.catch(err => {
				if (err.response.status === 422) {
					showNotification({
						message: formatErrorMessage(err.response.data.errors),
						isError: true,
					});
				} else {
					showNotification({
						message: formatErrorMessage(err.message),
						isError: true,
					});
				}
			});
}

</script>

<style scoped>
.center {
	text-align: center;
}

.form {
	padding: 30px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
	margin: 0 auto;
	max-width: 430px;
}
</style>