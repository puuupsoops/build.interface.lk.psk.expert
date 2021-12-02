<template>
	<div class="orders-heading-search">
		<div class="orders-heading-search-elem">
			<div class="product-search-text">Поиск по: </div>
			<div class="orders-heading-search-select-wrap">
				<div class="orders-heading-search-select-elem">
					<SelectInput
						class="left"
						:data="data.left"
						v-model="leftInput"
					/>
				</div>
				<div class="orders-heading-search-select-elem">
					<SelectInput
						class="right"
						:data="data.right"
						v-model="rightInput"
					/>
					
				</div>
			</div>
			<div class="product-search-clear"></div>
		</div>
		<div class="orders-heading-search-elem">
			<div class="orders-heading-search-btn gradient-btn">
				<div class="gradient-btn-text">Поиск</div>
			</div>
		</div>
		</div>
</template>


<script>

import SelectInput from '@/components/ui/SelectInput';

import { ref } from 'vue'

export default {
	props: {
		data: {
			type: Object
		},
		modelValue: {
			type: Object,
		}
	},
	components:{
		SelectInput,
	},
	
	setup(){
		const leftInput = ref('');
		const rightInput = ref('');
		return{
			leftInput,
			rightInput
		}
	}
}
</script>