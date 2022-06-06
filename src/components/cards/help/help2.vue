<template>
	<div class="help-2">
		<img src="@/assets/img/help/help2_1.png"/>
		
		<div class="help-2-wrap">
			<img src="@/assets/img/help/help2_2.png"/>
			<div class="help-box"> 
				<div class="help-box-title">Мои компании</div>
				<div class="help-box-text">Раздел компаний контрагента 
					кнопоки компании дублируются
					на всех страницах и имеют
					цветовую индикацию
					состояния
				</div>
			</div>
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com">
				<line 
					stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-1" 
					x1="50.157" y1="17.671" x2="58.548" y2="3.802"/>
				<line 
					stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-2" 
					x1="67.433" y1="16.546" x2="59.388" y2="4.31"/>
				<path 
					stroke-linecap="round" stroke-linejoin="round" class="draw-arrow"
					d="M 607.241 120.718 L 515.2221666666667 124.044 C 423.2033333333333 127.37 239.16566666666665 134.02200000000002 147.7628333333333 114.55883333333333 C 56.35999999999999 95.09566666666667 57.592000000000006 49.51733333333334 58.208 26.728166666666667 L 58.824 3.939" data-bx-d="M 607.241 120.718 U 55.128 140.674 U 58.824 3.939 1@3e07f1ed"/>
			</svg>
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com">
				<line 
					stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-1" 
					x1="5.277" y1="14.65" x2="13.409" y2="3.968"/>
				<line 
					stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-2" 
					x1="20.263" y1="13.484" x2="13.783" y2="4.855"/>
				<path 
					stroke-linecap="round" stroke-linejoin="round" class="draw-arrow"
					d="M 231.481 316.83 L 259.24533333333335 317.14549999999997 C 287.00966666666665 317.461 342.53833333333336 318.09200000000004 362.5201666666667 286.0156666666667 C 382.502 253.93933333333334 366.93700000000007 189.15566666666666 303.31033333333335 154.976 C 239.68366666666668 120.79633333333334 127.99533333333333 117.22066666666666 71.62533333333333 97.13366666666667 C 15.255333333333333 77.04666666666667 14.203666666666665 40.44833333333333 13.677833333333332 22.149166666666662 L 13.152 3.85" data-bx-d="M 231.481 316.83 U 398.067 318.723 U 351.372 124.372 U 16.307 113.645 U 13.152 3.85 1@4543a40b"/>
			</svg>
		</div>
		<div class="help-btn">
			<router-link class="help-btn-close"
				tag="a"
				to="/" 
			>
				Закрыть
			</router-link>
			
			<div class="help-btn-next">
				Далее
			</div>
		</div>
	</div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
	
})
</script>

<style>

</style>