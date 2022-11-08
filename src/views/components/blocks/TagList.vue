<template>
	<div class="tag-list">
		<div class="tag" style="background: #6349d9;" v-for="tag in tags" :key="tag.id"
				 @click="searchWithTag(tag)">
			{{ tag.name }}
		</div>
	</div>
</template>

<script async setup>
import {useImageStore} from "../../../state/image";
import {useRouter} from "vue-router";

const router = useRouter();

const props = defineProps({
	tags: {
		type: Array,
		required: true,
	}
});

async function searchWithTag(tag) {
	const imagesStore = useImageStore();

	await imagesStore.setTopImagesByTag(tag.name);

	await router.push(
			{
				name: 'top',
			}
	);
}
</script>

<style scoped>
.tag-list {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 10px;
	justify-content: center;
}

.tag {
	background-color: #6f4fff;
	color: #fff;
	border-radius: 4px;
	cursor: pointer;
	padding: 5px 10px;
}
</style>