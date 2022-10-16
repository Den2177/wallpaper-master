<template>
	<div>
		<div class="right-panel">
			<div class="user-bar card flex-row sb mb20">
				<div class="left-content flex-row">
					<user-info :is-big-avatar="true" :user="authStore.user" class="mb20"></user-info>
				</div>

				<div class="statistics">
					<div class="statistic-block">
						<div class="number">
							<Transition>
								{{authStore.user.statistic.uploads}}
							</Transition>
						</div>
						<div class="statistic-type">
							Uploaded images
						</div>
					</div>
					<div class="statistic-block">
						<div class="number">
							{{authStore.user.statistic.likes}}
						</div>
						<div class="statistic-type">
							Likes on images
						</div>
					</div>
					<div class="statistic-block">
						<div class="number">
							{{authStore.user.statistic.downloads}}
						</div>
						<div class="statistic-type">
							Downloaded
						</div>
					</div>
				</div>
			</div>

			<image-upload class="mt20"></image-upload>
			<div class="images-block mt20">
				<div class="header-block">
					<h2>My uploaded images</h2>
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
import ImageUpload from "../components/blocks/ImageUpload.vue";
import {ref} from "vue";
import {useImageStore} from "../../stores/image";
import {useAuthStore} from "../../stores/auth";
import UserInfo from "../components/blocks/UserInfo.vue";

const imageStore = useImageStore();
const authStore = useAuthStore();

const popup = ref(null);

await imageStore.setMyImages();


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