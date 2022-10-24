<template>
	<div>
		<div class="card">
			<main-button @click="upload">Create Image</main-button>
		</div>
		<modal-window ref="popup">
			<form-template>
				<input-wrapper hint="Images">
					<file-input @change-file="setImage" v-model="imageFields.image"></file-input>
				</input-wrapper>
				<input-wrapper hint="Name">
					<main-input v-model="imageFields.name"></main-input>
				</input-wrapper>
				<input-wrapper hint="Tags">
					<tags-input @update="updateTags"></tags-input>
				</input-wrapper>
			</form-template>
		</modal-window>
	</div>
</template>

<script setup>
import MainButton from "../elements/buttons/MainButton.vue";
import MainInput from "../elements/inputs/MainInput.vue";
import FormTemplate from "../templates/FormTemplate.vue";
import ModalWindow from "../templates/ModalWindow.vue";
import InputWrapper from "./InputWrapper.vue";
import FileInput from "../elements/inputs/FileInput.vue";
import TagsInput from "../elements/inputs/TagsInput.vue";
import {reactive, ref} from "vue";
import {useImageStore} from "../../../state/image.js";
import {useNotification} from "../../../composables/notification.js";
import {formatErrorMessage} from "../../../services/functions";
import {useLoaderStore} from "../../../state/loader";

const popup = ref(null);
const store = useImageStore();
const {showNotification} = useNotification();
const loaderState = useLoaderStore();
const imageFields = reactive({
	name: '',
	image: '',
	tags: [],
});

function clearFields() {
	Object.assign(imageFields, {
		name: '',
		image: '',
		tags: [],
	});
}

function updateTags(tags) {
	imageFields.tags = tags;
}

function setImage(file) {
	imageFields.image = file;
}

async function upload() {

	const response = await popup.value.open();

	if (response) {
		loaderState.show();

		store.saveImage(imageFields)
				.then(() =>{
					showNotification({
						message: "Successful upload",
						isError: false,
					})
				})
				.catch(err => {
					showNotification({
						message: formatErrorMessage(err.response.data.errors),
						isError: true,
					});
				})
				.finally(() => loaderState.hidden());

		clearFields();
	}
}
</script>

<style scoped>

</style>