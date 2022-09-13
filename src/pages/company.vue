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
		
		<div id="CompanyCalendar">
			<div class="company-calendar-wrap">
				<CompanyCalendar :data="activeStorageDocuments"></CompanyCalendar>
				<ManagerCard :manager="managerData"></ManagerCard>
			</div>
		</div>
			
	</div>
</template>

<script setup lang="ts">
import PersonalBar from '/src/components/cards/PersonalBar.vue'
import Notification from '/src/components/cards/Notification.vue'
import CompanyAboutCard from '/src/components/cards/Company/CompanyAboutCard.vue'
import CompanyStorageBar from '/src/components/cards/Company/CompanyStorageBar.vue'
import CompanyBarTop from '/src/components/cards/Company/CompanyBarTop.vue'
import CompanySaleBar from '/src/components/cards/Company/CompanySaleBar.vue'
import CompanyCalendar from '/src/components/cards/Company/CompanyCalendar.vue'
import ManagerCard from '/src/components/cards/ManagerCard.vue'

import { useStore } from 'vuex'
import { ref, onMounted, computed, watch , provide,  defineComponent} from 'vue'
import { useRouter } from 'vue-router'
import { key } from '/src/store'
import { CompanyActions } from '/src/store/company/actions'
import { KeysMutations } from '/src/store/keys/mutations'
import { CompanyMutations } from '../store/company/mutations'

	const props = defineProps (['id'])
 	const store = useStore(key)
	const router = useRouter()

	const isLoad = ref(false)
	const activeCompanyUid = ref(props.id)
	const activeStorageUid = ref<number|null>(0)
	const docDate = ref('')

	const aboutCompanyData =	computed(() => store.getters.getCompanyData(activeCompanyUid.value))
	const companyStoragesData =	computed(() => store.getters.getCompanyStoragesData(activeCompanyUid.value))
	const companyBarTopData =	computed(() => store.getters.getCompanysList)
	const totalSpent =			computed(() => store.getters.getCompanySpent(activeCompanyUid.value))
	const managerUid =			computed(() => store.getters.getManagerUid(activeCompanyUid.value))
	const managerData =			computed(() => store.getters.getManager)

	const loader = computed<boolean>({
		get: () => store.getters.getLoader,
		set: (val: boolean) => store.commit(KeysMutations.SET_LOADER, val)
	})
	const activeStorageDocuments = computed(() => companyStoragesData.value.length === 0 ?
												null : companyStoragesData.value[activeStorageUid.value? activeStorageUid.value:0].documents )

	watch( () => props.id, () => {
		if (props.id !=='') {
				activeCompanyUid.value=props.id;
			} else { activeCompanyUid.value = store.getters.getCompanys === [] ? '' : store.getters.getCompanys[0].uid }
	})

	watch(activeCompanyUid,() => { 
		companyStoragesData.value.length === 0 ? activeStorageUid.value = null : activeStorageUid.value = 0;
		router.push(`/company/${activeCompanyUid.value}`)
		store.commit(CompanyMutations.CLEAR_MANAGER)
		setTimeout(()=>store.dispatch(CompanyActions.GET_MANAGER, managerUid.value), 1000)
	});



	onMounted(() => {
		
		if (!store.getters.isCompanysLoad)// || !store.getters.isManagerLoad)
		{
			loader.value=true;
			Promise.all([
					store.dispatch(CompanyActions.GET_COMPANYS),
					//store.dispatch(CompanyActions.GET_MANAGER),
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
				store.commit(CompanyMutations.CLEAR_MANAGER)
				store.dispatch(CompanyActions.GET_MANAGER, managerUid.value)
			} else { activeCompanyUid.value = store.getters.getCompanys === [] ? '' : store.getters.getCompanys[0].uid }
			isLoad.value = true;
		}
	})

	provide('docDate', docDate ) //фича для обмена данными между компонентами. Связь между компонентом CompanyStorageDoc и CompanyCalendar
</script>

<style>

</style>