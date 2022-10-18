<template>
	<input type="file" class="input file" @input="$emit('change-file', $event.target.files[0])" >
</template>

<script setup>
const props = defineProps(['modelValue']);
const emit = defineEmits(['change-file']);
</script>

<style scoped>
.input {
	padding: .8rem 1.6rem;
	background-color: #0d0c0f;
	width: 100%;
	border-radius: 20px;
	transition: box-shadow .2s ease;
}

input::placeholder {
	color: #6b6a6f;
}

.input:focus {
	box-shadow: 0 0 0 2px rgba(255, 81, 79, 0.3);
}

.input:focus + .search-icon svg {
	fill: #ff514f;
}

.input.file::-webkit-file-upload-button {
	color: #fff;
	background-color: #7b4fff;
	border: none;
	border-radius: 10px;
}

.input {
	background-color: #0d0c0f;
	cursor: pointer;
}

.input::-webkit-file-upload-button {
	color: #fff;
	background-color: #7b4fff;
	border: none;
	border-radius: 10px;
}
</style>