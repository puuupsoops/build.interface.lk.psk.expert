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
						v-for="offer in characteristicArray"
						:key="offer.id"
					>
						<div class="table-elem"><span v-html="offer.characteristic"></span></div>
						<div class="table-elem"><span v-html="offer.residue"></span></div>
						<div class="table-elem"><span v-html="Number(offer.price).toLocaleString() + ' ₽'"></span></div>
						<div class="table-elem ">
							<AmountInput 
								v-model="offer.count" 
								:disabled="Number(offer.residue) < 1"
								@onInput="onInput(offer)"/>
							<CheckButton 
								v-model="offer.check" 
								:disabled="Number(offer.residue) < 1" 
								@onClick="onCheck(offer)"/>
						</div>
						<div class="table-elem"><span v-html="offer.PPDATA"></span></div>
					</div>
				</div>
			</div>
		</div>
		<div 
			:class="count == 0 ? 'order-amount-more disable' : 'order-amount-more'"
			@click="addToOrder()"
		>
			<span class="order-amount-more-text">+ Добавить </span>
			<span class="order-amount-more-value">({{count}})</span>
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

		const count = computed(() => characteristicArray.value.filter(x => x.check).length)

		const onCheck = (offer) => {
			if (offer.residue > 0 & offer.count == 0) {
				characteristicArray.value.find(x => x.id == offer.id).count=1;
			}
			if (offer.residue > 0 & offer.check == false) {
				characteristicArray.value.find(x => x.id == offer.id).count=0;
			}
		}

		const onInput = (offer) => {
			if (offer.residue > 0 & offer.count == 0) {
				characteristicArray.value.find(x => x.id == offer.id).check=false;
			}
			if (offer.residue > 0 & offer.count > 0) {
				characteristicArray.value.find(x => x.id == offer.id).check=true;
			}
		}

		const addToOrder = () => {
			if (count.value > 0){
				emit('update:modelValue', characteristicArray.value.filter(x => x.check))
				emit('onClick')
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
					check: false
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
			characteristicArray
		}
	}
}
</script>
