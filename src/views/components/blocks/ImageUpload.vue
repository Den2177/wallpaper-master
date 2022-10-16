<template>
	<div>
		<div class="card">
			<main-button @click="upload">Create Image</main-button>
		</div>
		<modal-window ref="popup">
			<form-template>
				<input-wrapper hint="Изображение">
					<file-input @change-file="setImage" v-model="imageFields.image"></file-input>
				</input-wrapper>
				<input-wrapper hint="Название">
					<main-input v-model="imageFields.name"></main-input>
				</input-wrapper>
				<input-wrapper hint="Теги">
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
import {useImageStore} from "../../../stores/image.js";

const popup = ref(null);
const store = useImageStore();
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
/*
	Object.assign(imageFields.tags, tags);
*/
	console.log(imageFields.tags);

}

function setImage(file) {
	imageFields.image = file;
}

function upload() {
	popup.value.open().then(() => {
		store.saveImage(imageFields);
		clearFields();
	});
}
</script>

<style scoped>

</style>