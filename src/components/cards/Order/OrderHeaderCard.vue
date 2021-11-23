<template>
<div class="content-heading-wrap proudct-heading-wrap">
		<div class="content-heading-wrap-elem">
		<div class="content-heading">Заказ № Новый заказ от {{(new Date(data.id)).toLocaleDateString()}}</div>
		</div>
		<div class="content-heading-wrap-elem">
		<div class="content-heading-price"> 
			<div class="content-heading-price-text">Сумма заказа: </div>
			<div class="content-heading-price-value">{{Number(data.total).toLocaleString()}} ₽</div>
		</div>
		</div>
		<div class="content-heading-info"> 
		<div class="content-heading-info-elem"> <span class="content-heading-info-text">Колечество едениц: </span><span class="content-heading-info-value">{{data.total_count}}</span></div>
		<div class="content-heading-info-elem"> <span class="content-heading-info-text">Общий вес: </span><span class="content-heading-info-value">{{data.total_weight}} кг.</span></div>
		<div class="content-heading-info-elem"> <span class="content-heading-info-text">Общий объем: </span><span class="content-heading-info-value">{{data.total_valume}} м.куб.</span></div>
	</div>
</div>
	
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
		}
	},
	setup() {
		
	}
}
</script>