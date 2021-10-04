<template>
	<div class="tooltip">
	<div class="company-sale sale">
		<div class="sale-head">
			<div class="sale-title">Скидка 6 %</div>
			<div class="sale-lacks">Не хватает 51 710 до скидки 10 %</div>
		</div>
		
		<div class="sale-progressbar-wrap">
			<div class="sale-progressbar tooltip">
				
					
				<div class="sale-progressbar-line">
					<div class="sale-progressbar-val"><span class="sale-progressbar-val-money">(195 400)</span><span class="sale-progressbar-val-percent">73%</span></div>
				</div>
		
			</div>
			<div class="sale-progressbar-money">
				<div class="sale-progressbar-min">120 000</div>
				<div class="sale-progressbar-max">250 000</div>
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
export default {
	props:{
		data: {
			type: Object
		}
	},
	setup(){

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