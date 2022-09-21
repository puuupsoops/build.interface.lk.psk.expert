<template>
	<div class="help-11">
		<div class="help-11-wrap">
			<div class="help-box noborder el1"> 
				<div class="help-box-title">Оформление заказа</div>
			</div>
			
			<img  class="el2" src="/src/assets/img/help/help10_1.png"/>
			
			<img  class="el3" src="/src/assets/img/help/help11_1.png"/>
			
			<div class="help-box el4">
				<div class="help-box-text">
					Для того чтобы добавить новый товар в заказ нажимаем на кнопку «Поиск» и введите название нового товара
				</div>
			</div>
			
			<div class="help-svg el5" >
				<svg
					xmlns="http://www.w3.org/2000/svg">
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-1" 
						x1="22.389" y1="403.351" x2="6.947" y2="411.518"/>
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-2" 
						x1="6.525" y1="411.689" x2="22.689" y2="421.146"/>
					<path 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow"
						d="M 248.807 2.85 L 240.59866666666665 2.7405000000000004 C 232.3903333333333 2.6310000000000002 215.97366666666665 2.4120000000000004 207.21816666666663 8.759833333333333 C 198.46266666666665 15.107666666666667 197.36833333333334 28.022333333333332 197.23566666666667 94.09883333333333 C 197.10299999999998 160.17533333333333 197.93200000000002 279.41366666666664 197.1285 341.4289999999999 C 196.32500000000002 403.44433333333336 193.889 408.2366666666667 161.9545 410.3441666666667 C 130.02 412.45166666666665 68.587 411.87433333333337 37.8705 411.58566666666667 L 7.154 411.297" data-bx-d="M 248.807 2.85 U 199.557 2.193 U 196.274 40.937 U 198.761 398.652 U 191.453 413.029 U 7.154 411.297 1@55dc21a7"/>
				</svg>
				
			</div>
			
			<div class="help-box el6">
				<div class="help-box-text">
									Если вы не завершили оформление заказа и вышли в другой раздел вернуться обратно
				можно по нажатию на «Новый заказ» или быструю кнопку «Сделать заказ» при этом на нем
				будет цифровое уведомление
				</div>
			</div>
			
			<div class="help-svg el7">
				<svg
					xmlns="http://www.w3.org/2000/svg">
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-1" 
						x1="15.579" y1="219.196" x2="5.515" y2="225.999"/>
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-2" 
						x1="5.668" y1="225.846" x2="15.297" y2="233.037"/>
					<path 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow"
						d="M 79.6 4 L 79.53333333333333 38.6 C 79.46666666666665 73.2 79.33333333333333 142.4 79.26666666666667 179.46666666666667 C 79.2 216.53333333333333 79.2 221.46666666666667 66.86666666666666 223.86666666666667 C 54.53333333333333 226.26666666666665 29.86666666666667 226.13333333333333 17.533333333333335 226.0666666666667 L 5.2 226" data-bx-d="M 79.6 4 U 79.2 211.6 U 79.2 226.4 U 5.2 226 1@126a4abc"/>
				</svg>
			</div>
			
			<div class="help-svg el8">
				<svg
					xmlns="http://www.w3.org/2000/svg">
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-1" 
						x1="8.547" y1="81.116" x2="13.78" y2="73.266"/>
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-2" 
						x1="2.965" y1="73.092" x2="8.373" y2="81.116"/>
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow" 
						x1="8.373" y1="3.314" x2="8.373" y2="81.814"/>
					
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