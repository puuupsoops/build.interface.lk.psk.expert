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
			
			<div class="product-slider-actions" >
				<div class="product-slider-actions-btn">
					<div class="product-slider-actions-btn-img">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
							<path fill="#53565B" d="M24 12c0 6.6274-5.3726 12-12 12S0 18.6274 0 12 5.3726 0 12 0s12 5.3726 12 12zM12 2C6.4772 2 2 6.4772 2 12s4.4772 10 10 10 10-4.4772 10-10S17.5228 2 12 2zM7 13c-.5523 0-1-.4477-1-1s.4477-1 1-1h10c.5523 0 1 .4477 1 1s-.4477 1-1 1H7z">
							</path>
						</svg>
					</div>
				</div>
				<div class="product-slider-actions-btn">
					<div class="product-slider-actions-btn-img">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
							<path fill="#53565B"  d="M18.4142 7H22c.5523 0 1 .4477 1 1s-.4477 1-1 1h-6c-.5523 0-1-.4477-1-1V2c0-.5523.4477-1 1-1s1 .4477 1 1v3.5858l5.2929-5.293c.3905-.3904 1.0237-.3904 1.4142 0 .3905.3906.3905 1.0238 0 1.4143L18.4142 7zM17 18.4142V22c0 .5523-.4477 1-1 1s-1-.4477-1-1v-6c0-.5523.4477-1 1-1h6c.5523 0 1 .4477 1 1s-.4477 1-1 1h-3.5858l5.293 5.2929c.3904.3905.3904 1.0237 0 1.4142-.3906.3905-1.0238.3905-1.4143 0L17 18.4142zM7 5.5858V2c0-.5523.4477-1 1-1s1 .4477 1 1v6c0 .5523-.4477 1-1 1H2c-.5523 0-1-.4477-1-1s.4477-1 1-1h3.5858L.2928 1.7071C-.0975 1.3166-.0975.6834.2929.293c.3906-.3905 1.0238-.3905 1.4143 0L7 5.5858zM5.5858 17H2c-.5523 0-1-.4477-1-1s.4477-1 1-1h6c.5523 0 1 .4477 1 1v6c0 .5523-.4477 1-1 1s-1-.4477-1-1v-3.5858l-5.2929 5.293c-.3905.3904-1.0237.3904-1.4142 0-.3905-.3906-.3905-1.0238 0-1.4143L5.5858 17z">
							</path>
						</svg>
					</div>
				</div>
				<div class="product-slider-actions-btn">
					<div class="product-slider-actions-btn-img">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
							<path fill="#53565B" d="M11 11V7c0-.5523.4477-1 1-1s1 .4477 1 1v4h4c.5523 0 1 .4477 1 1s-.4477 1-1 1h-4v4c0 .5523-.4477 1-1 1s-1-.4477-1-1v-4H7c-.5523 0-1-.4477-1-1s.4477-1 1-1h4zm1-9C6.4772 2 2 6.4772 2 12s4.4772 10 10 10 10-4.4772 10-10S17.5228 2 12 2zm12 10c0 6.6274-5.3726 12-12 12S0 18.6274 0 12 5.3726 0 12 0s12 5.3726 12 12z">
							</path>
						</svg>
					</div>
				</div>
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
			<div class='product-slider-close' @click="$emit('update:modelValue', false)"></div>
		</div>
	</div>
	
	
</template>

<script lang="ts">
import { Sliders } from '/src/models/Components'

import { KeysMutations } from '/src/store/keys/mutations'
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from '/src/store'
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
		const store = useStore()
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
