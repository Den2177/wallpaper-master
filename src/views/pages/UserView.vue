<template>
	<div>
		<div class="right-panel">
			<div class="user-bar card flex-row sb mb20">
				<div class="left-content flex-row">
					<user-info :is-big-avatar="true" :user="userStore.user" class="mb20"></user-info>
				</div>

				<div class="statistics" v-if="userStore.user.statistic">
					<div class="statistic-block">
						<div class="number">
							{{ userStore.user.statistic.uploads }}
						</div>
						<div class="statistic-type">
							Uploaded images
						</div>
					</div>
					<div class="statistic-block">
						<div class="number">
							{{ userStore.user.statistic.likes }}
						</div>
						<div class="statistic-type">
							Likes on images
						</div>
					</div>
					<div class="statistic-block">
						<div class="number">
							{{ userStore.user.statistic.downloads }}
						</div>
						<div class="statistic-type">
							Downloaded
						</div>
					</div>
				</div>
			</div>
			<div class="images-block mt20">
				<div class="header-block">
					<h2>{{userStore.user.name}}'s images</h2>
				</div>
				<images-list :images="imageStore.images"></images-list>
			</div>
		</div>

		<modal-window ref="popup">
		</modal-window>
	</div>



</template>

<script async setup>
import ImagesList from "../components/blocks/ImagesList.vue";
import ModalWindow from "../components/templates/ModalWindow.vue";
import {ref} from "vue";
import UserInfo from "../components/blocks/UserInfo.vue";
import {useUserStore} from "../../state/user";
import {useRoute} from "vue-router";
import {useInfiniteScroll} from "../../composables/infinite-scroll";
import {useImageStore} from "../../state/image";

const userStore = useUserStore();
const imageStore = useImageStore();
const route = useRoute();
const popup = ref(null);
const userId = route.params.id;

await userStore.setUserInfo(userId);
await imageStore.setUserImages(userId);

useInfiniteScroll(imageStore.setUserImages.bind(null, userId));
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

.statistics {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20px;
}

.statistic-block {
	padding: 30px;
	background-color: #0d0c0f;
	border-radius: 20px;
}

.statistic-block > .number {
	font-size: 4rem;
	text-align: center;
	color: #ff514f;
	opacity: .7;
	font-weight: 700;
}

.statistic-type {
	color: #5f5e65;
	text-align: center;
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

	.statistics {
		grid-template-columns: 1fr;
	}

	.user-bar {
		flex-direction: column;
	}

	.left-content {
		margin-bottom: 20px;
		flex-direction: column;
	}

	.user-bar {
		justify-content: stretch;
		align-items: stretch;
	}

	.statistic-block {
		width: 100%;
	}
}
</style>