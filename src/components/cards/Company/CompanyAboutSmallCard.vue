<script setup lang="ts">
	import { normalizeCompanyName, Partner } from '/src/models/Partner';
	import { PropType } from 'vue';
	import PreloaderLocal from '../../PreloaderLocal.vue';

	/** ООО \"Эксперт Спецодежда\" => ЭС  */
	const normalizeShortCompanyName = (name: string) => name.replace(/(^|\s)\S/g, s => s.toUpperCase()).replace(/(ООО)|(\")|(\s)|([а-я])/g, '');

	const props = defineProps({data: {type: Object as PropType<Partner>,}});

	const routeTo = '/company/' + props?.data?.uid;
	const companyName = normalizeCompanyName(String(props?.data?.name));
	const isStorageFirstExist = Boolean(props?.data?.storages && props.data.storages[0]);
	const isStorageSecondExist = Boolean(props?.data?.storages && props.data.storages[1]);
	const storages = <{
		name: string,
		discount: string,
		amount: string,
		label: string,
		amountEqZero: boolean
	}[] | []>[];

	[isStorageFirstExist, isStorageSecondExist].forEach((exist: boolean, n: number) => {
		if(exist){
			storages[n] = {
				name: normalizeShortCompanyName(props!.data!.storages![n].name),
				discount: props!.data!.storages![n].discount + ' %',
				amount: Number(props!.data!.storages![n].balance - props!.data!.storages![n].debt)?.toLocaleString('ru-RU', {style: "currency", currency: "RUB", minimumFractionDigits: 2, maximumFractionDigits: 2,}),
				label: (props!.data!.storages![n].balance - props!.data!.storages![n].debt) < 0 ? 'Задолженность: ':'Баланс: ',
				amountEqZero: (props!.data!.storages![n].balance - props!.data!.storages![n].debt == 0 && props!.data!.storages![n].balance - props!.data!.storages![n].balance == 0)
		};
		}
	});
</script>
<template>
	<router-link tag="a" class="company-card-item" :to="routeTo"> 
		<div class="company-card-name">{{companyName}}</div>
		<div v-if="data?.storages?.length" class="company-card-box orange" >
			<div v-if="isStorageFirstExist" class="company-card-row">
				<div class="company-card-title">{{storages[0].name}}</div>
				<div class="company-card-info">
					<div class="company-card-info-row">
						<span v-html="storages[0].label"></span>
						<span v-if="storages[0].amountEqZero" class="company-card-value">0 ₽</span>
						<span v-else class="company-card-value">{{storages[0].amount}}</span>
					</div>
					
				</div>
				<div class="company-card-sale small">
					<div class="company-card-sale-box">
						<span class="company-card-sale-text">Скидка</span>
						<div class="company-card-sale-value">{{storages[0].discount}}</div>
					</div>
				</div>
			</div>
			<div v-else class="company-card-row">
				<div class="company-card-title">
				<br>
				</div>
				<div class="company-card-info">
					<br>
					<br>
				</div>
			</div>

			<div v-if="isStorageSecondExist" class="company-card-row">
				<div class="company-card-title">{{storages[1].name}}</div>
				<div class="company-card-info">
					<div class="company-card-info-row">
						<span v-html="storages[1].label"></span>
						<span v-if="storages[1].amountEqZero" class="company-card-value">0 ₽</span>
						<span v-else class="company-card-value">{{storages[1].amount}}</span>
					</div>
				</div>
				<div class="company-card-sale small">
					<div class="company-card-sale-box"><span class="company-card-sale-text">Скидка</span>
						<div class="company-card-sale-value">{{storages[1].discount}}</div>
					</div>
				</div>
			</div>
			<div v-else class="company-card-row">
				<div class="company-card-title">
				<br>
				</div>
				<div class="company-card-info">
					<br>
					<br>
				</div>
			</div>
		</div>
		<div v-else class="company-card-box orange">
			<div style="width: 290px; height: 133px; display: flex; filter: sepia(1);"><PreloaderLocal :small="false" :center="true" /></div>
		</div>
		<div class="company-card-more">Подробнее</div>
	</router-link>
</template>