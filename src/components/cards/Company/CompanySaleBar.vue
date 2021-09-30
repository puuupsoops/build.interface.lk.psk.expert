<template>
	<div class="company-sale sale">
		<div class="sale-head">
			<div class="sale-title">Скидка 6 %</div>
			<div class="sale-lacks">Не хватает 51 710 до скидки 10 %</div>
		</div>
		<div class="sale-progressbar-wrap">
			<div class="sale-progressbar">
				<div class="sale-progressbar-line">
					<div class="sale-progressbar-val"><span class="sale-progressbar-val-money">(195 400)</span><span class="sale-progressbar-val-percent">73%</span></div>
				</div>
			</div>
			<div class="sale-progressbar-money">
				<div class="sale-progressbar-min">120 000</div>
				<div class="sale-progressbar-max">250 000</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props:{
		data: {
			type: Object
		}
	},
	setup(){

	}
}
</script>

<style>
	
</style>