<template>
	<div class="help-9">
		<div class="help-9-wrap">
			<div class="help-box noborder el1"> 
				<div class="help-box-title">Добавление товаров в заказ</div>
			</div>
			
			<img  class="el2" src="/src/assets/img/help/help6_1.png"/>
			
			<div class="help-box el3">
				<div class="help-box-text">
					В Электронном каталоге нажимаем кнопку «Заказать»
				</div>
			</div>
			
			<div class="help-svg el4" >
				<svg
					xmlns="http://www.w3.org/2000/svg">
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-1" 
						x1="28.558" y1="346.649" x2="35.852" y2="335.132"/>
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-2" 
						x1="28.943" y1="346.649" x2="20.496" y2="335.517"/>
					<path 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow"
						d="M 4.32 3.788 L 36.992 4.093333333333333 C 69.664 4.398666666666666 135.008 5.009333333333333 173.17616666666666 16.917833333333334 C 211.34433333333334 28.826333333333334 222.33666666666667 52.03266666666667 227.37483333333333 92.03283333333333 C 232.413 132.03300000000002 231.49699999999999 188.827 225.84816666666666 224.5188333333333 C 220.19933333333333 260.21066666666667 209.81766666666667 274.8003333333333 176.11416666666665 282.2735 C 142.41066666666669 289.74666666666667 85.38533333333334 290.1033333333333 56.93883333333333 299.3288333333333 C 28.492333333333335 308.5543333333333 28.624666666666666 326.64866666666666 28.690833333333334 335.6958333333333 L 28.757 344.743" data-bx-d="M 4.32 3.788 U 200.352 5.62 U 233.329 75.239 U 230.581 245.621 U 199.436 289.39 U 28.36 290.46 U 28.757 344.743 1@d20e472d"/>
				</svg>
			</div>
			
			<img  class="el5" src="/src/assets/img/help/help9_1.png"/>
			
			<div class="help-box el6" v-if="data.scroll>=200 ||data.scroll200">
				<div class="help-box-text">
					В карточке товара нажимаем кнопку «Заказать»
				</div>
			</div>
			
			<div class="help-svg el7" v-if="data.scroll>=200 ||data.scroll200">
				<svg
					xmlns="http://www.w3.org/2000/svg">
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-1" 
						x1="369.028" y1="578.836" x2="375.66" y2="569.103"/>
					<line 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-2" 
						x1="368.833" y1="578.806" x2="360.568" y2="570.181"/>
					<path 
						stroke-linecap="round" stroke-linejoin="round" class="draw-arrow"
						d="M 6.859 5.145 L 25.580833333333334 5.2878333333333325 C 44.30266666666666 5.430666666666666 81.74633333333334 5.716333333333334 100.468 10.575333333333333 C 119.18966666666665 15.434333333333333 119.18933333333332 24.866666666666664 120.76116666666665 112.18633333333332 C 122.33300000000001 199.50599999999997 125.47700000000002 364.71299999999997 127.04899999999999 451.17516666666666 C 128.621 537.6373333333332 128.621 545.3546666666666 163.20583333333335 549.2133333333334 C 197.79066666666668 553.072 266.9603333333333 553.072 306.97583333333336 553.215 C 346.99133333333333 553.3580000000001 357.85266666666666 553.6439999999999 363.2833333333333 557.9313333333333 C 368.714 562.2186666666666 368.714 570.5073333333333 368.714 574.6516666666666 L 368.714 578.796" data-bx-d="M 6.859 5.145 U 119.19 6.002 U 119.189 34.299 U 128.621 529.92 U 128.621 553.072 U 336.13 553.072 U 368.714 553.93 U 368.714 578.796 1@e2a89609"/>
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
		onBeforeUnmount(() => { window.removeEventListener("scroll", onScroll)});
		onMounted(() => {
				window.scrollTo(0,0)
				window.addEventListener("scroll", onScroll);
		})
		return{
			data
		}
	}
})
</script>

<style>

</style>