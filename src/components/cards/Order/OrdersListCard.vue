<template>
<div class="orders-list-wrap">
	<div class="orders-list " ref="target">
			<div class="orders-list-row orders-list-heading">
				<div class="orders-list-elem">№</div>
				<div class="orders-list-elem">Наименование</div>
				<div :class="'orders-list-elem' + (contrAgent !='' ? ' active':'')">Контрагент</div>
				<div class="orders-list-elem">Номер</div>
				<div :class="'orders-list-elem' + (period != 'Все' ? ' active':'')">Дата создания</div>
				<div class="orders-list-elem">Статус</div>
				<div class="orders-list-elem">Инфо</div>
			</div>
			
			<div 
				v-for="(item, key) in data"
				:key="key"
				:class="'orders-list-item' + ( key == active ? ' active': '' )"
				>
				<div
					v-if="contrAgent =='' || item.partner_guid == contrAgent"
				>
				<div
					v-if="checkPeriod(item.date)"
				>
					<div class="orders-list-row orders-list-main-row"
						@click="key === active ? active = -1 : active = key; active_more =  -1"
					>

						<div class="orders-list-elem">
							{{key+1}}
							<div class="table-arrow"></div>
						</div>
						<div class="orders-list-elem">{{ item.name }}</div>
						<div class="orders-list-elem">{{ item.partner_name }}</div>
						<div class="orders-list-elem">{{ item.n }}</div>
						<div class="orders-list-elem">{{ item.date }}</div>
						<div class="orders-list-elem">{{ item.status }}</div>
						<div class="orders-list-elem" > 
							<button
								class="orders-list-more"
								@click.stop="active_more = key"
							>Подробно</button>
							<div
								
								:class="'orders-list-more-dropdown' +  ( key == active_more ? ' active': '' )"
							>
								<a class="orders-list-more-dropdown-link" href="#">Повторить</a>
								<a class="orders-list-more-dropdown-link" href="#" @click="detailOrderId = item.n; showDetail=true" >Детали заказа</a>
								<a class="orders-list-more-dropdown-link" href="#">Скачать документы</a>
								<a class="orders-list-more-dropdown-link" href="#">Скачать сертификаты</a>
								<a class="orders-list-more-dropdown-link" href="#">Печать документов</a>
								<a class="orders-list-more-dropdown-link" href="#">Печать сертификатов</a>
								<router-link 
									class="orders-list-more-dropdown-link" 
									tag="a"
									:to="'/claims/request'"
									@click="setOrderId(item.n)"
								>
										<span>Оформить претензию</span>
								</router-link>
								
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

					<div :class="'orders-list-info'   + ( key == active ? ' active': '' )" @click="active_more =  -1" >
						
						<div v-if="Array.isArray(item.checks)">
							<div
								class="orders-list-info-row"
								v-for="(check, key1) in item.checks"
								:key="key1"
							>
								<div class="orders-list-info-elem">{{getStorageName(item.partner_guid, check.organization_id)}}</div>
								<div class="orders-list-info-elem"> 
									<div class="orders-list-info-about">
										<div
											class="orders-list-info-download"
											title="Сохранить счет"
											@click="downloadBill(check.guid)"
										>
											<span> Счёт № {{check.n}} от {{item.date.substring(0,10)}} </span>
											<preloader-local
												v-if="loading_bill.includes(item.guid)"
												small
											/>
										</div>
										
									</div>
								</div>
								<div class="orders-list-info-elem orders-list-info-doc-wrap"  v-if="!check.doc_status">
									<PreloaderLocal small></PreloaderLocal>
								</div>
								<div class="orders-list-info-elem orders-list-info-doc-wrap" v-else>
									<a
										v-if="check.doc_status?.StatusSchet"
										class="orders-list-info-doc sc" 
										:href="`http://89.111.136.61/api/order/print?id=${check.guid}&name=Счет`"
										target="_blank"
										title="Открыть счет">
									</a>
									<a 
										v-if="check.doc_status?.StatusUPD"
										class="orders-list-info-doc upd"
										:href="`http://89.111.136.61/api/order/print?id=${check.guid}&name=УПД`"
										target="_blank"
										title="Универсальный передаточный документ">
									</a>
									<a 
										v-if="check.doc_status?.StatusSF"
										class="orders-list-info-doc sf" 
										:href="`http://89.111.136.61/api/order/print?id=${check.guid}&name=СФ`"
										target="_blank"
										title="Счёт-фактура">
									</a>
									<a 
										v-if="check.doc_status?.StatusUPK"
										class="orders-list-info-doc kor"
										:href="`http://89.111.136.61/api/order/print?id=${check.guid}&name=УКД`"
										target="_blank"
										title="Универсальный корректировочный документ">
									</a>
								</div>
								<div class="orders-list-info-elem">
									<a class="orders-list-info-link" href="">Сертификаты</a>
									<a class="orders-list-info-link" href="">Скачать все</a></div>
							</div>
						</div>
						<div
							v-else
							class="orders-list-info-row"
							>
							Счет отсутвует
						</div>
					</div>
				</div>
				</div>
			</div>
		
	</div>
	<PreloaderLocal v-if="loading" style="width: 100%"></PreloaderLocal>
	<OrderDetailModal v-model="showDetail" :orderId="detailOrderId"></OrderDetailModal>
</div>
</template>

<script lang="ts">
import PreloaderLocal from '@/components/PreloaderLocal.vue'
import OrderDetailModal from '@/components/cards/Order/OrderDetailModal.vue'


import { ref, PropType, defineComponent, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { Orders } from '@/models/Orders'
import { useStore } from 'vuex'
import { key } from '@/store'
import { OrderActions } from '@/store/order/actions'
import { Storage } from '@/models/Partner'
import { OrdersActions } from '@/store/orders/actions'
import { ShipmentsMutations } from '@/store/shipments/mutations'

export default defineComponent({
	props: {
		data: {
			type: Array as PropType<Orders[]>
		},
		contrAgent: {
			type: String
		},
		period: {
			type: String
		},
		loading:{
			type: Boolean,
			default: false
		}
	},
	components: {
		PreloaderLocal,
		OrderDetailModal,
	},
	setup(props) {
		const store = useStore(key)
		const active = ref(-1)
		const active_more = ref(-1)
		const target = ref(null)
		const showDetail = ref(false)
		const loading_bill = ref<string[]>([])
		const detailOrderId = ref(-1)
		
		onClickOutside(target, () => {
			active_more.value = -1
		});
		
		watch( active, ()=>{
			if (active.value!=-1 && props.data) {
				let promise_arr = 
					props.data[active.value].checks?.map(x=> {if (!x.doc_status) return store.dispatch(OrdersActions.GET_ORDERS_DOCSTATUS, x.guid)})
				if (promise_arr){
					Promise.all(promise_arr).finally(()=>{})
				}
			}
		})
		
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
			store.commit(ShipmentsMutations.SET_CURRENT_ORDER, id)
		}

		return {
			//data
			target,
			active,
			active_more,
			loading_bill,
			showDetail,
			detailOrderId,
			
			//methods
			checkPeriod,
			downloadBill,
			getStorageName,
			setOrderId,
		}
	},
})
</script>
>