<template>
	<div class="images-list">
		<div class="header-block">
			<h2>Recommended images for you</h2>
		</div>
		<images-list :images="store.images"></images-list>
	</div>
</template>

<script async setup>
import ImagesList from "../components/blocks/ImagesList.vue";
import {useImageStore} from "../../state/image";
import LoadSpinner from "../components/elements/spinners/LoadSpinner.vue";

const store = useImageStore();
await store.setRecommendedImages();
</script>

<style scoped>
</style>
