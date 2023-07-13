<template>

<div
	v-if="data"
	:class="'company-head-item ' + ( data.debt > 1000 ? 'red' : 'yellow' ) + (active ?' content-elem-active': '') + (showDoc ? ' doc': '')"
	v-on:click="$emit('onClick', $event)"
	>
	<div v-if="!showDoc"
	>
		<div class="content-elem">
			
			<div class="company-head-item-title">{{data.name}}</div>
			<div class="company-card-sale">
				<div class="company-card-sale-box">
					<span class="company-card-sale-text">Скидка</span>
					<div class="company-card-sale-value">{{data.discount}} %</div>
				</div>
			</div>
		
			<div class="company-card-balance">
				<div class="company-card-balance-box">
					<div v-if="(data.balance - data.debt)<0" class="company-head-info-elem l highlight">Задолженность: {{(data.balance - data.debt).toLocaleString('ru').replace(',','.').substring(1)}} ₽</div>
					<div v-else class="company-head-info-elem l highlight">Баланс: {{data.balance.toLocaleString('ru').replace(',','.')}} ₽</div>
				</div>
			</div>
			
			<div class="company-head-info">			
				<div class="company-head-info-row">
					<div class="company-head-info-elem l">
						<span class="company-head-info-title">{{data.case}}</span>
						<span class="company-head-info-val" v-if="data.case==='отсрочка'">{{data.deferment}} {{getDay(data.deferment)}}</span>
						<span class="company-head-info-val" v-if="data.case==='предоплата'">{{data.percent}}%</span>
					
					</div>
					<div class="company-head-info-elem r" v-if="data.case!=='предоплата'">
						<span class="company-head-info-title">Дата погашения</span>
						<span class="company-head-info-val" >{{ data.date }}</span>
					</div>
				</div>
			</div>
			<div class="company-card-footer">
					
				<div class="company-head-info-elem l">
					<span class="company-head-info-title">Договор</span>
					<span class="company-head-info-val">{{data.contract}}</span>
				</div>
				<div class="company-head-info-elem к">
					<span class="company-head-info-title">Лимит</span>
					<span class="company-head-info-val">{{Number(data.limit).toLocaleString('ru').replace(',','.')}} ₽</span>
				</div>
			</div>
		</div>

		<div class="company-head-sale "  >
			<div class="sale-val">
				<span tooltip="Сумма отгрузок по договору" flow="up">
					<span class="sale-val-money" >{{data.spent.toLocaleString('ru').replace(',','.')}}  ₽</span>
				</span>
			</div>
			<div :class="'company-card-showdoc' + ( showDoc ? ' active' : '')"
				@click="showDoc=!showDoc"
			>
				<div
					tooltip="Платежи"
					flow="left" 
				>
					<svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.84625 6.4597L2.68453 0.298103C2.54202 0.155477 2.35178 0.076904 2.14893 0.0769041C1.94608 0.0769041 1.75584 0.155478 1.61332 0.298103L1.15956 0.751758C0.864288 1.04737 0.864288 1.52781 1.15956 1.82297L6.3337 6.99711L1.15382 12.177C1.01131 12.3196 0.932619 12.5097 0.932619 12.7125C0.932619 12.9154 1.01131 13.1056 1.15382 13.2483L1.60759 13.7019C1.75021 13.8445 1.94034 13.9231 2.14319 13.9231C2.34604 13.9231 2.53628 13.8445 2.6788 13.7019L8.84625 7.53463C8.9891 7.39155 9.06756 7.20052 9.06711 6.99745C9.06756 6.79358 8.9891 6.60267 8.84625 6.4597Z" fill="#A5A7A9"/>
					</svg>

				</div>
	
			</div>
		</div>
	</div>
	<div v-else
		class="doc"
	>
		
		<div class="content-elem">
			<div class="company-head-item-title">{{data.name}}</div>
			<div class="company-card-sale">
				<div class="company-card-sale-box">
					<span class="company-card-sale-text">Скидка</span>
					<div class="company-card-sale-value">{{data.discount}} %</div>
				</div>
			</div>
		
			<div class="company-card-balance">
				<div class="company-card-balance-box">
					<div v-if="(data.balance - data.debt)<0" class="company-head-info-elem l highlight">Задолженность: {{(data.balance - data.debt).toLocaleString('ru').replace(',','.').substring(1)}} ₽</div>
					<div v-else class="company-head-info-elem l highlight">Баланс: {{data.balance.toLocaleString('ru').replace(',','.')}} ₽</div>
				</div>
			</div>
		
			<div class="company-head-info" style="display: flex; justify-content: space-between;">			
				<div 
					:class="'company-head-info-row' + (paySwitcher ? ' passive-border' : ' active-border')"
					@click="paySwitcher = false"
				>
					Платежи
				</div>
				<div
					:class="'company-head-info-row' + (!paySwitcher ? ' passive-border' : ' active-border')"
					@click="paySwitcher = true"
				>
					Назначение платежа
				</div>
			</div>
			<div v-if="!paySwitcher" 
				class="company-head-list-content" >
				<ul class="company-head-list" v-if="data.documents">
					<li class="company-head-list-elem"
							v-for="(document, id) in data.documents"
							:key="id"
							>
						<!--<img class="company-head-list-img" src="/src/assets/img/icon/doc.svg" alt="">-->
						<svgDoc class="company-head-list-img" style="width: 20px; height: 21px;" />
						<a class="company-head-list-link" href="#CompanyCalendar" @click="docDate = document.expires">{{document.debt.toLocaleString('ru').replace(',','.')}} ₽ до {{document.expires}} / УПД {{ document.number }}</a>
					</li>
				</ul>
			</div>
			<div v-else 
				 class="company-head-list-content" >
				<span>Укажите сумму платежа</span>
				<div style="padding: 10px 0px; display: flex; justify-content: flex-start; align-items: baseline;">
					<AmountInput
						v-model="amount"
						:step="1" 
						:min="0"
						:style="'max-width: 100%'"/><div style="padding: 0px 5px;">руб.</div><AmountInput v-model="pennies" :min="0" :max="99" /> <div style="padding: 0px 5px;">коп.</div>
				</div>
				<div style="display: flex; justify-content: unset; flex-direction: column; flex-wrap: wrap;">
					<textarea class="order-comment-textarea" :disabled="(paymentText === '' ? true : false)">{{ paymentText }}</textarea>
					<input type="hidden" id="testing-code" :value="paymentText">
					<span style="text-align: center; padding: 5px 0px;" @click="copyText()">Скопировать</span>
				</div>
			</div>
		
		</div>
		<div class="company-head-sale "  >
			<div class="sale-val">
				<span tooltip="Сумма отгрузок по договору" flow="up">
					<span class="sale-val-money" >{{data.spent.toLocaleString('ru').replace(',','.')}}  ₽</span>
				</span>
			</div>
			<div :class="'company-card-showdoc' + ( showDoc ? ' active' : '')"
				@click="showDoc=!showDoc"
			>
				<div
					tooltip="Информация"
					flow="left" 
				>
					<svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.84625 6.4597L2.68453 0.298103C2.54202 0.155477 2.35178 0.076904 2.14893 0.0769041C1.94608 0.0769041 1.75584 0.155478 1.61332 0.298103L1.15956 0.751758C0.864288 1.04737 0.864288 1.52781 1.15956 1.82297L6.3337 6.99711L1.15382 12.177C1.01131 12.3196 0.932619 12.5097 0.932619 12.7125C0.932619 12.9154 1.01131 13.1056 1.15382 13.2483L1.60759 13.7019C1.75021 13.8445 1.94034 13.9231 2.14319 13.9231C2.34604 13.9231 2.53628 13.8445 2.6788 13.7019L8.84625 7.53463C8.9891 7.39155 9.06756 7.20052 9.06711 6.99745C9.06756 6.79358 8.9891 6.60267 8.84625 6.4597Z" fill="#A5A7A9"/>
					</svg>

				</div>
	
			</div>
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
					<span class="company-head-info-title">Отсрочка</span>
					<span class="company-head-info-val">0 дней</span>
					
				</div>
				<div class="company-head-info-elem r">
					<span class="company-head-info-title">Дата погашения</span>
					<span class="company-head-info-val" >--.--.----</span>
				</div>
			</div>
		</div>
	</div>
	<div class="company-head-sale " tooltip="Сумма отгрузок по договору"
				flow="up" >
		<div class="sale-val">
			<span class="sale-val-money">0  ₽</span>
		</div>
	</div>	
</div>


</template>

<script setup lang="ts">
import { inject, PropType, ref, watch } from "vue"
import { StorageCompany } from "/src/models/Partner";
import svgDoc from '/src/assets/img/icon/doc.svg'
import { number } from "yup";
import { toNumber } from "lodash";
import AmountInput from '/src/components/ui/AmountInput.vue'

const props = defineProps({
				data:{
					type: Object as PropType<StorageCompany>,				
				},
				active:{
					type: Boolean 
				},
		})
const emits = defineEmits(['onClick'])

	const showDoc = ref(false)
	let docDate = inject('docDate');
	
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

const paySwitcher = ref(false);
const amount = ref(0); // рубли
const pennies = ref(0); // копейки
const paymentText = ref(''); // текст для оплаты

const currentDate = new Date().toLocaleDateString('ru'); // дата
const documentNumber = props.data?.contract; // номер договора

const changeText = function() { // для изменения текста
	return `Оплата по договору № ${documentNumber} от ${currentDate}, за спецодежду на сумму ${amount.value.toLocaleString('ru')} рублей ${pennies.value} коп в т.ч. НДС 20% ${percent()}`;
}

const castFloat = function(f:number,p:number){ // преобразуем рубли и копейки, для подсчета процента
	if(p < 10)
		return toNumber( f + toNumber('0.0' + p.toString()) );

	return toNumber(f + '.' + p);
}

const percent = function(){ // возвращает процент
	return (castFloat(amount.value, pennies.value) * 0.20 ).toFixed(2);
}

const copyText = function(){
	let testingCodeToCopy = document.querySelector('#testing-code');
    testingCodeToCopy?.setAttribute('type', 'text');
    testingCodeToCopy?.select();
	document.execCommand('copy');
	testingCodeToCopy?.setAttribute('type', 'hidden')
    window?.getSelection()?.removeAllRanges()
	alert('Текст скопирован в буфер обмена.');
}

watch(amount, async (n, o) => {
	paymentText.value = changeText();
});

watch(pennies, async (n, o) => {
	paymentText.value = changeText();
});

</script>

<style>
.active-border {
	border: 2px solid #FF9900; 
	border-radius: 20px; 
	padding: 2px 10px;
}

.passive-border {
	border: 2px solid rgb(255, 153, 0, 0); 
	border-radius: 20px; 
	padding: 2px 10px;
}

.passive-border:hover {
	border: 2px solid rgb(255, 153, 0, 0.3); 
	border-radius: 20px; 
	padding: 2px 10px;
}
</style>