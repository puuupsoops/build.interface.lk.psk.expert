<template>

<div
	v-if="data"
	:class="'company-head-item ' + ( data.debt > 1000 ? 'red' : 'yellow' ) + (active ?' content-elem-active': '')"
	v-on:click="$emit('onClick', $event)"
	>
	<div class="content-elem">
		<!-- <div class="company-card-agr">
			<div class="company-card-agr-box">
				<span class="company-card-sale-text">Договор</span>
				<div class="company-card-sale-value">{{data.contract}}</div>
			</div>
		</div> -->
		
		<div class="company-head-item-title">{{data.name}}</div>
		<div class="company-card-sale">
			<div class="company-card-sale-box">
				<span class="company-card-sale-text">Скидка</span>
				<div class="company-card-sale-value">{{data.discount}} %</div>
			</div>
		</div>
	
		<div class="company-card-balance">
			<div class="company-card-balance-box">
				<div v-if="data.debt>0" class="company-head-info-elem l highlight">Долг: {{data.debt_str.toLocaleString().replace(',','.')}} ₽</div>
				<div v-else class="company-head-info-elem l highlight">Баланс: {{data.balance.toLocaleString().replace(',','.')}} ₽</div>
			</div>
		</div>
		
		<div class="company-head-info">
			
			<div class="company-head-info-row">
				<div class="company-head-info-elem l">
					<span class="company-head-info-title">Отстрочка</span>
					<span class="company-head-info-val" v-if="data.deferment>0">{{data.deferment}} {{getDay(data.deferment)}}</span>
					<span class="company-head-info-val" v-else>Предоплата</span>
				</div>
				<div class="company-head-info-elem r">
					<span class="company-head-info-title">Дата погашения</span>
					<span class="company-head-info-val" >{{ data.debt>0 ? data.date : '--.--.--'}}</span>
				</div>
			</div>
		</div>
		<div class="company-card-footer">
				
			<div class="company-head-info-elem l">
				<span class="company-head-info-title">Договор</span>
				<span class="company-head-info-val">{{data.contract}}</span>
			</div>
			
			<div v-if="active" :class="'company-card-showdoc' + ( showDoc ? ' active' : '')"
				@click="$emit('onShowDoc')"
			>
				<div
					tooltip="Показать документы"
					flow="left" 
				>
					<svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.84625 6.4597L2.68453 0.298103C2.54202 0.155477 2.35178 0.076904 2.14893 0.0769041C1.94608 0.0769041 1.75584 0.155478 1.61332 0.298103L1.15956 0.751758C0.864288 1.04737 0.864288 1.52781 1.15956 1.82297L6.3337 6.99711L1.15382 12.177C1.01131 12.3196 0.932619 12.5097 0.932619 12.7125C0.932619 12.9154 1.01131 13.1056 1.15382 13.2483L1.60759 13.7019C1.75021 13.8445 1.94034 13.9231 2.14319 13.9231C2.34604 13.9231 2.53628 13.8445 2.6788 13.7019L8.84625 7.53463C8.9891 7.39155 9.06756 7.20052 9.06711 6.99745C9.06756 6.79358 8.9891 6.60267 8.84625 6.4597Z" fill="#A5A7A9"/>
					</svg>

				</div>
	
			</div>
		</div>
	</div>

	<div class="company-head-sale " tooltip="Сумма отгрузок по договору"
				flow="up" >
		<div class="sale-val">
			<span class="sale-val-money">{{data.spent.toLocaleString().replace(',','.')}}  ₽</span>
		</div>
	</div>
	
</div>


<div
	v-else
	class="company-head-item yellow">
	<div class="content-elem active">
		<div class="company-head-item-title" style="margin-right: 100px;">Договор отсутствует</div>

		<div class="company-card-sale">
			<div class="company-card-sale-box"><span class="company-card-sale-text">Скидка</span>
				<div class="company-card-sale-value">Скидка %</div>
			</div>
		</div>
		
		<div class="company-card-balance">
			<div class="company-card-balance-box">
				<div  class="company-head-info-elem l highlight">Баланс: 0 ₽</div>
			</div>
		</div>
		

		<div class="company-head-info">
			<div class="company-head-info-row">
				<div class="company-head-info-elem l">
					<span class="company-head-info-title">Отстрочка</span>
					<span class="company-head-info-val">0 дней</span>
					
				</div>
				<div class="company-head-info-elem r">
					<span class="company-head-info-title">Дата погашения</span>
					<span class="company-head-info-val" >--.--.--</span>
				</div>
			</div>
		</div>
	</div>
	<div class="company-head-sale " tooltip="Сумма отгрузок по договору"
				flow="up" >
		<div class="sale-val">
			<span class="sale-val-money">0  ₽</span>
		</div>
		
		<!-- <div :class="'sale-tooltip' + (active ?' active': '')" style="width: auto" 
				tooltip="Всего потрачено по договору"
				flow="left" 
		>
			<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
				<path class="fill" fill="#A5A7A9" d="M12.05 17.125Q12.35 17.125 12.562 16.913Q12.775 16.7 12.775 16.375Q12.775 16.075 12.562 15.863Q12.35 15.65 12.05 15.65Q11.725 15.65 11.513 15.863Q11.3 16.075 11.3 16.375Q11.3 16.7 11.513 16.913Q11.725 17.125 12.05 17.125ZM11.55 13.9H12.45Q12.475 13.25 12.688 12.85Q12.9 12.45 13.525 11.825Q14.2 11.175 14.513 10.65Q14.825 10.125 14.825 9.45Q14.825 8.3 14.025 7.612Q13.225 6.925 12.1 6.925Q11.05 6.925 10.312 7.487Q9.575 8.05 9.225 8.8L10.1 9.15Q10.35 8.6 10.788 8.188Q11.225 7.775 12.05 7.775Q13.025 7.775 13.475 8.312Q13.925 8.85 13.925 9.5Q13.925 10.025 13.65 10.412Q13.375 10.8 12.925 11.225Q12.1 12 11.825 12.562Q11.55 13.125 11.55 13.9ZM12 20.85Q10.15 20.85 8.538 20.163Q6.925 19.475 5.725 18.275Q4.525 17.075 3.838 15.462Q3.15 13.85 3.15 12Q3.15 10.15 3.838 8.537Q4.525 6.925 5.725 5.725Q6.925 4.525 8.538 3.837Q10.15 3.15 12 3.15Q13.85 3.15 15.463 3.837Q17.075 4.525 18.275 5.725Q19.475 6.925 20.163 8.537Q20.85 10.15 20.85 12Q20.85 13.85 20.163 15.462Q19.475 17.075 18.275 18.275Q17.075 19.475 15.463 20.163Q13.85 20.85 12 20.85ZM12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12ZM12 19.925Q15.3 19.925 17.613 17.613Q19.925 15.3 19.925 12Q19.925 8.7 17.613 6.387Q15.3 4.075 12 4.075Q8.725 4.075 6.4 6.387Q4.075 8.7 4.075 12Q4.075 15.3 6.4 17.613Q8.725 19.925 12 19.925Z"/>
			</svg>
			
		</div> -->
	</div>	
</div>


</template>

<script lang="ts">
import { computed, defineComponent } from "vue"

interface DiscountList {
				progressMoneyMin: number;	// минимальный прого потраченных средств
				progressMoneyMax: number;	// максимальный порог потраченных средств
				discount: number;				// процент скидки
				next: number;					// следующая скидка
}

export default defineComponent({
		props:{
				data:{
					type: Object,
					
				},
				active:{
					type: Boolean 
				},
				showDoc:{
					type: Boolean,
					default:false
				},
		},
		emits: ['onClick', 'onShowDoc'],

		setup(props){

			let getDay = function (number: number){
				let dayMeterings = [ 'дней', 'день', 'дня' ]

				let lastDigits = number % 100;
				lastDigits = lastDigits >= 20 ? lastDigits % 10 : lastDigits;
				
				let metering = 0;

// В зависимости от значения единичного разряда пишем правильное слово.
				if ( lastDigits === 0 || lastDigits >= 5 && lastDigits <= 20 ) {
					metering = 0;
				} else if ( lastDigits == 1 ) 
				{
					metering = 1
				} else {
					metering = 2
				}
				return dayMeterings[metering]
			}
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
			if (props.data) {
				const s = props.data.spent
				let d = discountList.filter(v => s >= v.progressMoneyMin &&  s < v.progressMoneyMax)
				return d.length > 0 ? d[0] : discountList[0]
			} else return discountList[0]
		})
	
	let progressInPercent =  computed(() => {
		if (discount.value.progressMoneyMax != Infinity)
			return (props.data ? props.data.spent/discount.value.progressMoneyMax : 0) * 100// прогресс в процентах
		else return 100
	})

		return {
			getDay,
			discount,
			progressInPercent,
			ostatok: computed(() => (discount.value.progressMoneyMax - (props.data ? props.data.spent : 0))),
		}
	}
});
</script>

<style>
</style>