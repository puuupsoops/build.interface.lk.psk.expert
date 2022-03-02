<template>
	<div class="orders-heading-search">
		<div class="orders-heading-search-elem">
			<div class="product-search-text">Поиск по: </div>
			<div class="orders-heading-search-select-wrap">
				<div class="orders-heading-search-select-elem">
					<SelectInput
						class="left"
						:data="data"
						v-model="leftInput"
					/>

				</div>
				<div class="orders-heading-search-select-elem">
					<div class="product-search-input right" >
						<input 
							@keyup.enter="doSearch"
							:disabled="leftInput == 0"
							ref="searchInput"
							v-model="search_str"
						/>
						
					</div>
					<!-- <SelectInput
						class="right"
						:data="data.right"
						v-model="rightInput"
					/> -->
					
				</div>
			</div>
			<div class="product-search-clear" @click="$emit('update:modelValue', null); search_str=''; leftInput=0"></div>
		</div>
		<div class="orders-heading-search-elem">
			<div class="orders-heading-search-btn gradient-btn">
				<div class="gradient-btn-text" @click="doSearch">Поиск</div>
			</div>
		</div>
		</div>
</template>


<script lang="ts">

import SelectInput from '@/components/ui/SelectInput.vue'
import { SelectInputData } from '@/models/Components'

import { defineComponent, ref, PropType, watch, nextTick } from 'vue'

export default defineComponent({
	props: {
		data: {
			type: Array as PropType<SelectInputData[]>,
			require: true,
		},
		modelValue: {
			type: Object,
		}
	},
	components:{
		SelectInput,
	},
	emits: ['update:modelValue'],
	setup(props, {emit}){
		const leftInput = ref(0);
		const searchInput = ref<any>(null)
		const search_str = ref('');
		watch( ()=>leftInput.value, () => {
			nextTick(() => { searchInput.value.focus() });
			search_str.value = ''
			emit('update:modelValue', null)
		})
		const doSearch = ()=> {
			emit('update:modelValue', {id: leftInput, search: search_str.value})
		}
		return{
			leftInput,
			searchInput,
			search_str,
			doSearch
		}
	}
})
</script>