
<template>
			<div  v-if="modelValue!==null" class="company-head-wrap">
				
				<CompanyStorageCard 
					v-for="(storage, id) in data" 
					:key="id"
					:data="storage"
					:active="id===modelValue"
					:showDoc="showDoc"
					@onClick="$emit('update:modelValue', id)"
					@onShowDoc="showDoc=!showDoc"
				></CompanyStorageCard>
				<CompanyStorgeDoc
					:disabled="!showDoc"
					:data="data[modelValue] ? data[modelValue].documents : null"
					>
				</CompanyStorgeDoc>
			</div>
			<div v-else class="company-head-wrap">
				<CompanyStorageCard :disabled="!showDoc"></CompanyStorageCard>
				<CompanyStorgeDoc></CompanyStorgeDoc>
			</div>
</template>

<script>
//Таблицас данными по сделкам со складами

import CompanyStorageCard from '@/components/cards/Company/CompanyStorageCard.vue';
import CompanyStorgeDoc from '@/components/cards/Company/CompanyStorgeDoc.vue';
import { ref } from 'vue';

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
		const showDoc = ref(false)

		return {
			showDoc
		}
	}
}
</script>

<style>

</style>