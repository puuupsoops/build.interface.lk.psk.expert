<template>
	<div class="product-slider-fullscreen" v-if="modelValue" ref="target">

			<div class="product-slider-controls">
				<span
					v-for="(slide,key) in data"
					:key="key"
				>
					<input type="radio" :id="key" @click="shift(key - first)">
					<label :for="key" :class="first === key ? 'checked':''"></label>
					
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
						
						
						<img v-if="slide.src" :src="slide.src" alt="" />
				</div>

				<!-- Кнопка скачивания изображений-->
				<div class="product-button-stance">
							<div  class="product-button-stance-download">	
								<div class="product-button-stance-download-picture">
									<a >
										<svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
										<path d="M20 15V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18L4 15M8 11L12 15M12 15L16 11M12 15V3" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
										</svg>
									</a>
								</div>
							</div>
						</div>

				<!-- Блок кнопок снизу-->
				<div class="product-button-positions" >
					<div class="product-button-positions-btn product-button-positions-radius">
						<div class="product-button-positions-btn-img">
							<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
								<path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/>
							</svg>
						</div>
					</div>
					<div class="product-button-positions-btn">
						<div class="product-button-positions-btn-img">
							<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
								<path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z"/>
							</svg>
						</div>
					</div>
					<div class="product-button-positions-btn product-button-positions-rad">
						<div class="product-button-positions-btn-img">
							<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
								<path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/>
							</svg>
						</div>
					</div>
				</div>

			</transition-group>
			<div class='product-slider-arrow next' @click="next"></div>
			<div class='product-slider-close' @click="$emit('update:modelValue', false)"></div>
		</div>
	
</template>

<script lang="ts">
import { Sliders } from '/src/models/Components'

import { KeysMutations } from '/src/store/keys/mutations'
import { computed, createApp, defineComponent, ref, watch } from 'vue'
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
			//console.log(n)
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
