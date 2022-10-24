<template>
<div class="notifications">
	<TransitionGroup name="list">
		<div class="notification" :class="{'error': notification.isError}" v-for="notification in notifications" :key="notification.id">
			<div class="icon">
				<error-icon v-if="notification.isError"></error-icon>
				<success-icon v-else></success-icon>
			</div>
			<div class="content">
				<h4>{{notification.title}}</h4>

				<div class="message" v-html="notification.message">
				</div>
			</div>
		</div>
	</TransitionGroup>
</div>
</template>

<script setup>
import {useNotification} from "../../../composables/notification.js";
import SuccessIcon from "../icons/SuccessIcon.vue";
import ErrorIcon from "../icons/ErrorIcon.vue";

const {notifications} = useNotification();

</script>

<style scoped>
.icon > img {
	width: fit-content;
	height: fit-content;
	object-fit: none;
}
.notifications {
	display: flex;
	position: fixed;
	left: 0;
	bottom: 5px;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: flex-end;
	flex-direction: column;
	pointer-events: none;
	gap: 10px;
}
.notification {
	padding: 20px;
	border-radius: 4px;
	background-color: #8392ff;
	opacity: .8;
	display: flex;
	align-items: center;
	gap: 15px;
}
.notification.error {
	background-color: #ff514f;
}
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

.list-leave-active {
	position: absolute;
}

</style>