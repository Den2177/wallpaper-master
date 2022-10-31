<template>
	<div class="images-list">
		<title-template>Liked images</title-template>
		<images-list :images="imageStore.images"></images-list>
	</div>
</template>

<script async setup>
import ImagesList from "../components/blocks/ImagesList.vue";
import {useImageStore} from "../../state/image";
import {useInfiniteScroll} from "../../composables/infinite-scroll";
import TitleTemplate from "../components/templates/TitleTemplate.vue";

const imageStore = useImageStore();
await imageStore.setLikedImages();

useInfiniteScroll(imageStore.loadMoreLikedImages);
</script>

<style scoped>

</style>