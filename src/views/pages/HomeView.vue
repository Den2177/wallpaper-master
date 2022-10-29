<template>
	<div class="images-list">
		<div class="header-block">
			<h2>Fresh images</h2>
		</div>
		<images-list :images="store.images"></images-list>
	</div>
</template>

<script async setup>
import ImagesList from "../components/blocks/ImagesList.vue";
import {useImageStore} from "../../state/image";
import {useInfiniteScroll} from "../../composables/infinite-scroll";

const store = useImageStore();
await store.setRecommendedImages();

useInfiniteScroll(store.loadMoreRecommendedImages);

</script>

<style scoped>
</style>
