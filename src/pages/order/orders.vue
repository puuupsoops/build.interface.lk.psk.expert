<template>
<div>
	<div class="top-line product-page">
		<CompanyBarTop 
			:data="companyBarTopData" 
			v-model="activeCompanyUid"/>
		<Notification/>
		<PersonalBar/>
		
	</div>
	<top-nav newOrder></top-nav>
	
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
				<div class="orders-heading-text">Договор:</div>
				<SelectInput 
					:data="dogovor"
				/>
			</div>
			<div class="orders-heading-item" data-select2-id="147">
				<div class="orders-heading-text">Период:</div>
					<SelectInput 
						:data="filterPeriodData"
                        v-model="filterPeriod"
					/>

			</div>
			<div class="orders-heading-clean" title="Убрать фильтры" @click="filterCompanyUid='';filterPeriod=0"></div>
			</div>
			<div class="orders-heading-elem">
			
			</div>
	</div>

	<OrdersSearchCard
		:data="searchColumn"
		v-model="search"
	/>
	<OrdersListCard
		:data="ordersList"
        :loading="loading"
        :contrAgent="filterCompanyUid"
        :period="filterPeriodData[filterPeriod].name"
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
import OrdersListCard from '@/components/cards/Order/OrdersListCard.vue'

import { useStore } from 'vuex'
import { ref, computed, defineComponent, onMounted } from 'vue'
import { key } from '@/store'
import { CompanyActions } from '@/store/company/actions'
//import { OrdersMutations } from '@/store/orders/mutations'
import { OrdersActions } from '@/store/orders/actions'
import { SearchData } from '@/models/Components'

export default defineComponent({
	components:{
		PersonalBar,
		Notification,
		CompanyBarTop,
		TopNav,
		SelectInput,
		OrdersSearchCard,
		OrdersListCard,
	},
	setup(){
		const store = useStore(key);
		const activeCompanyUid = ref('')
        const filterCompanyUid =  ref('')
        const filterPeriod = ref(0)
        const loading = ref(true)
		const search = ref<SearchData|null>(null)
		const dogovor = [{id: 1, name: '---'}]
		const searchColumn = [
			{id: 1, name: 'Наименование'},
			{id: 2, name: 'Контрагент'},
			{id: 3, name: 'Номер'},
			{id: 4, name: 'Дата создания'},
			{id: 5, name: 'Статус'},
		];
	
		onMounted(() => {
			//store.commit(OrdersMutations.SET_ORDERS);

            store.dispatch(OrdersActions.GET_ORDERS).finally(()=>{loading.value = false})
			if (!store.getters.isCompanysLoad)
			{
				store.dispatch(CompanyActions.GET_COMPANYS)
					.then(() =>{
						activeCompanyUid.value = store.getters.getCompanys === [] ? '' : store.getters.getCompanys[0].uid;
					})
			}
			
		});

		return{
            loading,
            companyBarTopData: computed(() => store.getters.getCompanysList),
			filterCompanyData: computed(() => store.getters.getCompanyFromOrders),
            filterCompanyUid,
            filterPeriodData: computed(() => store.getters.getOrdersDataPeriodArray),
            filterPeriod,

            ordersList: computed(() => store.getters.getOrdersFiltred(search.value) ),
			activeCompanyUid,
			dogovor,
			searchColumn,
			search,
		}
	}
})
</script>