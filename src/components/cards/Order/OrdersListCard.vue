<template>
<div class="orders-list-wrap">
	<div class="orders-heading-info">
		<div class="orders-heading-pagination">

			<CatalogPagination
				:maxPage = "page.maxItemOnPage != -1 ? Math.ceil(data_filtred.length / page.maxItemOnPage): 1"
				v-model:currentPage="page.currentPage"
				v-model:maxItemOnPage="page.maxItemOnPage"
				
			/>
		</div>
		<div class="orders-heading-info-text"
				:style=" data_filtred.length != orders_list.length ? 'visibility: visible': 'visibility: hidden'"
			>
					Показано {{data_filtred.length}} из {{orders_list.length}}
		</div>
	</div>

	<div class="orders-list ">
		<div class="orders-list-row orders-list-heading">
			<div class="orders-list-elem">№</div>
			<div :class="'orders-list-elem' + (search.search !='' && search.id == 1 ? ' active': '') + (filter[1].value != '' ? ' active': '')">
				<modal-input v-model="filter[1].value" v-model:show="filter[1].show"></modal-input>
				<div>Наименование</div>
				<div 
					:class="'orders-list-elem-filter' +(filter[1].show || filter[1].value != '' ? ' active': '')"
					title="Фильтр"
					@click="filter[1].show=true"
				>
					<svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path class="fill" d="M7.00726 8.11117L12.7923 2.32601C12.9262 2.1922 13 2.01359 13 1.82313C13 1.63268 12.9262 1.45406 12.7923 1.32026L12.3664 0.894224C12.0888 0.616998 11.6378 0.616998 11.3606 0.894224L6.5027 5.75217L1.63936 0.888833C1.50545 0.755029 1.32694 0.681152 1.13659 0.681152C0.946033 0.681152 0.767522 0.755029 0.633507 0.888833L0.207681 1.31487C0.0737714 1.44878 -4.1357e-08 1.62729 -4.9682e-08 1.81774C-5.8007e-08 2.0082 0.0737714 2.18681 0.207681 2.32062L5.99802 8.11117C6.13236 8.24529 6.31171 8.31896 6.50238 8.31854C6.69378 8.31896 6.87303 8.24529 7.00726 8.11117Z" fill="#A5A7A9"/>
					</svg>
				</div>
				<div 
					v-if="filter[1].value != ''"
					class="orders-list-elem-filter active"
					title="Очистить фильтр"
					@click="filter[1].value='';active = -1"
				>
					<svg width="12" height="12" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect class="fill" x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"/>
					<rect class="fill" width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"/>
					</svg>

				</div>
			</div>
			<div :class="'orders-list-elem' + (contrAgent !='' ? ' active':'')">Контрагент</div>
			<div :class="'orders-list-elem' + (search.search !='' && search.id == 2 ? ' active': '')">Номер</div>
			<div :class="'orders-list-elem' + (search.search !='' && search.id == 3 ? ' active': '') + (period != 'Все' ? ' active':'')+ (filter[2].value != '' ? ' active': '')">
				<modal-date-picker v-model="filter[2].value" v-model:show="filter[2].show"></modal-date-picker>
				<div>Дата создания</div>
				<div 
					:class="'orders-list-elem-filter' +(filter[2].show || filter[2].value != '' ? ' active': '')"
					title="Фильтр"
					@click="filter[2].show=true"
				>
					<svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path class="fill" d="M7.00726 8.11117L12.7923 2.32601C12.9262 2.1922 13 2.01359 13 1.82313C13 1.63268 12.9262 1.45406 12.7923 1.32026L12.3664 0.894224C12.0888 0.616998 11.6378 0.616998 11.3606 0.894224L6.5027 5.75217L1.63936 0.888833C1.50545 0.755029 1.32694 0.681152 1.13659 0.681152C0.946033 0.681152 0.767522 0.755029 0.633507 0.888833L0.207681 1.31487C0.0737714 1.44878 -4.1357e-08 1.62729 -4.9682e-08 1.81774C-5.8007e-08 2.0082 0.0737714 2.18681 0.207681 2.32062L5.99802 8.11117C6.13236 8.24529 6.31171 8.31896 6.50238 8.31854C6.69378 8.31896 6.87303 8.24529 7.00726 8.11117Z" fill="#A5A7A9"/>
					</svg>
				</div>
				<div 
					v-if="filter[2].value != ''"
					class="orders-list-elem-filter active"
					title="Очистить фильтр"
					@click="filter[2].value='';active = -1"
				>
					<svg width="12" height="12" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect class="fill" x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"/>
					<rect class="fill" width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"/>
					</svg>

				</div>
			</div>
			<div :class="'orders-list-elem' + (status != 'Все' ? ' active':'')">Статус</div>
			<div class="orders-list-elem">Инфо</div>
		</div>

		<div class="orders-list-item"
			:class="{'active': key==active,'reserved': item.reserved}"
			v-for="(item, key) in data_filtred"
			:key="key"
			>
			
				<div class="orders-list-row orders-list-main-row"
					v-if="paginationShow(key)"
					@click="key == active ? active = -1 : active = key"
					
				>

					<div class="orders-list-elem">{{ key+1}}	<div class="table-arrow"></div>	</div>
					<div class="orders-list-elem">{{ item.name }}</div>
					<div class="orders-list-elem">{{ normalizeCompanyName(item.partner_name) }}</div>
					<div class="orders-list-elem">{{ item.n }}</div>
					<div class="orders-list-elem">{{ item.date }}</div>
					<div class="orders-list-elem" >

						<div v-for="(check, key) in item.checks" 
							:class="'orders-list-elem-status ' + (parseInt(check.status) >= 0 && parseInt(check.status) < OrdersSatusCodeClass.length ? OrdersSatusCodeClass[parseInt(check.status)].class: '')"
							:tooltip="(parseInt(check.status) >= 0 && parseInt(check.status) < OrdersSatusCodeClass.length ? OrdersSatusCodeClass[parseInt(check.status)].name: '')"
							flow="up"
							:key="key"
						>
							
						</div>
					</div>
					<div class="orders-list-elem" > 
						<button
							class="orders-list-more"
							@click.stop="active_more = key"
						>Подробно</button>
						<div :class="'orders-list-more-dropdown' +  ( key == active_more ? ' active': '' )"  ref="target">
							<a class="orders-list-more-dropdown-link" @click.stop="detailOrderId = item.n; showDetail=true" >Детали заказа</a>
							<a class="orders-list-more-dropdown-link" @click.stop="detailOrderId = item.n; showDetail=true; editOrder=false;repeatOrder=true;" >Повторить заказ</a>
							<a class="orders-list-more-dropdown-link" v-if="item.reserved" @click.stop="detailOrderId = item.n; showDetail=true; editOrder=true;repeatOrder=false;" >Изменить заказ</a>
							<a class="orders-list-more-dropdown-link" >Скачать документы</a>
							<a class="orders-list-more-dropdown-link" >Скачать сертификаты</a>
							<a class="orders-list-more-dropdown-link" @click.stop="setClaimOrderId(item.n)">Оформить претензию</a>
							
							<router-link 
								class="orders-list-more-dropdown-link" 
								tag="a"
								:to="'/shipments/request'"
								@click="setOrderId(item.n)"
							>
									<span>Заявка на транспорт</span>
							</router-link>
							
						</div>
					</div>
				</div>

				<div class="orders-list-info" 
					:class="{'active': key == active }"
					@click="active_more =  -1" 
					v-if="paginationShow(key)"
				>

					
					<div v-if="Array.isArray(item.checks) && item.checks.length>0 && item.status_code != '7' && item.status_code != '9'">
						<div
							class="orders-list-info-row"
							v-for="(check, key1) in item.checks"
							:key="key1"
						> 
							<div class="orders-list-info-elem">{{getStorageName(item.partner_guid, check.organization_id)}}</div>
							<div class="orders-list-info-elem"  > 
								
								<div class="orders-list-info-about tooltip" v-if="check.doc_status?.StatusSchet">
									<div
										class="orders-list-info-download "
										
										@click="downloadBill(check.guid)"
									>
										<span> Счёт от {{item.date.substring(0,10)}} </span>
										<preloader-local
											v-if="loading_bill.includes(item.guid)"
											small
										/>
									</div>
									<span class="tooltiptext">Сохранить счет</span>
								</div>
								<div class="orders-list-info-about tooltip" v-else>
									<div
										class="orders-list-info-download disable"
									>
										Счёт от {{item.date.substring(0,10)}} 
									</div>
									<span class="tooltiptext">Сохранить счет можно только <br> после подтверждения заказа</span>
								</div>
							</div>
							
							<div class="orders-list-info-elem orders-list-info-doc-wrap"  v-if="!check.doc_status">
								<PreloaderLocal small></PreloaderLocal>
							</div>
							<div class="orders-list-info-elem orders-list-info-doc-wrap" v-else>
								
								<a
									v-if="check.doc_status?.StatusSchet "
									class="orders-list-info-doc sc" 
									:href="`${docLocation}/api/order/print?id=${check.guid}&name=Счет`"
									target="_blank"
									title="Открыть счет">
								</a>
																	
								<a 
									v-if="check.doc_status?.StatusUPD"
									class="orders-list-info-doc upd"
									:href="`${docLocation}/api/order/print?id=${check.guid}&name=УПД`"
									target="_blank"
									title="Универсальный передаточный документ">
								</a>
								<a 
									v-if="check.doc_status?.StatusSF"
									class="orders-list-info-doc sf" 
									:href="`${docLocation}/api/order/print?id=${check.guid}&name=СФ`"
									target="_blank"
									title="Счёт-фактура">
								</a>
								<a 
									v-if="check.doc_status?.StatusUPK"
									class="orders-list-info-doc kor"
									:href="`${docLocation}/api/order/print?id=${check.guid}&name=УКД`"
									target="_blank"
									title="Универсальный корректировочный документ">
								</a>
							</div>
							<div class="orders-list-info-elem"> 
							
								{{ OrdersSatusCodeClass[check.status] ? OrdersSatusCodeClass[check.status].name : ''}}	
								<div  
									v-if="OrdersSatusCodeClass[check.status]"
									:class="'orders-list-elem-status small ' + (parseInt(check.status) >= 0 && parseInt(check.status) < OrdersSatusCodeClass.length ? OrdersSatusCodeClass[parseInt(check.status)].class: '')"
									
									flow="up"
								>
								
								</div>
							</div>
							<div class="orders-list-info-elem"> 
								<div class="orders-list-elem-request-bill"
									v-if="check.status != 10">

									<preloader-local small v-if="billRequestLoadingState == check.id"/>
									
									<span v-else @click="billRequestLoading(item.n, check)">Запросить счет</span>
								</div>
							</div>
							<!-- <div class="orders-list-info-elem">
								<a class="orders-list-info-link" href="">Сертификаты</a>
								<a class="orders-list-info-link" href="">Скачать все</a></div> -->
						</div>
					</div>
					<div
						v-else
						class="orders-list-info-row"
						>
						<div class="orders-list-info-elem"></div>
						<div class="orders-list-info-elem">
							Счет отсутвует
						</div>
						<div class="orders-list-info-elem"></div>
						
						<div class="orders-list-info-elem"></div>
						<div class="orders-list-info-elem"></div>
						<div class="orders-list-info-elem"></div>
					</div>
				</div>
				
			<!-- </div>
			</div>
			</div> -->
		</div>
		<div
				class="orders-list-row orders-list-main-row"
				v-if="orders_list.length == 0 && !loading"
			>
				<div class="order-info">
					Заказов не найдено. Создайте <router-link tag="a" class="order-info-link" :to="'/order'">новый заказ</router-link> и он появится в списке.
				</div>
		</div>
	</div>
	<PreloaderLocal v-if="loading" style="width: 100%"></PreloaderLocal>
	<Preloader v-if="loading_global"></Preloader>
	<OrderDetailModal 
		v-model="showDetail" 
		:orderId="detailOrderId" 
		v-model:repeatOrder="repeatOrder"
		v-model:editOrder="editOrder"
	></OrderDetailModal>
</div>
</template>

<script setup lang="ts">
	import PreloaderLocal from '/src/components/PreloaderLocal.vue'
	import Preloader from '/src/components/Preloader.vue'
	import OrderDetailModal from '/src/components/cards/Order/OrderDetailModal.vue'
	import ModalInput from '/src/components/ui/ModalInput.vue'
	import ModalDatePicker from '/src/components/ui/ModalDatePicker.vue'
	import CatalogPagination from '/src/components/cards/Catalog/CatalogPagination.vue'

	import { ref, PropType, watch, computed } from 'vue'
	import { onClickOutside } from '@vueuse/core'
	import { Check, Orders } from '/src/models/Orders'
	import { normalizeCompanyName } from '/src/models/Partner'
	import { useStore } from '/src/store'
	
	import { OrderActions } from '/src/store/order/actions'
	import { StorageCompany } from '/src/models/Partner'
	import { OrdersActions } from '/src/store/orders/actions'
	import { OrdersSatusCode, OrdersSatusCodeClass } from '/src/store/orders/types'

	import { SearchData } from '/src/models/Components'
	import { KeysMutations } from '/src/store/keys/mutations'
	import { useRouter } from 'vue-router'
	import { OrderMutations } from '/src/store/order/mutations'
	import { ClaimActions } from '/src/store/claims/actions'
	import { ClaimMutations } from '/src/store/claims/mutations'


	const props = defineProps(
		{		
		contrAgent: {
			type: String
		},
		period: {
			type: String
		},
		status: {
			type: String
		},
		loading:{
			type: Boolean,
			default: false
		},
		search: {
			type: Object as PropType<SearchData>,
			required: true
		},
		refresh: {
			type: Boolean,
			default: false
		}
	})


	const store = useStore()
	const router = useRouter()
	const loading_global = ref(false)
	const active = ref(-1)
	const active_more = ref(-1)
	const target = ref(null)
	const showDetail = ref(false)
	const loading_bill = ref<string[]>([])
	const detailOrderId = ref(-1)
	const filter = ref([
		{name: 'id', value: '', show: false},
		{name: 'name', value: '', show: false},
		{name: 'date', value: '', show: false},
	])
	const repeatOrder = ref(false)
	const editOrder = ref(false)
	const docLocation = import.meta.env.VITE_APP_DOC_LOCATION
	const page = ref({maxItemOnPage: 10, currentPage: 1})
	const billRequestLoadingState = ref(-1) //Переменная для прелоадера с загрузкой запроса счета

	onClickOutside(target, () => {
		active_more.value = -1
	});
	
	let orders_list = computed<Orders[]>(()=> store.getters.getOrders)
	
	const loadDocStatus = ()=>{
		if (active.value!=-1 && data_filtred.value && Array.isArray(data_filtred.value[active.value].checks)) {
			let promise_arr = data_filtred.value [active.value].checks?.map(x => !x.doc_status ? store.dispatch(OrdersActions.GET_ORDERS_DOCSTATUS, x.guid) : null)
			if (promise_arr){
				Promise.all(promise_arr).finally(()=>{})
			}
		}
	}

	watch( active, ()=>{
		//console.log(active)
		loadDocStatus()
	})
	
	watch( () => props.status, ()=>{
		page.value.currentPage = 1
		active.value = -1
	})
	watch( () => props.contrAgent, ()=>{
		page.value.currentPage = 1
		active.value = -1
	})
	watch( () => props.search, ()=>{
		page.value.currentPage = 1
		active.value = -1
	})
	watch( () => props.period, ()=>{
		page.value.currentPage = 1
		active.value = -1
	})
	watch( () => props.refresh, (next, prev)=>{
		if (prev==true && next ==false){
			loadDocStatus()
		}
		
	})
	
	const data_filtred = computed( () => {
		//фильтр по контрагенту
		
		let data = orders_list.value.filter((x: Orders) => props.contrAgent =='' || x.partner_guid == props.contrAgent)
		
		//фильтр по периоду
		data = data.filter((x: Orders) => checkPeriod(x.date))
		
		//фильтр по статусу
		data = data.filter((x: Orders) => checkStatus(x))
		
		//фильтр по поиску по полю
		data = data.filter((x: Orders) => search(x))
		
		if (filter.value[1].value !=''){
			data = data.filter((x: Orders) => x.name.indexOf(filter.value[1].value)!=-1)
		}
		if (filter.value[2].value !=''){
			data = data.filter((x: Orders) => x.date.indexOf(filter.value[2].value)!=-1)
		}
		
		return data
	})

	const paginationShow = (key: number): boolean => {
		if (page.value.maxItemOnPage != -1){
			return key >= ((page.value.currentPage-1)*page.value.maxItemOnPage) && key < (page.value.currentPage*page.value.maxItemOnPage)
		} else return true	
	}
	
	const search = (item: Orders) => {
		if (props.search.search == '') return true
		switch (props.search.id){
			case 1: 
				return item.name.toUpperCase().indexOf(props.search.search.toUpperCase()) != -1
			case 2: 
				return String(item.n).toUpperCase().indexOf(props.search.search.toUpperCase()) != -1
			case 3: 
				return item.date.toUpperCase().indexOf(props.search.search.toUpperCase()) != -1
			default:
				return true
		}
		// {id: 1, name: 'Наименование'},
		// {id: 2, name: 'Контрагент'},
		// {id: 3, name: 'Номер'},
		// {id: 4, name: 'Дата создания'},
		
	}
	
	const checkPeriod = (date: string) => {
		if (props.period == 'Все') {
			return true
		} else {
			const start = props.period?.split(' - ')[0]
			const year = start?.substring(6,10)
			const month = start?.substring(3,5)
			return year == date.substring(6,10) && month == date.substring(3,5)
		}
	}
	
	const checkStatus = (item: Orders) => {
		
		if (props.status == 'Все'){
			return true
		} else {
			if (Array.isArray(item.checks)){
				return item.checks.findIndex( x => OrdersSatusCode[parseInt(x.status+1)] ? props.status == OrdersSatusCode[parseInt(x.status+1)].name : false) !=-1
			}
			else 
				return false
		}
	}
	
	const downloadBill = (uuid: string): void=>{
		loading_bill.value.push(uuid)
		store.dispatch(OrderActions.GET_BILL_FILE_SAVE, uuid)
			.finally( () => { loading_bill.value = loading_bill.value.filter(item => item !== uuid)})
	}

	const getStorageName = (partner_guid: string, organization_id: string): string=>{
		const storages = <StorageCompany[]>store.getters.getCompanyStoragesData(partner_guid)
		const storage = storages.find(x  => x.guid == organization_id)
		return storage ? storage.name.replace(/(^|\s)\S/g, s => s.toUpperCase()).replace(/(ООО)|(")|(\s)|([а-я])/g, '') : 'Склад'
	}
	
	const setOrderId = (id: number) => {
		store.commit(KeysMutations.SET_CURRENT_ORDER, id)

	}
	
	const setClaimOrderId = (id: number) => {
		loading_global.value = true
		store.commit(OrderMutations.CLEAN_ORDER_DETAIL)
		store.commit(ClaimMutations.CLEAR_CLAIMS_NEW)
		store.dispatch(ClaimActions.ADD_CLAIMS_NEW, id).then(() => {
			loading_global.value = false
			router.push('/claims/request')
		})
		
	}
	
	const filtred = ( item: Orders) => {
		let show = false
		if (filter.value[1].value !=''){
			if (item.name.indexOf(filter.value[1].value)!=-1) show=true
		} else show = true
		return  show
	}
		
	const billRequestLoading = (id: number, check: Check) => {
		if (billRequestLoadingState.value == -1) {
			billRequestLoadingState.value = check.id
			const check_data = Object.assign({},<Check>{
				guid: check.guid,
				id: check.id,
				n: check.n,
				organization_id: check.organization_id,
				status: check.status,
			})
			store.dispatch(OrdersActions.GET_ORDERS_BILL_REQUEST, {id, check: check_data})
				.then(()=>{billRequestLoadingState.value = -1})
				.catch(()=>{billRequestLoadingState.value = -1})
		}
	}
</script>
