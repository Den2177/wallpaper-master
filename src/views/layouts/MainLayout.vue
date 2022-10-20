<template>
	<header-block></header-block>
	<main class="main">
		<div class="container">
			<div class="main-body">
				<navbar-block></navbar-block>
				<slot></slot>
			</div>
		</div>
	</main>
</template>

<script setup>

import HeaderBlock from "../components/blocks/HeaderBlock.vue";
import NavbarBlock from "../components/blocks/NavbarBlock.vue";
</script>

<style scoped>
.main {
	margin-top: 160px;
}

.main-body {
	display: grid;
	grid-template-columns: 1fr 4fr;
	gap: 20px;
}

@media (max-width: 950px) {
	.main-body {
		grid-template-columns: 1fr;
	}
	.main {
		margin-top: 110px;
	}
}

</style>