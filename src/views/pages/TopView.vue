<template>
	<div class="images-list">
		<title-template>Top images by likes</title-template>
		<images-list :images="store.images"></images-list>
	</div>
</template>

<script async setup>
import ImagesList from "../components/blocks/ImagesList.vue";
import {useImageStore} from "../../state/image.js";
import {useLoaderStore} from "../../state/loader";
import {useInfiniteScroll} from "../../composables/infinite-scroll.js";
import TitleTemplate from "../components/templates/TitleTemplate.vue";

const loaderState = useLoaderStore();
const store = useImageStore();
await store.setTopImages();
useInfiniteScroll(store.loadMoreTopImages);
</script>

<style scoped>

</style>