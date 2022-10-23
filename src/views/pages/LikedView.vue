<template>
	<div class="images-list">
		<div class="header-block">
			<h2>Liked images</h2>
		</div>
		<images-list :images="imageStore.images"></images-list>
	</div>
</template>

<script async setup>
import ImagesList from "../components/blocks/ImagesList.vue";
import {useImageStore} from "../../state/image";
import {useInfiniteScroll} from "../../composables/infinite-scroll";

const imageStore = useImageStore();
await imageStore.setLikedImages();

useInfiniteScroll(imageStore.loadMoreLikedImages);
</script>

<style scoped>

</style>