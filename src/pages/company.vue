<script setup lang="ts">
import { ref, onMounted, computed, watch, provide } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '/src/store';
import { CompanyActions } from '/src/store/company/actions';
import { KeysMutations } from '/src/store/keys/mutations';
import { CompanyMutations } from '/src/store/company/mutations';

import { PersonalBar, Notification, ManagerCardStack } from '/src/components/cards/index';

import CompanyAboutCard from '/src/components/cards/Company/CompanyAboutCard.vue'
import CompanyStorageBar from '/src/components/cards/Company/CompanyStorageBar.vue'
import CompanyBarTop from '/src/components/cards/Company/CompanyBarTop.vue'
import CompanySaleBar from '/src/components/cards/Company/CompanySaleBar.vue'
import CompanyCalendar from '/src/components/cards/Company/CompanyCalendar.vue'

import { Partner } from '/src/models/Partner';

const props = defineProps(['id'])
const store = useStore()
const router = useRouter()

const isLoad = ref(false)
const activeCompanyUid = ref(props.id)
const activeStorageUid = ref<number | null>(0)
const docDate = ref('')
const currentDiscount = computed(() => store.getters.getCompanyCurrentDiscount(activeCompanyUid.value))

const aboutCompanyData = computed(() => store.getters.getCompanyData(activeCompanyUid.value))
const companyStoragesData = computed<Storage[]>(() => store.getters.getCompanyStoragesData(activeCompanyUid.value))
const companyBarTopData = computed(() => store.getters.getCompanysList)
const totalSpent = computed(() => store.getters.getCompanySpent(activeCompanyUid.value))
const managerUid = computed(() => store.getters.getManagerUid(activeCompanyUid.value))
const managerData = computed(() => store.getters.getManager)
const managersData = computed(() => store.getters.getManagers)

const loader = computed<boolean>({
	get: () => store.getters.getLoader,
	set: (val: boolean) => store.commit(KeysMutations.SET_LOADER, val)
})
const activeStorageDocuments = computed(() => companyStoragesData.value.length === 0 ?
	null : companyStoragesData.value[activeStorageUid.value ? activeStorageUid.value : 0].documents)

watch(() => props.id, () => {
	if (props.id !== '') {
		activeCompanyUid.value = props.id;
	} else { activeCompanyUid.value = store.getters.getCompanys === [] ? '' : store.getters.getCompanys[0].uid }
})

watch(activeCompanyUid, () => {
	companyStoragesData.value.length === 0 ? activeStorageUid.value = null : activeStorageUid.value = 0;
	router.push(`/company/${activeCompanyUid.value}`)
	store.commit(CompanyMutations.CLEAR_MANAGER)
	setTimeout(() => store.dispatch(CompanyActions.GET_MANAGER, managerUid.value), 1000)
	setTimeout(() => store.dispatch(CompanyActions.GET_MANAGERS, managerUid.value), 1000)
});

onMounted(() => {
	if (!store.getters.isCompanysLoad)// || !store.getters.isManagerLoad)
	{
		loader.value = true;
		Promise.all([
			store.dispatch(CompanyActions.GET_COMPANYS),
			//store.dispatch(CompanyActions.GET_MANAGER), // не используется 
		])
			//.catch(()=>{alert('error')})
			.finally(() => {
				setTimeout(() => {
					if (store.getters.isCompanysLoad) {
						const company = store.getters.getCompanys.find((company: Partner) => company.uid === props.id)
						activeCompanyUid.value = company ? company.uid : store.getters.getCompanys[0].uid;
						store.commit(CompanyMutations.SET_ACTIVE_COMPANY_ID, props.id)
						isLoad.value = true;
						loader.value = false;

					} else {
						loader.value = false;
					}
				}, 500);
			})
	} else {
		//;
		if (props.id !== '') {
			activeCompanyUid.value = props.id;
			console.log(props.id)
			store.commit(CompanyMutations.SET_ACTIVE_COMPANY_ID, props.id)
			store.commit(CompanyMutations.CLEAR_MANAGER)
			store.dispatch(CompanyActions.GET_MANAGER, managerUid.value)
			store.dispatch(CompanyActions.GET_MANAGERS, managerUid.value)
		} else { activeCompanyUid.value = store.getters.getCompanys === [] ? '' : store.getters.getCompanys[0].uid }
		isLoad.value = true;
	}
})

provide('docDate', docDate) //фича для обмена данными между компонентами. Связь между компонентом CompanyStorageDoc и CompanyCalendar

const nextStorage = () => {
	if (activeStorageUid.value != null && activeStorageUid.value < companyStoragesData.value.length - 1)
		activeStorageUid.value = activeStorageUid.value + 1
}

const prevStorage = () => {
	if (activeStorageUid.value && activeStorageUid.value > 0)
		activeStorageUid.value = activeStorageUid.value - 1
}
</script>
<template>
	<div v-if="isLoad">
		<div class="top-line product-page">
			<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid"></CompanyBarTop>
			<Notification></Notification>
			<PersonalBar></PersonalBar>
		</div>

		<div class="company-head">
			<div class="company-head-elem">

				<CompanyStorageBar :data="companyStoragesData" v-model="activeStorageUid" @next="nextStorage()"
					@prev="prevStorage()"></CompanyStorageBar>
			</div>

			<div class="company-head-elem">
				<CompanyAboutCard :data="aboutCompanyData"></CompanyAboutCard>
			</div>
		</div>
		<CompanySaleBar :spent="totalSpent" v-model="currentDiscount"></CompanySaleBar>

		<div id="CompanyCalendar">
			<div class="company-calendar-wrap">
				<CompanyCalendar :data="activeStorageDocuments"></CompanyCalendar>
				<ManagerCardStack :managers="managersData" />
			</div>
		</div>

	</div>
</template>