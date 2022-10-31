<template>
	<div class="statistics">
		<div class="statistic-block" >
			<div class="number">
				<Transition>
					{{statistic.uploads}}
				</Transition>
			</div>
			<div class="statistic-type">
				Uploaded images
			</div>
		</div>
		<div class="statistic-block">
			<div class="number">
				{{statistic.likes}}
			</div>
			<div class="statistic-type">
				Likes on images
			</div>
		</div>
		<div class="statistic-block">
			<div class="number">
				{{statistic.downloads}}
			</div>
			<div class="statistic-type">
				Downloaded
			</div>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	statistic: {
		type: Object,
		required: true,
	}
});

</script>

<style scoped>
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

@media (max-width: 680px) {
	.statistics {
		grid-template-columns: 1fr;
	}
	.statistic-block {
		width: 100%;
	}
}
</style>