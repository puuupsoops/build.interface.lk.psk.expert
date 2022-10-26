<template>
    <div class="shipment-form-heading shipment-form-wrap">
		
		<div class="shipment-form-elem">
			<div class="shipment-form-item"> 
				<div class="shipment-form-elem-title"><span>Адрес Доставки</span></div>
				<div class="shipment-form-row">
					<div class="shipment-form-input-wrap">
						<preloader-local small v-if="loadingAddress"></preloader-local>
						<SelectInput 
								v-else
								:data="addressList"
								v-model="addressLocal"
								:error="errorAddress"
								
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
							v-model="dateLocal"
							:error="errorDate"
						
						/>
					</div>
					
				</div>
			</div>
		</div>
	<div class="shipment-form-elem" v-if="other">
			<div class="shipment-form-item">
				<div class="shipment-form-elem-title"><span>Доставку вкл. в счет</span></div>
				<div class="order-list-btn"
					
					@click="fro=!fro; es=!es"
				>
					<svg  v-if="!fro" class="content-heading-btn-img " width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path  class="fill stroke"  fill="#A5A7A9"  d="M 4.5 17 q -0.625 0 -1.062 -0.438 Q 3 16.125 3 15.5 v -11 q 0 -0.625 0.438 -1.062 Q 3.875 3 4.5 3 h 11 q 0.625 0 1.062 0.438 Q 17 3.875 17 4.5 v 11 q 0 0.625 -0.438 1.062 Q 16.125 17 15.5 17 Z m 0 -1.5 h 11 v -11 h -11 v 11 Z"/>
					</svg>
					<svg  v-else class="content-heading-btn-img active" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path  class="fill stroke"  fill="#A5A7A9"  d="m 8.938 13 l 4.958 -4.938 L 12.833 7 l -3.895 3.875 l -1.771 -1.75 l -1.063 1.063 Z M 4.5 17 q -0.625 0 -1.062 -0.438 Q 3 16.125 3 15.5 v -11 q 0 -0.625 0.438 -1.062 Q 3.875 3 4.5 3 h 11 q 0.625 0 1.062 0.438 Q 17 3.875 17 4.5 v 11 q 0 0.625 -0.438 1.062 Q 16.125 17 15.5 17 Z m 0 -1.5 h 11 v -11 h -11 v 11 Z m 0 -11 v 11 v -11 Z"/>
					</svg>
					ФРО

				</div>
				<div class="order-list-btn"
					
					@click="fro=!fro; es=!es"
				>
					<svg  v-if="!es" class="content-heading-btn-img " width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path  class="fill stroke"  fill="#A5A7A9"  d="M 4.5 17 q -0.625 0 -1.062 -0.438 Q 3 16.125 3 15.5 v -11 q 0 -0.625 0.438 -1.062 Q 3.875 3 4.5 3 h 11 q 0.625 0 1.062 0.438 Q 17 3.875 17 4.5 v 11 q 0 0.625 -0.438 1.062 Q 16.125 17 15.5 17 Z m 0 -1.5 h 11 v -11 h -11 v 11 Z"/>
					</svg>
					<svg  v-else class="content-heading-btn-img active" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path  class="fill stroke"  fill="#A5A7A9"  d="m 8.938 13 l 4.958 -4.938 L 12.833 7 l -3.895 3.875 l -1.771 -1.75 l -1.063 1.063 Z M 4.5 17 q -0.625 0 -1.062 -0.438 Q 3 16.125 3 15.5 v -11 q 0 -0.625 0.438 -1.062 Q 3.875 3 4.5 3 h 11 q 0.625 0 1.062 0.438 Q 17 3.875 17 4.5 v 11 q 0 0.625 -0.438 1.062 Q 16.125 17 15.5 17 Z m 0 -1.5 h 11 v -11 h -11 v 11 Z m 0 -11 v 11 v -11 Z"/>
					</svg>
					ЭС
				</div>
			</div>
		</div>

        <div class="order-modal" v-if="showMap">
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

<script setup lang="ts">

import SelectInput from '/src/components/ui/SelectInput.vue'
import PreloaderLocal from '/src/components/PreloaderLocal.vue'
import DatePicker from '/src/components/ui/DatePicker.vue'
import DeleteButton from '/src/components/ui/DeleteButton.vue'

import { onMounted, ref, PropType, computed, watch } from 'vue'
import { SelectInputData } from '/src/models/Components'



const props = defineProps({
    addressId : {
        type: Number,
        required: true
    },
    errorAddress: {
        type: Boolean,
        default: false
    },
    date : {
        type: String,
        required: true
    },
    errorDate: {
        type: Boolean,
        default: false
    },
	addressList: {
		type: Array as PropType<SelectInputData[]>,
		required: true
	},
	loadingAddress: {
		type: Boolean,
        default: false
	},
	other: {
		type: Boolean,
        default: false
	}


})
const emits = defineEmits(['update:addressId', 'update:date', 'update:errorAddress', 'update:errorDate'])
const showMap = ref(false)
const dateLocal = ref('')
const addressLocal = ref(-1)
const fro = ref(true)
const es = ref(false)

onMounted(()=>{ 
	dateLocal.value = props.date
	addressLocal.value = props.addressId

	
})


watch(addressLocal, ()=>{
	emits('update:addressId', addressLocal.value)
	emits('update:errorAddress', false)
})

watch(dateLocal, ()=>{
	emits('update:date', dateLocal.value)
	emits('update:errorDate', false)
})


</script>