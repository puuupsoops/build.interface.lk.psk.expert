<template>
	<div class="help-10">
		<div class="help-10-wrap">
			<div class="help-box noborder el1"> 
				<div class="help-box-title">Оформление заказа</div>
			</div>
			
			<img  class="el2" src="/src/assets/img/help/help10_1.png"/>
			
			<img  class="el3" src="/src/assets/img/help/help10_2.png"/>
			
			<div class="help-box el4">
				<div class="help-box-text">
					Выберите нужное количество необходимых характеристик
				</div>
			</div>
			
			<div class="help-svg el5" >
				<svg
					xmlns="http://www.w3.org/2000/svg">
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-1" 
						x1="640.21" y1="46.316" x2="629.251" y2="33.672"/>
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-2" 
						x1="640.21" y1="45.894" x2="649.061" y2="33.672"/>
					<path 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow"
						d="M 8.16 414.8 L 29.24 414.68666666666667 C 50.31999999999999 414.5733333333333 92.48 414.34666666666664 113.55999999999999 346.46000000000004 C 134.64 278.5733333333333 134.64 143.02666666666667 137.35999999999999 75.36666666666667 C 140.08 7.706666666666667 145.52 7.933333333333334 223.72000000000003 7.140000000000001 C 301.92 6.346666666666667 452.88000000000005 4.533333333333334 534.2533333333334 4.42 C 615.6266666666667 4.3066666666666675 627.4133333333334 5.8933333333333335 633.445 13.117166666666668 C 639.4766666666667 20.341 639.7533333333333 33.202000000000005 639.8916666666665 39.6325 L 640.03 46.063" data-bx-d="M 8.16 414.8 U 134.64 414.12 U 134.64 7.48 U 150.96 8.16 U 603.84 2.72 U 639.2 7.48 U 640.03 46.063 1@75bd62f2"/>
				</svg>
			</div>
			
			<div class="help-box el6" v-if="data.scroll>=100 ||data.scroll100">
				<div class="help-box-text">
					Нажмите «Добавить в заказ»
				</div>
			</div>
			
			<div class="help-svg el7" v-if="data.scroll>=100 ||data.scroll100">
				<svg
					xmlns="http://www.w3.org/2000/svg">
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-1" 
						x1="2.198" y1="7.396" x2="257.365" y2="7.711"/>
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-2" 
						x1="248.094" y1="2.181" x2="257.542" y2="7.873"/>
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow" 
						x1="249.019" y1="13.56" x2="257.685" y2="7.729"/>
				</svg>
			</div>
			
			<div class="help-box el8" v-if="data.scroll>=500 ||data.scroll500">
				<div class="help-box-text">
					Выберите на какую компанию оформляется заказ
				</div>
			</div>
			
			<div class="help-svg el9" v-if="data.scroll>=500 ||data.scroll500">
				<svg
					xmlns="http://www.w3.org/2000/svg">
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-1" 
						x1="12.915" y1="10.318" x2="8.503" y2="3.758"/>
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-2" 
						x1="3.717" y1="10.3" x2="8.789" y2="3.242"/>
					<path 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow"
						d="M 704.215 40.601 L 595.0701666666668 41.052166666666665 C 485.92533333333336 41.50333333333333 267.6356666666667 42.40566666666667 151.55333333333334 41.18233333333333 C 35.471 39.959 21.596 36.61000000000001 14.812999999999997 29.96466666666667 C 8.03 23.319333333333333 8.339 13.377666666666668 8.4935 8.406833333333333 L 8.648 3.436" data-bx-d="M 704.215 40.601 U 49.346 43.308 U 7.721 33.261 U 8.648 3.436 1@1ff97cbf"/>
				</svg>
			</div>
			
			<div class="help-box el10" v-if="data.scroll>=500 ||data.scroll500">
				<div class="help-box-text">
					Нажмите для оформления заказа
				</div>
			</div>
			
			<div class="help-svg el11" v-if="data.scroll>=500 ||data.scroll500">
				<svg
					xmlns="http://www.w3.org/2000/svg">
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-1" 
						x1="40.604" y1="236.866" x2="53.255" y2="244.458"/>
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-2" 
						x1="53.572" y1="244.457" x2="41.237" y2="252.681"/>
					<path 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow"
						d="M 82.474 4.034 L 72.02716666666667 4.033833333333333 C 61.580333333333336 4.033666666666666 40.68666666666667 4.033333333333334 27.823000000000004 9.100833333333334 C 14.959333333333333 14.168333333333335 10.125666666666666 24.30366666666667 7.240833333333334 59.69883333333333 C 4.356 95.094 3.42 155.749 6.304333333333333 190.83249999999998 C 9.188666666666666 225.91600000000003 15.893333333333333 235.428 24.313333333333333 240.106 C 32.73333333333333 244.784 42.86866666666666 244.62800000000001 47.93633333333333 244.54999999999998 L 53.004 244.472" data-bx-d="M 82.474 4.034 U 19.793 4.033 U 5.292 34.439 U 2.484 216.404 U 22.598 244.94 U 53.004 244.472 1@0ac96d90"/>
				</svg>
			</div>
			
			<div class="help-box el12" v-if="data.scroll>=800 ||data.scroll800">
				<div class="help-box-text">
					Из формы заказа можно создавать Черновики – Шаблоны для заказа.
					Достаточно добавить весь необходимый товар в заказ и нажать кнопку
					«Сохранить в черновик»
				</div>
			</div>
			<div class="help-svg el13" v-if="data.scroll>=800 ||data.scroll800">
				<svg
					xmlns="http://www.w3.org/2000/svg">
					<path 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow"
						d="M 4.853 15.369 L 10.245333333333333 12.740333333333332 C 15.637666666666666 10.111666666666666 26.42233333333333 4.854333333333333 38.5555 4.584833333333333 C 50.68866666666667 4.315333333333334 64.17033333333333 9.033666666666667 71.181 16.920166666666667 C 78.19166666666666 24.80666666666667 78.73133333333334 35.86133333333333 72.46249999999999 44.35466666666667 C 66.19366666666667 52.84799999999999 53.11633333333333 58.78 41.45483333333333 59.52166666666667 C 29.793333333333333 60.26333333333334 19.547666666666668 55.814666666666675 13.615833333333333 51.298333333333325 C 7.684 46.782000000000004 6.066 42.198 5.459166666666667 37.277166666666666 C 4.852333333333333 32.35633333333333 5.256666666666667 27.098666666666663 7.683166666666668 21.4365 C 10.109666666666667 15.774333333333333 14.558333333333335 9.707666666666666 16.782666666666668 6.674333333333333 L 19.007 3.641" data-bx-d="M 4.853 15.369 U 37.207 -0.403 U 77.652 13.752 U 79.271 46.916 U 40.039 64.712 U 9.302 51.366 U 4.448 37.614 U 5.661 21.841 U 19.007 3.641 1@13236e09"/>
				</svg>
			</div>
			
			<div class="help-svg el14" v-if="data.scroll>=800 ||data.scroll800">
				<svg
					xmlns="http://www.w3.org/2000/svg">
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-1" 
						x1="11.041" y1="66.733" x2="18.638" y2="56.922"/>
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-2" 
						x1="10.898" y1="66.745" x2="2.861" y2="56.921"/>
					<path 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow"
						d="M 233.259 3.044 L 196.04999999999998 3.0935 C 158.84099999999998 3.1430000000000002 84.42299999999999 3.2420000000000004 47.362833333333334 13.858833333333335 C 10.302666666666667 24.47566666666667 10.600333333333333 45.61033333333334 10.749166666666667 56.177666666666674 L 10.898 66.745" data-bx-d="M 233.259 3.044 U 10.005 3.341 U 10.898 66.745 1@3d45496f"/>
				</svg>
			</div>
			
		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent, onBeforeUnmount, onMounted, ref, watch} from 'vue'

export default defineComponent({
	setup(){
	
		const data = ref({
			scroll: 0,
			scroll100: false,
			scroll200: false,
			scroll500: false,
			scroll800: false,
			scroll1100: false,
		})
		const onScroll = (e: Event) => {
			const scroll = e.target as Document
			data.value.scroll = scroll.documentElement.scrollTop
		}
		watch(data.value, () => {
			if (data.value.scroll >= 100 ) data.value.scroll100 = true
			if (data.value.scroll >= 200 ) data.value.scroll200 = true
			if (data.value.scroll >= 500 ) data.value.scroll500 = true
			if (data.value.scroll >= 800 ) data.value.scroll800 = true
			if (data.value.scroll >= 1100 ) data.value.scroll1100 = true
		})
		onBeforeUnmount(() => { window.removeEventListener("scroll", onScroll)})
		onMounted(() => {
				window.scrollTo(0,0)
				window.addEventListener("scroll", onScroll)
		})
		return{
			data
		}
	}
})
</script>

<style>

</style>