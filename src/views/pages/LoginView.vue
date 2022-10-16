<template>
	<form-template @submit="submit">
		<h3 class="mb20">Login</h3>
		<input-wrapper hint="Email">
			<main-input type="email" v-model="userFields.email"></main-input>
		</input-wrapper>
		<input-wrapper hint="Password">
			<main-input type="password" v-model="userFields.password"></main-input>
		</input-wrapper>
		<main-button>Login</main-button>
		<router-link class="link center mt20" :to="{name: 'register'}">Or register</router-link>
	</form-template>
</template>

<script async setup>
import MainButton from "../components/elements/buttons/MainButton.vue";

import {useAuthStore} from "../../stores/auth.js";
import {useAuthFields} from "../../composables/auth";
import {useRouter} from "vue-router";
import {formatErrorMessage} from "../../services/api_service";
import {useNotification} from "../../composables/notification";
import MainInput from "../components/elements/inputs/MainInput.vue";
import InputWrapper from "../components/blocks/InputWrapper.vue";
import FormTemplate from "../components/templates/FormTemplate.vue";

const {userFields, clearFields} = useAuthFields();
const store = useAuthStore();
const {showNotification} = useNotification();
const router = useRouter();

function submit() {
	store.userLogin(userFields.value)
			.then(res => {
				router.push(
						{
							name: 'home',
						}
				);

				clearFields();
			})
			.catch(err => {
				if (err.response?.status === 422) {
					showNotification({
						message: formatErrorMessage(err.response.data.errors),
						isError: true,
					});
				} else {
					console.log(err);
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
</style>