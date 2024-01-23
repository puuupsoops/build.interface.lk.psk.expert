<template>

	<div class="company-sale sale">
		<div class="sale-head">
			<div class="sale-title">Скидка {{discount.discount}} %</div>
			<div class="sale-lacks" v-if="ostatok != Infinity">Не хватает <span>{{ostatok.toLocaleString('ru').replace(',','.')}}&nbsp;₽</span> до скидки {{discount.next}} %</div>

		</div>
		
		<div class="sale-progressbar-wrap">
			<div class="sale-progressbar content-elem tooltip">
					
				<div class="sale-progressbar-line" :style="'width: '+ (progressInPercent) +'%'">
					<div class="sale-progressbar-val">
						<div>
							<span class="sale-progressbar-val-money">({{spent.toLocaleString('ru').replace(',','.')}}&nbsp;₽)</span>
							<span class="sale-progressbar-val-percent">{{progressInPercent.toFixed(2)}}%</span>
						</div>
					</div>

				</div>
		
			</div>
			<div class="sale-progressbar-money">
				<div class="sale-progressbar-min">{{discount.progressMoneyMin.toLocaleString('ru')}}</div>
				<div class="sale-progressbar-max">{{discount.progressMoneyMax.toLocaleString('ru')}}</div>
			</div>
		</div>
			
		
		<div class="company-sale-card">
			<div class="table">
				<div class="table-row table-heading">
					<div class="table-elem" >Сумма заказа,руб</div>
					<div class="table-elem" >Сумма заказа,руб</div>
					<div class="table-elem" > Скидка,% </div>
				</div>

				<div class="table-row"
					v-for="(discount, key) in discountList"
					:key="key"
				>
					<div class="table-elem" v-if="key!=0 && discount.next!=0" >От {{discount.progressMoneyMin.toLocaleString('ru')}}</div>
					<div class="table-elem" v-if="key!=0 && discount.next!=0" >до {{discount.progressMoneyMax.toLocaleString('ru')}}</div>
					<div class="table-elem" v-if="key!=0 && discount.next!=0" >{{discount.discount}}</div>

					<div class="table-elem last" v-if="discount.next==0" ></div>
					<div class="table-elem last" v-if="discount.next==0" >Более {{discount.progressMoneyMin.toLocaleString('ru')}}</div>
					<div class="table-elem" v-if="discount.next==0" >{{discount.discount}}</div>
				</div>
					
					
			</div>
		</div>
	</div>

</template>

<script setup lang="ts">
import { computed } from 'vue';

interface DiscountList {

				progressMoneyMin: number;	// минимальный прого потраченных средств
				progressMoneyMax: number;	// максимальный порог потраченных средств
				discount: number;				// процент скидки
				next: number;					// следующая скидка
		
}


const props = defineProps({
		spent: { //Потраченно для определения скидки
			type: Number,
			required: true,
		}
	})
		
	const discountList = <DiscountList[]> [
		{
			progressMoneyMin: 0,	// минимальный прого потраченных средств
			progressMoneyMax: 50000,	// максимальный порог потраченных средств
			discount: 0,				// процент скидки
			next: 2					// следующая скидка
		
		},
		{
			progressMoneyMin: 50000,	
			progressMoneyMax: 99000,	
			discount: 2,				
			next: 3					
		},
		{
			progressMoneyMin: 100000,	
			progressMoneyMax: 199999,	
			discount: 3,				
			next: 4					
		},
		{
			progressMoneyMin: 200000,	
			progressMoneyMax: 399999,	
			discount: 4,				
			next: 6					
		},
		{
			progressMoneyMin: 400000,	
			progressMoneyMax: 599999,	
			discount: 6,				
			next: 8					
		},
		{
			progressMoneyMin: 600000,	
			progressMoneyMax: 799999,	
			discount: 8,				
			next: 9					
		},
		{
			progressMoneyMin: 800000,	
			progressMoneyMax: 999999,	
			discount: 9,				
			next: 10				
		},
		{
			progressMoneyMin: 1000000,	
			progressMoneyMax: 5999999,	
			discount: 10,				
			next: 15				
		},
		{
			progressMoneyMin: 6000000,	
			progressMoneyMax: 9999999,	
			discount: 15,				
			next: 17				
		},
		{
			progressMoneyMin: 10000000,	
			progressMoneyMax: 19999999,	
			discount: 17,				
			next: 18
		},
		{
			progressMoneyMin: 20000000,	
			progressMoneyMax: 29999999,	
			discount: 18,				
			next: 20
		},
		{
			progressMoneyMin: 30000000,	// минимальный прого потраченных средств
			progressMoneyMax: Infinity,	// максимальный порог потраченных средств
			discount: 20,				// процент скидки
			next: 0					// следующая скидка
		}
	]


	let discount = computed<DiscountList>(() => {
		
		let d = discountList.filter(v =>  props.spent >= v.progressMoneyMin 
												&&  props.spent < v.progressMoneyMax);
		return d.length > 0 ? d[0] : discountList[0];
	})

	let progressInPercent =  computed(() => {
		if (discount.value.progressMoneyMax != Infinity)
			return (props.spent/discount.value.progressMoneyMax) * 100// прогресс в процентах
		else return 100
	})

	const ostatok = computed(() => ((discount.value.progressMoneyMax - props.spent)))

</script>

<style lang="sass" scoped>


</style>