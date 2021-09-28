<template>

	<Preloader v-if="isLoad"></Preloader>
	<div v-else>
		<div class="top-line product-page">
			<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid"></CompanyBarTop>
			<Notification></Notification>
			<PersonalBar></PersonalBar>

		</div>

		<div class="company-head">
			<div class="company-head-elem">
				<CompanyStorageBar :data="companyStoragesData" v-model="activeStorageUid"></CompanyStorageBar>

			</div>

			<div class="company-head-elem">
				<CompanyAboutCard :data="aboutCompanyData"></CompanyAboutCard>
			</div>
		
		</div>

		<CompanyCalendar :data="companyStoragesData.find(x => x.guid === activeStorageUid).documents"></CompanyCalendar>
	</div>
</template>

<script>
import PersonalBar from '../components/cards/PersonalBar.vue'
import Notification from '../components/cards/Notification.vue'
import CompanyAboutCard from '../components/cards/Company/CompanyAboutCard.vue'
import CompanyStorageBar from '../components/cards/Company/CompanyStorageBar.vue'
import CompanyBarTop from '../components/cards/Company/CompanyBarTop.vue'
import CompanyCalendar from '../components/cards/Company/CompanyCalendar.vue'
import Preloader from '../components/Preloader.vue'

import { useStore } from 'vuex'
import { ref, onMounted, computed, watch } from 'vue'


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
		let store = useStore();
		let isLoad = ref(true);
		let activeCompanyUid = ref('');
		let activeStorageUid = ref('');
		watch(activeCompanyUid,(value) => {activeStorageUid.value = store.getters.getCompanyStoragesData(value)[0].guid;});
		onMounted(() => {
			store.dispatch('GET_PARTNER')
				.then(() => {setTimeout(() => {
					isLoad.value = false;
					activeCompanyUid.value = store.getters.getCompanys === [] ? '' : store.getters.getCompanys[0].uid;
					
				},500); })
			});

		return {
			aboutCompanyData: computed(() => store.getters.getCompanyData(activeCompanyUid.value)),
			companyStoragesData: computed(() => store.getters.getCompanyStoragesData(activeCompanyUid.value)),
			companyBarTopData: computed(() => store.getters.getCompanys),
			activeCompanyUid,
			activeStorageUid,
			isLoad,
		}
	}
}
</script>

<style>

</style>