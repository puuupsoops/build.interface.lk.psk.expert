<template>
	<div v-if="isLoad">
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
		<CompanySaleBar :spent="totalSpent"></CompanySaleBar>
		<!---- Изза того что в тесте у складов одинаковые guid пришлось ставить костыль
		<CompanyCalendar :data="companyStoragesData.find(x => x.guid === activeStorageUid).documents"></CompanyCalendar>
		-->
		<CompanyCalendar :data="activeStorageDocuments"></CompanyCalendar>
	</div>
</template>

<script>
import PersonalBar from '@/components/cards/PersonalBar'
import Notification from '@/components/cards/Notification'
import CompanyAboutCard from '@/components/cards/Company/CompanyAboutCard'
import CompanyStorageBar from '@/components/cards/Company/CompanyStorageBar'
import CompanyBarTop from '@/components/cards/Company/CompanyBarTop'
import CompanySaleBar from '@/components/cards/Company/CompanySaleBar'
import CompanyCalendar from '@/components/cards/Company/CompanyCalendar'

import { useStore } from 'vuex'
import { ref, onMounted, computed, watch , provide, inject} from 'vue'
import { useRouter } from 'vue-router'

export default {
	components: {
		CompanyAboutCard,
		CompanyStorageBar,
		CompanyBarTop,
		CompanySaleBar,
		Notification,
		PersonalBar,
		CompanyCalendar,
	
	},
	props: ['id'],
	setup(props){
		const store = useStore();
		const router = useRouter();
		let isLoad = ref(false);
		let activeCompanyUid = ref(props.id);
		let activeStorageUid = ref(0);
		let docDate = ref('');
		let aboutCompanyData = computed(() => store.getters.getCompanyData(activeCompanyUid.value));
		let companyStoragesData = computed(() => store.getters.getCompanyStoragesData(activeCompanyUid.value));
		let companyBarTopData = computed(() => store.getters.getCompanys);
		let totalSpent = computed(() => store.getters.getCompanySpent(activeCompanyUid.value));
		
		const loader = inject('loader');

		watch( () => props.id, () => {
			if (props.id !=='') {
					activeCompanyUid.value=props.id;
				} else { activeCompanyUid.value = store.getters.getCompanys === [] ? '' : store.getters.getCompanys[0].uid }
		})

		watch(activeCompanyUid,() => { 
			companyStoragesData.value.length === 0 ? 
				activeStorageUid.value = null : activeStorageUid.value = 0;
			router.push(`/company/${activeCompanyUid.value}`)
		});

		let activeStorageDocuments = computed(() => companyStoragesData.value.length === 0 ?
													null : companyStoragesData.value[activeStorageUid.value].documents );
	

		onMounted(() => {
			//console.log('onMount')
			if (!store.getters.isCompanysLoad || !store.getters.isManagerLoad)
			{
				loader.value=true;
				Promise.all([
						store.dispatch('GET_PARTNER'),
						store.dispatch('GET_MANAGER'),
					])
					//.catch(()=>{alert('error')})
					.finally(() => { setTimeout(()=>{
						if (store.getters.isCompanysLoad) {
							activeCompanyUid.value = store.getters.getCompanys === [] ? '' : store.getters.getCompanys[0].uid;
							isLoad.value = true;
							loader.value=false;
						} else {
							loader.value=false;
						}
						},500); })
			} else {
				//;
				if (props.id !=='') {
					activeCompanyUid.value=props.id;
				} else { activeCompanyUid.value = store.getters.getCompanys === [] ? '' : store.getters.getCompanys[0].uid }
				isLoad.value = true;
			}
		});
		provide('docDate', docDate ); //фича для обмена данными между компонентами. Связь между компонентом CompanyStorageDoc и CompanyCalendar
		return {
			aboutCompanyData,
			companyStoragesData,
			companyBarTopData,
			totalSpent,
			activeCompanyUid,
			activeStorageUid,
			activeStorageDocuments,
			isLoad,
		}
	}
}
</script>

<style>

</style>