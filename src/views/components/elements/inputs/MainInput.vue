<template>
	<input :type="type" class="input" :class="{'file': props.type === 'file'}" :value="modelValue"
				 @input="$emit('update:modelValue',$event.target.value)">
</template>

<script setup>

const props = defineProps(['type', 'modelValue']);
const emit = defineEmits(['update:modelValue']);

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

.input {
	background-color: #0d0c0f;
}

</style>