<template>
<div>
	<div class="top-line product-page">
		<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid"></CompanyBarTop>
		<Notification></Notification>
		<PersonalBar></PersonalBar>
	</div>
	<top-nav></top-nav>

		<div class="shipment-heading">
			<div class="shipment-heading-elem"> 
				<router-link
						tag="a" 
						:to="'/shipments'"
						class="shipment-heading-back-btn"
					></router-link>
				
				<div class="shipment-heading-info">
					<div v-if="order" class="shipment-title"><span>Новая заявка на отгрузку по Заказу № {{order}} от {{orders.find(x => x.n == order)?.date.substring(0,10)}}</span></div>
					<div v-else class="shipment-title"><span>Отсутвуют заказы</span></div>
					<div class="shipment-heading-select"><span>Основание: &nbsp;</span>
						<div class="base-select-wrap">
							<preloader-local v-if="loading"></preloader-local>
							<select class="base-select" style="width: 100%" v-model="order">
								<option v-for="(order, key) in orders"
									:key="key"
									:value="order.n"
								>{{order.name}}</option>
							</select>
						</div>
					</div>
					<div class="shipment-heading-info-wrap"> 
						<div class="shipment-heading-info-elem">Количество единиц: <span>120</span></div>
						<div class="shipment-heading-info-elem">Общий вес: <span>25 кг</span></div>
						<div class="shipment-heading-info-elem">Общий обьем: <span>73 м3</span></div>
					</div>
				</div>
			</div>
			<!-- <div class="shipment-heading-elem"> 
				<div class="shipment-product"><span>Название:</span>
					<input class="shipment-product-input" type="text" value="Кремень">
				</div>
			</div> -->
		</div>
		<div class="nav-tab"><span>Вид отгрузки:</span>
		<div class="nav-tab-wrap">
			<a 
				:class="'nav-tab-elem gradient-btn' + ( activeCard =='ShipmentPickupCard' ? ' active' : '' )" 
				@click="activeCard ='ShipmentPickupCard'"
			>
				<div class="gradient-btn-text">Самовывоз</div>
			</a>
			<a 
				:class="'nav-tab-elem gradient-btn' + ( activeCard =='ShipmentDeliveryCard' ? ' active' : '' )" 
				@click="activeCard ='ShipmentDeliveryCard'"
			>
				<div class="gradient-btn-text">Доставка</div>
			</a>
			<a
				:class="'nav-tab-elem gradient-btn' + ( activeCard =='ShipmentTransportCard' ? ' active' : '' )" 
				@click="activeCard ='ShipmentTransportCard'"
			>
				<div class="gradient-btn-text">До транспортной</div>
			</a>
		</div>
		</div>
		<div class="shipment-form shipment-form-pickup">
			<transition name="show" mode="out-in">
				<component :is="activeCard" :order="'№ ' + order + ' от ' + orders.find(x => x.n == order)?.date.substring(0,10) "/>
				
			</transition>

		</div>
	
</div>
</template>


<script lang="ts">
import PersonalBar from '@/components/cards/PersonalBar.vue'
import Notification from '@/components/cards/Notification.vue'
import CompanyBarTop from '@/components/cards/Company/CompanyBarTop.vue'
import TopNav from '@/components/nav/TopNav.vue'
import PreloaderLocal from '@/components/PreloaderLocal.vue'

import ShipmentPickupCard from '@/components/cards/Shipment/ShipmentPickupCard.vue'
import ShipmentDeliveryCard from '@/components/cards/Shipment/ShipmentDeliveryCard.vue'
import ShipmentTransportCard from '@/components/cards/Shipment/ShipmentTransportCard.vue'

import { useStore } from 'vuex'
import { ref,computed, onMounted, defineComponent } from 'vue'
import { key } from '@/store'
import { CompanyActions } from '@/store/company/actions'
import { OrdersActions } from '@/store/orders/actions'
import { ShipmentsConst } from '@/store/shipments/types'
import { ShipmentsMutations } from '@/store/shipments/mutations'

export default defineComponent({
	components: {
		PersonalBar,
		Notification,
		CompanyBarTop,
		TopNav,
		PreloaderLocal,
		ShipmentPickupCard,
		ShipmentDeliveryCard,
		ShipmentTransportCard
	},
	
	setup(){
		const store = useStore(key)
		const activeCompanyUid = ref('')
		const loading = ref(false)
		
		const activeCard = ref('ShipmentPickupCard')
		
		const order = computed({
			get: () => {
				const id = store.getters.getCurrentOrderId
				if (id != null && id != ShipmentsConst.DEFAULT_ORDER_ID) 
					return id
				else {
					if (store.getters.getOrders[0] != undefined) {
							store.commit(ShipmentsMutations.SET_CURRENT_ORDER, store.getters.getOrders[0].n)
							return store.getters.getOrders[0].n
						} else {
						store.commit(ShipmentsMutations.SET_CURRENT_ORDER, ShipmentsConst.DEFAULT_ORDER_ID)
						return null
					}
				}
			},
			set: (val) => {store.commit(ShipmentsMutations.SET_CURRENT_ORDER,val)}
		})
		onMounted(() => {
			
			if (!store.getters.isCompanysLoad) store.dispatch(CompanyActions.GET_COMPANYS)
			if (!store.getters.isOrders) {
				loading.value = true
				store.dispatch(OrdersActions.GET_ORDERS).then(()=>{ loading.value = false})
			}
		});
		
		return {
			loading,
			activeCompanyUid,
			activeCard,
			order,
			//computed
			companyBarTopData: computed(() => store.getters.getCompanysList),
			orders: computed(() => store.getters.getOrders),
		}
	}
})

</script>

<style lang="sass">
.show-enter-active, .show-leave-active 
	transition: all .2s ease

.show-enter-from, .show-leave-to 
	transform: translateX(-100px)
	opacity: 0


</style>
