<template>

	<div class="maxhigth">
		<div class="top-line product-page">
			<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid"></CompanyBarTop>
			<Notification></Notification>
			<PersonalBar></PersonalBar>
		</div>
		<top-nav>
		</top-nav>
		<div class="shipment-heading">
			<div class="shipment-heading-elem"> 
				<!-- <router-link
						tag="a" 
						:to="'/shipments'"
						class="shipment-heading-back-btn"
					></router-link> -->
				<div class="shipment-heading-info">
					<div class="shipment-title"><span>Адреса доставки</span></div>
				</div>
			</div>
			<div class="content-heading-btn">
					<div
						class="shipment-form-map-btn" 
						@click="addAddr=true"
					> 
						<svg class="shipment-form-map-btn-img" width="19" height="25" viewBox="0 0 19 25" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M9.49968 25C8.95397 25 8.4653 24.717 8.19255 24.2429C8.18967 24.238 8.18688 24.2329 8.1841 24.2279L1.98479 12.8809C0.505001 10.1724 0.547432 6.95749 2.09831 4.28113C3.61555 1.66277 6.31047 0.0631103 9.30725 0.00197754C9.43527 -0.00065918 9.56398 -0.00065918 9.69191 0.00197754C12.6887 0.0631103 15.3837 1.66277 16.9009 4.28113C18.4518 6.95749 18.4943 10.1723 17.0145 12.8809L10.8152 24.2279C10.8124 24.2329 10.8096 24.238 10.8067 24.2429C10.534 24.717 10.0454 25 9.49968 25ZM9.49963 1.56252C9.44597 1.56252 9.39245 1.56306 9.33903 1.56414C6.89279 1.61404 4.69133 2.92258 3.45017 5.06453C2.17541 7.26448 2.14016 9.90642 3.35593 12.1317L9.49963 23.3768L15.6433 12.1318C16.8591 9.90642 16.8238 7.26448 15.549 5.06453C14.3078 2.92263 12.1064 1.61404 9.66013 1.56414C9.60685 1.56306 9.55329 1.56252 9.49963 1.56252Z" fill="#8D8D8D"></path>
								<path d="M9.5 11.3281C7.56147 11.3281 5.98438 9.75103 5.98438 7.8125C5.98438 5.87397 7.56147 4.29688 9.5 4.29688C11.4385 4.29688 13.0156 5.87397 13.0156 7.8125C13.0156 9.75103 11.4386 11.3281 9.5 11.3281ZM9.5 5.85938C8.42305 5.85938 7.54688 6.73555 7.54688 7.8125C7.54688 8.88945 8.42305 9.76563 9.5 9.76563C10.577 9.76563 11.4531 8.88945 11.4531 7.8125C11.4531 6.73555 10.577 5.85938 9.5 5.85938Z" fill="#8D8D8D"></path>
						</svg>
						<span >Добавить <br>новый адрес</span>
					</div>
			</div>

		</div>
			
		<div class="shipment-address">
			<div class="shipment-address-list-wrap">
				<div class="shipment-address-list">

					<div class="shipment-address-list-row heading">
						<div class="shipment-address-list-elem">№</div>
						<div class="shipment-address-list-elem">Адрес</div>
					</div>
					<div class="shipment-address-list-row">
						<shipment-address-input 
							v-model= "addAddr"
						></shipment-address-input>
						
					</div>
					
					<div 
						v-for="(item, key) in address"
						:key="key"
						>
						<div
							:class="'shipment-address-list-row ' + ( item.id == currentAddr ? ' active': '' )"
							@click="currentAddr = item.id;  "
						>
							<div class="shipment-address-list-elem">{{item.id}}</div>
							<div class="shipment-address-list-elem">{{item.name}}</div>
							<div class="shipment-address-list-elem actions" 
								v-if="item.id == currentAddr"
							>
								<div>
									<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill="#8D8D8D">
										<path d="M0 0h24v24H0V0z" fill="none"/>
										<path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/>
									</svg>
								</div>
							</div>
							<div :class="'shipment-address-list-elem actions' + (delAddr? ' active':'')" 
								v-if="item.id == currentAddr"
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
							v-if="delAddr && item.id == currentAddr"
							class="shipment-address-list-row-info"
							>
							<div>Удалить адрес?</div>
							<div>
								<a href="#">Да</a>
								<a >Нет</a></div>
						</div>
					</div>
				</div>
			</div>
			<iframe 
				class="shipment-address-map"
				src="https://yandex.ru/map-widget/v1/?um=constructor%3A215aa76ce0c1bf4f7b91136adfdeb973d398ac1754efa95eb44e60ec1bbabd43&amp;source=constructor" 
				width="800" 
				height="600" frameborder="0"></iframe>
		</div>
	
	</div>
</template>

<script lang="ts">
import PersonalBar from '@/components/cards/PersonalBar.vue'
import Notification from '@/components/cards/Notification.vue'
import CompanyBarTop from '@/components/cards/Company/CompanyBarTop.vue'
import ShipmentAddressInput from '@/components/cards/Shipment/ShipmentAddressInput.vue'
import TopNav from '@/components/nav/TopNav.vue'
//import SelectInput from '@/components/ui/SelectInput.vue'


import { defineComponent, computed, ref, onMounted, nextTick } from 'vue'
import { key } from '@/store'
import { useStore } from 'vuex'
import { CompanyActions } from '@/store/company/actions'


export default defineComponent({
	name: 'ShipmentAdresss',
	components: {
		TopNav,
		PersonalBar,
		Notification,
		CompanyBarTop,
		ShipmentAddressInput,
		//SelectInput,
	},
	setup() {
		const store = useStore(key);
		const activeCompanyUid = ref('');
		const address = ref([
				{id: 1, name:'Россия г. Москва ул. Ангарская вл. 8, стр. 15 д.'},
				{id: 2, name:'Россия г. Москва ул. Ангарская вл. 9, д.'},
				{id: 3, name:'Россия г. Москва ул. Ангарская вл. 10, стр. 16 д.'},
				{id: 4, name:'Россия г. Москва ул. Ангарская вл. 23, стр. 45 д.'},
				{id: 5, name:'Россия г. Москва ул. Ангарская вл. 44, стр. 5 д.'},
				{id: 6, name:'Россия г. Москва ул. Ангарская вл. 67, стр. 145 д.'},
			])
		const currentAddr = ref(1)
		const addAddr = ref(false)
		const delAddr = ref(false)
		
		onMounted(() => {
			if (!store.getters.isCompanysLoad)
			{
				store.dispatch(CompanyActions.GET_COMPANYS)
			}
			
		});
		nextTick(() => {
			// Установить скрипты для использования яндекс карты
			// let scriptYandexMap = document.createElement('script');
			// scriptYandexMap.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?lang=ru_RU');
			// document.head.appendChild(scriptYandexMap);
			
			// // Инициализировать яндекс карту
			// scriptYandexMap.addEventListener('load', () => {
			// 	setTimeout( ()=>{ console.log(document) }, 5000)
			// })
		
		})
		
			
		return {
			address,
			activeCompanyUid,
			currentAddr,
			addAddr,
			delAddr,
			
			companyBarTopData: computed(() => store.getters.getCompanysList),
		}
	},
})
</script>


<style scoped lang="sass">
	.maxhigth
		min-height: 100%
</style>