<template>

<div
	v-if="data"
	:class="'company-head-item ' + ( data.debt > 1000 ? 'red' : 'yellow' )"
	v-on:click="$emit('onClick', $event)"
	>
	<div :class="'content-elem' + (active ?' content-elem-active': '')">
		<div class="company-head-item-title">{{data.name}}</div>
		<div class="company-card-sale" :style="active ? 'right: -6px;':''">
			<div class="company-card-sale-box">
				<span class="company-card-sale-text">Скидка</span>
				<div class="company-card-sale-value">{{data.discount}} %</div>
			</div>
		</div>

		<div 
			v-if="active" 
			:class="'company-card-showdoc' + ( showDoc ? ' active' : '')"
			@click="$emit('onShowDoc')"
			title="Показать документы" 
		>
				<svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M17.0837 5.3183C17.0834 5.31807 17.0832 5.31784 17.0829 5.31761C17.0747 5.30191 17.0593 5.27543 17.0342 5.24899L13.2468 0.999148L13.247 0.998928L13.2389 0.990791C13.2227 0.974599 13.2063 0.962049 13.1951 0.953938C13.1842 0.945974 13.173 0.938491 13.1654 0.933451L13.1644 0.932749C13.1554 0.9268 13.1507 0.9236 13.147 0.920935C13.147 0.920918 13.147 0.920901 13.1469 0.920885L13.0922 0.866106H13.0628C13.0526 0.861177 13.0414 0.85677 13.0292 0.853209C12.9672 0.825769 12.8815 0.8 12.789 0.8H3.49001C2.01335 0.8 0.8 2.01335 0.8 3.49001V18.7606C0.8 20.2373 2.01335 21.4506 3.49001 21.4506H14.5078C15.9844 21.4506 17.1978 20.2373 17.1978 18.7606V5.64949C17.1978 5.64634 17.1979 5.6434 17.1983 5.63552C17.1985 5.63249 17.1987 5.62874 17.1989 5.62397C17.1996 5.61017 17.2006 5.58913 17.1995 5.56581C17.1974 5.51818 17.1868 5.44882 17.1402 5.3814C17.1198 5.35204 17.0949 5.32857 17.0837 5.3183ZM13.4077 5.05285V3.02485L15.2085 5.05285H13.4077ZM15.9604 18.7386C15.9604 19.5571 15.3193 20.2133 14.5078 20.2133H3.49001C2.67671 20.2133 2.03735 19.5553 2.03735 18.7606V3.46798C2.03735 2.65468 2.69527 2.01531 3.49001 2.01531H12.1703V5.64949C12.1703 5.97338 12.4293 6.26816 12.789 6.26816H15.9604V18.7386Z" fill="#A5A7A9" stroke="#A5A7A9" stroke-width="0.4"/>
					<path d="M3.97479 6.26831H7.65472C7.97861 6.26831 8.27339 6.00927 8.27339 5.64963C8.27339 5.29678 8.00756 5.03096 7.65472 5.03096H3.97479C3.65089 5.03096 3.35611 5.28999 3.35611 5.64963C3.35611 6.00927 3.65089 6.26831 3.97479 6.26831Z" fill="#A5A7A9" stroke="#A5A7A9" stroke-width="0.4"/>
					<path d="M7.65469 10.363H3.97477C3.65087 10.363 3.35609 10.622 3.35609 10.9817C3.35609 11.3056 3.61513 11.6003 3.97477 11.6003H7.65469C7.97859 11.6003 8.27337 11.3413 8.27337 10.9817C8.27337 10.6509 7.9855 10.363 7.65469 10.363Z" fill="#A5A7A9" stroke="#A5A7A9" stroke-width="0.4"/>
					<path d="M3.35611 8.42551C3.35611 8.7494 3.61515 9.04418 3.97479 9.04418H13.8026C14.1265 9.04418 14.4213 8.78515 14.4213 8.42551C14.4213 8.10162 14.1623 7.80684 13.8026 7.80684H3.97479C3.65089 7.80684 3.35611 8.06587 3.35611 8.42551Z" fill="#A5A7A9" stroke="#A5A7A9" stroke-width="0.4"/>
				</svg>
		</div>

		<div class="company-head-info">
			<div class="company-head-info-row">
				<div v-if="data.debt>0" class="company-head-info-elem l highlight">Долг: {{data.debt_str}} ₽</div>
				<div v-else class="company-head-info-elem l highlight">Баланс: {{data.balance}} ₽</div>
			</div>
			<div class="company-head-info-row">
				<div class="company-head-info-elem l">
					<span class="company-head-info-title">Отстрочка</span>
					<span class="company-head-info-val">{{data.deferment}} {{getDay(data.deferment)}}</span>
					
				</div>
				<div class="company-head-info-elem r">
					<span class="company-head-info-title">Дата погашения</span>
					<span class="company-head-info-val" >{{ data.debt>0 ? data.date : '--.--.--'}}</span>
				</div>
			</div>
		</div>


		<div class="company-head-sale sale">
			<div class="sale-title">До скидки 0 %</div>
			<div class="sale-progressbar-wrap tooltip">
				<div class="sale-progressbar">
					<div class="sale-progressbar-line" :style="'width: '+ (progressInPercent < 3 ? 3 : progressInPercent) +'%'">
						<div class="sale-progressbar-val"><span class="sale-progressbar-val-money">({{data.spent.toLocaleString().replace(',','.')}})</span>
						<span class="sale-progressbar-val-percent">{{progressInPercent.toFixed(2)}}%</span></div>
						
					</div>
				</div>
				<div class="sale-progressbar-money">
					<div class="sale-progressbar-min">{{discount.progressMoneyMin.toLocaleString()}}</div>
					<div class="sale-progressbar-max">{{discount.progressMoneyMax.toLocaleString()}}</div>
				</div>
				<span class="tooltiptext" style="top: 50px; left: 10px;">
					<table>
						<tr><th>Сумма заказа,руб</th><th>Скидка,%</th></tr>
						<tr><td>От 3 до 5 млн.</td><td>12.5</td></tr>
						<tr><td>От 5 до 8 млн.</td><td>13.5</td></tr>
						<tr><td>От 8 до 15 млн.</td><td>14.4</td></tr>
						<tr><td>Более 15 млн.</td><td>16.3</td></tr>
					</table>
				</span>
			</div>
			
		</div>
		
	</div>
</div>


<div
	v-else
	class="company-head-item yellow">
	<div class="content-elem active">
		<div class="company-head-item-title">Информация о складах отсутвует </div>
		<div class="company-card-sale" style="right: -6px;">
			<div class="company-card-sale-box"><span class="company-card-sale-text">Скидка</span>
				<div class="company-card-sale-value">Скидка %</div>
			</div>
		</div>


		<div class="company-head-info">
			<div class="company-head-info-row">
				
				<div class="company-head-info-elem l highlight">Баланс: 0 ₽</div>
			</div>
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


		<div class="company-head-sale sale">
			<div class="sale-title">До скидки 6 %</div>
			<div class="sale-progressbar-wrap">
				<div class="sale-progressbar">
					<div class="sale-progressbar-line">
						<div class="sale-progressbar-val">
							<span class="sale-progressbar-val-money">(0)</span>
							<span class="sale-progressbar-val-percent">0%</span>
						</div>
					</div>
				</div>
				<div class="sale-progressbar-money">
					<div class="sale-progressbar-min">0</div>
					<div class="sale-progressbar-max">120 000</div>
				</div>
			</div>
		</div>
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
					required: true,
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
			
			let d = discountList.filter(v =>  props.data.spent >= v.progressMoneyMin 
													&&  props.data.spent < v.progressMoneyMax);
			return d.length > 0 ? d[0] : discountList[0];
		})
	
		let progressInPercent =  computed(() => {
			if (discount.value.progressMoneyMax != Infinity)
				return (props.data.spent/discount.value.progressMoneyMax) * 100// прогресс в процентах
			else return 100
		})

			return {
				getDay,
				discount,
				progressInPercent,
				ostatok: computed(() => ((discount.value.progressMoneyMax - props.data.spent))),
			}
		}
});
</script>

<style>
</style>