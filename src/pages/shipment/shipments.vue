<template>
<div>
		
	<div class="top-line product-page">
		<CompanyBarTop :data="companyBarTopData" v-model="filterCompanyUid"></CompanyBarTop>
		<Notification></Notification>
		<PersonalBar></PersonalBar>
	</div>
	<top-nav shipments></top-nav>

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
	<ShipmentsListCard
		:data="shipmentsList"
		:loading="loading"
		:contrAgent="filterCompanyUid"
		:period="filterPeriodData[filterPeriod].name"
		:status="OrdersSatusCode[filterStatus].name"
		:search="search"
	/>
	
		
 </div>
</template>



<script lang="ts">
import PersonalBar from '@/components/cards/PersonalBar.vue'
import Notification from '@/components/cards/Notification.vue'
import CompanyBarTop from '@/components/cards/Company/CompanyBarTop.vue'
import TopNav from '@/components/nav/TopNav.vue'
import SelectInput from '@/components/ui/SelectInput.vue'
import OrdersSearchCard from '@/components/cards/Order/OrdersSearchCard.vue'
import ShipmentsListCard from '@/components/cards/Shipment/ShipmentsListCard.vue'

import { useStore } from 'vuex'
import { ref, computed, onMounted, defineComponent } from 'vue'
import { key } from '@/store'
import { CompanyActions } from '@/store/company/actions'
import { ShipmentsActions } from '@/store/shipments/actions'
import { OrdersSatusCode } from '@/store/orders/types'
import { SearchData } from '@/models/Components'
import { OrdersActions } from '@/store/orders/actions'

export default defineComponent({
	components:{
		PersonalBar,
		Notification,
		CompanyBarTop,
		TopNav,
		SelectInput,
		OrdersSearchCard,
		ShipmentsListCard,
	},
	setup(){
		const store = useStore(key);
		const loading = ref(true)
		const filterCompanyUid = ref('');
		const filterPeriod = ref(0)
		const filterStatus = ref(0)
		const search = ref<SearchData|null>(null)
	
		const searchColumn = [
			{id: 1, name: 'Наименование'},
			{id: 2, name: 'Контрагент'},
			{id: 3, name: 'Номер'},
			{id: 4, name: 'Дата создания'},
			{id: 5, name: 'Статус'},
		];
	
		onMounted(() => {
			store.dispatch(OrdersActions.GET_ORDERS).finally(()=>{
				store.dispatch(ShipmentsActions.GET_SHIPMENTS).finally(()=>{loading.value = false})
			})
			
			if (!store.getters.isCompanysLoad)
			{
				store.dispatch(CompanyActions.GET_COMPANYS)
					// .then(() =>{
					// 	filterCompanyUid.value = store.getters.getCompanys === [] ? '' : store.getters.getCompanys[0].uid;
					// })
			}
		});

		return{
			companyBarTopData: computed(() => store.getters.getCompanysList),
			//filterCompanyData: computed(() => store.getters.getCompanyFromShipments),
			filterCompanyData: computed(() => store.getters.getCompanysListInput),
			filterCompanyUid,
			filterPeriodData: computed(() => store.getters.getOrdersDataPeriodArray),
			filterPeriod,
			OrdersSatusCode,
			filterStatus,
			shipmentsList: computed(() => store.getters.getShipments),
			search,
			loading,
			searchColumn
		}
	}
})
</script>