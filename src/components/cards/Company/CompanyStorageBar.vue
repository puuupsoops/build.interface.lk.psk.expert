
<template>
	
			<div  v-if="data.length !== 0" class="company-head-wrap">
				
				<CompanyStorageCard 
					v-for="(storage, id) in data" 
					:key="id"
					:data="storage ? storage : null"
					:active="id===modelValue"
					@onClick="$emit('update:modelValue', id)"
				></CompanyStorageCard>
				
			</div>
			<div v-else class="company-head-wrap">
				<CompanyStorageCard></CompanyStorageCard>
				
			</div>
</template>

<script lang="ts">
//Таблицас данными по сделкам со складами

import CompanyStorageCard from '/src/components/cards/Company/CompanyStorageCard.vue'


export default {
	props:{
		data: {
			type: Array
		},
		modelValue: {
			type: Number,
			//required: true
		}
	},
	emits: ['update:modelValue'],
	components:{
		CompanyStorageCard,
	},
	setup(){
		
	}
}
</script>

<style>

</style>