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
						:class="'table-row' + (offer.count > 0 ? ' active': '') +(offer.count > offer.RESIDUE && offer.count != 0 ? ' presail': '')"
						v-for="offer in characteristicArray"
						:key="offer.ID"
					>
						<div class="table-elem"><span v-html="offer.CHARACTERISTIC"></span></div>
						<div class="table-elem"><span v-html="offer.RESIDUE"></span></div>
						<div class="table-elem"><span v-html="Number(offer.PRICE).toLocaleString() + ' ₽'"></span></div>
						<div class="table-elem">
							<AmountInput 
								v-model="offer.count" 								
								@onInput="onInput(offer)"/>
								
							<CheckButton 
								v-model="offer.check" 
								@onClick="onCheck(offer)"/>
							
						</div>
						<div class="table-elem"><span>{{offer.PPDATA}}</span></div>
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


<script lang="ts">

import AmountInput from '@/components/ui/AmountInput.vue'
import CheckButton from '@/components/ui/CheckButton.vue'
import { Offer } from '@/models/Product'
import { OrderStatePositionOffer } from '@/store/order/types'
//ProductOffersOrderCard используется для составления заказа
export interface OrderStateAddPositionItem extends OrderStatePositionOffer{
	check:           boolean;	
}


import { ref, computed, watch, onMounted, defineComponent, PropType } from 'vue'
export default defineComponent({
	components: {
		AmountInput,
		CheckButton
	},
	props:{
		data: {
			type: Array as PropType<Offer[]>,
			required: true,
		},
		modelValue:{
			type: Array as PropType<OrderStatePositionOffer[]>
		},
	},
	emits:['update:modelValue', 'onClick'],

	setup(props, { emit }){
		const characteristicArray = ref<OrderStateAddPositionItem[]> ([]);

		const count = computed(() => characteristicArray.value.filter(x => x.count > 0 ).length)
		const countPresail = computed(() => characteristicArray.value.filter(x => x.count > x.RESIDUE && x.count != 0).length)

		const onCheck = (offer: OrderStateAddPositionItem) => {
			if (offer.check) {
				let cnt = characteristicArray.value.find(x => x.ID == offer.ID)
				if (cnt) cnt.count = 1;
			} else {
				let cnt = characteristicArray.value.find(x => x.ID == offer.ID)
				if (cnt) cnt.count = 0;
			}
		}

		const onInput = (offer: OrderStateAddPositionItem) => {
			if (offer.count > 0) {
				let chk = characteristicArray.value.find(x => x.ID == offer.ID)
				if (chk) chk.check = true
				
			} else {
				let chk = characteristicArray.value.find(x => x.ID == offer.ID)
				if (chk) chk.check = false
			}
			
		}

		const addToOrder = () => {
			if (count.value > 0){
				let charArrPos = <OrderStatePositionOffer[]>[]
				characteristicArray.value.forEach(x =>{ 
					if ( x.count > 0 ){
						charArrPos.push(<OrderStatePositionOffer>{
									ID: x.ID,
									CHARACTERISTIC: x.CHARACTERISTIC,
									count: x.count,
									PRICE: x.PRICE,
									RESIDUE: x.RESIDUE,
									GUID: x.GUID,
									ORGGUID: x.ORGGUID,
								})
					}
				});
				emit('update:modelValue', charArrPos);
				emit('onClick');
				characteristicArray.value.forEach( c => {
					c.count = 0;
					c.check = false;
				})
			}
		}

		const init = () => {
			characteristicArray.value = props.data.map(item => {
				return <OrderStateAddPositionItem>{
					ID: item.ID,
					CHARACTERISTIC: item.CHARACTERISTIC,
					RESIDUE: item.RESIDUE,
					PRICE: item.PRICE,
					PPDATA: item.PPDATA,
					GUID: item.GUID,
					ORGGUID: item.ORGGUID,
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
})
</script>
