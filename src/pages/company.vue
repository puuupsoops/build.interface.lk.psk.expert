<template>

	<Preloader v-if="isLoad"></Preloader>
	<div v-else>
		<div class="top-line product-page">
			<CompanyBarTop :data="companyBarTopData"></CompanyBarTop>
			<Notification></Notification>
			<PersonalBar></PersonalBar>

		</div>

		<div class="company-head">
			<div class="company-head-elem">
				<CompanyStorageBar :data="companyStoragesData"></CompanyStorageBar>

			</div>

			<div class="company-head-elem">
				<CompanyAboutCard :data="aboutCompanyData"></CompanyAboutCard>
			</div>
		
		</div>



		<div class="company-sale sale">
			<div class="sale-head">
				<div class="sale-title">Скидка 6 %</div>
				<div class="sale-lacks">Не хватает 51 710 до скидки 10 %</div>
			</div>
			<div class="sale-progressbar-wrap">
				<div class="sale-progressbar">
				<div class="sale-progressbar-line">
					<div class="sale-progressbar-val">
						<span class="sale-progressbar-val-money">(195 400)</span>
						<span class="sale-progressbar-val-percent">73%</span>
					</div>
				</div>
				</div>
				<div class="sale-progressbar-money">
				<div class="sale-progressbar-min">120 000</div>
				<div class="sale-progressbar-max">250 000</div>
				</div>
			</div>
		</div>

		<CompanyCalendar></CompanyCalendar>
	</div>
</template>

<script>
import PersonalBar from '../components/cards/PersonalBar.vue'
import Notification from '../components/cards/Notification.vue'
import CompanyAboutCard from '../components/cards/CompanyAboutCard.vue'
import CompanyStorageBar from '../components/cards/CompanyStorageBar.vue'
import CompanyBarTop from '../components/cards/CompanyBarTop.vue'
import CompanyCalendar from '../components/cards/CompanyCalendar.vue'
import Preloader from '../components/Preloader.vue'

import { useStore } from 'vuex'
import { ref, onMounted, computed } from 'vue'


export default {
	components: {
		CompanyAboutCard,
		CompanyStorageBar,
		CompanyBarTop,
		Notification,
		PersonalBar,
		CompanyCalendar,
		Preloader
	},
	setup(){
		let store = useStore()
//		let aboutCompanyData = ref(null)

		let isLoad = ref(true);
		

		onMounted(() => {
			store.dispatch('GET_PARTNER')
				.then(() => {setTimeout(() => isLoad.value = false,500); })
			});


		let companyBarTopData = [
			{
				name: "ООО Столица",
				uuid: "1",
			},
			{
				name: "ООО Вектор",
				uuid: "2",
			},
			{
				name: "ООО Тристан",
				uuid: "3",
			},
			{
				name: "ООО Лама",
				uuid: "4",
			},
			{
				name: "ИП Лавочкин",
				uuid: "5",
			},
		];


		return {
			aboutCompanyData: computed(() => store.getters.getCompanyData),
			companyStoragesData: computed(() => store.getters.getCompanyStoragesData),
			companyBarTopData,
			isLoad,
		}
	}
}
</script>

<style>

</style>