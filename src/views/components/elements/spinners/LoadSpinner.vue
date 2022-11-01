<template>
	<div class="spinner-bc">
		<div class="spinner">
		</div>
	</div>
</template>

<script setup>

</script>

<style scoped>
.spinner-bc {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 3000;
	background-color: rgba(13, 12, 15, 0.5);
}

.spinner {
	height: 50px;
	width: 50px;
	border: 6px solid #f2f2fe;
	border-top: 6px solid #6349d9;
	border-radius: 50%;
	animation: spin 1s ease infinite;
}

@keyframes spin {
	from {
		transform: rotate(0deg)
	}
	to {
		transform: rotate(360deg)
	}
}
</style>