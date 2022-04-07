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
		
					<div v-if="order" class="shipment-title"><span>Оформить претензию по Заказу № {{modelValue.id}} от {{orders.find(x => x.n == order)?.date.substring(0,10)}}</span></div>
					<div v-else class="shipment-title"><span>Отсутвуют заказы</span></div>
						<div class="shipment-heading-select"><span>Основание: &nbsp;</span>
							<div class="base-select-wrap" >
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
							<!-- <div v-if="companys"> {{ companys.find(x =>x.id == companysUID).name }}</div> -->
						
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
					<!-- <div class="claim-info-title"  v-if="Object.keys(data.order_detail).length !=0" >Перечень товаров {{ data.order_detail.position.length != 0 ? '['+data.order_detail.position.length+']':''}}</div> -->
					<div class="content-elem">
						<div class="order-list-bottom scroll-elem">
							
							<div v-if="loading" style="display: flex; justify-content: center">
								<PreloaderLocal ></PreloaderLocal>
							</div>
							
							<ClaimOrder
								v-else
								:data="modelValue.order_detail"
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
import { OrderActions } from '@/store/order/actions'

export default defineComponent({
	components: {
		SelectInput,
		ClaimOrder,
		PreloaderLocal,
	},
	props:{
		modelValue:{
			type: Object as PropType<Claim>,
			required: true,
		},
		cardId:{
			type: Number,
			required: true,
		}
	},
	emits:['update:modelValue', 'update:files','close'],
	setup(props, { emit }) {
		const store = useStore(key)
		
		const data = ref<Claim>({
			date_create:'',
			status: 0,
			title: '',
			partner_name: '',
			partner_guid: '',
			id:  props.modelValue.id,
			case: 1, //Причина притензии. [0 - другое, 1 - недосдача, 2 - пересорт , 3 - качество ]
			products: <ProductCharacteristic[]>[],
			message: '',
			files: []
		})
		const loading = ref(false)
		
		const companyUID = computed({
			get: ()=>{
				if (data.value.partner_guid == '' && order.value !== null ){
					return store.getters.getOrders.find( (x: Orders) => x.n == order.value).partner_guid
				} else 
				return data.value.partner_guid
			},
			set: (val:string)=>{ 
				data.value.partner_guid = val
				const orders = store.getters.getOrders.filter((x: Orders) => x.partner_guid == val )
				if (orders.length)
					data.value.id = Math.max(...orders.map((x: Orders) => x.n)),
				emit('update:modelValue', data.value)
			}
		})
		
		const order = computed({
			get: () => {
				return props.modelValue.id ?  props.modelValue.id : data.value.id
			},
			set: (val) => {
				data.value.id = val
				emit('update:modelValue', data.value)
				data.value.partner_guid=store.getters.getOrders.find( (x: Orders) => x.n == val).partner_guid
				loading.value=true
				
				store.dispatch(OrderActions.GET_ORDER_DETAIL, val).finally(()=>{
					data.value.order_detail = store.getters.getOrderDetail
					loading.value=false
				})
			}
		})
		

		
		watch( data.value, ()=>{
			data.value.partner_guid=companyUID.value
			data.value.partner_name=store.getters.getCompanyData(data.value.partner_guid).name
			data.value.title = 'Претензия по Заказу №'+order.value+' от ' + store.getters.getOrders.find((x: Orders) => x.n == order.value)?.date.substring(0,10)
			data.value.order_detail = props.modelValue.order_detail
			emit('update:modelValue', data.value)
		})
		
		const handleFileUpload = ( event: any) =>{
			data.value.files.push(event.target.files[0]);
			emit('update:modelValue', data.value)
		}
		const delFile = (id:number) => {
			data.value.files.splice(id, 1)
			emit('update:modelValue', data.value)
		}

		
		return {
			//data
			data,
			loading,
			//computed
			order,
			companyUID,
			orders: computed(() => store.getters.getOrders.filter((x: Orders) => x.partner_guid == companyUID.value )),
			companys: computed(() => store.getters.getCompanysList),

			//methods
			handleFileUpload,
			delFile,

		}
	},
})
</script>
