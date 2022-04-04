<template>
		<div>
		


					<div class="shipment-form-heading shipment-form-wrap">
						<div class="shipment-form-elem">
							<div class="shipment-form-item"> 
								<div class="nav-tab-wrap">
									<a :class="'nav-tab-elem gradient-btn' + ( data.carriers == 2 ? ' active' : '' )"  @click="data.carriers = 2">
										<div class="gradient-btn-text">ПЭК</div>
									</a>
									<a :class="'nav-tab-elem gradient-btn' + ( data.carriers == 3 ? ' active' : '' )" 	@click="data.carriers =3">
										<div class="gradient-btn-text">Деловые линии</div>
									</a>
									<a :class="'nav-tab-elem gradient-btn' + ( data.carriers == 4 ? ' active' : '' )"	@click="data.carriers = 4">
										<div class="gradient-btn-text">Байкал</div>
									</a>
									<a :class="'shipment-form-btn shipment-form-urgently-btn' + ( data.carriers == 1 ? ' active' : '' )" @click="data.carriers = 1;data.address=''" >
										<div class="gradient-btn-text">Другая</div>
									</a>
								</div>
								<ShipmentAddressInput v-if="data.carriers == 1" v-model="data.address" :error="data.addressError"></ShipmentAddressInput>
							</div>
						</div>
						<div class="shipment-form-elem">
							<div class="shipment-form-item">
								<div class="shipment-form-elem-title"><span>Дата отгрузки</span></div>
								<div class="shipment-form-row">
									<div class="shipment-form-date">
								
										<DatePicker
											v-model="data.date"
											:error="data.dateError"
											@onInput="data.dateError=false"
										/>
									</div>
									<!-- <div
										:class="'shipment-form-btn shipment-form-urgently-btn' + ( data.quick ? ' active':'')"
										@click="data.quick=!data.quick"
									>
										Срочно
									</div> -->
								</div>
							</div>
						</div>
					</div>
					<div class="shipment-form-body shipment-form-wrap">
						<div class="shipment-form-elem">
							<div class="shipment-form-item">
								<div class="shipment-form-elem-title"><span>Комментраий</span></div>
								<textarea class="shipment-form-textarea" name="" v-model="data.comment"></textarea>
							</div>
						</div>
						<div class="shipment-form-elem">
							<div class="shipment-form-item">
								<div class="shipment-form-elem-title"><span>Представление</span></div>
								<div class="shipment-form-info shipment-form-info-text">
									<p
										v-for="(p, k) in view_message"
										:key="k"
									> {{p}}</p>
								</div>
							</div>
						</div>
					</div>
					<div class="shipment-form-wrap shipment-form-bottom">
						<div class="shipment-form-elem">
							<div class="shipment-form-elem-title"><span>Дополнительное условие к доставке:</span></div>
							<div class="shipment-form-wrap shipment-form-checkbox-box">
								<div class="shipment-form-checkbox-wrap">
									<input class="shipment-form-checkbox" v-model="data.u" type="checkbox" id="shipment-checkbox-1">
									<label class="shipment-form-checkbox-label" for="shipment-checkbox-1">Жесткая упаковка</label>
								</div>
								<div class="shipment-form-checkbox-wrap">
									<input class="shipment-form-checkbox" v-model="data.o" type="checkbox" id="shipment-checkbox-2">
									<label class="shipment-form-checkbox-label" for="shipment-checkbox-2">Ополечивание</label>
								</div>
							</div>
						</div>
						<div class="shipment-form-elem">
							<div class="shipment-form-notion">
								Подтверждение заявки- запроса не несет за собой обязательство исполнения, 
								ожидайте ответ по стоимости, после чего вы сможете подтвердить доставку 
								и стоимость!
							</div>
							<div class="shipment-form-submit gradient-btn"  @click="send()">
								<div class="gradient-btn-text">Подтвердить</div>
							</div>
						</div>
					</div>
				</div>
</template>



<script lang="ts">
import DatePicker from '@/components/ui/DatePicker.vue'
import ShipmentAddressInput from '@/components/cards/Shipment/ShipmentAddressInput.vue'
import { Orders } from '@/models/Orders';
import { Partner } from '@/models/Partner';
import { key } from '@/store';

import { computed, defineComponent, PropType, ref }from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ShipmentsActions } from '@/store/shipments/actions';

export default defineComponent({
		props:{
			order:{
				type: Object as PropType<Orders>,
				//required: true
			},
			partner_guid:{
				type: String,
				required: true
			},
		},
		components: {
				DatePicker,
				ShipmentAddressInput,
		},
		setup(props) {
			const store = useStore(key)
			const router = useRouter()
			const loading = ref(false)
			const data = ref({
							carriers: 2,
							date: '',
							dateError: false,
							address: 'ПЭК',
							addressError: false,
							
							comment: '',
							quick: false,
							accept: false,
							u: false,
							o: false,
					})
			const company = computed(() => { 
				let c = store.getters.getCompanys.find( (x: Partner) =>x.uid == props.partner_guid)
				return c ? c.name : ''
			})
			
			const view_message = computed(()=>{
				let res = <String[]>[]
				res.push( (props.order ? props.order.name: ''))
				res.push( 'Контрагент: ' + company.value)
				if (data.value.date != '') res.push( 'Желаемая дата отгрузки: ' + data.value.date)
				if (data.value.quick) res.push( 'Срочно: да')
				if (data.value.carriers == 2) res.push( 'Транспортная компания: ПЭК')
				if (data.value.carriers == 3) res.push( 'Транспортная компания: Деловые линии')
				if (data.value.carriers == 4) res.push( 'Транспортная компания: Байкал')
				if (data.value.carriers == 1) res.push( 'Транспортная компания: Другая')
				if (data.value.carriers == 1) res.push( `Адрес ТК: ${data.value.address}`)
				res.push( 'Комментрий: '+ ( data.value.comment.trim() == '' ? 'Нет' : data.value.comment))
				res.push( 'Жесткая упаковка: '+ ( data.value.u ? 'Да' : 'Нет'))
				res.push( 'Ополечивание: '+ ( data.value.o ? 'Да' : 'Нет'))
			
				return res
			})
			const send = ()=>{

				let ok = true
				if (data.value.date == '') {
					data.value.dateError = true
					ok = false
					setTimeout(()=>{data.value.dateError = false}, 3000)
				}
				if (data.value.address == '') {
					data.value.addressError = true
					ok = false
					setTimeout(()=>{data.value.addressError = false}, 3000)
				}
				if (ok) {
					loading.value = true
					
					let formData = new FormData();
					let extra = []
					if (data.value.u) extra.push(1)
					if (data.value.o) extra.push(2)
					
					formData.append('files','')
					formData.append('title', props.order? props.order?.name : '')
					formData.append('partner_name', company.value)
					formData.append('partner_guid',  props.partner_guid)
					formData.append('id', String(props.order ? props.order.n: ''))
					formData.append('case', '2')
					formData.append('message', JSON.stringify(view_message.value))
					formData.append('amount', '')
					formData.append('weight', '')
					formData.append('volume', '')
					formData.append('carriers', String(data.value.carriers))
					formData.append('date', String((new Date(data.value.date ? data.value.date : '')).getTime()))
					formData.append('address', data.value.address)
					formData.append('comment', data.value.comment)
					formData.append('extra', JSON.stringify(extra))
					formData.append('urgently', data.value.quick ? '1':'0')
					store.dispatch(ShipmentsActions.ADD_SHIPMENTS, formData).then(() => {
						router.push({name: 'ShipmentsRequestSuccess'})
						loading.value = false
					})
					
				}
			}
		return {
				data, 
				
				view_message,
				send,
		}
	}
})
</script>