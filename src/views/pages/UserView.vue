<template>
	<div>
		<div class="right-panel">
			<div class="user-bar card flex-row sb mb20">
				<div class="left-content flex-row">
					<user-info :is-big-avatar="true" :user="userStore.user" class="mb20"></user-info>
				</div>
				<statistic-block :statistic="userStore.user.statistic"></statistic-block>
			</div>
			<div class="images-block mt20">
				<title-template>{{userStore.user.name}}'s images</title-template>
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
import UserInfo from "../components/blocks/UserInfo.vue";
import {useRoute, useRouter} from "vue-router";
import {useInfiniteScroll} from "../../composables/infinite-scroll";
import {useUserStore} from "../../state/user";
import {useImageStore} from "../../state/image";
import {nextTick, ref} from "vue";
import {useNotification} from "../../composables/notification";
import TitleTemplate from "../components/templates/TitleTemplate.vue";
import StatisticBlock from "../components/blocks/StatisticBlock.vue";
const {showNotification} = useNotification();

const router = useRouter();
const userStore = useUserStore();
const imageStore = useImageStore();

const route = useRoute();
const popup = ref(null);

const props = defineProps(['id']);

await loadPage();

async function loadPage() {
	try {
		await userStore.setUserInfo(props.id)
		await imageStore.setUserImages(props.id);
	} catch (err) {
		await router.push('/not-found');

		showNotification({
			isError: true,
			message: err.message,
		});

	}
}

useInfiniteScroll(imageStore.setUserImages.bind(null, props.id));
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