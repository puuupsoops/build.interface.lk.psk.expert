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
				<ManagerCard :name="managerName"></ManagerCard>
			</div>
		</div>
			
	</div>
</template>

<script lang="ts">
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

export default defineComponent({
	components: {
		CompanyAboutCard,
		CompanyStorageBar,
		CompanyBarTop,
		CompanySaleBar,
		Notification,
		PersonalBar,
		CompanyCalendar,
		ManagerCard,
	},
	props: ['id'],
	setup(props){
		const store = useStore(key);
		const router = useRouter();
		let isLoad = ref(false);
		let activeCompanyUid = ref(props.id);
		let activeStorageUid = ref<number|null>(0);
		let docDate = ref('');
		let aboutCompanyData = computed(() => store.getters.getCompanyData(activeCompanyUid.value));
		let companyStoragesData = computed(() =>  store.getters.getCompanyStoragesData(activeCompanyUid.value));
		let companyBarTopData = computed(() => store.getters.getCompanysList);
		let totalSpent = computed(() => store.getters.getCompanySpent(activeCompanyUid.value))
		let managerName = computed(() => store.getters.getManagerName(activeCompanyUid.value))
		
		const loader = computed<boolean>({
			get: () => store.getters.getLoader,
			set: (val: boolean) => store.commit(KeysMutations.SET_LOADER, val)
		})

		watch( () => props.id, () => {
			//console.log(props.id)
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
													null : companyStoragesData.value[activeStorageUid.value? activeStorageUid.value:0].documents );
	

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
			managerName,
			isLoad,
		}
	}
})
</script>

<style>

</style>