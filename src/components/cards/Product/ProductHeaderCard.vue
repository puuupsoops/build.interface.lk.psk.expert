<template>
		
	<div class="content-heading-wrap proudct-heading-wrap" @click="$emit('ShowSearch')">
		<div class="content-heading-wrap-elem">
		<div class="product-info-header" title="Выбрать другой продукт"><span v-html="title"></span></div>
		</div>
		<div class="content-heading-wrap-elem">
			<div class="content-heading-price"> 
			<div class="content-heading-price-text">Ваша цена: </div>
			<div class="content-heading-price-value">{{ Number(price ? price : 0 ).toLocaleString() }} ₽</div>
		</div>
				<div class="content-heading-wrap-elem">
			<div class="content-heading-price"> 
			<div class="content-heading-price-text">Оптовая цена: </div>
			<div class="content-heading-price-value">{{ Number(price ? price : 0 ).toLocaleString() }} ₽</div>
			</div>
		</div>
		<div class="content-heading-btn">
			
		</div>
		</div>
		<div class="content-heading-info"> 
		<div class="content-heading-info-elem"> <span class="content-heading-info-text">Скидка: </span><span class="content-heading-info-value">Не распостроняется</span></div>
		<div class="content-heading-info-elem"> <span class="content-heading-info-text">Статус товара: </span><span class="content-heading-info-value" v-html="status"></span></div>
		</div>
	</div>

</template>

<script>
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
		}
	},
	emits: ['ShowSearch']
}
</script>