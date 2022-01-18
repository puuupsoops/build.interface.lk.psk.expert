<template>
	<div class="select-input-container" ref="target">

		<button 
			:class="btn_class"
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
				@click="$emit('update:modelValue', i.id); $emit('onInput');input_active = !input_active"
			>
				{{i.name}}
			</p>
			
		</div>
	</div>
	
</template>

<script lang="ts">
import { ref, computed, defineComponent, PropType } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { SelectInputData } from '@/models/Components'


export default defineComponent({
	props: {
		data: {
			type: Array as PropType<SelectInputData[]>,
            require: true
		},
		error: {
			type: Boolean,
			default: false,
		},
		modelValue: {
			type: [String, Number],
			default: '',
		}
	},
	emits: ['update:modelValue','onInput'],
	setup(props){
		const input_active = ref(false)
		const target = ref(null)
		const active_name = computed(() => {
			let obj = props.data?.find(x => x.id == props.modelValue);
			if (obj)
				return obj.name
			else
				return '---'
		});
		onClickOutside(target, () => input_active.value=false);
		
		const btn_class = computed(() => {
			let cls = 'select-input-btn';
			if (input_active.value)
				cls = cls + ' active';
			if (props.error)
				cls = cls + ' error';
			return cls
		});

		return{
			active_name,
			btn_class,
			input_active,
			target
		}
	}
})
</script>