<template>
<div class="delete-btn"
	@click="$emit('onClick')"
>
	<svg class="delete-btn-img" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
	<rect x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"></rect>
	<rect width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"></rect>
	</svg>
</div>
</template>
<script lang="ts">
export default {
	emits: ['onClick'],
	setup(){

	}
}
</script>