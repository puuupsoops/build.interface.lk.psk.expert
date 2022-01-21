<template>
	<div :class="'preloader-local' + (small ? ' small':'')">
		<div class="preloader-local circle1"></div>
		<div class="preloader-local circle2"></div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props:{
		small: {
			type: Boolean,
			required: false,
			defaut: false,
		}
	},
	setup() {
		
	},
})
</script>


<style scoped>

</style>