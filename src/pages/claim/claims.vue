<template>
	<div>
		<div class="top-line product-page">
			<CompanyBarTop :data="companyBarTopData" v-model="filterCompanyUid"></CompanyBarTop>
			<Notification />
			<PersonalBar />
		</div>
		<top-nav claims @onClick="newClaim"></top-nav>

		<div class="orders-heading">
			<div class="orders-heading-elem">
			<div class="orders-heading-item">
				<div class="orders-heading-text">Контрагент:</div>
				<SelectInput 
					:data="filterCompanyData"
					v-model="filterCompanyUid"
				/>
			</div>
			<div class="orders-heading-item">
				<div class="orders-heading-text">Статус:</div>
				<SelectInput 
					:data="OrdersSatusCode"
					v-model="filterStatus"
				/>
			</div>
			<div class="orders-heading-item" data-select2-id="147">
				<div class="orders-heading-text">Период:</div>
					<SelectInput 
						:data="filterPeriodData"
						v-model="filterPeriod"
					/>
	
			</div>
			<div class="orders-heading-clean" title="Убрать фильтры" @click="filterCompanyUid='';filterPeriod=0;filterStatus=0"></div>
			</div>
			<div class="orders-heading-elem">
			
			</div>
		</div>
		<OrdersSearchCard
			:data="searchColumn"
			v-model="search"
		/>
		
		<ClaimsListCard
			:data="claimsList"
			:loading="loading"
			:contrAgent="filterCompanyUid"
			:period="filterPeriodData[filterPeriod].name"
			:status="OrdersSatusCode[filterStatus].name"
			:search="search"
		/>
		
	</div>
</template>

<script lang="ts">
import PersonalBar from "@/components/cards/PersonalBar.vue"
import Notification from "@/components/cards/Notification.vue"
import CompanyBarTop from "@/components/cards/Company/CompanyBarTop.vue"
import TopNav from "@/components/nav/TopNav.vue"
import ClaimsListCard from '@/components/cards/Claim/ClaimsListCard.vue'
import OrdersSearchCard from '@/components/cards/Order/OrdersSearchCard.vue'
import { OrdersSatusCode } from '@/store/orders/types'

import SelectInput from '@/components/ui/SelectInput.vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { SearchData } from '@/models/Components'
import { defineComponent, ref,computed,onMounted } from 'vue'
import { CompanyActions } from "@/store/company/actions"
import { ClaimActions } from "@/store/claims/actions"
import { OrdersActions } from "@/store/orders/actions"
import { ClaimMutations } from "@/store/claims/mutations"

export default defineComponent({
	components: {
		PersonalBar,
		Notification,
		CompanyBarTop,
		TopNav,
		SelectInput,
		OrdersSearchCard,
		ClaimsListCard,
	},
	setup() {
		const store = useStore(key)
		const loading = ref(false)
		const filterCompanyUid = ref('');
		const filterPeriod = ref(0)
		const filterStatus = ref(0)
		
		const search = ref<SearchData|null>({id: 1, search: ''})
	
		const searchColumn = [
			{id: 1, name: 'Наименование'},
			{id: 2, name: 'Дата создания'},
			{id: 3, name: 'Номер заказа'},
			{id: 4, name: 'Причина'},
			
		];
		
		
		onMounted(() => {
			loading.value = true
			store.dispatch(OrdersActions.GET_ORDERS).finally(()=>{
				store.dispatch(ClaimActions.GET_CLAIMS).finally(()=>{loading.value = false})
			})
			if (!store.getters.isCompanysLoad)
			{
				store.dispatch(CompanyActions.GET_COMPANYS)
			}
		});

		const newClaim = ()=>{
			store.commit(ClaimMutations.CLEAR_CLAIMS_NEW)
		}
		
		return {
			//data
			loading,
			searchColumn,
			search,
			filterCompanyUid,
			filterPeriod,
			filterStatus,
			OrdersSatusCode,
			
			//computed
			companyBarTopData: computed(() => store.getters.getCompanysList),
			filterCompanyData: computed(() => store.getters.getCompanysListInput),
			filterPeriodData: computed(() => store.getters.getOrdersDataPeriodArray),
			claimsList: computed(() => store.getters.getClaims),
			
			//methods
			newClaim,
		}
	},
});
</script>

<style>
</style>