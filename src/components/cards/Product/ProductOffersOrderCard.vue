<template>
	<div class="content-elem ">
		<div class="order-amount-table-wrap scroll-elem">
			
			<div class="table order-amount-table">
				<div class="table-row table-heading">
					<div class="table-elem">Характеристика</div>
					<div class="table-elem">Остаток</div>
					<!-- <div class="table-elem">Резерв</div> -->
					<div class="table-elem">Цена<span style="font-size: 10px" v-if="discount"> - {{discount}}%</span></div>
					<div class="table-elem">Количество</div>
					<div class="table-elem">Пп / Дата</div>
				</div>
				<div class="table-wrap">
					<div 
						:class="'table-row' + (offer.count > 0 ? ' active': '') +(offer.count > offer.RESIDUE && offer.count !== 0 ? ' presail': '')"
						v-for="offer in characteristicArray"
						:key="offer.ID"
					>
						<div class="table-elem"><span v-html="offer.CHARACTERISTIC"></span></div>
						<div class="table-elem"><span v-html="offer.RESIDUE"></span></div>
						<!-- <div class="table-elem"><span v-html="offer.RESERVED"></span></div> -->
						<div class="table-elem" v-if="discount"> <span v-html="Number(offer.PRICE-(offer.PRICE/100)*discount ).toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.')+ ' ₽'"></span></div>
						<div class="table-elem" v-else><span v-html="Number(offer.PRICE).toLocaleString('ru') + ' ₽'"></span></div>
						<div class="table-elem">
							<AmountInput 
								v-model="offer.count" 								
								@onInput="onInput(offer)"/>
								
							<CheckButton 
								v-model="offer.check" 
								@onClick="onCheck(offer)"/>
							
						</div>
						<div class="table-elem"><span>{{offer.PPDATA ? offer.PPDATA.replaceAll('/', '&nbsp;/&nbsp;'): ''}}</span></div>
					</div>
				</div>
			</div>
		</div>
		<div 
			class="order-amount-more">
			<div
				:class="count !== 0 || countPresail !== 0 ? 'order-amount-more-btn':'order-amount-more-btn disable'"
				@click="addToOrder()"
			>
				<span class="order-amount-more-text">Добавить в заказ </span>
				<span class="order-amount-more-value">({{count}})</span>
				<span class="order-amount-more-text presail" v-if="countPresail > 0"> + предзаказ </span>
				<span class="order-amount-more-value" v-if="countPresail > 0">({{countPresail}})</span>
			</div>
			<div
				:class="count !== 0 || countPresail !== 0 ? 'order-amount-more-btn':'order-amount-more-btn disable'"
				@click="goToKP()"
			>
				<span class="order-amount-more-text">Создать КП</span>
			</div>
		</div>
	</div>
</template>


<script setup lang="ts">

import AmountInput from '/src/components/ui/AmountInput.vue'
import CheckButton from '/src/components/ui/CheckButton.vue'
import { Offer } from '/src/models/Product'
import { OrderStatePositionOffer } from '/src/store/order/types'
//ProductOffersOrderCard используется для составления заказа
import {OrderStatePosition} from "/src/store/order/types";
import { ref, computed, watch, onMounted, PropType } from 'vue'
import { useStore } from '/src/store'
import { useRouter } from 'vue-router'
import { KPMutations } from "/src/store/kp/mutations";

interface OrderStateAddPositionItem extends OrderStatePositionOffer{
	check:           boolean;	
}

const props = defineProps({
	data: {
		type: Array as PropType<Offer[]>,
		required: true,
	},
	discount:{
		type: Number
	},
	modelValue:{
		type: Array as PropType<OrderStatePositionOffer[]>
	},
})
const emit = defineEmits(['update:modelValue', 'onClick'])

const characteristicArray = ref<OrderStateAddPositionItem[]> ([]);

const count = computed(() => characteristicArray.value.filter(x => x.count > 0 ).length)
const countPresail = computed(() => characteristicArray.value.filter(x => x.count > x.RESIDUE && x.count != 0).length)

const store = useStore()
const router = useRouter();

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

const goToKP = () => {
	if (count.value > 0) {
		let charArrPos = <OrderStatePositionOffer[]>[]
		characteristicArray.value.forEach(x =>{ 
			if ( x.count > 0 ){
				charArrPos.push(<OrderStatePositionOffer>{
							ID: x.ID,
							CHARACTERISTIC: x.CHARACTERISTIC,
							MAX_DISCOUNT: x.MAX_DISCOUNT,
							count: x.count,
							PRICE: x.PRICE,
							RESIDUE: x.RESIDUE,
							RESERVED: x.RESERVED,
							GUID: x.GUID,
							guid: x.GUID,
							ORGGUID: x.ORGGUID,
							price_discount: x.PRICE
						})
			}
		});
		characteristicArray.value.forEach( c => {
			c.count = 0;
			c.check = false;
		})
		let product = store.getters.getProduct;
		let kpPosition: OrderStatePosition = {
			product:         JSON.parse(JSON.stringify(product)),
			guid:            product.UID,
			article:         product.ARTICLE,
			characteristics: charArrPos,
			total:           charArrPos.length * product.PRICE,
			total_discount:  0,
			count:           charArrPos.length
		}
		store.commit(KPMutations.SET_KP_OFFER_POSITION, [kpPosition]) // 2 аргумент принимает массив!
      	store.commit(KPMutations.SET_KP_STEP, 2)
		router.push('/kp')
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
							MAX_DISCOUNT: x.MAX_DISCOUNT,
							count: x.count,
							PRICE: x.PRICE,
							RESIDUE: x.RESIDUE,
							RESERVED: x.RESERVED,
							GUID: x.GUID,
							guid: x.GUID,
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
			MAX_DISCOUNT: item.MAX_DISCOUNT,
			RESIDUE: item.RESIDUE,
			RESERVED: item.RESERVED,
			PRICE: item.PRICE,
			PPDATA: item.PPDATA,
			GUID: item.GUID,
			guid: item.GUID,
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

</script>
