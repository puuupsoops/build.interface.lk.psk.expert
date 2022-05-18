<template>

	<div class="maxhigth">
		<div class="top-line product-page">
			<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid"></CompanyBarTop>
			<Notification></Notification>
			<PersonalBar></PersonalBar>
		</div>
		<top-nav address @onClick="editAddrName=-1; addrName= ''; addrLabel='', showAddr=true;">
		</top-nav>
		<div class="shipment-heading">
			<div class="shipment-heading-elem"> 
				<div
						@click="back"	
						class="shipment-heading-back-btn"
					></div>
				<div class="shipment-heading-info">
					<div class="shipment-title"><span>Адреса доставки</span></div>
				</div>
			</div>
			

		</div>
			
		<div class="shipment-address">
			<div class="shipment-address-list-wrap">
				<div class="shipment-address-list">

					<div class="shipment-address-list-row heading">
						<div class="shipment-address-list-elem">№</div>
						<div class="shipment-address-list-elem">Наименование</div>
						<div class="shipment-address-list-elem">Адрес</div>
					</div>
					<div class="shipment-address-list-row">
						<ShipmentAddressInputAdd
							v-model= "addrName"
							v-model:label = "addrLabel"
							v-model:show = "showAddr"
							v-model:edit = "editAddrId"
						/>
						
					</div>
					<div
						v-if="loading"
						class="shipment-address-list-row"
					>
						<preloader-local class="shipment-address-list-row-info"></preloader-local>
					</div>
					<div 
						v-else
						v-for="(item, key) in address"
						:key="key"
						>
						<div
							:class="'shipment-address-list-row ' + ( item.index == currentAddr ? ' active': '' )"
							@click="currentAddr = item.index;  "
						>
							<div class="shipment-address-list-elem">{{key+1}}</div>
							<div class="shipment-address-list-elem">{{item.label}}</div>
							<div class="shipment-address-list-elem">{{item.address}}</div>
							<div class="shipment-address-list-elem actions"
								style="margin-left:auto"
								v-if="key == currentAddr"
							>
								<div
									@click="editAddrId=item.index; addrName=item.address; addrLabel=item.label, showAddr=true"
								>
									<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill="#8D8D8D">
										<path d="M0 0h24v24H0V0z" fill="none"/>
										<path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/>
									</svg>
								</div>
							</div>
							<div :class="'shipment-address-list-elem actions' + (delAddr? ' active':'')" 
								v-if="key == currentAddr"
							>
								<div
									@click="delAddr=!delAddr"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill="#8D8D8D">
										<path d="M0 0h24v24H0V0z" fill="none"/>
										<path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
									</svg>
								</div>
							</div>
						</div>
						<div
							v-if="delAddr && item.index == currentAddr"
							class="shipment-address-list-row-info"
						>
							<div v-if="!delPreloader">Удалить адрес?</div>
							<div v-if="!delPreloader">
								<a href="#" @click="del(currentAddr)">Да</a>
								<a href="#" @click="delAddr=0">Нет</a>
							</div>
							<preloader-local v-else></preloader-local>
						</div>
					</div>
					
					<div v-if="address.length == 0" class="shipment-address-list-row">
						
						<div class="shipment-address-list-nores">Адреса доставки отсутсвуют</div>
					</div>
				</div>
			</div>
		
			<iframe v-if="address.length != 0"
				class="shipment-address-map"
				:src="'https://yandex.ru/map-widget/v1/?mode=whatshere&whatshere%5Bpoint%5D=' + latlon.lon + '%2C'+ latlon.lat + '&z=15'" 
				width="800" 
				height="600" frameborder="0"></iframe>
				
			<!-- <yandex-map :coords="coords" class="shipment-address-map">
				<ymap-marker 
					marker-id="123" 
					:coords="coords"
					:marker-events="['click']"
				></ymap-marker>
			</yandex-map> -->
		</div>
	
	</div>
</template>

<script lang="ts">
import PersonalBar from '@/components/cards/PersonalBar.vue'
import Notification from '@/components/cards/Notification.vue'
import CompanyBarTop from '@/components/cards/Company/CompanyBarTop.vue'
import ShipmentAddressInputAdd from '@/components/cards/Shipment/ShipmentAddressInputAdd.vue'
import TopNav from '@/components/nav/TopNav.vue'
import PreloaderLocal from '@/components/PreloaderLocal.vue'


import { defineComponent, computed, ref, onMounted } from 'vue'
import { key } from '@/store'
import { useStore } from 'vuex'
import { CompanyActions } from '@/store/company/actions'
import { ShipmentsActions } from '@/store/shipments/actions'
import { ShipmentsAddress } from "@/models/Shipments"
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'ShipmentAdresss',
	components: {
		TopNav,
		PersonalBar,
		Notification,
		CompanyBarTop,
		ShipmentAddressInputAdd,
		PreloaderLocal,
	},
	setup() {
		const store = useStore(key);
		const activeCompanyUid = ref('');
		const router = useRouter()
		const currentAddr = ref(0)
		const addrName = ref('')
		const addrLabel = ref('')
		const delAddr = ref(false)
		const delPreloader = ref(false)
		const editAddrId = ref(-1)
		const showAddr = ref(false)
		const loading = ref(false)
		const latlon = computed(() => {
			let def= {lat: '55.760077', lon: '37.617677'}
			const f = store.getters.getShipmentsAddress.find( (x: ShipmentsAddress) => x.index == currentAddr.value)
			if (f) {
				def.lat = f.latitude
				def.lon = f.longitude
			}
			return def
		})
		const coords = ref([54, 39])
		const del = (index: number) => {
			delPreloader.value = true
			store.dispatch(ShipmentsActions.DEL_SHIPMENTS_ADDRESS, index)
				.then(()=>{
					delPreloader.value = false
					delAddr.value = false
				})
		}
		
		onMounted(() => {
			loading.value=true
			store.dispatch(ShipmentsActions.GET_SHIPMENTS_ADDRESS)
				.then(()=>{
					setTimeout(()=>{loading.value=false}, 1000)
				})
			
			if (!store.getters.isCompanysLoad)
			{
				store.dispatch(CompanyActions.GET_COMPANYS)
			}
			
		});
	
		const back = () => {
			router.go(-1)
		}
			
		return {
			activeCompanyUid,
			currentAddr,
			addrName,
			addrLabel,
			delAddr,
			delPreloader,
			editAddrId,
			showAddr,
			loading,
			coords,
			
			companyBarTopData: computed(() => store.getters.getCompanysList),
			address: computed(() => store.getters.getShipmentsAddress),
			latlon,
			back,
			del,
		}
	},
})
</script>


<style scoped lang="sass">
	.maxhigth
		min-height: 100%

	.ymap-container
		height: 600px

</style>