<template>
<div class="content-elem">
	<div class="product-slider-wrap" v-if="!loader">
		<div class='product-slider-arrow prev' @click="previous"></div>		
	
		<transition-group 
			name="product-slider-horisont-trans" 
			class='product-slider-horisont' tag="div"
		>
			<div 
				v-for="slide in slides"
				class='product-slider-horisont-slide'
				:key="slide.id"
			>
				<img v-if="slide.src" :src="slide.src"  />
			</div>
		</transition-group>

	<div class='product-slider-arrow next' @click="next"></div>

	</div>
		
	
	<div class="product-slider-buttons">
		<div class="product-slider-link">Детали</div>
		
		<div class="product-slider-link">Сертификаты</div>
	</div>
	
</div>
</template>

<script lang="ts">

import { key } from '@/store'
import { KeysMutations } from '@/store/keys/mutations';
import { ref, onUpdated, computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { Sliders } from '@/models/Components'

export default defineComponent({
	props:{
		data: {
			type: Array
		},
	},
	emits: ['toOrder'],
	setup(props){
		let slides = ref<Sliders[]>([])
		let store = useStore(key)
		const loader = computed<boolean>({
			get: () => store.getters.getLoader,
			set: (val: boolean) => store.commit(KeysMutations.SET_LOADER, val)
		})
		props.data?.forEach( (v, i) => slides.value.push(<Sliders>{id: i, src:v}))
		// if (slides.value.length % 2 == 0){
		// 			slides.value.push({id: slides.value.length, src:props.data[0]})
		// 		}

		onUpdated( () => {
				slides.value = []
				props.data?.forEach( (v, i) => slides.value.push(<Sliders>{id: i, src:v}))
				// if (slides.value.length % 2 == 0){
				// 	slides.value.push({id: slides.value.length, src:props.data[0]})
				// }
				});

		let next = () => {
			const first = <Sliders>slides.value.shift()
			slides.value = slides.value.concat(first)
		}
		let previous = () => {
			const last = <Sliders>slides.value.pop()
			slides.value = [last].concat(slides.value)
		}
		

		return {
			loader,
			slides,
			next,
			previous,
			
		}
	}
})
</script>

<style lang="sass" scoped>


</style>