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
					<div class="claim-info-title">Перечень товаров {{ data.products.length != 0 ? '['+data.products.length+']':''}}</div>
					<div class="content-elem">
						<div class="order-list-bottom scroll-elem">
							<ClaimOrder :data="orderData" v-model="data.products"></ClaimOrder>
						</div>
					</div>
				</div>

				<div class="claim-info-elem">
					<div class="claim-info-title">Сопроводительный текст претензии</div>
					<div class="claim-info-textarea-wrap">
						<textarea class="claim-info-textarea" name="" v-model="data.message"></textarea>
						<div class="claim-info-add-file">
							
							<input class="claim-info-add-file-input"
								
								@change="handleFileUpload( $event , cardId)" type="file" :id="'claim-add-file'+cardId">
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
import ClaimOrder from '@/components/cards/Claim/ClaimOrder.vue'

import { key } from '@/store'
import { ShipmentsMutations } from '@/store/shipments/mutations'
import { ShipmentsConst } from '@/store/shipments/types'
import { computed, defineComponent, PropType, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { ProductCharacteristic } from '@/models/Product'
import { Claim } from "@/models/Claim"

import { Orders } from '@/models/Orders'

export default defineComponent({
	components: {
		SelectInput,
		ClaimOrder
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
		const oderVal = ref(null)
		
		const orderData = {
  "id": 1646138008997,
  "total": 1890440,
  "count": 2,
  "partner_id": "",
  "position": [
    {
      "product": {
        "ID": "12782",
        "UID": "215e5a6e-7ffa-11e9-8167-005056bf1558",
        "NAME": "Костюм &quot;Умелец 1&quot; бежевый/черный",
        "ARTICLE": "КОС619",
        "PRICE": 2554,
        "WEIGHT": 0.86,
        "VALUME": 0.003,
        "DETAIL_TEXT": "Костюм - куртка и брюки для защиты от общих производственных загрязнений.\n<br>\n<br>Куртка\n<br> •\tСилуэт: прямой\n<br> •\tЗастежка: супатная на пуговицы и кнопки\n<br> •\tВоротник: отложной\n<br> •\tКарманы: нагрудные накладные с клапанами на кнопках, левый с карманом и отделениями для канцелярии; нижние боковые с наклонным входом; в верхней части левого рукава карман с молнией\n<br> •\tЭлементы комфорта:\n<br>- анатомические вытачки в локтях для свободы движения\n<br>- регулирование ширины пояса при помощи пат с кнопками, ширины манжет рукавов при помощи кнопок\n<br>\n<br>Брюки\n<br> •\tЗастежка: молния, пуговица\n<br> •\tКарманы: верхние боковые; задний накладной с петлей-держателем для инструментов; удлиненный; накладной боковой с клапаном на кнопке и отделениями для канцелярии\n<br> •\tЭлементы комфорта:\n<br>- анатомические вытачки в коленях для свободы движения\n<br>- эластичная тесьма в боковых швах пояса\n<br>- шлевки для ремня\n<br>- темный низ\n",
        "STATUS": "-",
        
      },
      "characteristics": [
        {
          "ID": 19917,
          "CHARACTERISTIC": "р. 48-50, рост 182-188",
          "count": 430,
          "PRICE": 1348,
          "RESIDUE": 430,
          "GUID": "1b562c49-9ccf-11e9-816e-005056bf1558",
          "ORGGUID": "b5e91d86-a58a-11e5-96ed-0025907c0298"
        },
        {
          "ID": 19918,
          "CHARACTERISTIC": "р. 52-54, рост 170-176",
          "count": 450,
          "PRICE": 1348,
          "RESIDUE": 820,
          "GUID": "696e9882-9ccf-11e9-816e-005056bf1558",
          "ORGGUID": "b5e91d86-a58a-11e5-96ed-0025907c0298"
        }
      ],
      "total": 1186240,
      "count": 880
    },
    {
      "product": {
        "ID": "12784",
        "UID": "cd453e56-7ffa-11e9-8167-005056bf1558",
        "NAME": "Костюм &quot;Умелец 1&quot; серый/черный",
        "ARTICLE": "КОС619",
        "PRICE": 2554,
        "WEIGHT": 0.86,
        "VALUME": 0.003,
        "DETAIL_TEXT": "Костюм - куртка и брюки для защиты от общих производственных загрязнений.\n<br>\n<br>Куртка\n<br> •\tСилуэт: прямой\n<br> •\tЗастежка: супатная на пуговицы и кнопки\n<br> •\tВоротник: отложной\n<br> •\tКарманы: нагрудные накладные с клапанами на кнопках, левый с карманом и отделениями для канцелярии; нижние боковые с наклонным входом; в верхней части левого рукава карман с молнией\n<br> •\tЭлементы комфорта:\n<br>- анатомические вытачки в локтях для свободы движения\n<br>- регулирование ширины пояса при помощи пат с кнопками, ширины манжет рукавов при помощи кнопок\n<br>\n<br>Брюки\n<br> •\tЗастежка: молния, пуговица\n<br> •\tКарманы: верхние боковые; задний накладной с петлей-держателем для инструментов; удлиненный; накладной боковой с клапаном на кнопке и отделениями для канцелярии\n<br> •\tЭлементы комфорта:\n<br>- анатомические вытачки в коленях для свободы движения\n<br>- эластичная тесьма в боковых швах пояса\n<br>- шлевки для ремня\n<br>- темный низ\n",
        "STATUS": "-",
        "CHARACTERISTICS": [
          {
            "NAME": "Цвет",
            "VALUE": "Серый/Чёрный"
          },
          {
            "NAME": "Стандарт",
            "VALUE": "ГОСТ 12.4.280-2014, ТР ТС 019/2011"
          },
          {
            "NAME": "Материал",
            "VALUE": "210 г/м², 70%ПЭ+30%ХБ, ВО, Галактика"
          },
          {
            "NAME": "Минпромторг",
            "VALUE": "Есть"
          },
          {
            "NAME": "Размер",
            "VALUE": "с 44-46 по 68-70"
          },
          {
            "NAME": "Бренд",
            "VALUE": ""
          },
          {
            "NAME": "Рост",
            "VALUE": "170-176,182-188,194-200"
          },
          {
            "NAME": "Упаковка",
            "VALUE": "20"
          }
        ]
      },
      "characteristics": [
        {
          "ID": 22411,
          "CHARACTERISTIC": "р. 48-50, рост 194-200",
          "count": 20,
          "PRICE": 1510,
          "RESIDUE": 20,
          "GUID": "2f548374-9cc8-11e9-816e-005056bf1558",
          "ORGGUID": "b5e91d86-a58a-11e5-96ed-0025907c0298"
        },
        {
          "ID": 19930,
          "CHARACTERISTIC": "р. 52-54, рост 170-176",
          "count": 500,
          "PRICE": 1348,
          "RESIDUE": 608,
          "GUID": "42707fc5-9cc8-11e9-816e-005056bf1558",
          "ORGGUID": "b5e91d86-a58a-11e5-96ed-0025907c0298"
        }
      ],
      "total": 704200,
      "count": 520
    }
  ],
  "position_presail": [
  
  ],
  "total_count": 1400,
  "total_valume": 1.56,
  "total_weight": 447.2
}
		
		
		const companyUID = computed({
			get: ()=>{
				if (data.value.partner_guid == '' && order.value !== null ){
					return store.getters.getOrders.find( (x: Orders) => x.n == order.value).partner_guid
				} else 
				return data.value.partner_guid
			},
			set: (val:string)=>{data.value.partner_guid = val}
		})
		
		watch( data.value, ()=>{
			data.value.partner_guid=companyUID.value
			data.value.partner_name=store.getters.getCompanyData(data.value.partner_guid).name
			data.value.title = 'Заказ №'+order.value+' от ' + store.getters.getOrders.find((x: Orders) => x.n == order.value)?.date.substring(0,10)
			//console. log(data.value)
			emit('update:modelValue', data.value)
		})
		
		const order = computed({
			get: () => {
				if (oderVal.value == null) {
					const id = store.getters.getCurrentOrderId
					if (id != null && id != ShipmentsConst.DEFAULT_ORDER_ID) 
						return id
					else 
						if (store.getters.getOrders[0] != undefined) {
							store.commit(ShipmentsMutations.SET_CURRENT_ORDER, store.getters.getOrders[0].n)
							return store.getters.getOrders[0].n
						} else {
							store.commit(ShipmentsMutations.SET_CURRENT_ORDER, ShipmentsConst.DEFAULT_ORDER_ID)
						return null
					}
				} else return oderVal.value
				
			},
			set: (val) => {
				oderVal.value = val
				store.commit(ShipmentsMutations.SET_CURRENT_ORDER,ShipmentsConst.DEFAULT_ORDER_ID)
				data.value.partner_guid=store.getters.getOrders.find( (x: Orders) => x.n == val).partner_guid
				}
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
			orderData,
			//computed
			order,
			companyUID,
			orders: computed(() => store.getters.getOrders),
			companys: computed(() => store.getters.getCompanysList),
			
			//methods
			handleFileUpload,
			delFile,

		}
	},
})
</script>
