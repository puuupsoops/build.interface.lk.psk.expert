
<template>

		<div class="company-head-wrap">
			<CompanyStorageCard 
				v-for="(storage, id) in data" 
				:key="id"
				:data="storage"
				:active="storage.guid===modelValue"
				@onClick="$emit('update:modelValue', storage.guid)"
			></CompanyStorageCard>

			<CompanyStorgeDoc :data="data.find(x => x.guid === modelValue).documents"></CompanyStorgeDoc>
		</div>

</template>

<script>
//Таблицас данными по сделкам со складами

import CompanyStorageCard from '@/components/cards/Company/CompanyStorageCard.vue';
import CompanyStorgeDoc from '@/components/cards/Company/CompanyStorgeDoc.vue';
import { ref, onUpdated, } from 'vue';

export default {
	props:{
		data: {
			type: Array
		},
		modelValue: {
			type: String,
			required: true
		}
	},
	emits: ['update:modelValue'],
	components:{
		CompanyStorageCard,
		CompanyStorgeDoc,
	},
	setup(){
		let activeStorage = ref(0);

		onUpdated (() => {   
			//activeStorage.value = 0;
		})
		
		return {
			activeStorage,
		}
	}
}
</script>

<style>

</style>