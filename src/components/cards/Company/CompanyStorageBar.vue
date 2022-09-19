
<template>
	
			<div  v-if="data.length !== 0" class="company-head-wrap">
				<div class="btn btn-prev" @click="scroll(-scrollStep)">
   					&#10094;
  				</div>
				<CompanyStorageCard 
					v-for="(storage, id) in data" 
					:id="storage.guid+'-'+id"
					:key="id"
					:data="storage ? storage : null"
					:active="id===modelValue"
					@onClick="click(id)"
				></CompanyStorageCard>
				<div class="btn btn-next" @click="scroll(scrollStep)">
					&#10095;
				</div>
				
			</div>
			<div v-else class="company-head-wrap">
				<CompanyStorageCard></CompanyStorageCard>
				
			</div>
</template>

<script setup lang="ts">
//Таблицас данными по сделкам со складами

import { PropType } from 'vue'
import CompanyStorageCard from '/src/components/cards/Company/CompanyStorageCard.vue'
import { Storage } from '/src/models/Partner'

const props = defineProps({
		data: {
			type:  Array as PropType<Storage[]>,
			required: true
		},
		modelValue: {
			type: Number,
		}
	})
const emits = defineEmits(['update:modelValue', 'prev', 'next'])
const scrollStep = 250

const click = (id: number) => {
	const guid = props.data[id].guid
	
	let maxX = 0
	let maxWidth = 0
	
	let maxXContent = 0
	let maxWidthContent = 0
	
	const content = document.querySelector("#"+guid+'-'+id) 
	if (content){	
		maxXContent = content.getBoundingClientRect().x
		maxWidthContent = content.getBoundingClientRect().x + content.getBoundingClientRect().width
	}

	const bar = document.querySelector(".company-head-elem")
	if (bar){
		maxX = bar.getBoundingClientRect().x
		maxWidth = bar.getBoundingClientRect().x + bar.getBoundingClientRect().width
	}
	
	const content_wrap = document.querySelector(".company-head-wrap") 

	if (maxWidthContent > maxWidth){	
		if (content_wrap) content_wrap.scrollLeft += scrollStep
		setTimeout( ()=>{emits('update:modelValue', id)}, 250)
	}
	else if (maxXContent < maxX){	
		if (content_wrap) content_wrap.scrollLeft -= scrollStep
		setTimeout( ()=>{emits('update:modelValue', id)}, 250)
	}
	else 
		emits('update:modelValue', id)

	
}

const scroll = ( x: number) => {
	
	const content_wrap = document.querySelector(".company-head-wrap") 
	if (content_wrap) content_wrap.scrollLeft += x
	
	setTimeout( ()=>{
			if (x>0) 
				emits('next')
			else
				emits('prev')
	}, 250)

}


</script>

<style>

</style>