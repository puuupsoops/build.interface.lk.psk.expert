<template>
		
	<div class="content-heading-wrap proudct-heading-wrap">
		<div class="content-heading-wrap-elem">
		<div 
			class="product-info-header"
			title="Выбрать другой продукт"
			@click="$emit('ShowSearch')"><span v-html="title"></span>
		</div>
		</div>
		<div class="content-heading-wrap-elem tooltip"  >
			<div class="content-heading-price" v-if="discount"> 
				<div class="content-heading-price-text">Ваша цена: </div>
				<div class="content-heading-price-value" v-if="discount">{{ Number(price ? price-(price/100)*discount : 0 ).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.') }} ₽</div>

				<div class="tooltiptext" style="	transform: translate3d(-10px, -30px, 0) ">
					<div class="content-heading-info-elem" v-if="discount"> скидка: {{discount}}%</div>
					<div class="content-heading-info-elem" v-else> выберите организацию</div>	
				</div>
			
		</div>
		
		<div class="content-heading-wrap-elem">
			<div class="content-heading-price"> 
			<div class="content-heading-price-text">Оптовая цена: </div>
			<div class="content-heading-price-value">{{ Number(price ? price : 0 ).toLocaleString('ru') }} ₽</div>
			</div>
		</div>
		<div class="content-heading-btn">
			
		</div>
		</div>
		<div class="content-heading-info"> 
		<div class="content-heading-info-elem" v-if="discount"> <span class="content-heading-info-text">Скидка: </span><span class="content-heading-info-value">{{discount}}%</span></div>
		<div class="content-heading-info-elem" v-if="status == 'Outlet' || status == 'Discount' || status == 'Activity'"> 
			<span class="content-heading-info-text">Скидка: </span><span class="content-heading-info-value">Не распостроняется</span>
		</div>

		<div class="content-heading-info-elem"> <span class="content-heading-info-text">Статус товара: </span><span class="content-heading-info-value" v-html="status"></span></div>
		</div>
	</div>

</template>

<script lang="ts">
export default {
	props:{
		title: {
			type: String
		},
		price: {
			type: String
		},
		status: {
			type: String
		},
		discount:{
			type: Number
		}
	},
	emits: ['ShowSearch']
}
</script>