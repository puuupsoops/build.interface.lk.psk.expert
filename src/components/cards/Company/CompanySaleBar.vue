<template>
	<div class="tooltip">
	<div class="company-sale sale">
		<div class="sale-head">
			<div class="sale-title">Скидка {{discount.discount}} %</div>
			<div class="sale-lacks" v-if="ostatok != Infinity">Не хватает <span>{{ostatok.toLocaleString('ru').replace(',','.')}}&nbsp;₽</span> до скидки {{discount.next}} %</div>

		</div>
		
		<div class="sale-progressbar-wrap">
			<div class="sale-progressbar tooltip">
				
					
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
			
		</div>
					<span class="tooltiptext">
						<table>
							<tr><th>Сумма заказа,руб</th><th>Скидка,%</th></tr>
							<tr><td>От 3 до 5 млн.</td><td>12.5</td></tr>
							<tr><td>От 5 до 8 млн.</td><td>13.5</td></tr>
							<tr><td>От 8 до 15 млн.</td><td>14.4</td></tr>
							<tr><td>Более 15 млн.</td><td>16.3</td></tr>
						</table>
					</span>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

interface DiscountList {

				progressMoneyMin: number;	// минимальный прого потраченных средств
				progressMoneyMax: number;	// максимальный порог потраченных средств
				discount: number;				// процент скидки
				next: number;					// следующая скидка
		
}

export default defineComponent({
	props:{
		spent: { //Потраченно для определения скидки
			type: Number,
			required: true,
		}
	},
	setup(props){
		
		const discountList = <DiscountList[]> [
			{
				progressMoneyMin: 0,	// минимальный прого потраченных средств
				progressMoneyMax: 3000000,	// максимальный порог потраченных средств
				discount: 0,				// процент скидки
				next: 12.5					// следующая скидка
			
			},
			{
				progressMoneyMin: 3000000,	// минимальный прого потраченных средств
				progressMoneyMax: 5000000,	// максимальный порог потраченных средств
				discount: 12.5,				// процент скидки
				next: 13.5					// следующая скидка
			},
			{
				progressMoneyMin: 5000000,	// минимальный прого потраченных средств
				progressMoneyMax: 8000000,	// максимальный порог потраченных средств
				discount: 13.5,				// процент скидки
				next: 14.4					// следующая скидка
			},
			{
				progressMoneyMin: 8000000,	// минимальный прого потраченных средств
				progressMoneyMax: 15000000,	// максимальный порог потраченных средств
				discount: 14.4,				// процент скидки
				next: 16.3					// следующая скидка
			},
			{
				progressMoneyMin: 15000000,	// минимальный прого потраченных средств
				progressMoneyMax: Infinity,	// максимальный порог потраченных средств
				discount: 16.3,				// процент скидки
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
		return{
			discount,
			progressInPercent,
			ostatok: computed(() => ((discount.value.progressMoneyMax - props.spent))),
		}
	}
})

</script>

<style lang="sass" scoped>


</style>