<template>
	<div>
		<navbar-block></navbar-block>
		<slot></slot>
	</div>
</template>

<script>
import LoadSpinner from "../components/elements/spinners/LoadSpinner.vue";
import NavbarBlock from "../components/blocks/NavbarBlock.vue";
export default {
	name: "DefaultLayout",
	components: {NavbarBlock, LoadSpinner}
}
</script>

<style scoped>

</style>