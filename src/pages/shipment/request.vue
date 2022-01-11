<template>
<div>
	<div class="top-line product-page">
		<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid"></CompanyBarTop>
		<Notification></Notification>
		<PersonalBar></PersonalBar>
	</div>
	<top-nav></top-nav>

		<div class="shipment-heading">
			<div class="shipment-heading-elem"> <a class="shipment-heading-back-btn" href=""></a>
				<div class="shipment-heading-info">
					<div class="shipment-title"><span>Заявка на отгрузку № 145 от 04.05.2020 по Заказу № 145 от 04.05.2020</span></div>
					<div class="shipment-heading-select"><span>Основание:</span>
						<div class="base-select-wrap">
							<select class="base-select" style="width: 100%">
								<option value="0" selected="">Заказ № 123 от 02.02.20202</option>
								<option value="1">Заказ № 124 от 02.02.20202</option>
								<option value="2">Заказ № 125 от 02.02.20202</option>
								<option value="3">Заказ № 126 от 02.02.20202</option>
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
			<div class="shipment-heading-elem"> 
				<div class="shipment-product"><span>Название:</span>
					<input class="shipment-product-input" type="text" value="Кремень">
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
				<component :is="activeCard"/>
				
			</transition>

		</div>
	</div>
</template>


<script lang="ts">
import PersonalBar from '@/components/cards/PersonalBar.vue'
import Notification from '@/components/cards/Notification.vue'
import CompanyBarTop from '@/components/cards/Company/CompanyBarTop.vue'
import TopNav from '@/components/nav/TopNav.vue'

import ShipmentPickupCard from '@/components/cards/Shipment/ShipmentPickupCard.vue'
import ShipmentDeliveryCard from '@/components/cards/Shipment/ShipmentDeliveryCard.vue'
import ShipmentTransportCard from '@/components/cards/Shipment/ShipmentTransportCard.vue'

import { useStore } from 'vuex'
import { ref,computed, onMounted, defineComponent } from 'vue'
import { key } from '@/store'

export default defineComponent({
	components: {
		PersonalBar,
		Notification,
		CompanyBarTop,
		TopNav,
		ShipmentPickupCard,
		ShipmentDeliveryCard,
		ShipmentTransportCard
	},
	setup(){
		const store = useStore(key);
		const activeCompanyUid = ref('');

		const activeCard = ref('ShipmentPickupCard')

		onMounted(() => {
			if (!store.getters.isCompanysLoad)
			{
				store.dispatch('GET_PARTNER')
			}
			
		});
		return {
			companyBarTopData: computed(() => store.getters.getCompanysList),
			activeCompanyUid,
			activeCard
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
