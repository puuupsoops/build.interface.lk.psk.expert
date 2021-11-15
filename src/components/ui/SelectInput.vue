<template>
	<div class="select-input-container" ref="target">

		<button 
			:class="input_active ? 'select-input-btn active' : 'select-input-btn'"
			@click="input_active = !input_active"
		>
			{{ active_name}}
		</button>
		<div 
			:class="input_active ? 'select-input-options active' : 'select-input-options'"
		>
			<p 
				v-for="i in data"
				:key="i.id"
				:class="i.id == modelValue ? 'select-input-item active' : 'select-input-item'"
				@click="$emit('update:modelValue', i.id); $emit('onInput')"
			>
				{{i.name}}
			</p>
			
		</div>
	</div>
	
</template>

<script>
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'

export default {
	props: {
		data: {
			type: Array
		},
		modelValue: {
			type: String,
			required: true
		}
	},
	emits: ['update:modelValue','onInput'],
	setup(props){
		const input_active = ref(false)
		const target = ref(null)
		const active_name = computed(() => {
			let obj = props.data.find(x => x.id == props.modelValue);
			if (obj)
				return obj.name
			else
				return '---'
		});
		onClickOutside(target, () => input_active.value=false)
		
		return{
			active_name,
			input_active,
			target
		}
	}
}
</script>