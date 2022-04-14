<template>
<div>
	
	<top-nav></top-nav>

		<div class="shipment-heading claim-heading">
				
				<div class="shipment-heading-elem">
					<router-link
						tag="a" 
						:to="'/shipments'"
						class="shipment-heading-back-btn"
					></router-link>
					
					<div class="shipment-heading-info">

					<div v-if="order" class="shipment-title"><span>Новая заявка по Заказу № {{order}} от {{orders.find(x => x.n == order)?.date.substring(0,10)}}</span></div>
					<div v-else class="shipment-title"><span>Отсутвуют заказы</span></div>
						<div class="shipment-heading-select"><span>Основание: &nbsp;</span>
							<div class="base-select-wrap">
								<select class="base-select" style="width: 100%" v-model="order">
									<option v-for="(order, key) in orders"
										:key="key"
										:value="order.n"
									>{{order.name}}</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="shipment-heading-elem">
					<div class="orders-heading-item">
						<div class="orders-heading-text">Контрагент:</div>
						<SelectInput 
							:data="companys"
							v-model="companyUID"
						/>
					</div>
				
				</div>
				
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
				<component 
					:is="activeCard" 
					:order="orders.find(x => x.n == order)"
					:partner_guid="companyUID"
				/>
				
			</transition>

		</div>
	
</div>
</template>


<script lang="ts">

import TopNav from '@/components/nav/TopNav.vue'
import PreloaderLocal from '@/components/PreloaderLocal.vue'
import SelectInput from '@/components/ui/SelectInput.vue'

import ShipmentPickupCard from '@/components/cards/Shipment/ShipmentPickupCard.vue'
import ShipmentDeliveryCard from '@/components/cards/Shipment/ShipmentDeliveryCard.vue'
import ShipmentTransportCard from '@/components/cards/Shipment/ShipmentTransportCard.vue'

import { useStore } from 'vuex'
import { ref,computed, onMounted, defineComponent } from 'vue'
import { key } from '@/store'
import { CompanyActions } from '@/store/company/actions'
import { OrdersActions } from '@/store/orders/actions'
import { Orders } from '@/models/Orders'
import { KeysConst } from '@/store/keys/types'
import { KeysMutations } from '@/store/keys/mutations'

export default defineComponent({
	components: {
		SelectInput,
		TopNav,
		PreloaderLocal,
		ShipmentPickupCard,
		ShipmentDeliveryCard,
		ShipmentTransportCard
	},
	
	setup(){
		const store = useStore(key)
		const partner_guid = ref('')
		const loading = ref(false)
		const oderVal = ref<number>(-1)
		const activeCard = ref('ShipmentPickupCard')
		
		const order = computed({
			get: () => {
				if (oderVal.value == -1) {
					const id = store.getters.getCurrentOrderId
					if (id != null && id != KeysConst.DEFAULT_ORDER_ID) 
						return id
					else 
						if (store.getters.getOrders[0] != undefined) {
							store.commit(KeysMutations.SET_CURRENT_ORDER, store.getters.getOrders[0].n)
							return store.getters.getOrders[0].n
						} else {
							store.commit(KeysMutations.SET_CURRENT_ORDER, KeysConst.DEFAULT_ORDER_ID)
						return -1
					}
				} else return oderVal.value
				
			},
			set: (val) => {
				oderVal.value = val
				store.commit(KeysMutations.SET_CURRENT_ORDER, KeysConst.DEFAULT_ORDER_ID)
				partner_guid.value=store.getters.getOrders.find( (x: Orders) => x.n == val).partner_guid
				}
		})
		
		const companyUID = computed({
			get: ()=>{
				if (partner_guid.value == '' && order.value !== null ){
					const order_n = store.getters.getOrders.find( (x: Orders) => x.n == order.value)
					return order_n? order_n.partner_guid : ''
				} else 
				return partner_guid.value
			},
			set: (val:string)=>{
				partner_guid.value = val
				const orders = store.getters.getOrders.filter((x: Orders) => x.partner_guid == val )
				if (orders.length)
					oderVal.value = Math.max(...orders.map((x: Orders) => x.n))
			}
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
			activeCard,
			order,
			//computed

			orders: computed(() => store.getters.getOrders.filter((x: Orders) => x.partner_guid == companyUID.value )),
			companys: computed(() => store.getters.getCompanysList),
			companyUID,
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
