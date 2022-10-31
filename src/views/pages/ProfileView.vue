<template>
	<div>
		<div class="right-panel">
			<div class="user-bar card mb20">
				<div class="flex-row sb">
					<div class="left-content flex-row">
						<user-info :is-big-avatar="true" :user="authStore.user" class="mb20"></user-info>
					</div>

					<statistic-block :statistic="authStore.user.statistic" v-if="authStore.user.statistic"></statistic-block>
				</div>

				<update-profile ref="update-block"></update-profile>
			</div>

			<image-upload class="mt20"></image-upload>

			<div class="images-block mt20">
				<title-template>My images</title-template>
				<images-list :images="imageStore.images"></images-list>
			</div>

		</div>
	</div>
</template>

<script async setup>
import ImagesList from "../components/blocks/ImagesList.vue";
import ImageUpload from "../components/blocks/ImageUpload.vue";
import {useImageStore} from "../../state/image";
import {useAuthStore} from "../../state/auth";
import UserInfo from "../components/blocks/UserInfo.vue";
import UpdateProfile from "../components/blocks/UpdateProfile.vue";
import {useInfiniteScroll} from "../../composables/infinite-scroll";
import StatisticBlock from "../components/blocks/StatisticBlock.vue";
import TitleTemplate from "../components/templates/TitleTemplate.vue";

const imageStore = useImageStore();
const authStore = useAuthStore();

await imageStore.setMyImages();

useInfiniteScroll(imageStore.loadMoreMyImages);

</script>

<style scoped>


.profile-body {
	display: grid;
	grid-template-columns: 1fr 4fr;
	gap: 20px;
}


.user-bar > .avatar-big {
	margin-bottom: 15px;
}


@media (max-width: 1050px) {
	.user-bar {
		flex-wrap: wrap;
		justify-content: center;
	}
}

@media (max-width: 680px) {
	.images-list {
		grid-template-columns: 1fr;
	}

	.main {
		margin-top: 110px;
	}


	.user-bar > .flex-row {
		display: block;
	}

	.left-content {
		margin-bottom: 20px;
		flex-direction: column;
	}

	.user-bar {
		justify-content: stretch;
		align-items: stretch;
	}


}
</style>