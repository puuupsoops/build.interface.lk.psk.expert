<template>
<div class="content-heading-wrap proudct-heading-wrap">
		<div class="content-heading-wrap-elem">
		<div class="content-heading" v-if="data.edit">Заказ № {{data.id}} от {{data.date}}</div>
		<div class="content-heading" v-else>Заказ № Новый заказ от {{(new Date(data.id)).toLocaleDateString('ru-RU')}}</div>
		</div>
		<div class="content-heading-wrap-elem">
		<div class="content-heading-price"> 
			<div class="content-heading-price-text">Сумма заказа: </div>
			<div class="content-heading-price-value" v-if="data.total != data.total_discount">
				<span class="strikethrough">{{ Number(data.total).toLocaleString('ru')}} ₽</span>
				{{ Number(data.total_discount).toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.') }} ₽
				
			</div>
			<div class="content-heading-price-value" v-else>{{Number(data.total).toLocaleString('ru')}} ₽</div>
		</div>
		</div>
		<div class="content-heading-info"> 
		<div class="content-heading-info-elem"> <span class="content-heading-info-text">Количество единиц: </span><span class="content-heading-info-value">{{data.total_count}}</span></div>
		<div class="content-heading-info-elem" v-if="data.total_weight"> <span class="content-heading-info-text">Общий вес: </span><span class="content-heading-info-value">{{data.total_weight}} кг.</span></div>
		<div class="content-heading-info-elem" v-if="data.total_valume"> <span class="content-heading-info-text">Общий объем: </span><span class="content-heading-info-value">{{data.total_valume}} м.куб.</span></div>
	</div>
</div>
	
</template>

<script lang="ts">
export default {
	props: {
		data: {
			type: Object,
		},
		discount:{
			type: Number
		},
	},
	setup() {
		
	}
}
</script>