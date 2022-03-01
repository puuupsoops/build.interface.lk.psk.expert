<template>
<div>
		
	<div class="top-line product-page">
		<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid"></CompanyBarTop>
		<Notification></Notification>
		<PersonalBar></PersonalBar>
	</div>
	<top-nav shipments></top-nav>

	<div class="orders-heading">
			<div class="orders-heading-elem">
			<div class="orders-heading-item">
				<div class="orders-heading-text">Контрагент:</div>
				<SelectInput 
					:data="companyBarTopData"
					v-model="activeCompanyUid"
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
						:data="period"
					/>

			</div>
			<div class="orders-heading-clean"></div>
			</div>
			<div class="orders-heading-elem">
			
		</div>
	</div>
	<OrdersSearchCard
		:data="{left:header, right:dogovor}"
		v-model="search"
	/>
	<ShipmentsListCard
		:data="shipmentsList"
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
import { ShipmentsMutations } from '@/store/shipments/mutations'

export default defineComponent({
	components:{
		PersonalBar,
		Notification,
		CompanyBarTop,
		TopNav,
		SelectInput,
		OrdersSearchCard,
		ShipmentsListCard
	},
	setup(){
		const store = useStore(key);
		const activeCompanyUid = ref('');
		const search = ref({left: 1, right: 0});
		const dogovor = ref([
			{id: 1, name:'По умолчанию № 1'},
			{id: 2, name:'По умолчанию № 2'},
			{id: 3, name:'По умолчанию № 3'},
			{id: 4, name:'По умолчанию № 4'},
		]);
		const header = [
			{id: 1, name: 'Наименование'},
			{id: 2, name: 'Контрагент'},
			{id: 3, name: 'Желаемая дата'},
			{id: 4, name: 'Номер'},
			{id: 5, name: 'Дата отгрузки'},
			{id: 6, name: 'Статус'},
		];
		const period = computed(() => {
			let res = [];
			let d = new Date();

			for (var i = 0; i < 15; i++){
				let s = new Date(d.getFullYear(), d.getMonth()-i, 1).toLocaleString().substr(0,10) +' - ';
				s = s + (new Date(d.getFullYear(), d.getMonth()-i+1, 0)).toLocaleString().substr(0,10);
				res.push({id: i+1, name: s})
			}
			return res;
		});

	
		onMounted(() => {
			store.commit(ShipmentsMutations.SET_SHIPMENT);
			if (!store.getters.isCompanysLoad)
			{
				store.dispatch(CompanyActions.GET_COMPANYS)
					.then(() =>{
						activeCompanyUid.value = store.getters.getCompanys === [] ? '' : store.getters.getCompanys[0].uid;
					})
			}
		
		});

		return{
			companyBarTopData: computed(() => store.getters.getCompanysList),
			shipmentsList: computed(() => store.getters.getShipments),
			activeCompanyUid,
			dogovor,
			period,
			header,
			search,
		}
	}
})
</script>