<template>
	<div class="content-elem ">
		<div class="order-amount-table-wrap scroll-elem">
			
			<div class="table order-amount-table">
				<div class="table-row table-heading">
					<div class="table-elem">Характеристика</div>
					<div class="table-elem">Остаток</div>
					<div class="table-elem">Цена</div>
					<div class="table-elem">Количество</div>
					<div class="table-elem">Пп / Дата</div>
				</div>
				<div class="table-wrap">
					<div 
						class="table-row"
						v-for="offer in data"
						:key="offer.ID"
					>
						<div class="table-elem"><span v-html="offer.CHARACTERISTIC"></span></div>
						<div class="table-elem"><span v-html="offer.RESIDUE"></span></div>
						<div class="table-elem"><span v-html="Number(offer.PRICE).toLocaleString() + ' ₽'"></span></div>
						<div class="table-elem ">
							<AmountInput v-model="contPos" @onInput="onInput(offer.ID)" :disabled="Number(offer.RESIDUE) < 1"/>
							<CheckButton :disabled="Number(offer.RESIDUE) < 1"/>
						</div>
						<div class="table-elem"><span v-html="offer.PPDATA"></span></div>
					</div>
				</div>
			</div>
		</div>
		<div class="order-amount-more">
			<span class="order-amount-more-text">+ Добавить </span>
			<span class="order-amount-more-value">(2)</span>
		</div>
	</div>
</template>


<script>

import AmountInput from '@/components/ui/AmountInput';
import CheckButton from '@/components/ui/CheckButton';

import { ref } from 'vue';

export default {
	components: {
		AmountInput,
		CheckButton
	},
	props:{
		data: {
			type: Array
		},
	},

	setup(){
		const characteristicArray = ref ([]);
		const contPos = ref(0);
		const z = ref(false);
		let onInput = (v) => {
			console.log('onInput', v)
		}
		return {
			onInput,
			contPos,
			z,
			characteristicArray
		}
	}
}
</script>
