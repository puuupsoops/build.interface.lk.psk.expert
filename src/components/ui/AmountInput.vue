<template>
<div class="amount-input-wrap"
    :class="{ disabled }">
	<input 
		class="amount-input"
    :class="{ disabled }"
		type="text"
		:disabled="disabled"
		:value="modelValue"
		@input="onInput($event)"
		>
	<div class="amount-input-arrow"
		:class="{ disabled, 'plus': true }"
		@click="changeStep(step)"
		>

		<svg class="amount-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
		</svg>
	</div>
	<div class="amount-input-arrow"
		:class="{ disabled, 'minus': true }"
		@click="changeStep(-step)"
	>
		<svg class="amount-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
		</svg>
	</div>
</div>
</template>

<script setup lang="ts">
	import {  watch } from 'vue';
  import { PriceFormat } from '/src/models/Components'

	const props = defineProps({
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

	})
	const emits = defineEmits(['update:modelValue', 'onInput'])

	watch( ()=>props.modelValue, (new_val, old_val) => {
			
			if (isNaN(new_val)) emits('update:modelValue', old_val)

			if (String(props.modelValue) == '') 
				emits('update:modelValue', 0)
			if (props.max !== undefined && new_val > props.max )
				emits('update:modelValue', old_val)
			if (new_val < props.min )
				emits('update:modelValue', old_val)
			emits('onInput')
		});

	const changeStep = (v: number) => {
		if (!props.disabled ){
			const x = PriceFormat(props.modelValue + v).replace(/\s/g,'')
			emits('update:modelValue', Number(x))
		}
			
	}
	const onInput = (e: Event) => {
		if (e.target)
		emits('update:modelValue', Number((e.target as HTMLTextAreaElement).value))
	}

</script>

<style lang="sass">
@import '/src/assets/sass/mixin/index.sass'
@import '/src/assets/sass/style.sass'
.amount
  &-input
    padding: 12px 10px 12px 15px
    width: 100%
    color: $font-light-color
    background-color: $bg-color2
    border: 0
    border-radius: 6px
    +prefix(user-select, none)
    +prefix(transition, $default-transition)
    &.disabled
      opacity: 0.3
    &:focus
      color: $white

    &-wrap
      position: relative
      max-width: 80px
      min-width: 80px
      user-select: none
      //margin: 5px

      &.disabled
        opacity: 0.3

    &-arrow
      +flex
      position: absolute
      right: 5px
      width: 9px
      height: 20px
      +align-items(center)
      cursor: pointer

      &.disabled
        opacity: 0.3
        cursor: default

      &-img
        width: 100%

        path
          +prefix(transition, $default-transition)

      &:not(.disable):hover
        path
          fill: #A5A7A9

      &.plus
        top: 0

      &.minus
        bottom: 0
</style>