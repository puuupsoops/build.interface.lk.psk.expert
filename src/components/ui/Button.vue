<template>
	<button 
		class="default-btn" 
		@click="$emit('onClick')"
	> 
		<div class="">{{name}}</div>
	</button>	
</template>
<script>

export default{
	props:{
		name: {
			type: String
		}
	},
	emits:['onClick'],
	setup() {
		
	},
}
</script>
