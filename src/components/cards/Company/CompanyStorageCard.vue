<script setup lang="ts">
import { inject, PropType, ref, watch } from "vue"
import { StorageCompany } from "/src/models/Partner";
import svgDoc from '/src/assets/img/icon/doc.svg'
import { number } from "yup";
import { toNumber } from "lodash";
import AmountInput from '/src/components/ui/AmountInput.vue'

const props = defineProps({
	data: {
		type: Object as PropType<StorageCompany>,
	},
	active: {
		type: Boolean
	},
})
const emits = defineEmits(['onClick'])

const showDoc = ref(false)
let docDate = inject('docDate');

let getDay = function (number: number) {
	let dayMeterings = ['дней', 'день', 'дня']

	let lastDigits = number % 100;
	lastDigits = lastDigits >= 20 ? lastDigits % 10 : lastDigits;

	let metering = 0;

	// В зависимости от значения единичного разряда пишем правильное слово.
	if (lastDigits === 0 || lastDigits >= 5 && lastDigits <= 20) {
		metering = 0;
	} else if (lastDigits == 1) {
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

const guidNumber = 'f59a4d06-2f35-11e7-8fdb-0025907c0298'; // guid номер "Фабрика рабочей обуви"
const guid = props.data?.guid ?? ""; // Номер guid 
const guidText = guid < guidNumber ? "спецодежду" : "спецобувь"; // В зависимости от номера guid, выдает текст либо "спецодежда", либо "спецобувь"

const toPaymentForm = function (debt: number, date: Date) {
	//href="#CompanyCalendar" 
	//@click = docDate = document.expires

	//берем дробную часть
	let arr = ("" + debt).split(".");
	if (arr[1]) {
		pennies.value = Number(arr[1])
	} else {
		pennies.value = 0;
	}

	amount.value = Math.trunc(debt)
	paySwitcher.value = true;
}

const changeText = function () { // для изменения текста 
	let penni = pennies.value < 10 ? "0" : ""; // добавляет 0 к копейкам, если копеек меньше 10.
	return `Оплата по договору № ${documentNumber} от ${currentDate}, за ${guidText} на сумму ${amount.value.toLocaleString('ru')} рублей ${penni}${pennies.value} коп в т.ч. НДС 20% ${percent()}`;
}

const castFloat = function (f: number, p: number) { // преобразуем рубли и копейки, для подсчета процента
	if (p < 10)
		return toNumber(f + toNumber('0.0' + p.toString()));

	return toNumber(f + '.' + p);
}

const percent = function () { // возвращает процент
	return (castFloat(amount.value, pennies.value) * 0.20).toFixed(2);
}

const copyText = function () {
	let testingCodeToCopy = <HTMLInputElement>document.querySelector('#testing-code');
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

<template>
	<div v-if="data"
		:class="'company-head-item ' + (data.debt > 1000 ? 'red' : 'yellow') + (active ? ' content-elem-active' : '') + (showDoc ? ' doc' : '')"
		v-on:click="$emit('onClick', $event)">
		<div v-if="!showDoc">
			<div class="content-elem">

				<div class="company-head-item-title">{{ data.name }}</div>
				<div class="company-card-sale">
					<div class="company-card-sale-box">
						<span class="company-card-sale-text">Скидка</span>
						<div class="company-card-sale-value">{{ data.discount }} %</div>
					</div>
				</div>

				<div class="company-card-balance">
					<div class="company-card-balance-box">
						<div v-if="(data.balance - data.debt) < 0" class="company-head-info-elem l highlight">
							Задолженность: {{ (data.balance -
								data.debt).toLocaleString('ru').replace(',', '.').substring(1) }} ₽</div>
						<div v-else class="company-head-info-elem l highlight">Баланс:
							{{ data.balance.toLocaleString('ru').replace(',', '.') }} ₽</div>
					</div>
				</div>

				<div class="company-head-info">
					<div class="company-head-info-row">
						<div class="company-head-info-elem l">
							<span class="company-head-info-val cash-back-title">Кешбэк</span>
						</div>
						<div class="company-head-info-elem r">
							<span class="company-head-info-val cash-back-value">{{ Number(data?.cashback ??
								0).toFixed() }}</span>
						</div>
					</div>
					<div class="company-head-info-row">
						<div class="company-head-info-elem l">
							<span class="company-head-info-title">{{ data.case }}</span>
							<span class="company-head-info-val" v-if="data.case === 'отсрочка'">{{ data.deferment }}
								{{ getDay(data.deferment) }}</span>
							<span class="company-head-info-val" v-if="data.case === 'предоплата'">{{ data.percent
							}}%</span>
						</div>
						<div class="company-head-info-elem r" v-if="data.case !== 'предоплата'">
							<span class="company-head-info-title">Дата погашения</span>
							<span class="company-head-info-val">{{ data.date }}</span>
						</div>
					</div>
				</div>
				<div class="company-card-footer">

					<div class="company-head-info-elem l">
						<span class="company-head-info-title">Договор</span>
						<span class="company-head-info-val">{{ data.contract }}</span>
					</div>
					<div class="company-head-info-elem к">
						<span class="company-head-info-title">Лимит</span>
						<span class="company-head-info-val">{{ Number(data.limit).toLocaleString('ru').replace(',', '.')
						}}
							₽</span>
					</div>
				</div>
			</div>

			<div class="company-head-sale ">
				<div class="sale-val">
					<span tooltip="Сумма отгрузок по договору" flow="up">
						<span class="sale-val-money">{{ data.spent.toLocaleString('ru').replace(',', '.') }} ₽</span>
					</span>
				</div>
				<div :class="'company-card-showdoc' + (showDoc ? ' active' : '')" @click="showDoc = !showDoc">
					<div tooltip="Платежи" flow="left">
						<svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M8.84625 6.4597L2.68453 0.298103C2.54202 0.155477 2.35178 0.076904 2.14893 0.0769041C1.94608 0.0769041 1.75584 0.155478 1.61332 0.298103L1.15956 0.751758C0.864288 1.04737 0.864288 1.52781 1.15956 1.82297L6.3337 6.99711L1.15382 12.177C1.01131 12.3196 0.932619 12.5097 0.932619 12.7125C0.932619 12.9154 1.01131 13.1056 1.15382 13.2483L1.60759 13.7019C1.75021 13.8445 1.94034 13.9231 2.14319 13.9231C2.34604 13.9231 2.53628 13.8445 2.6788 13.7019L8.84625 7.53463C8.9891 7.39155 9.06756 7.20052 9.06711 6.99745C9.06756 6.79358 8.9891 6.60267 8.84625 6.4597Z"
								fill="#A5A7A9" />
						</svg>

					</div>

				</div>
			</div>
		</div>
		<div v-else class="doc">

			<div class="content-elem">
				<div class="company-head-item-title">{{ data.name }}</div>
				<div class="company-card-sale">
					<div class="company-card-sale-box">
						<span class="company-card-sale-text">Скидка</span>
						<div class="company-card-sale-value">{{ data.discount }} %</div>
					</div>
				</div>

				<div class="company-card-balance">
					<div class="company-card-balance-box">
						<div v-if="(data.balance - data.debt) < 0" class="company-head-info-elem l highlight">
							Задолженность: {{ (data.balance -
								data.debt).toLocaleString('ru').replace(',', '.').substring(1) }} ₽</div>
						<div v-else class="company-head-info-elem l highlight">Баланс:
							{{ data.balance.toLocaleString('ru').replace(',', '.') }} ₽</div>
					</div>
				</div>

				<div class="company-head-info" style="display: flex; justify-content: space-between;">
					<div :class="'company-head-info-row' + (paySwitcher ? ' passive-border' : ' active-border')"
						@click="paySwitcher = false">
						Платежи
					</div>
					<div :class="'company-head-info-row' + (!paySwitcher ? ' passive-border' : ' active-border')"
						@click="paySwitcher = true">
						Назначение платежа
					</div>
				</div>
				<div v-if="!paySwitcher" class="company-head-list-content">
					<ul class="company-head-list" v-if="data.documents">
						<li style="align-items: center;" class="company-head-list-elem"
							v-for="(document, id) in data.documents" :key="id">
							<!--<img class="company-head-list-img" src="/src/assets/img/icon/doc.svg" alt="">-->
							<svgDoc class="company-head-list-img" style="width: 20px; height: 21px;" />
							<a :style="(Date.parse(document.expires_date) > new Date().getTime()) ? '' : 'background-color: #B9342D; color: white;'"
								:class="(Date.parse(document.expires_date) > new Date().getTime()) ? '' : 'debt'"
								class="company-head-list-link"
								@click="toPaymentForm(document.debt, document.expires_date)">{{
									document.debt.toLocaleString('ru').replace(',', '.') }}
								₽ до {{ document.expires }} / УПД {{ document.number }}</a>
						</li>
					</ul>
				</div>
				<div v-else class="company-head-list-content">
					<span>Укажите сумму платежа</span>
					<div style="padding: 10px 0px; display: flex; justify-content: flex-start; align-items: baseline;">
						<AmountInput v-model="amount" :step="1" :min="0" :style="'max-width: 100%'" />
						<div style="padding: 0px 5px;">руб.</div>
						<AmountInput v-model="pennies" :min="0" :max="99" />
						<div style="padding: 0px 5px;">коп.</div>
					</div>
					<div style="display: flex; justify-content: unset; flex-direction: column; flex-wrap: wrap;">
						<textarea class="order-comment-textarea"
							:disabled="(paymentText === '' ? true : false)">{{ paymentText }}</textarea>
						<input type="hidden" id="testing-code" :value="paymentText">
						<span style="text-align: center; padding: 5px 0px;" @click="copyText()">Скопировать</span>
					</div>
				</div>

			</div>
			<div class="company-head-sale ">
				<div class="sale-val">
					<span tooltip="Сумма отгрузок по договору" flow="up">
						<span class="sale-val-money">{{ data.spent.toLocaleString('ru').replace(',', '.') }} ₽</span>
					</span>
				</div>
				<div :class="'company-card-showdoc' + (showDoc ? ' active' : '')" @click="showDoc = !showDoc">
					<div tooltip="Информация" flow="left">
						<svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M8.84625 6.4597L2.68453 0.298103C2.54202 0.155477 2.35178 0.076904 2.14893 0.0769041C1.94608 0.0769041 1.75584 0.155478 1.61332 0.298103L1.15956 0.751758C0.864288 1.04737 0.864288 1.52781 1.15956 1.82297L6.3337 6.99711L1.15382 12.177C1.01131 12.3196 0.932619 12.5097 0.932619 12.7125C0.932619 12.9154 1.01131 13.1056 1.15382 13.2483L1.60759 13.7019C1.75021 13.8445 1.94034 13.9231 2.14319 13.9231C2.34604 13.9231 2.53628 13.8445 2.6788 13.7019L8.84625 7.53463C8.9891 7.39155 9.06756 7.20052 9.06711 6.99745C9.06756 6.79358 8.9891 6.60267 8.84625 6.4597Z"
								fill="#A5A7A9" />
						</svg>

					</div>

				</div>
			</div>
		</div>
	</div>


	<div v-else class="company-head-item yellow">
		<div class="content-elem active">
			<div class="company-head-item-title" style="margin-right: 100px;">Договор отсутствует</div>

			<div class="company-card-sale">
				<div class="company-card-sale-box"><span class="company-card-sale-text">Скидка</span>
					<div class="company-card-sale-value">Скидка %</div>
				</div>
			</div>

			<div class="company-card-balance">
				<div class="company-card-balance-box">
					<div class="company-head-info-elem l highlight">Баланс: 0 ₽</div>
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
						<span class="company-head-info-val">--.--.----</span>
					</div>
				</div>
			</div>
		</div>
		<div class="company-head-sale " tooltip="Сумма отгрузок по договору" flow="up">
			<div class="sale-val">
				<span class="sale-val-money">0 ₽</span>
			</div>
		</div>
	</div>


</template>

<style>
.debt:hover::after {
	border-bottom: solid 1px white;
}

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

/* .cash-back-title {} */

.cash-back-value {
	position: relative;
	padding: 0rem 1rem;
	border-radius: 1rem;
	border: 2px solid #FFBF60;
	font-weight: bold;
	min-width: 72px;
}

.cash-back-value::after {
	content: " ";
	position: absolute;
	width: 1rem;
	height: 1rem;
	top: 0;
	right: 0;
	background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve" width="512" height="512"><g><g><path style="fill:%23F0CD00;" d="M490,245c0,135.31-109.69,245-245,245c-71.33,0-135.54-30.48-180.31-79.13 c-11.76-12.77-22.17-26.8-31.03-41.85C12.27,332.64,0,290.25,0,245C0,109.69,109.69,0,245,0c45.26,0,87.65,12.27,124.02,33.67 c15.05,8.85,29.07,19.26,41.84,31.03C459.51,109.45,490,173.67,490,245z"/><path style="fill:%23FFDE50;" d="M490,245c0,132.26-104.79,240.04-235.88,244.83C123.03,485.04,18.24,377.26,18.24,245 S123.03,4.96,254.12,0.17C385.21,4.96,490,112.74,490,245z"/><path style="fill:%23FFEA94;" d="M410.86,64.7L64.69,410.87c-11.76-12.77-22.17-26.8-31.03-41.85L369.02,33.67 C384.07,42.52,398.09,52.93,410.86,64.7z"/><path style="fill:%23FFEA94;" d="M473.1,155.43L155.42,473.11c-22.49-8.84-43.36-20.91-62.03-35.64L437.47,93.39 C452.2,112.06,464.27,132.93,473.1,155.43z"/><path style="fill:%23FAA300;" d="M435.38,245c0,105.14-85.24,190.38-190.38,190.38c-36.62,0-70.82-10.34-99.85-28.26 c-12.65-7.8-24.31-17.05-34.77-27.51c-7.69-7.68-14.73-16.03-21.02-24.94c-8.66-12.27-15.91-25.61-21.5-39.78 c-8.28-20.95-12.94-43.73-13.22-67.55c-0.02-0.78-0.02-1.56-0.02-2.34c0-105.14,85.23-190.38,190.38-190.38 c0.78,0,1.57,0,2.35,0.02c23.82,0.28,46.59,4.95,67.54,13.22c14.17,5.6,27.51,12.84,39.78,21.5c8.91,6.3,17.25,13.33,24.94,21.02 c10.46,10.45,19.71,22.12,27.51,34.77C425.04,174.18,435.38,208.38,435.38,245z"/><path style="fill:%23FFBD00;" d="M379.61,110.38L110.38,379.61c-7.69-7.68-14.73-16.03-21.02-24.94 c-8.66-12.27-15.91-25.61-21.5-39.78c-8.28-20.95-12.94-43.73-13.22-67.55c-0.02-0.78-0.02-1.56-0.02-2.34 c0-105.14,85.23-190.38,190.38-190.38c0.78,0,1.57,0,2.35,0.02c23.82,0.28,46.59,4.95,67.54,13.22 c14.17,5.6,27.51,12.84,39.78,21.5C363.58,95.66,371.92,102.69,379.61,110.38z"/><path style="fill:%23F68E00;" d="M435.375,245c0,105.14-85.24,190.38-190.38,190.38c-3.61,0-7.19-0.1-10.75-0.3 c100.14-5.57,179.62-88.55,179.62-190.08s-79.48-184.51-179.62-190.08c3.56-0.2,7.14-0.3,10.75-0.3 C350.135,54.62,435.375,139.86,435.375,245z"/></g><path style="fill:%23F68E00;" d="M254.807,286.062c49.831,0,90.371-40.541,90.371-90.371s-40.541-90.371-90.371-90.371h-99.692 c-11.046,0-20,8.954-20,20v120.742h-13.622c-11.046,0-20,8.954-20,20s8.954,20,20,20h13.622v23.003h-13.622 c-11.046,0-20,8.954-20,20s8.954,20,20,20h13.622v20.438c0,11.046,8.954,20,20,20s20-8.954,20-20v-20.438h69.955 c11.046,0,20-8.954,20-20s-8.954-20-20-20h-69.955v-23.003H254.807z M175.115,145.32h79.692c27.775,0,50.371,22.596,50.371,50.371 c0,27.774-22.596,50.371-50.371,50.371h-79.692V145.32z"/><path style="fill:%23FFEA94;" d="M279.809,286.062c49.831,0,90.371-40.541,90.371-90.371s-40.541-90.371-90.371-90.371h-99.692 c-11.046,0-20,8.954-20,20v120.742h-13.622c-11.046,0-20,8.954-20,20s8.954,20,20,20h13.622v23.003h-13.622 c-11.046,0-20,8.954-20,20s8.954,20,20,20h13.622v20.438c0,11.046,8.954,20,20,20s20-8.954,20-20v-20.438h69.955 c11.046,0,20-8.954,20-20s-8.954-20-20-20h-69.955v-23.003H279.809z M200.117,145.32h79.692c27.775,0,50.371,22.596,50.371,50.371 c0,27.774-22.596,50.371-50.371,50.371h-79.692V145.32z"/></g></svg>');
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	transform: translate(0px, -8px);
}
</style>
