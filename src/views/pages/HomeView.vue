<template>
	<div class="images-list">
		<title-template>Fresh images</title-template>

		<images-list :images="store.images"></images-list>
	</div>
</template>

<script async setup>
import ImagesList from "../components/blocks/ImagesList.vue";
import {useImageStore} from "../../state/image";
import {useInfiniteScroll} from "../../composables/infinite-scroll";
import TitleTemplate from "../components/templates/TitleTemplate.vue";

const store = useImageStore();
await store.setRecommendedImages();

useInfiniteScroll(store.loadMoreRecommendedImages);

</script>

<style scoped>
</style>
