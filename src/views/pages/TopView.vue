<template>
	<div class="images-list">
		<div class="header-block">
			<h2>The most popular images by likes</h2>
		</div>
		<images-list :images="store.images"></images-list>
		<load-spinner v-if="loaderState.isActive"></load-spinner>
	</div>
</template>

<script async setup>
import ImagesList from "../components/blocks/ImagesList.vue";
import {useImageStore} from "../../state/image.js";
import LoadSpinner from "../components/elements/spinners/LoadSpinner.vue";
import {useLoaderStore} from "../../state/loader";
import {useInfiniteScroll} from "../../composables/infinite-scroll.js";

const loaderState = useLoaderStore();
const store = useImageStore();
await store.setTopImages();
useInfiniteScroll(store.loadMoreTopImages);
</script>

<style scoped>

</style>