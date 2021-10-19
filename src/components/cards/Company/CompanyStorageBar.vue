
<template>
			<div  v-if="modelValue!==null" class="company-head-wrap">
				<CompanyStorageCard 
					v-for="(storage, id) in data" 
					:key="id"
					:data="storage"
					:active="id===modelValue"
					@onClick="$emit('update:modelValue', id)"
				></CompanyStorageCard>
				<CompanyStorgeDoc :data="data[modelValue].documents"></CompanyStorgeDoc>
			</div>
			<div v-else class="company-head-wrap">
				<CompanyStorageCard></CompanyStorageCard>
				<CompanyStorgeDoc></CompanyStorgeDoc>
			</div>
</template>

<script>
//Таблицас данными по сделкам со складами

import CompanyStorageCard from '@/components/cards/Company/CompanyStorageCard.vue';
import CompanyStorgeDoc from '@/components/cards/Company/CompanyStorgeDoc.vue';

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
		CompanyStorgeDoc
	},
	setup(){
	}
}
</script>

<style>

</style>