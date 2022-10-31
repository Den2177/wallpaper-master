<template>
	<div class="section-block">
		<h3>Image property</h3>
		<div class="image-info">
			<div class="custom-table card">
				<div class="row">
					<h4 class="key grey">
						Width
					</h4>
					<div class="value">
						{{ image.width }}px
					</div>
				</div>
				<div class="row">
					<h4 class="key grey">
						Height
					</h4>
					<div class="value">
						{{ image.height }}px
					</div>
				</div>
				<div class="row">
					<h4 class="key grey">
						Mimes
					</h4>
					<div class="value">
						{{ image.mime }}
					</div>
				</div>
				<div class="row">
					<h4 class="key grey">
						Image Size
					</h4>
					<div class="value">
						{{ kbytes }} KBytes
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps(
		{
			image: {
				type: Object,
				required: true,
			}
		}
);

const kbytes = computed(() => {
	return Math.round(props.image.filesize / 1000);
});

</script>

<style scoped>
.custom-table {
	display: flex;
	padding: 20px;
	flex-direction: column;
}

.row {
	padding: 10px 0px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.left-section {
	display: flex;
	flex-direction: column;
	gap: 40px;
}

</style>