<template>
	<div class="search-input">
		<input type="text" class="input" @input="$emit('update:modelValue', $event.target.value)" :value="modelValue" placeholder="Search...">

		<div class="search-icon">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px">
				<path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"/>
			</svg>
		</div>
	</div>
</template>

<script setup>
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
</script>

<style scoped>
.search-input {
	position: relative;
}
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
.input.file {
	background-color: #0d0c0f;
	cursor: pointer;
}
.search-icon svg {
	position: relative;
	z-index: 2;
	fill: #fff;
	width: 20px;
	height: 20px;
	transition: fill .2s ease;
}
.search-icon {
	position: absolute;
	top: 52%;
	transform: translate(0, -50%);
	z-index: 2;
	left: 10px;
}
.search-input .input {
	padding: .8rem 1.6rem .8rem 2.4rem;
}
</style>