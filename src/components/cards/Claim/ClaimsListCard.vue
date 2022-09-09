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
				:style=" data_filtred.length != data.length ? 'visibility: visible': 'visibility: hidden'"
			>
					Показано {{data_filtred.length}} из {{data.length}}
		</div>
	</div>

	<div class="orders-list " >
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
					
				</div>
				<div :class="'orders-list-elem' + (contrAgent !='' ? ' active':'')">Контрагент</div>
				<div :class="'orders-list-elem' + (search.search !='' && search.id == 2 ? ' active': '')">Дата создания</div>
				<div :class="'orders-list-elem' + (search.search !='' && search.id == 3 ? ' active': '')" style="justify-content: space-around">Номер заказа</div>

				<div :class="'orders-list-elem' + (status != 'Все' ? ' active':'')">Статус</div>
				<div :class="'orders-list-elem' + (search.search !='' && search.id == 4 ? ' active': '')">Причина</div>

			</div>

			<div 
				v-for="(item, key) in data_filtred"
				:key="key"
				:class="'orders-list-item' + ( key == active ? ' active': '' )"
			>
				
					<div class="orders-list-row orders-list-main-row"
						@click="key === active ? active = -1 : active = key"
						v-if="paginationShow(key)"
					>

						<div class="orders-list-elem">
							{{key+1}} 
							<div class="table-arrow"></div>
						</div>
						<div class="orders-list-elem"> Претензия № {{ item.bitrix_id }} от {{item.date_create.substring(0, 10)}}</div>
						<div class="orders-list-elem"><span v-html="item.partner_name"></span></div>
						<div class="orders-list-elem">{{ item.date_create.substring(0, 10) }}</div>
						<div class="orders-list-elem" style="justify-content: space-around">{{ item.order ? item.order.n : '' }}</div>
						<div class="orders-list-elem"></div>
						<div class="orders-list-elem">{{item.case}}</div>
						
					</div>
					
					<div class="orders-list-info" 
						:class="{'active': key == active }"
						@click="active_more =  -1" 
						v-if="paginationShow(key)"
					>
						
						<div v-if="item.order && Array.isArray(item.order.checks) ">
							<div
								class="orders-list-info-row"
								v-for="(check, key1) in item.order.checks"
								:key="key1"
							>
								
								<div class="orders-list-info-elem">{{getStorageName(item.partner_guid, check.organization_id)}}</div>
								<div class="orders-list-info-elem"  > 
									<div class="orders-list-info-about tooltip" v-if="check.status >= 2">
										<div
											class="orders-list-info-download "
											
											@click="downloadBill(check.guid)"
										>
											<span> Счёт от {{item.order.date.substring(0,10)}} </span>
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
											Счёт от {{item.order.date.substring(0,10)}} 
										</div>
										<span class="tooltiptext">Сохранить счет можно только <br> после подтверждения заказа</span>
									</div>
								</div>
								
								<div class="orders-list-info-elem orders-list-info-doc-wrap"  v-if="!check.doc_status">
									<PreloaderLocal small></PreloaderLocal>
								</div>
								<div class="orders-list-info-elem orders-list-info-doc-wrap" v-else>
									
									<a
										v-if="check.doc_status?.StatusSchet  && check.status >= 2"
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
								
								</div>
								<div class="orders-list-info-elem"> 
										{{ OrdersSatusCode[check.status+1] ? OrdersSatusCode[check.status+1].name : ''}}
								</div>
								<!-- <div class="orders-list-info-elem">
									<a class="orders-list-info-link" href="">Сертификаты</a>
									<a class="orders-list-info-link" href="">Скачать все</a></div> -->
							
								<div class="orders-list-info-elem"> 
									
								</div>
							
								<!-- <div class="orders-list-info-elem">
									<a class="orders-list-info-link" href="">Сертификаты</a>
									<a class="orders-list-info-link" href="">Скачать все</a>
									</div> -->
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
							<div class="orders-list-info-elem"></div>
						</div>
					</div>
					
				<!-- </div>
				</div>
				</div> -->
			</div>
			<div
				class="orders-list-row orders-list-main-row"
				v-if="data.length == 0 && !loading"
			>
				<div class="order-info">
					Претензий не найдено.
				</div>
			</div>
	</div>
	<PreloaderLocal v-if="loading" style="width: 100%"></PreloaderLocal>
	<OrderDetailModal v-model="showDetail" :orderId="detailOrderId"></OrderDetailModal>
</div>
</template>

<script setup lang="ts">
	import PreloaderLocal from '/src/components/PreloaderLocal.vue'
	import OrderDetailModal from '/src/components/cards/Order/OrderDetailModal.vue'
	import ModalInput from '/src/components/ui/ModalInput.vue'
	import CatalogPagination from '/src/components/cards/Catalog/CatalogPagination.vue'

	import { ref, PropType, defineComponent, watch, computed } from 'vue'
	import { onClickOutside } from '@vueuse/core'
	import { Claim } from '/src/models/Claim'
	import { useStore } from 'vuex'
	import { key } from '/src/store'
	import { OrderActions } from '/src/store/order/actions'
	import { Storage } from '/src/models/Partner'
	import { OrdersActions } from '/src/store/orders/actions'
	import { OrdersSatusCode } from '/src/store/orders/types'

	import { SearchData } from '/src/models/Components'
	import { KeysMutations } from '/src/store/keys/mutations'

const props = defineProps({
		data: {
			type: Array as PropType<Claim[]>,
			required: true
		},
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
		}
	})
	const page = ref({maxItemOnPage: 10, currentPage: 1})
	const store = useStore(key)
	const active = ref(-1)
	const active_more = ref(-1)
	const target = ref(null)
	const showDetail = ref(false)
	const loading_bill = ref<string[]>([])
	const detailOrderId = ref(-1)
	const docLocation = import.meta.env.VITE_APP_DOC_LOCATION
	const filter = ref([
		{name: 'id', value: '', show: false},
		{name: 'name', value: '', show: false},
		{name: 'id', value: '', show: false},
		{name: 'id', value: '', show: false},
		{name: 'id', value: '', show: false},
		{name: 'id', value: '', show: false},
	])
	
	onClickOutside(target, () => {
		active_more.value = -1
	})
	
	watch( active, ()=>{
		//console.log(active)
		if (active.value!=-1 && data_filtred.value && Array.isArray(data_filtred.value[active.value].order?.checks)) {
			let promise_arr =data_filtred.value[active.value].order?.checks?.map(x=> !x.doc_status ? store.dispatch(OrdersActions.GET_ORDERS_DOCSTATUS, x.guid): null )
			if (promise_arr){
				Promise.all(promise_arr).finally(()=>{})
			}
		}
	})
	watch( () => props.status, ()=>{
		page.value.currentPage = 1
		active.value=-1
	})
	watch( () => props.contrAgent, ()=>{
		page.value.currentPage = 1
		active.value=-1
	})
	watch( () => props.search, ()=>{
		page.value.currentPage = 1
		active.value=-1
	})
	watch( () => props.period, ()=>{
		page.value.currentPage = 1
		active.value=-1
	})
	
	const data_filtred = computed( () => {
		//фильтр по контрагенту
		
		let data =  props.data.filter((x: Claim) => props.contrAgent =='' || x.partner_guid == props.contrAgent)
		
		//фильтр по периоду
		data = data.filter((x: Claim) => checkPeriod(x.date_create))
		
		//фильтр по статусу
		data = data.filter((x: Claim) => checkStatus(x))
		
		//фильтр по поиску по полю
		data = data.filter((x: Claim) => search(x))
		
		if (filter.value[1].value !=''){
			data = data.filter((x: Claim) => `Претензия № ${x.bitrix_id} от ${x.date_create.substring(0, 10)}`.indexOf(filter.value[1].value)!=-1)
		}
		
		return data	
	})
	
	const paginationShow = (key: number): boolean => {
		if (page.value.maxItemOnPage != -1){
			return key >= ((page.value.currentPage-1)*page.value.maxItemOnPage) && key < (page.value.currentPage*page.value.maxItemOnPage)
		} else return true	
	}

	const search = (item: Claim) => {
		if (props.search.search == '') return true
		switch (props.search.id){
			case 1: 
				return `Претензия № ${item.bitrix_id} от ${item.date_create.substring(0, 10)}`.toUpperCase().indexOf(props.search.search.toUpperCase()) != -1
			case 2: 
				return item.date_create.toUpperCase().indexOf(props.search.search.toUpperCase()) != -1
			case 3: 
				return item.order ? String(item.order.n).toUpperCase().indexOf(props.search.search.toUpperCase()) != -1 : false
			case 4: 
				return item.case ? String(item.case).toUpperCase().indexOf(props.search.search.toUpperCase()) != -1 : false
			default:
				return true
		}
		
	}
	
	const checkPeriod = (date: string|undefined) => {
		if (!date) return false
		if (props.period == 'Все') {
			return true
		} else {
			const start = props.period?.split(' - ')[0]
			const year = start?.substring(6,10)
			const month = start?.substring(3,5)
			return year == date.substring(6,10) && month == date.substring(3,5)
		}
	}
	
	const checkStatus = (item: Claim) => {
		
		if (props.status == 'Все'){
			return true
		} else {
			if (!item.order) return false
			if (Array.isArray(item.order.checks)){
				return item.order.checks.findIndex( x => OrdersSatusCode[parseInt(x.status+1)] ? props.status == OrdersSatusCode[parseInt(x.status+1)].name : false) !=-1
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
		const storages = <Storage[]>store.getters.getCompanyStoragesData(partner_guid)
		const storage = storages.find(x  => x.guid == organization_id)
		return storage ? storage.name.replace(/(^|\s)\S/g, s => s.toUpperCase()).replace(/(ООО)|(")|(\s)|([а-я])/g, '') : 'Склад'
	}
	
	const setOrderId = (id: number) => {
		store.commit(KeysMutations.SET_CURRENT_ORDER, id)
	}
	
	const filtred = ( item: Claim) => {
		let show = false
		if (filter.value[1].value !=''){
			if (item.title.indexOf(filter.value[1].value)!=-1) show=true
		} else show = true
		return  show
	}

	
</script>
