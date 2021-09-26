<template>

<div :class="'company-head-item ' + ( parseFloat(data.debt.replace(/\s/g, '')) > 1000 ? 'red' : 'yellow' )">
				<div class="content-elem">
					<div class="company-head-item-title">{{data.name}}</div>
					<div class="company-card-sale">
						<div class="company-card-sale-box"><span class="company-card-sale-text">Скидка</span>
							<div class="company-card-sale-value">{{data.discount}} %</div>
						</div>
					</div>
					<div class="company-head-info">
						<div class="company-head-info-row">
							<div class="company-head-info-elem l highlight">Долг: {{data.debt}} ₽</div>
							<div class="company-head-info-elem r"><span class="company-head-info-title">Отстрочка</span>
								<span class="company-head-info-val">{{data.deferment}} {{getDay(data.deferment)}}</span></div>
						</div>
						<div class="company-head-info-row">
							<div class="company-head-info-elem l">Баланс: {{data.balance}} ₽</div>
							<div class="company-head-info-elem r"><span class="company-head-info-title">Дата погашения</span>
								<span class="company-head-info-val">{{data.date}}</span></div>
						</div>
					</div>
					<div class="company-head-sale sale">
						<div class="sale-title">До скидки 6 %</div>
						<div class="sale-progressbar-wrap">
							<div class="sale-progressbar">
								<div class="sale-progressbar-line">
									<div class="sale-progressbar-val"><span class="sale-progressbar-val-money">(0)</span><span class="sale-progressbar-val-percent">0%</span></div>
								</div>
							</div>
							<div class="sale-progressbar-money">
								<div class="sale-progressbar-min">120 000</div>
								<div class="sale-progressbar-max">250 000</div>
							</div>
						</div>
					</div>
				</div>
		</div>

</template>

<script>
export default {
		props:{
				data:{
						type: Object
				}
		},
		methods: {
			getDay(number){
				let dayMeterings = [ 'дней', 'день', 'дня' ]

				let lastDigits = parseInt(number) % 100;
				lastDigits = parseInt(lastDigits) >= 20 ? lastDigits % 10 : lastDigits;
				
				let metering = 0;

// В зависимости от значения единичного разряда пишем правильное слово.
				if ( parseInt(lastDigits) === 0 || parseInt(lastDigits) >= 5 && parseInt(lastDigits) <= 20 ) {
					metering = 0;
				} else if ( parseInt(lastDigits) == 1 ) 
				{
					metering = 1
				} else {
					metering = 2
				}
				return dayMeterings[metering]
			}
		}
};
</script>

<style>
</style>