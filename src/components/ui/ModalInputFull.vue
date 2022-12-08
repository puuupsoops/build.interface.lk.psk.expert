<template>
	<div :class="'modal-input-wrap' +(show ? ' show': '')" ref="target">
		<div class="modal-input" >
			<input 
				:class="'modal-input-text' +(show ? ' show': '')"
				type="text"
				ref="searchInput"
				:value="modelValue"
				@input="inputModelValue($event)"
			>
			<label v-if="label!=''">{{label}}</label>
		</div>
		<div
			class="modal-input-btn" 
		>
			<div
				class="modal-input-btn-ok" 
				v-if="showOk"
				@click="$emit('onOk')"
			>
				<svg width="15" height="19" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path  d="M13.7952 0.265077C13.4418 -0.0883587 12.8687 -0.0883589 12.5153 0.265076L5.41912 7.36126L1.54498 3.48711C1.19154 3.13368 0.618512 3.13368 0.265076 3.48711C-0.0883589 3.84055 -0.0883588 4.41358 0.265077 4.76702L4.75226 9.2542C4.88175 9.38369 5.04072 9.46574 5.20757 9.50034C5.50792 9.57832 5.84052 9.49967 6.0758 9.26438L13.7952 1.54498C14.1486 1.19154 14.1486 0.618512 13.7952 0.265077Z" fill="#A5A7A9"/>
				</svg>
			</div>
			<div
				class="modal-input-btn-clear" 
				@click="modelValue =='' ? $emit('update:show', false) : $emit('update:modelValue','')"
			>
				<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"/>
					<rect width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"/>
				</svg>
			</div>
		
			
		</div>	
	</div>
	
	
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { onClickOutside } from '@vueuse/core'


	const props = defineProps({
		show: {
			type: Boolean,
			default: true
		},
		showOk: {
			type: Boolean,
			default: false
		},
		modelValue: {
			type: String,
			default: '',
		},
		label:{
			type: String,
			default:''
		}

	})
	const emits = defineEmits(['update:modelValue', 'update:show', 'onInput', 'onOk'])

	const target = ref(null)
	const searchInput = ref<any>(null)
		
	onClickOutside(target, () => {emits('update:show', false )})

	watch( ()=>props.show, () => {
		nextTick(() => {

			setTimeout(()=>{searchInput.value.focus()}, 500);
		});
		
		})
	
	const inputModelValue = (e: Event) =>{
		if (e.target)
			emits('update:modelValue',  (e.target as HTMLInputElement).value )
	}

</script>