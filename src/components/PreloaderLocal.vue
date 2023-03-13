<template>
	<div 
		class="preloader-local"
		:class="{ small, center }"
	>
		<div class="preloader-local circle1"></div>
		<div class="preloader-local circle2"></div>
	</div>
</template>

<script setup lang="ts">

const props = defineProps({
	small: {
		type: Boolean,
		required: false,
		defaut: false,
	},
	center: {
		type: Boolean,
		required: false,
		defaut: false,
	}
})
</script>


<style scoped>

</style>