<template>
	<div>
		<div class="top-line product-page">
			<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid" />
			<Notification />
			<PersonalBar />
		</div>
		<top-nav claims></top-nav>

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
					<SelectInput :data="dogovor"/>
				</div>
				<div class="orders-heading-item" >
					<div class="orders-heading-text">Период:</div>
						<SelectInput :data="period"/>
				</div>
				<div class="orders-heading-clean"></div>
				</div>
				<div class="orders-heading-elem">
				
			</div>
		</div>
		<OrdersSearchCard
			:data="header"
			v-model="search"
		/>
		<!-- <ShipmentsListCard
			:data="shipmentsList"
		/> -->
		
	</div>
</template>

<script>
import PersonalBar from "@/components/cards/PersonalBar"
import Notification from "@/components/cards/Notification"
import CompanyBarTop from "@/components/cards/Company/CompanyBarTop"
import TopNav from "@/components/nav/TopNav"
//import ShipmentsListCard from '@/components/cards/Shipment/ShipmentsListCard.vue'
import OrdersSearchCard from '@/components/cards/Order/OrdersSearchCard.vue'

import SelectInput from '@/components/ui/SelectInput'
import { useStore } from 'vuex'
import { key } from '@/store'
import { defineComponent, ref,computed,onMounted }from 'vue'
import { CompanyActions } from "@/store/company/actions"

export default defineComponent({
	components: {
		PersonalBar,
		Notification,
		CompanyBarTop,
		TopNav,
		SelectInput,
		OrdersSearchCard,
		//ShipmentsListCard,
	},
	setup() {
		const store = useStore(key)
		const activeCompanyUid = ref('')
		const search = ref({left: 1, right: 0})
		const period = ref([
			{id: 1, name:'01.01.2021-31.01.2021'},
			{id: 2, name:'01.02.2021-28.02.2021'},
			{id: 3, name:'01.03.2021-31.03.2021'},
			{id: 4, name:'01.04.2021-30.04.2021'},
		])

		const dogovor = ref([
			{id: 1, name:'По умолчанию № 1'},
			{id: 2, name:'По умолчанию № 2'},
			{id: 3, name:'По умолчанию № 3'},
			{id: 4, name:'По умолчанию № 4'},
		]);
		const header = ref([
			{id: 1, name: 'Наименование'},
			{id: 2, name: 'Контрагент'},
			{id: 3, name: 'Желаемая дата'},
			{id: 4, name: 'Номер'},
			{id: 5, name: 'Дата отгрузки'},
			{id: 6, name: 'Статус'},
		])
		
		onMounted(() => {
			if (!store.getters.isCompanysLoad)
			{
				store.dispatch(CompanyActions.GET_COMPANYS)
			}
		});

		return {
			companyBarTopData: computed(() => store.getters.getCompanysList),
			activeCompanyUid,
			header,
			dogovor,
			period,
			search,
		}
	},
});
</script>

<style>
</style>