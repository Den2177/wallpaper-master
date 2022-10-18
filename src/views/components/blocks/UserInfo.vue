<template>
	<div class="user-info" v-if="user">
		<div class="avatar" :class="{'avatar-big': isBigAvatar, 'red': !user.avatar}">
			<img :src="user.avatar" alt="user avatar" v-if="user.avatar">
		</div>
		<div class="user-content">
			<h4 class="user-name">
				{{user.name}} {{user.lastname}}
			</h4>
			<div class="user-email grey">
				{{user.email}}
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	user: {
		required: true,
		type: Object,
	},
	isBigAvatar: {
		required: false,
		type: Boolean,
		default: false,
	}
})
</script>

<style scoped>

.user-name {
	cursor: pointer;
}

.avatar {
	flex: 0 0 auto;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	cursor: pointer;
	overflow: hidden;
}

.avatar.red {
	background-color: #ff514f;
}

.user-info {
	display: flex;
	align-items: center;
	padding-right: 20px;
	gap: 10px;
}

.avatar-big {
	width: 100px;
	height: 100px;
}

.avatar-big > img {
	border-radius: 50%;
}

@media (max-width: 1050px) {
	.user-info {
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}
}


</style>