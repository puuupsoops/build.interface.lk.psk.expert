<template>
	<div class="product-slider-fullscreen" v-if="modelValue">
		<div class="product-slider-wrap" ref="target">
				<div class="product-slider-controls">

					<span
						v-for="(slide,key) in data"
						:key="key"
					>
						<input type="radio" :id="key" @click="shift(key - first)">
						<label :for="key" :class="first == key ? 'checked':''"></label>
						
					</span>
				</div>
			<div class='product-slider-arrow prev' @click="previous"></div>		
			<transition-group name="product-slider-trans" class='product-slider big' tag="div">
				<div 
						v-for="slide in slides"
						class='product-slider-slide'
						:key="slide.id"
					>
						<img v-if="slide.src" :src="slide.src"  />
				</div>
			</transition-group>
			<div class='product-slider-arrow next' @click="next"></div>
			<div class='product-slider-close'></div>
		</div>
	</div>
	
	
</template>

<script lang="ts">
import { Sliders } from '@/models/Components'
import { key } from '@/store'
import { KeysMutations } from '@/store/keys/mutations'
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { onClickOutside } from '@vueuse/core'

export default defineComponent({
	props:{
		modelValue:{
			type: Boolean,
			default: false,
		},
		data: {
			type: Array
		},
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		let slides = ref<Sliders[]>([])
		const store = useStore(key)
		const loader = computed<boolean>({
			get: () => store.getters.getLoader,
			set: (val: boolean) => store.commit(KeysMutations.SET_LOADER, val)
		})
		const target = ref(null)
		
		const first = computed(()=>{ 
			if (slides.value.length == 0)
				return 0 
			else 
				return slides.value[0]?.id
		})
		
		onClickOutside(target, () =>  { emit('update:modelValue', false) })
		
		watch( ()=>props.modelValue, () => {
			slides.value = []
			props.data?.forEach( (v, i) => slides.value.push(<Sliders>{ id: i, src: v }))
		})

		function next():void {
			const first=<Sliders>slides.value.shift()
			slides.value=slides.value.concat(first)
		}
		function previous(): void {
			const last=<Sliders>slides.value.pop()
			slides.value=[last].concat(slides.value)
		}
		const shift = (n: number):void => {
			console.log(n)
			if (n > 0)
				slides.value = slides.value.concat(slides.value.splice(0, n))
			else
				slides.value = slides.value.splice(slides.value.length + n ,-1*n).concat(slides.value)
		}

		return {
			//data
			slides,
			loader,
			target,
			//computed
			first,
			//method
			next,
			previous,
			shift,
		}
	},
})
</script>
