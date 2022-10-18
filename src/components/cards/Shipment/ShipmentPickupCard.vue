<template>
<div>

	<div class="shipment-form-heading shipment-form-wrap">
		<div class="shipment-form-elem">
			<div class="shipment-form-item"> 
				<div class="shipment-form-elem-title">
					
					<span>Адрес Самовывоза</span>
					<span class="shipment-form-elem-title-time">с 8.00 до 18.00 (пн-пт) сб,вс-вых.</span>
				</div>
				<div class="shipment-form-row">
					<div class="shipment-form-input-wrap shipment-datalist" id="shipment-datalist">
						<span>{{data.address}}</span>
						<!-- <preloader-local small v-if="loading"></preloader-local>
						<SelectInput 
								v-else
								:data="addressList"
								v-model="data.address"
								:error="data.addressError"
								@onInput="data.addressError=false"
							/> 
							-->
						<div
							class="shipment-form-map-btn"
							@click="showMap=true"
						> 
							<svg class="shipment-form-map-btn-img" width="19" height="25" viewBox="0 0 19 25" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9.49968 25C8.95397 25 8.4653 24.717 8.19255 24.2429C8.18967 24.238 8.18688 24.2329 8.1841 24.2279L1.98479 12.8809C0.505001 10.1724 0.547432 6.95749 2.09831 4.28113C3.61555 1.66277 6.31047 0.0631103 9.30725 0.00197754C9.43527 -0.00065918 9.56398 -0.00065918 9.69191 0.00197754C12.6887 0.0631103 15.3837 1.66277 16.9009 4.28113C18.4518 6.95749 18.4943 10.1723 17.0145 12.8809L10.8152 24.2279C10.8124 24.2329 10.8096 24.238 10.8067 24.2429C10.534 24.717 10.0454 25 9.49968 25ZM9.49963 1.56252C9.44597 1.56252 9.39245 1.56306 9.33903 1.56414C6.89279 1.61404 4.69133 2.92258 3.45017 5.06453C2.17541 7.26448 2.14016 9.90642 3.35593 12.1317L9.49963 23.3768L15.6433 12.1318C16.8591 9.90642 16.8238 7.26448 15.549 5.06453C14.3078 2.92263 12.1064 1.61404 9.66013 1.56414C9.60685 1.56306 9.55329 1.56252 9.49963 1.56252Z" fill="#8D8D8D"></path>
									<path d="M9.5 11.3281C7.56147 11.3281 5.98438 9.75103 5.98438 7.8125C5.98438 5.87397 7.56147 4.29688 9.5 4.29688C11.4385 4.29688 13.0156 5.87397 13.0156 7.8125C13.0156 9.75103 11.4386 11.3281 9.5 11.3281ZM9.5 5.85938C8.42305 5.85938 7.54688 6.73555 7.54688 7.8125C7.54688 8.88945 8.42305 9.76563 9.5 9.76563C10.577 9.76563 11.4531 8.88945 11.4531 7.8125C11.4531 6.73555 10.577 5.85938 9.5 5.85938Z" fill="#8D8D8D"></path>
							</svg><span>На карте</span>
						</div>
						
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
				<textarea class="shipment-form-textarea" v-model="data.comment"></textarea>
			</div>
			<div class="shipment-form-item">
				<div class="shipment-form-elem-title"><span>Данные</span></div>
				<div class="shipment-form-info">
					<div class="shipment-form-info-input-wrap"><span>ФИО</span>
						<input class="shipment-form-info-input" type="text" v-model="data.fio">
					</div>
					<div class="shipment-form-wrap">
						<div class="shipment-form-elem">
							<div class="shipment-form-info-input-wrap"><span>Документ</span>
								<input class="shipment-form-info-input" type="text" v-model="data.doc">
							</div>
						</div>
						<div class="shipment-form-elem">
							<div class="shipment-form-info-input-wrap"><span>Серия</span>
								<input class="shipment-form-info-input" type="text" v-model="data.serial"><span>№</span>
								<input class="shipment-form-info-input" type="text" v-model="data.num">
							</div>
						</div>
					</div>
					<div class="shipment-form-wrap">
						<div class="shipment-form-elem">
							<div class="shipment-form-info-input-wrap"><span>Дата выдачи</span>
								<input class="shipment-form-info-input" type="text" v-model="data.when">
							</div>
						</div>
						<div class="shipment-form-elem">
							<div class="shipment-form-info-input-wrap"><span>Кем выдан</span>
								<input class="shipment-form-info-input" type="text" v-model="data.who">
							</div>
						</div>
					</div>
					<div class="shipment-form-wrap">
						<div class="shipment-form-elem">
							<div class="shipment-form-info-input-wrap"><span>Марка</span>
								<input class="shipment-form-info-input" type="text" v-model="data.car">
							</div>
						</div>
						<div class="shipment-form-elem">
							<div class="shipment-form-info-input-wrap"><span>Гос. номер</span>
								<input class="shipment-form-info-input" type="text" v-model="data.gosnum">
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="shipment-form-add-file">
				
				<input class="shipment-form-add-file-input"
					@change="handleFileUpload( $event )" type="file" id="shipment-form-add-file-pickup">
				<label class="shipment-form-add-file-label"  for="shipment-form-add-file-pickup">
					<span class="shipment-form-add-file-val">{{ data.files.length}}</span>
				</label>
				<label class="shipment-form-add-file-label-text"  for="shipment-form-add-file-pickup">прикрепить доверенность</label>
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
				<div class="shipment-form-notion">
					Подтверждение заявки- запроса не несет за собой обязательство исполнения, 
					ожидайте ответ по стоимости, после чего вы сможете подтвердить доставку 
					и стоимость!
				</div>
			</div>
		</div>
	</div>
	<div class="shipment-form-submit gradient-btn" @click="send()">
		<div class="gradient-btn-text">Подтвердить</div>
	</div>
	
	<div 
		class="order-modal"
		v-if="showMap"
	>
		<div 
			class="order-modal-dialog map"
			
		>
			<div class="order-modal-content map" >
				
				<div class="order-modal-header">
					<h3 class="order-modal-header-title">Карта</h3>
						<DeleteButton @onClick="showMap=false"/>
				</div>
				<div class="order-modal-body map">
					<iframe 
						src="https://yandex.ru/map-widget/v1/?mode=whatshere&whatshere%5Bpoint%5D=37.371453%2C55.980529&z=17" 
						width="800" 
						height="600" frameborder="0">
					</iframe>
				</div>
			</div>
		</div>
	</div>
</div>
</template>


<script lang="ts">

import DatePicker from '/src/components/ui/DatePicker.vue'
import DeleteButton from '/src/components/ui/DeleteButton.vue'


import { computed, defineComponent, PropType, ref }from 'vue'

import { useStore } from '/src/store'

import { ShipmentsActions } from '/src/store/shipments/actions'
import { useRouter } from 'vue-router'
import { Partner } from '/src/models/Partner'
import { Orders } from '/src/models/Orders'
import { ClaimMutations } from '/src/store/claims/mutations'



export default defineComponent({
		components: {
			DatePicker,
			DeleteButton,
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
			const showMap = ref(false)
			
			const data = ref({
						date: '',
						dateError: false,
						address: 'Россия, 141580, Московская область, Солнечногорский район, сельское поселение Лунёвское, в районе деревни Дубровки, ул. Аэропортовская, строение 6, корпус 1.',
						addressError: false,
						comment: '',
						fio: '',
						doc: 'Паспорт',
						serial: '',
						num: '',
						when: '',
						who: '',
						car: '',
						gosnum: '',
						quick: false,
						accept: false,
						files: <any>[],
				});
			
			
			const company = computed(() => { 
				let c = store.getters.getCompanys.find( (x: Partner) =>x.uid == props.partner_guid)
				return c ? c.name : ''
				})
			const view_message = computed(()=>{
				let res = <String[]>[]
				res.push( (props.order ? props.order.name: ''))
				res.push( 'Контрагент: ' + company.value)
				if (data.value.date != '') res.push( 'Желаемая дата отгрузки: ' +data.value.date)
				res.push( 'Адрес самовывоза: ' + data.value.address)
				if (data.value.accept) res.push( 'Подтвердить: да')
				res.push( 'Комментрий: '+ ( data.value.comment.trim() == '' ? 'Нет' : data.value.comment))
				res.push( 'Данные: ' + data.value.fio )
				res.push( `Документ: ${data.value.doc} Серия ${data.value.serial} №${data.value.num}`)
				res.push( `Выдан ${data.value.when} ${data.value.who}`)
				if (data.value.car !== '') res.push( `Машина: ${data.value.car} ${data.value.gosnum}`)
				return res
			})
			
			const send = ()=>{

				let ok = true
				if (data.value.date == '') {
					data.value.dateError = true
					ok = false
					setTimeout(()=>{data.value.dateError = false}, 3000)
				}
				if (ok) {
					loading.value = true
					
					let formData = new FormData();
					
					data.value.files.forEach((x:any, index:number) => {formData.append('files['+index+']',x)})
					
					formData.append('title', props.order? props.order?.name : '')
					formData.append('partner_name', company.value)
					formData.append('partner_guid',  props.partner_guid)
					formData.append('id', String(props.order ? props.order.n: ''))
					formData.append('case', '0')
					formData.append('message', JSON.stringify(view_message.value))
					formData.append('amount', '')
					formData.append('weight', '')
					formData.append('volume', '')
					formData.append('carriers', '')
					formData.append('date', String((new Date(data.value.date ? data.value.date : '')).getTime()))
					formData.append('address', data.value.address)
					formData.append('comment', data.value.comment)
					formData.append('extra', '')
					store.commit(ClaimMutations.CLEAR_CLAIMS_SUCCESS)
					store.dispatch(ShipmentsActions.ADD_SHIPMENTS, formData).then(() => {
						router.push({name: 'ShipmentsRequestSuccess'})
						loading.value = false
					})
					
				}
			}
			const handleFileUpload = ( event: any) =>{
				data.value.files.push(event.target.files[0]);
			}
			const delFile = (id:number) => {
				data.value.files.splice(id, 1)
			}
			
			return {
				data, 
				loading,
				showMap,
				view_message,
				
				//computed
				company,
				//methods
				handleFileUpload,
				delFile,
				send,
				
			}
		}
})
</script>