<template>
	<div class="tooltip">
	<div class="company-sale sale">
		<div class="sale-head">
			<div class="sale-title">Скидка {{discount.discount}} %</div>
			<div class="sale-lacks">Не хватает {{ostatok}} до скидки {{discount.next}} %</div>
		</div>
		
		<div class="sale-progressbar-wrap">
			<div class="sale-progressbar tooltip">
				
					
				<div class="sale-progressbar-line" :style="'width: '+ (progressInPercent < 15 ? 15 : progressInPercent) +'%'">
					<div class="sale-progressbar-val">
						<div>
							<span class="sale-progressbar-val-money">({{spent}})</span>
							<span class="sale-progressbar-val-percent">{{progressInPercent}}%</span>
						</div>
					</div>

				</div>
		
			</div>
			<div class="sale-progressbar-money">
				<div class="sale-progressbar-min">{{discount.progressMoneyMin.toLocaleString()}}</div>
				<div class="sale-progressbar-max">{{discount.progressMoneyMax.toLocaleString()}}</div>
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

<script>
import { ref,computed } from 'vue';

export default {
	props:{
		spent: { //Потраченно для определения скидки
			type: Number
		}
	},
	setup(props){
		
		const discountList = [
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

		let discount = ref({});

		discount = computed(() => {
			let d = discountList.filter(v => parseFloat(props.spent) >= parseFloat(v.progressMoneyMin) 
													&& parseFloat(props.spent) < parseFloat(v.progressMoneyMax));
			return d.length > 0 ? d[0] : discountList[0];
		})
	

		return{
			discount,
			progressInPercent: computed(() => ((props.spent/discount.value.progressMoneyMax) * 100).toFixed(2)),// прогресс в процентах
			ostatok: computed(() => ((discount.value.progressMoneyMax - props.spent).toFixed(2).toLocaleString())),
		}
	}
}

</script>

<style scoped>
	.tooltip {
		position: relative;
		display: inline-block;
		border-bottom: 1px dotted black;
		width: 100%;
}

.tooltip .tooltiptext {
		visibility: hidden;
		width: 250px;
		background-color: black;
		color: #fff;
		text-align: center;
		border-radius: 6px;
		padding: 10px 10px;

	/* Position the tooltip */
	position: absolute;
	z-index: 1;
}

.tooltip:hover .tooltiptext {
	visibility: visible;
}

.tooltiptext td{
	text-align: left;
}
.tooltiptext td:last-child{
	text-align: center;
	padding: 0px, 0px, 0px, 40px;
}

.tooltiptext  th{
	padding: 10px;
	
}
</style>