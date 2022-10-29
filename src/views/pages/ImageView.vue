<template>
	<div>
		<header-block></header-block>
		<div class="inner"
				 :style="{background: `linear-gradient(rgba(13, 12, 15, 0.4), rgba(13, 12, 15, 0.6)), url('${api.host + image.url}') center center / cover no-repeat fixed`}">
			<h2 class="center upper">{{ image.name }}</h2>
		</div>
		<div class="main-content">
			<div class="container">
				<div class="two-one">
					<div class="left-section">
						<div class="section-block">
							<h3>Author</h3>
							<user-info
									v-if="image.author"
									:user="image.author"
									@click="showAuthorPage"
							></user-info>
						</div>
						<div class="section-block">
							<h3>Image property</h3>
							<div class="image-info">
								<div class="custom-table card">
									<div class="row">
										<h4 class="key grey">
											Width
										</h4>
										<div class="value">
											{{ image.width }}px
										</div>
									</div>
									<div class="row">
										<h4 class="key grey">
											Height
										</h4>
										<div class="value">
											{{ image.height }}px
										</div>
									</div>
									<div class="row">
										<h4 class="key grey">
											Mimes
										</h4>
										<div class="value">
											{{ image.mime }}
										</div>
									</div>
									<div class="row">
										<h4 class="key grey">
											Image Size
										</h4>
										<div class="value">
											{{ convertBytesToKbytes(image.filesize) }} KBytes
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="section-block" v-if="image.tags?.length">
							<h3>Tags</h3>
							<div class="tag-list">
								<div class="tag" style="background: #6349d9;" v-for="tag in image.tags" :key="tag.id"
										 @click="searchWithTag(tag)">
									{{ tag.name }}
								</div>
							</div>
						</div>

						<div class="section-block">
							<div class="mt20 flex-row sb">
								<div class="flex-row">
									<main-button
											:is-disable="!authStore.isAuthed"
											@click="downloadImage(image)"
									>Download
									</main-button>

									<like-button
											v-if="image"
											:is-disable="!authStore.isAuthed"
											:class="{active: image.isLiked}"
											:counter="+image.likes"
											@click="toggleLike(image)"
									></like-button>
								</div>
								<div class="item" v-if="isMyImage">
									<main-button @click="deleteImage">
										Delete
									</main-button>
								</div>
							</div>
						</div>
					</div>

					<div class="image-big">
						<img :src="api.host + image.url" alt="image1">
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script async setup>
import MainButton from "../components/elements/buttons/MainButton.vue";
import LikeButton from "../components/elements/buttons/LikeButton.vue";
import UserInfo from "../components/blocks/UserInfo.vue";
import {useRouter} from "vue-router";
import {useImageStore} from "../../state/image";
import {useAuthStore} from "../../state/auth";
import HeaderBlock from "../components/blocks/HeaderBlock.vue";
import api from '/src/api/config/api.js';
import {computed} from "vue";

const router = useRouter();

const authStore = useAuthStore();
const imageStore = useImageStore();

const props = defineProps(['id']);

const image = imageStore.image;

const isMyImage = computed(() => authStore.userInfo?.id === image.author?.id);

await imageStore.setOneImage(props.id);

function downloadImage(image) {
	imageStore.downloadImage(image);
}

function convertBytesToKbytes(value) {
	return Math.round(value / 1000);
}

function toggleLike(image) {
	imageStore.toggleLike(image);
}

function showAuthorPage() {
	router.push(`/users/${image.author.id}`);
}

async function deleteImage() {
	await imageStore.deleteImage(image.id);

	router.back();
}

async function searchWithTag(tag) {
	const imagesStore = useImageStore();

	await router.push(
			{
				name: 'top',
			}
	);

	await imagesStore.setTopImagesByTag(tag.name);
}

</script>

<style scoped>


.main-content {
	padding: 75px 0;
}

.image-big {
	width: fit-content;
	height: fit-content;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto auto;
}

.image-big img {;
	object-fit: contain;
}

.inner {
	height: 35vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.two-one {
	display: grid;
	grid-template-columns: 1fr 2fr;
	gap: 20px;
}

.custom-table {
	display: flex;
	padding: 20px;
	flex-direction: column;
}

.row {
	padding: 10px 0px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.left-section {
	display: flex;
	flex-direction: column;
	gap: 40px;
}

.section-block > h3 {
	margin-bottom: 10px;
}

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

@media (max-width: 1050px) {
	.two-one {
		grid-template-columns: 1fr;
	}
}

</style>