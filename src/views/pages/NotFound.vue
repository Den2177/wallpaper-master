<template>
	<div class="bc">
		<h2>404 Not found</h2>
		<router-link to="home" class="link">To home page</router-link>
	</div>
</template>

<script>
import MainButton from "../components/elements/buttons/MainButton.vue";
export default {
	components: {MainButton}
}
</script>

<style scoped>
.bc {
	background-color: #0d0c0f;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
}

h2 {
	font-size: 4rem;
	color: #1a161f;
}
.link {
	margin-top: 40px;
}
</style>