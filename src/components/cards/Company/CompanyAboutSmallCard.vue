<template>
	<router-link tag="a" class="company-card-item" :to="'/company/'+data.uid"> 
		<div class="company-card-name">{{normalizeCompanyName(data.name)}}</div>
		<div class="company-card-box orange" >

			<div v-if="data.storages && data.storages[0]" class="company-card-row">
				<div class="company-card-title">
					{{data.storages[0].name.replace(/(^|\s)\S/g, s => s.toUpperCase()).replace(/(ООО)|(\")|(\s)|([а-я])/g, '')}}</div>
				<div class="company-card-info">
					<div class="company-card-info-row">
						<span v-html="(data.storages[0].balance-data.storages[0].debt) < 0 ? 'Задолженность:':'Баланс:'"></span>
						<span class="company-card-value">&nbsp;{{ Number(data.storages[0].balance-data.storages[0].debt).toLocaleString('ru').substring(1) }} ₽</span>
					</div>
					
				</div>
				<div class="company-card-sale small">
					<div class="company-card-sale-box">
						<span class="company-card-sale-text">Скидка</span>
						<div class="company-card-sale-value">{{data.storages[0].discount}} %</div>
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

			<div v-if="data.storages && data.storages[1]" class="company-card-row">
				<div class="company-card-title">
					{{data.storages[1].name.replace(/(^|\s)\S/g, s => s.toUpperCase()).replace(/(ООО)|(\")|(\s)|([а-я])/g, '')}}</div>
				<div class="company-card-info">
					<div class="company-card-info-row">
						<span v-html="(data.storages[1].balance-data.storages[1].debt) < 0 ? 'Задолженность:':'Баланс:'"></span>
						<span class="company-card-value">&nbsp;{{ Number(data.storages[1].balance-data.storages[1].debt).toLocaleString('ru').substring(1) }} ₽</span>
					</div>
				</div>
				<div class="company-card-sale small">
					<div class="company-card-sale-box"><span class="company-card-sale-text">Скидка</span>
						<div class="company-card-sale-value">{{data.storages[1].discount}} %</div>
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
		<div class="company-card-more">Подробнее</div>
	</router-link>
</template>
<script setup lang="ts">
import  {normalizeCompanyName, Partner } from '/src/models/Partner'
import { defineProps, PropType } from 'vue'
	const props = defineProps({data: {type: Object as PropType<Partner>,}})
</script>

<style>
	
</style>