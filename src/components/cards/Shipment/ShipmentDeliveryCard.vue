<template>
		<div>
					<div class="shipment-form-heading shipment-form-wrap">
						<div class="shipment-form-elem">
							<div class="shipment-form-item"> 
								<div class="shipment-form-elem-title"><span>Адрес Доставки</span></div>
								<div class="shipment-form-row">
									<div class="shipment-form-input-wrap">
										<preloader-local small v-if="loading"></preloader-local>
										<SelectInput 
												v-else
												:data="addressList"
												v-model="data.address"
												:error="data.addressError"
												@onInput="data.addressError=false"
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
								<div class="shipment-form-elem-title"><span>Комментарий</span></div>
								<textarea class="shipment-form-textarea" name=""  v-model="data.comment"></textarea>
							</div>
						</div>
						<div class="shipment-form-elem">
							<div class="shipment-form-item">
								<div class="shipment-form-elem-title"><span>Представление</span></div>
								
								<div class="shipment-form-info shipment-form-info-text" >
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
							<div class="shipment-form-notion">
								Подтверждение заявки- запроса не несет за собой обязательство исполнения, 
								ожидайте ответ по стоимости, после чего вы сможете подтвердить доставку 
								и стоимость!
							</div>
						</div>
						<div class="shipment-form-elem">
							<div class="shipment-form-submit gradient-btn"  @click="send()">
								<div class="gradient-btn-text" >Подтвердить</div>
							</div>
						</div>
					</div>
				</div>
</template>




<script lang="ts">
import DatePicker from '/src/components/ui/DatePicker.vue'
import SelectInput from '/src/components/ui/SelectInput.vue'
import PreloaderLocal from '/src/components/PreloaderLocal.vue'

import { SelectInputData } from '/src/models/Components'


import { useStore } from '/src/store'
import { Orders } from '/src/models/Orders'

import { ref, PropType, defineComponent, computed, onMounted }from 'vue';
import { ShipmentsAddress } from '/src/models/Shipments'
import { Partner } from '/src/models/Partner'
import { ShipmentsActions } from '/src/store/shipments/actions'
import { useRouter } from 'vue-router'
import { ClaimMutations } from '/src/store/claims/mutations'

export default defineComponent({
		components: {
			SelectInput,
			DatePicker,
			PreloaderLocal,
		},
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
		setup(props) {
		const store = useStore()
		const router = useRouter()
		const loading = ref(false)
		const data = ref({
						date: '',
						dateError: false,
						address: -1,
						addressError: false,
						comment: '',
						
						quick: false,
						accept: false,
				});
	
		const addressList = computed( () => store.getters.getShipmentsAddressInputData)
		const company = computed(() => { 
			let c = store.getters.getCompanys.find( (x: Partner) =>x.uid == props.partner_guid)
			return c ? c.name : ''
		})
		const address = computed(() => { 
			let c = addressList.value.find(x => x .id == data.value.address)
			return c ? c.name : ''
		})
		
		const view_message = computed(()=>{
			let res = <String[]>[]
			res.push( (props.order ? props.order.name: ''))
			res.push( 'Контрагент: ' + company.value)
			if (data.value.date != '') res.push( 'Желаемая дата отгрузки: ' + data.value.date)
			if (data.value.address!=-1) res.push( 'Адрес доставки: ' +  address.value)
			res.push( 'Комментрий: '+ ( data.value.comment.trim() == '' ? 'Нет' : data.value.comment))
			if (data.value.accept) res.push( 'Подтвердить: да')
			if (data.value.quick) res.push( 'Срочно: да')
			
			return res
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
				if (data.value.address == -1) {
					data.value.addressError = true
					ok = false
					setTimeout(()=>{data.value.addressError = false}, 3000)
				}
				if (ok) {
					loading.value = true
					
					let formData = new FormData();
					
					formData.append('files','')
					
					formData.append('title', (props.order? props.order?.name : ''))
					formData.append('partner_name', company.value)
					formData.append('partner_guid',  props.partner_guid)
					formData.append('id', String(props.order ? props.order.n: ''))
					formData.append('case', '1')
					formData.append('message', JSON.stringify(view_message.value))
					formData.append('amount', '')
					formData.append('weight', '')
					formData.append('volume', '')
					formData.append('carriers', '')
					formData.append('date', String((new Date(data.value.date ? data.value.date : '')).getTime()))
					formData.append('address', address.value)
					formData.append('comment', data.value.comment)
					formData.append('extra', '')
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
				view_message,
				addressList,
				company,
				send,
			}
		}
})
</script>