<template>
<div class="content-elem">
	<div class="product-slider-wrap" v-if="!loader">
		<button class='product-slider-arrow prev' @click="previous"></button>

		<transition-group name="product-slider-trans" class='product-slider' tag="div">
				<div v-for="slide in slides" class='product-slider-slide' :key="slide.id">
					<img
						v-if="slide.src"
						:src="slide.src" 
						@click="fullscreen=true"
					/>
				</div>
		</transition-group>
		<div class='product-slider-arrow next' @click="next"></div>
		
	
		<transition-group name="product-slider-trans" class='product-slider-small' tag="div">
			<div 
				v-for="slide in slides" 
				class='product-slider-small-slide'
				:key="slide.id"
			>
				<img 
					v-if="slide.src"
					:src="slide.src" 
				/>
			</div>
		</transition-group>
	

	</div>
		
	
	<div class="product-slider-buttons">
		<!-- <div class="product-slider-link">Сертификаты</div> -->
		<div
			class="product-slider-link"
			style="width: 100%"
			@click="$emit('toOrder', $event.target.click)"
		>Заказать</div>
		<!-- <div class="product-slider-link">Добавить в КП</div> -->
	</div>
	
	<ProductSliderFullscreen
		v-model="fullscreen"
		:data="data"
	> </ProductSliderFullscreen>
</div>
</template>

<script lang="ts">

import { key } from '/src/store'
import { ref, onUpdated, computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { KeysMutations } from '/src/store/keys/mutations'
import { Sliders } from '/src/models/Components'
import ProductSliderFullscreen from '/src/components/cards/Product/ProductSliderFullscreen.vue'

export default defineComponent({
	props:{
		data: {
			type: Array
		},
	},
	components:{
		ProductSliderFullscreen
	},
	emits: ['toOrder'],
	setup(props){

		let slides = ref<Sliders[]>([]);
		const store = useStore(key);
		const loader = computed<boolean>({
			get: () => store.getters.getLoader,
			set: (val: boolean) => store.commit(KeysMutations.SET_LOADER, val)
		})
		const fullscreen = ref(false)
		props.data?.forEach( (v, i) => slides.value.push(<Sliders>{ id: i, src: v }))
		// if (slides.value.length % 2 == 0){
		// 			slides.value.push({id: slides.value.length, src:props.data[0]})
		// 		}

		onUpdated( () => {
				slides.value = [];
				props.data?.forEach( (v, i) => slides.value.push(<Sliders>{id: i, src: v}))
				// if (slides.value.length % 2 == 0){
				// 	slides.value.push({id: slides.value.length, src:props.data[0]})
				// }
				});

		let next = () => {
			const first = <Sliders>slides.value.shift();
			slides.value = slides.value.concat(first);
		};
		let previous = () => {
			const last = <Sliders>slides.value.pop();
			slides.value = [last].concat(slides.value);
		};
		

		return {
			loader,
			slides,
			fullscreen,
			next,
			previous,
			
		}
	}
})
</script>

<style lang="sass" scoped>


</style>