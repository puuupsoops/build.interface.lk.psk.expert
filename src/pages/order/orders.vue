<template>
<div>
	<div class="top-line product-page">
		<CompanyBarTop 
			:data="companyBarTopData" 
			v-model="filterCompanyUid"/>
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
				<div class="orders-heading-text">Статус:</div>
				<SelectInput 
					:data="OrdersSatusCode"
					v-model="filterStatus"
				/>
			</div>
			<div class="orders-heading-item">
				<div class="orders-heading-text">Период:</div>
					<SelectInput 
						:data="filterPeriodData"
						v-model="filterPeriod"
					/>

			</div>
			<div class="orders-heading-clean" title="Убрать фильтры" @click="filterCompanyUid='';filterPeriod=0;filterStatus=0"></div>
			</div>
			<div class="orders-heading-elem" v-if="!loading">
				<button class="product-search-btn gradient-btn" @click="refresh()">
					<PreloaderLocal small v-if="refreshing"/>
					<div v-else>Обновить</div>
				</button>
			</div>
	</div>

	<!-- <OrdersSearchCard
		:data="searchColumn"
		v-model="search"
	/> -->
	<OrdersListCard
	
		:loading="loading"
		:contrAgent="filterCompanyUid"
		:period="filterPeriodData[filterPeriod].name"
		:status="OrdersSatusCode.find(x=>x.id==filterStatus)?.name"
		:search="search"
		:refresh="refreshing"
	/>
		
</div>
</template>

<script setup lang="ts">
	import PersonalBar from '/src/components/cards/PersonalBar.vue'
	import Notification from '/src/components/cards/Notification.vue'
	import CompanyBarTop from '/src/components/cards/Company/CompanyBarTop.vue'
	import TopNav from '/src/components/nav/TopNav.vue'
	import SelectInput from '/src/components/ui/SelectInput.vue'
	// import OrdersSearchCard from '/src/components/cards/Order/OrdersSearchCard.vue'
	import OrdersListCard from '/src/components/cards/Order/OrdersListCard.vue'
	import PreloaderLocal from '/src/components/PreloaderLocal.vue'

	import { useStore } from '/src/store'
	import { ref, computed, defineComponent, onMounted } from 'vue'
	
	import { CompanyActions } from '/src/store/company/actions'
	import { OrdersSatusCode } from '/src/store/orders/types'
	import { OrdersActions } from '/src/store/orders/actions'
	import { SearchData } from '/src/models/Components'

	const store = useStore();
	const loading = ref(true)
	const search = ref<SearchData>({id: 1, search: ''})
	const companyBarTopData = computed(() => store.getters.getCompanysList)

	const filterStatus = ref(0)
	const filterCompanyData = computed(() => store.getters.getCompanyFromOrders())
	const filterCompanyUid =  ref('')
	const filterPeriodData = computed(() => store.getters.getOrdersDataPeriodArray)
	const filterPeriod = ref(0)

	const refreshing = ref(false)

	const searchColumn = [
		{id: 1, name: 'Наименование'},
		{id: 2, name: 'Номер'},
		{id: 3, name: 'Дата создания'},
		
	];

	const refresh = () => {
		
		if (refreshing.value == false){
			refreshing.value=true	
			store.dispatch(OrdersActions.GET_ORDERS).finally(()=>{
				refreshing.value = false
				loading.value = true
				loading.value = false
			})
		}
	}

	onMounted(() => {
		store.dispatch(OrdersActions.GET_ORDERS).finally(()=>{loading.value = false})
		if (!store.getters.isCompanysLoad)
		{
			store.dispatch(CompanyActions.GET_COMPANYS)
				.then(() =>{
				//	activeCompanyUid.value = store.getters.getCompanys === [] ? '' : store.getters.getCompanys[0].uid;
				})
		}
	});

		
</script>