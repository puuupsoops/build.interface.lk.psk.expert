<template>
	<div :class="'modal-input-wrap' +(show ? ' show': '')" ref="target">
		<div class="modal-input" ref="target">
			<input 
				:class="'modal-input-text' +(show ? ' show': '')"
				type="text"
				ref="searchInput"
				:value="modelValue"
				@input="$emit('update:modelValue', $event.target.value)"
			>
			
		</div>
		<div
			class="product-search-clear" 
			@click="modelValue =='' ? $emit('update:show', false) : $emit('update:modelValue','')">
		</div>
	</div>
	
</template>

<script lang="ts">
import { ref, defineComponent, watch, nextTick } from 'vue'
import { onClickOutside } from '@vueuse/core'


export default defineComponent({
	props: {
		show: {
			type: Boolean,
			default: true
		},
		modelValue: {
			type: String,
			default: '',
		}
	},
	emits: ['update:modelValue', 'update:show', 'onInput'],
	setup(props, { emit }){
		const target = ref(null)
		const searchInput = ref<any>(null)
		
		onClickOutside(target, () => {emit('update:show', false ) })
		
		watch( ()=>props.show, () => {
			nextTick(() => {

				setTimeout(()=>{searchInput.value.focus()}, 500);
			});
			
			})
		

		return{
			target,
			searchInput,
		}
	}
})
</script>