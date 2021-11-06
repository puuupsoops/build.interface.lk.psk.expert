<template>

<div class="content-properties">
	<div class="content-properties-text">Свойства:</div>

	<div class="content-properties-elem" 
		v-for="(p, i) in protect"
		:key="i">
		<img class="content-properties-img" :src="p.IMAGE" alt="" :title="p.NAME">
	</div>
</div>
</template>

<script>


export default {
	props: {
		protect: {
			type: Array,
			require: true
		}
	},
	setup() {
		
	},
}
</script>
