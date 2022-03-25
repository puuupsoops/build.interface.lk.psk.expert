<template>
	<div>
			<div v-if="cardId!=0" class="claim-header">
				<div class="claim-header-close" @click="$emit('close')"></div>
			</div>
			<div class="shipment-heading claim-heading">
				
				<div class="shipment-heading-elem">
					<router-link
						v-if="cardId ==0"
						tag="a" 
						:to="'/claims'"
						class="shipment-heading-back-btn"
					></router-link>
					
					<div class="shipment-heading-info">

					<div v-if="order" class="shipment-title"><span>Оформить претензию по Заказу № {{order}} от {{orders.find(x => x.n == order)?.date.substring(0,10)}}</span></div>
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

			<div class="nav-tab claim-tab"><span>Причина претензии:</span>
				<div class="nav-tab-wrap">
					<a 
						:class="'nav-tab-elem gradient-btn' + ( data.case == 1 ? ' active' : '' )" 
						@click="data.case = 1"
					>
						<div class="gradient-btn-text">Недосдача</div>
					</a>
					<a 
						:class="'nav-tab-elem gradient-btn' + ( data.case == 2 ? ' active' : '' )" 
						@click="data.case =2"
					>
						<div class="gradient-btn-text">Пересорт</div>
					</a>
					<a 
						:class="'nav-tab-elem gradient-btn' + ( data.case == 3 ? ' active' : '' )" 
						@click="data.case = 3"
					>
						<div class="gradient-btn-text">Качество</div>
					</a>
					<a 
						:class="'nav-tab-elem gradient-btn' + ( data.case == 0 ? ' active' : '' )" 
						@click="data.case = 0"
					>
						<div class="gradient-btn-text">Другое</div>
					</a>
				</div>
			</div>

			<div class="claim-info">
				<div class="claim-info-elem">
					<div class="claim-info-title">Перечень товаров {{ order_detail.position.length != 0 ? '['+order_detail.position.length+']':''}}</div>
					<div class="content-elem">
						<div class="order-list-bottom scroll-elem">
							
							<div v-if="loading" style="display: flex; justify-content: center">
								<PreloaderLocal ></PreloaderLocal>
							</div>
							
							<ClaimOrder
								
								:data="order_detail"
								v-model="data.products"
							></ClaimOrder>
						</div>
					</div>
				</div>

				<div class="claim-info-elem">
					<div class="claim-info-title">Сопроводительный текст претензии</div>
					<div class="claim-info-textarea-wrap">
						<textarea class="claim-info-textarea" name="" v-model="data.message"></textarea>
						<div class="claim-info-add-file">
							<input class="claim-info-add-file-input"
								@change="handleFileUpload( $event )" type="file" :id="'claim-add-file'+cardId">
							<label class="claim-info-add-file-label"  :for="'claim-add-file'+cardId">
								<span class="claim-info-add-file-val">{{ data.files.length}}</span></label>
						</div>
					</div>
				</div>

				<div class="claim-doc">
					<div
						class="claim-doc-elem"
						v-for="file, key in data.files"
						:key="key"
					>
						<div class="claim-doc-elem-file" @click="delFile(key)"></div>
						<div class="claim-doc-elem-name">
							{{file.name}}
						</div>
					</div>
					<!-- <a class="claim-doc-elem sc" href=""></a>
					<a class="claim-doc-elem upd" href=""></a>
					<a class="claim-doc-elem sf" href=""></a>
					<a class="claim-doc-elem kor" href=""></a> -->
				</div>

				

			</div>
	</div>
</template>


<script lang="ts">

import SelectInput from '@/components/ui/SelectInput.vue'
import PreloaderLocal from '@/components/PreloaderLocal.vue'
import ClaimOrder from '@/components/cards/Claim/ClaimOrder.vue'


import { key } from '@/store'

import { computed, defineComponent, PropType, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { ProductCharacteristic } from '@/models/Product'
import { Claim } from "@/models/Claim"

import { Orders } from '@/models/Orders'
import { KeysConst } from '@/store/keys/types'
import { KeysMutations } from '@/store/keys/mutations'
import { OrderActions } from '@/store/order/actions'

export default defineComponent({
	components: {
		SelectInput,
		ClaimOrder,
		PreloaderLocal,
	},
	props:{
		modelValue:{
			type: Object as PropType<Claim>
		},
		
	
		cardId:{
			type: Number,
			required: true
		}
	},
	emits:['update:modelValue', 'update:files','close'],
	setup(props, { emit }) {
		const store = useStore(key)
		
		const data = ref<Claim>({
			title: '',
			partner_name: '',
			partner_guid: '',
			id: 0,
			case: 1, //Причина притензии. [0 - другое, 1 - недосдача, 2 - пересорт , 3 - качество ]
			products: <ProductCharacteristic[]>[],
			message: '',
			files: []
		})
		const orderVal = ref(null)
		const loading = ref(false)
		
		
		
		const companyUID = computed({
			get: ()=>{
				if (data.value.partner_guid == '' && order.value !== null ){
					return store.getters.getOrders.find( (x: Orders) => x.n == order.value).partner_guid
				} else 
				return data.value.partner_guid
			},
			set: (val:string)=>{data.value.partner_guid = val}
		})
		
		
		const order = computed({
			get: () => {
				if (orderVal.value == null) {
					const id = store.getters.getCurrentOrderId
					if (id != null && id != KeysConst.DEFAULT_ORDER_ID) {
						
						return id
					}
					else 
						if (store.getters.getOrders[0] != undefined) {
							store.commit(KeysMutations.SET_CURRENT_ORDER, store.getters.getOrders[0].n)
							
							return store.getters.getOrders[0].n
						} else {
							store.commit(KeysMutations.SET_CURRENT_ORDER, KeysConst.DEFAULT_ORDER_ID)
						return null
					}
				} else {
					
					return orderVal.value
				}
				
			},
			set: (val) => {
				orderVal.value = val
				loading.value=true
				store.commit(KeysMutations.SET_CURRENT_ORDER, KeysConst.DEFAULT_ORDER_ID)
				store.dispatch(OrderActions.GET_ORDER_DETAIL, val).finally(()=>{loading.value=false})
				data.value.partner_guid=store.getters.getOrders.find( (x: Orders) => x.n == val).partner_guid
				}
		})
		
		
		const order_detail = computed(() => {
			return store.getters.getOrderDetail
		})

		watch( data.value, ()=>{
			data.value.partner_guid=companyUID.value
			data.value.partner_name=store.getters.getCompanyData(data.value.partner_guid).name
			data.value.title = 'Заказ №'+order.value+' от ' + store.getters.getOrders.find((x: Orders) => x.n == order.value)?.date.substring(0,10)
			//console. log(data.value)
			emit('update:modelValue', data.value)
		})
		
		const handleFileUpload = ( event: any) =>{
			data.value.files.push(event.target.files[0]);
			emit('update:modelValue', data.value)
		}
		const delFile = (id:number) => {
			data.value.files.splice(id, 1)
		}

		
		return {
			//data
			data,
			loading,
			//computed
			order,
			companyUID,
			orders: computed(() => store.getters.getOrders),
			companys: computed(() => store.getters.getCompanysList),
			order_detail,
			//methods
			handleFileUpload,
			delFile,

		}
	},
})
</script>
