<template>
	<div class="input-wrapper" @click="tagInput.focus()">
		<div class="tags-container">
			<tag-list :tags="tags"></tag-list>
		</div>
		<input
				ref="tagInput"
				placeholder="tag#1 tag#2 tag#3..."
				class="input"
				v-model="inputValue"
				@input="update($event.target.value)" @keydown.enter="updateOnEnter($event.target.value)"
				@keydown.delete="deleteTag($event.target.value)">
	</div>

</template>

<script setup>
import {ref} from "vue";
import TagList from "../tags/TagList.vue";

const emit = defineEmits(['update'])
const tagInput = ref(null);
let tags = ref([]);
let inputValue = ref('');

function update(value) {
	if (value.trim() && value.at(-1) === ' ') pushTag(value);
}

function updateOnEnter(value) {
	if (value.trim()) pushTag(value);
}

function deleteTag(value) {
	if (!value) {
		tags.value.pop();

		emit('update', tags.value);
	}

}

function pushTag(value) {
	console.log('worked!');
	tags.value.push(
			{
				name: value.trim(),
			}
	);

	inputValue.value = '';

	emit('update', tags.value);
}

</script>

<style scoped>
.input-wrapper {
	padding: .8rem 1.6rem;
	background-color: #0d0c0f;
	width: 100%;
	border-radius: 20px;
	transition: box-shadow .2s ease;
	display: flex;
	flex-wrap: wrap;
	gap: 2px;
}

.tags-container {
	flex: 0 1 auto;
}

input {
	flex: 0 1 auto;
}

input::placeholder {
	color: #6b6a6f;
}

.input-wrapper:focus {
	box-shadow: 0 0 0 2px rgba(255, 81, 79, 0.3);
}

.input {
	background-color: #0d0c0f;
}

</style>