<template>
<div :class="disabled ? 'amount-input-wrap disable': 'amount-input-wrap'">
	<input 
		class="amount-input"
		type="text"
		:disabled="disabled"
		:value="modelValue"
		@input="$emit('update:modelValue', Number($event.target.value))"
		
		>
	<div
		:class="disabled ? 'amount-input-arrow plus disable' : 'amount-input-arrow plus'"
		@click="changeStep(step)"
		>

		<svg class="amount-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
		</svg>
	</div>
	<div
		:class="disabled ? 'amount-input-arrow minus disable' : 'amount-input-arrow minus'"
		@click="changeStep(-step)"
	>
		<svg class="amount-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
		</svg>
	</div>
</div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
export default defineComponent({
	props:{
		modelValue: {
			type: Number,
			required: true
		},
		step: {
			type: Number,
			default: 1
		},
		disabled:{
			type: Boolean,
			default: false
		},
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
		},

	},
	emits: ['update:modelValue', 'onInput'],

	setup(props, { emit }){
		
		watch( ()=>props.modelValue, (new_val, old_val) => {
			
			if (isNaN(new_val)) emit('update:modelValue', old_val)

			if (String(props.modelValue) == '') 
				emit('update:modelValue', 0)
			if (props.max !== undefined && Number(new_val) > props.max )
				emit('update:modelValue', old_val)
			if (props.min !== undefined && Number(new_val) < props.min )
				emit('update:modelValue', old_val)
			emit('onInput')
		});

		const changeStep = (v: number) => {
			if (!props.disabled )
				emit('update:modelValue', Number(props.modelValue) + v)
		}
		
		return {
			changeStep,
		}

	}
})
</script>

<style lang="sass" scoped>

</style>