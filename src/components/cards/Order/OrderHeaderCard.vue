<template>
<div class="content-heading-wrap proudct-heading-wrap">
	<div class="content-heading-wrap-elem">
		<div class="content-heading" v-if="data.edit">Заказ № {{data.id}} от {{data.date}}</div>
		<div class="content-heading" v-else>Заказ № Новый заказ от {{(new Date(data.id)).toLocaleDateString('ru-RU')}}</div>
	</div>
	<div class="content-heading-wrap-elem">
		<div class="content-heading-price"> 
			<div>
				<div class="content-heading-price-text">Сумма заказа: </div>
				<div class="content-heading-info-elem" v-if="data.delivery.case=='other'" style="position: absolute; padding-bottom: 55px;">+Доставка: {{data.delivery.cost}} ₽</div>	
			</div>
			
			<div class="content-heading-price-value" v-if="data.total != data.total_discount">
				<span class="strikethrough"><span v-counter="data.total">{{ data.total }}</span> ₽</span>&nbsp;&nbsp;
				<span v-counter="data.total_discount"> {{ data.total_discount }}</span> ₽
			</div>
				
			<div class="content-heading-price-value" v-else>{{Number(data.total).toLocaleString('ru')}} ₽</div>
		</div>
		
	</div>
	<div class="content-heading-info"> 
		<div class="content-heading-info-elem"> <span class="content-heading-info-text">Количество единиц: </span><span class="content-heading-info-value">{{data.total_count}}</span></div>
		<div class="content-heading-info-elem" v-if="data.total_weight"> <span class="content-heading-info-text">Общий вес: </span><span class="content-heading-info-value">{{data.total_weight}} кг.</span></div>
		<div class="content-heading-info-elem" v-if="data.total_valume"> <span class="content-heading-info-text">Общий объем: </span><span class="content-heading-info-value">{{data.total_valume}} м.куб.</span></div>
		
	</div>
	<div class="content-heading-info" style="margin-top: 20px;"> 
		<div class="content-heading-info-elem" v-if="data.total_discount"> 
			<span class="content-heading-info-text">Будет сэкономлено: </span>
			<span class="content-heading-info-value"> <span v-counter="economy">{{ economy }}</span> ₽</span>
		</div>
	</div>
</div>
	
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { OrderStateOrder } from '/src/store/order/types';
const props = defineProps({
		data: {
			type: Object as PropType<OrderStateOrder>,
			required: true
		},
		discount:{
			type: Number
		},
	});

const economy = computed(() => {
	return Number(props.data.total ? Number(props.data.total) - Number(props.data.total_discount) : 0 )
});
</script>