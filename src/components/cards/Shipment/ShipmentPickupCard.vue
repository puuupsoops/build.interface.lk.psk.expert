<template>
<div>

	<div class="shipment-form-heading shipment-form-wrap">
		<div class="shipment-form-elem">
			<div class="shipment-form-item"> 
				<div class="shipment-form-elem-title">
					
					<span>Адрес Самовывоза</span>
					<span class="shipment-form-elem-title-time">с 9.00 до 20.00 (пн-сб), вс- вых.</span>
				</div>
				<div class="shipment-form-row">
					<div class="shipment-form-input-wrap shipment-datalist" id="shipment-datalist">
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
					<div
						:class="'shipment-form-btn shipment-form-urgently-btn' + ( data.quick ? ' active':'')"
						@click="data.quick=!data.quick"
					>
						Срочно
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="shipment-form-body shipment-form-wrap">
		<div class="shipment-form-elem">
			<div class="shipment-form-item">
				<div class="shipment-form-elem-title"><span>Комментраий</span></div>
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
			<div class="shipment-form-doc shipment-form-wrap">
				<div class="shipment-form-doc-wrap">
					<label class="shipment-form-doc-label" for="shipment_file">прикрепить доверенность</label>
					<input class="shipment-form-doc-input" type="file" id="shipment_file" wfd-invisible="true">
					<div class="shipment-form-doc-file" wfd-invisible="true">
						<div class="shipment-form-doc-file-name"> </div>
						<div class="shipment-form-doc-file-delete"></div>
					</div>
				</div><a class="shipment-form-doc-btn" href=""><img src="style/img/icon/doc-file.svg" alt=""></a>
			</div>
		</div>
		<div class="shipment-form-elem">
			<div class="shipment-form-item">
				<div class="shipment-form-elem-title"><span>Представление</span></div>
				<div class="shipment-form-info shipment-form-info-text">
					<p>Заказ: {{order}}</p>
					<p v-if="data.date">Желаемая дата отгрузки: {{data.date }}</p>
					<p>Количество едениц: 120</p>
					<p>Общий вес: 25 кг</p>
					<p>Общий объем: 23 м3 </p>
					<p v-if="addressList.find(x => x.id==data.address)">Адрес самовывоза: {{addressList.find(x => x.id==data.address).name }}</p>
					<p v-if="data.accept">Подтвердить: да</p>
					<p>Комментрий: {{ data.comment.trim() == '' ? 'Нет' : data.comment}}</p>
					<p>Данные: {{ data.fio }}</p>
					<p>Документ: {{ data.doc }} Серия {{ data.serial }} №{{data.num}}</p>
					<p>Выдан {{data.when}} {{data.who}}</p>
					<p v-if="data.car !== ''">Машина: {{data.car}} {{data.gosnum}}</p>
					<p v-if="data.quick">Срочно: да</p>
					<p>Довереность: есть</p>
					<p>Схема проезда: есть</p>
				</div>
				<div class="shipment-form-notion">
					Подтверждение заявки- запроса не несет за собой обязательство исполнения, 
					ожидайте ответ по стоимости, после чего вы сможете подтвердить доставку 
					и стоимость!
				</div>
			</div>
		</div>
	</div>
	<div class="shipment-form-submit gradient-btn">
		<div class="gradient-btn-text" @click="send()">Подтвердить</div>
	</div>
</div>
</template>


<script lang="ts">
import SelectInput from '@/components/ui/SelectInput.vue'
import DatePicker from '@/components/ui/DatePicker.vue'
import PreloaderLocal from '@/components/PreloaderLocal.vue'

import { computed, defineComponent, onMounted, ref }from 'vue'
import { key } from '@/store'
import { useStore } from 'vuex'
import { SelectInputData } from '@/models/Components'
import { ShipmentsAddress } from '@/models/Shupments'
import { ShipmentsActions } from '@/store/shipments/actions'
import { useRouter } from 'vue-router'



export default defineComponent({
		components: {
			SelectInput,
			DatePicker,
			PreloaderLocal
		},
		props:{
			order: String,
		},
		setup() {
			const store = useStore(key)
			const router = useRouter()
			const loading = ref(false)
			const data = ref({
						date: null,
						dateError: false,
						address: -1,
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
				});
			const addressList = computed<SelectInputData>(() => {
				return <SelectInputData>store.getters.getShipmentsAddress.map((x: ShipmentsAddress) => {
					return {
							id: x.index,
							name: x.label
						}
				})
			})
			
			const send = ()=>{
				let ok = true
				if (data.value.date == null) {
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
					
					router.push({name: 'ShipmentsRequestSuccess'})
				}
				
			}
			onMounted(()=>{ 
				if (store.getters.getShipmentsAddress.length == 0){
					loading.value=true
					store.dispatch(ShipmentsActions.GET_SHIPMENTS_ADDRESS)
						.then(()=>{
							setTimeout(()=>{loading.value=false}, 1000)
						})
				}
			})
			
			return {
				data, 
				loading,
				//computed
				addressList,
				//methods
				send,
			}
		}
})
</script>