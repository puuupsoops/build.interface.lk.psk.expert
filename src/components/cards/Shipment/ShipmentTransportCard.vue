<template>
		<div>
		


					<div class="shipment-form-heading shipment-form-wrap">
						<div class="shipment-form-elem">
							<div class="shipment-form-elem-title"><span>Адрес терминала</span></div>
								<div class="shipment-form-row">
									<div class="shipment-form-input-wrap">
										<preloader-local small v-if="loading"></preloader-local>
										<SelectInput 
												v-else
												:data="addressList"
												v-model="data.addressTerm"
												:error="data.addressTermError"
												@onInput="data.addressTermError=false"
											/> 
											
										<router-link
												tag="a"
												class="shipment-form-map-btn"
												to="/shipments/address"
											> 
												<svg class="shipment-form-map-btn-img" width="19" height="25" viewBox="0 0 19 25" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M9.49968 25C8.95397 25 8.4653 24.717 8.19255 24.2429C8.18967 24.238 8.18688 24.2329 8.1841 24.2279L1.98479 12.8809C0.505001 10.1724 0.547432 6.95749 2.09831 4.28113C3.61555 1.66277 6.31047 0.0631103 9.30725 0.00197754C9.43527 -0.00065918 9.56398 -0.00065918 9.69191 0.00197754C12.6887 0.0631103 15.3837 1.66277 16.9009 4.28113C18.4518 6.95749 18.4943 10.1723 17.0145 12.8809L10.8152 24.2279C10.8124 24.2329 10.8096 24.238 10.8067 24.2429C10.534 24.717 10.0454 25 9.49968 25ZM9.49963 1.56252C9.44597 1.56252 9.39245 1.56306 9.33903 1.56414C6.89279 1.61404 4.69133 2.92258 3.45017 5.06453C2.17541 7.26448 2.14016 9.90642 3.35593 12.1317L9.49963 23.3768L15.6433 12.1318C16.8591 9.90642 16.8238 7.26448 15.549 5.06453C14.3078 2.92263 12.1064 1.61404 9.66013 1.56414C9.60685 1.56306 9.55329 1.56252 9.49963 1.56252Z" fill="#8D8D8D"></path>
														<path d="M9.5 11.3281C7.56147 11.3281 5.98438 9.75103 5.98438 7.8125C5.98438 5.87397 7.56147 4.29688 9.5 4.29688C11.4385 4.29688 13.0156 5.87397 13.0156 7.8125C13.0156 9.75103 11.4386 11.3281 9.5 11.3281ZM9.5 5.85938C8.42305 5.85938 7.54688 6.73555 7.54688 7.8125C7.54688 8.88945 8.42305 9.76563 9.5 9.76563C10.577 9.76563 11.4531 8.88945 11.4531 7.8125C11.4531 6.73555 10.577 5.85938 9.5 5.85938Z" fill="#8D8D8D"></path>
												</svg><span>Добавить адрес</span>
										</router-link>
									</div>
									
								</div>
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
import DatePicker from '/src/components/ui/DatePicker.vue'
import ShipmentAddressInput from '/src/components/cards/Shipment/ShipmentAddressInput.vue'
import SelectInput from '/src/components/ui/SelectInput.vue'
import PreloaderLocal from '/src/components/PreloaderLocal.vue'

import { Orders } from '/src/models/Orders';
import { Partner } from '/src/models/Partner';
import { key } from '/src/store';

import { computed, defineComponent, onMounted, PropType, ref }from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ShipmentsActions } from '/src/store/shipments/actions';
import { SelectInputData } from '/src/models/Components';
import { ShipmentsAddress } from '/src/models/Shipments';
import { ClaimMutations } from '/src/store/claims/mutations';

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
			PreloaderLocal,
			DatePicker,
			ShipmentAddressInput,
			SelectInput,
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
							addressTerm: -1,
							addressTermError: false,
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
				if (data.value.addressTerm != -1) res.push( 'Адрес терминала: ' +  addressTerm.value)
				res.push( 'Комментрий: '+ ( data.value.comment.trim() == '' ? 'Нет' : data.value.comment))
				res.push( 'Жесткая упаковка: '+ ( data.value.u ? 'Да' : 'Нет'))
				res.push( 'Ополечивание: '+ ( data.value.o ? 'Да' : 'Нет'))
			
				return res
			})
			
			const addressList = computed<SelectInputData[]>(() => {
				return <SelectInputData[]>store.getters.getShipmentsAddress.map((x: ShipmentsAddress) => {
					return {
							id: x.index,
							name: x.label
						}
				})
			})
			
			const addressTerm = computed(() => { 
				let c = addressList.value.find(x => x .id == data.value.addressTerm)
				return c ? c.name : ''
			})
			
			onMounted(()=>{ 
				if (store.getters.getShipmentsAddress.length == 0){
					loading.value=true
					store.dispatch(ShipmentsActions.GET_SHIPMENTS_ADDRESS)
						.then(()=>{
							setTimeout(()=>{loading.value=false}, 1000)
						})
				}
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
				if (data.value.addressTerm == -1) {
					data.value.addressTermError = true
					ok = false
					setTimeout(()=>{data.value.addressTermError = false}, 3000)
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
					formData.append('address_terminal', addressTerm.value)
					formData.append('comment', data.value.comment)
					formData.append('extra', JSON.stringify(extra))
					formData.append('urgently', data.value.quick ? '1':'0')
					store.commit(ClaimMutations.CLEAR_CLAIMS_SUCCESS)
					store.dispatch(ShipmentsActions.ADD_SHIPMENTS, formData).then(() => {
						router.push({name: 'ShipmentsRequestSuccess'})
						loading.value = false
					})
					
				}
			}
		return {
				data, 
				loading,
				//computed
				view_message,
				addressList,
				//method
				send,
		}
	}
})
</script>