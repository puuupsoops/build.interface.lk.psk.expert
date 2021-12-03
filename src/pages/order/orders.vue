<template>
<div>
	<div class="top-line product-page">
		<CompanyBarTop 
			:data="companyBarTopData" 
			v-model="activeCompanyUid"/>
		<Notification/>
		<PersonalBar/>
		
	</div>
	<top-nav></top-nav>

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
			<router-link 
				tag="a" 
				:to="'/order'"
				class="content-heading-btn"
			
			>
				<svg class="content-heading-btn-img" width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M3 2H18.75C19.3023 2 19.75 2.44772 19.75 3V11.5H21.75V3C21.75 1.34315 20.4069 0 18.75 0H3C1.34315 0 0 1.34315 0 3V21.8571C0 23.514 1.34315 24.8571 3 24.8571H16V22.8571H3C2.44772 22.8571 2 22.4094 2 21.8571V3C2 2.44772 2.44772 2 3 2Z" fill="#A5A7A9"></path>
				<rect class="fill" x="17.6071" y="5.17871" width="1.7" height="13.4643" rx="0.85" transform="rotate(90 17.6071 5.17871)" fill="#A5A7A9"></rect>
				<rect class="fill" x="10" y="13" width="1.7" height="6" rx="0.85" transform="rotate(90 10 13)" fill="#A5A7A9"></rect>
				<rect class="fill" x="14" y="9" width="1.7" height="10" rx="0.85" transform="rotate(90 14 9)" fill="#A5A7A9"></rect>
				<path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M20.8 15C20.2478 15 19.8 15.4477 19.8 16V19H16.8C16.2478 19 15.8 19.4477 15.8 20C15.8 20.5523 16.2478 21 16.8 21H19.8V24C19.8 24.5523 20.2478 25 20.8 25C21.3523 25 21.8 24.5523 21.8 24V21H24.8C25.3523 21 25.8 20.5523 25.8 20C25.8 19.4477 25.3523 19 24.8 19H21.8V16C21.8 15.4477 21.3523 15 20.8 15Z" fill="#A5A7A9"></path>
				</svg>
				<div class="content-heading-btn-text">Новый заказ</div>
			</router-link>
		</div>
	</div>

	<OrdersSearchCard
		:data="{left:header, right:dogovor}"
		v-model="search"
	/>
	<OrdersListCard
		:data="ordersList"
	/>
		
</div>
</template>

<script>
import PersonalBar from '@/components/cards/PersonalBar'
import Notification from '@/components/cards/Notification'
import CompanyBarTop from '@/components/cards/Company/CompanyBarTop'
import TopNav from '@/components/nav/TopNav'
import SelectInput from '@/components/ui/SelectInput';
import OrdersSearchCard from '@/components/cards/Order/OrdersSearchCard'
import OrdersListCard from '@/components/cards/Order/OrdersListCard'

import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'

export default {
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
		const store = useStore();
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
			{id: 3, name: 'Номер'},
			{id: 4, name: 'Дата создания'},
			{id: 5, name: 'Статус'},
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
			store.commit('setOrders');
			if (!store.getters.isCompanysLoad)
			{
				store.dispatch('GET_PARTNER')
					.then(() =>{
						activeCompanyUid.value = store.getters.getCompanys === [] ? '' : store.getters.getCompanys[0].uid;
					})
			}
			
		});

		return{
			companyBarTopData: computed(() => store.getters.getCompanysList),
			ordersList: computed(() => store.getters.getOrders),
			activeCompanyUid,
			dogovor,
			header,
			search,
			period,
		}
	}
}
</script>