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
						:class="'table-row' + (offer.count > 0 ? ' active': '') +(offer.count > offer.residue ? ' presail': '')"
						v-for="offer in characteristicArray"
						:key="offer.id"
					>
						<div class="table-elem"><span v-html="offer.characteristic"></span></div>
						<div class="table-elem"><span v-html="offer.residue"></span></div>
						<div class="table-elem"><span v-html="Number(offer.price).toLocaleString() + ' ₽'"></span></div>
						<div class="table-elem">
							<AmountInput 
								v-model="offer.count" 								
								@onInput="onInput(offer)"/>
								
							<CheckButton 
								v-model="offer.check" 
								@onClick="onCheck(offer)"/>
							
						</div>
						<div class="table-elem"><span v-html="offer.PPDATA"></span></div>
					</div>
				</div>
			</div>
		</div>
		<div 
			class="order-amount-more">
			<div
				:class="count != 0 || countPresail != 0 ? 'order-amount-more-btn':'order-amount-more-btn disable'" 
				@click="addToOrder()"
			>
				<span class="order-amount-more-text">Добавить в заказ </span>
				<span class="order-amount-more-value">({{count}})</span>
				<span class="order-amount-more-text presail" v-if="countPresail > 0"> + предзаказ </span>
				<span class="order-amount-more-value" v-if="countPresail > 0">({{countPresail}})</span>
			</div>
			
		</div>
	</div>
</template>


<script>

import AmountInput from '@/components/ui/AmountInput';
import CheckButton from '@/components/ui/CheckButton';

import { ref, computed, watch, onMounted } from 'vue';

export default {
	components: {
		AmountInput,
		CheckButton
	},
	props:{
		data: {
			type: Array
		},
		modelValue:{
			
		},
	},
	emits:['update:modelValue', 'onClick'],

	setup(props, { emit }){
		const characteristicArray = ref ([]);

		const count = computed(() => characteristicArray.value.filter(x => x.count <= x.residue & x.count > 0 ).length)
		const countPresail = computed(() => characteristicArray.value.filter(x => x.count > x.residue).length)

		const onCheck = (offer) => {
			if (offer.check) {
				characteristicArray.value.find(x => x.id == offer.id).count=1;
			} else {
				characteristicArray.value.find(x => x.id == offer.id).count=0;
			}
		}

		const onInput = (offer) => {
			if (offer.count > 0) {
				characteristicArray.value.find(x => x.id == offer.id).check=true;
			} else {
				characteristicArray.value.find(x => x.id == offer.id).check=false;
			}
			
		}

		const addToOrder = () => {
			if (count.value > 0 || countPresail.value > 0){
				let charArrPos = [];
				let charArrPosPresail = [];
				characteristicArray.value.forEach(x =>{ 
					if (x.count > 0 & x.count <= x.residue ){
						charArrPos.push({
									id: x.id,
									characteristic: x.characteristic,
									count: x.count,
									price: x.price,
									residue: x.residue,
								})
					} 
					if (x.count > x.residue) {
						charArrPosPresail.push({
									id: x.id,
									characteristic: x.characteristic,
									count: x.count,
									price: x.price,
									residue: x.residue,
								})
					}
				});
				emit('update:modelValue', {position: charArrPos, position_presail: charArrPosPresail});
				emit('onClick');
				characteristicArray.value.forEach( c => {
					c.count = 0;
					c.check = false;
				})
			}
		}

		const init = () => {
			characteristicArray.value = props.data.map(item => {
				return {
					id: item.ID,
					characteristic: item.CHARACTERISTIC,
					residue: item.RESIDUE,
					price: item.PRICE,
					ppdata: item.PPDATA,
					count: 0,
					check: false,
				}
			});
		}
		
		onMounted(() => {
			init();
		})

		watch(() => props.data, () => {
			init()
		})

		return {
			onCheck,
			onInput,
			addToOrder,
			count,
			countPresail,
			characteristicArray,
		}
	}
}
</script>
