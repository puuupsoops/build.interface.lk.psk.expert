<template>

		<div class="top-line-card scroll-elem">
						<!-- <div class="top-line-card-more-info active"></div> -->
						<div class="top-line-card-wrap">
							<a 
									v-for="(company, i) in data" 
									:key="i"
									:class="getClassA(company)"
									@click="$emit('update:modelValue', company.id)"
									href="#">
								{{ company.name}}
							</a>
						
							<a class="top-line-card-add" href="#"></a>
						</div>
			</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import { CompanysList } from '/src/models/Partner'


const props = defineProps({
	data: {
		type: Array as PropType<CompanysList[]>,
	},
	modelValue: {
		type: String,
		required: true
	}
})
const emit = defineEmits(['update:modelValue'])
const getClassA = (company: CompanysList) => 
	{
		return company.id===props.modelValue ?	'top-line-card-item orange'	:'top-line-card-item green'
		}


</script>

<style>
</style>