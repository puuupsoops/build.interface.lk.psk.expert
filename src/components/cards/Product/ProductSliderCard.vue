<template>
<div class="content-elem">
	<div class="product-slider-wrap" v-if="!loader">
		<button class='product-slider-arrow prev' @click="previous"></button>

		<transition-group name="product-slider-trans" class='product-slider' tag="div">
				<div v-for="slide in slides" class='product-slider-slide' :key="slide.id">
					<img v-if="slide.src" :src="slide.src"  />
				</div>
		</transition-group>
		<div class='product-slider-arrow next' @click="next"></div>
		
	
		<transition-group name="product-slider-trans" class='product-slider-small' tag="div">
			<div v-for="slide in slides" class='product-slider-small-slide' :key="slide.id">
				<img v-if="slide.src" :src="slide.src"  />
			</div>
		</transition-group>
	

	</div>
		
	
	<div class="product-slider-buttons">
		<a class="product-slider-link" href="#">Сертификаты</a>
		<a id="product-slider-buttons-order" class="product-slider-link" href="#" style="display: block;">Заказать</a>
		<a class="product-slider-link" href="#">Добавить в КП</a>
	</div>
	
</div>
</template>

<script>
import { ref, onUpdated, inject } from 'vue'
export default {
	props:{
		data: {
			type: Array
		},
	},
	setup(props){
		let slides = ref([]);
	
		const loader = inject('loader');
		props.data.forEach( (v, i) => slides.value.push({id: i, src:v}));
		// if (slides.value.length % 2 == 0){
		// 			slides.value.push({id: slides.value.length, src:props.data[0]})
		// 		}

		onUpdated( () => {
				slides.value = [];
				props.data.forEach( (v, i) => slides.value.push({id: i, src:v}));
				// if (slides.value.length % 2 == 0){
				// 	slides.value.push({id: slides.value.length, src:props.data[0]})
				// }
				});

		let next = () => {
			const first = slides.value.shift();
			slides.value = slides.value.concat(first);
		};
		let previous = () => {
			const last = slides.value.pop();
			slides.value = [last].concat(slides.value);
		};
		

		return {
			loader,
			slides,
			next,
			previous,
			
		}
	}
}
</script>

<style lang="sass" scoped>


</style>