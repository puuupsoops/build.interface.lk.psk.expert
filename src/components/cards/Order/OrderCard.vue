<template>

	<div class="order-list content-elem">

			<div class="order-list-top">
				<div class="order-list-top-elem">
					<div class="order-list-top-wrap">
						<div class="order-list-elem">Контрагент</div>
						<SelectInput 
							:data="companys"
							:error="error"
							:read-only="data.edit"
							v-model="selectCompany"
							
						/>
					</div>
				</div>
				<div class="order-list-top-elem">
					<div class="order-list-top-wrap">
						<div class="order-list-elem">Условия получения</div>
							<SelectInput 
								:data="DeliveryName"
								v-model="selectDelivery"
								@on-input="updDeliveryCase()"
							/>
					</div>
				</div>
				<div class="order-list-top-elem">
					<div class="order-list-btn"
						tooltip="Добавить сертификаты к заказу"
						flow="up"
						@click="addSert()"
					>
						<svg  v-if="!data.request_certificate" class="content-heading-btn-img " width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path  class="fill stroke"  fill="#A5A7A9"  d="M 4.5 17 q -0.625 0 -1.062 -0.438 Q 3 16.125 3 15.5 v -11 q 0 -0.625 0.438 -1.062 Q 3.875 3 4.5 3 h 11 q 0.625 0 1.062 0.438 Q 17 3.875 17 4.5 v 11 q 0 0.625 -0.438 1.062 Q 16.125 17 15.5 17 Z m 0 -1.5 h 11 v -11 h -11 v 11 Z"/>
						</svg>
						<svg  v-else class="content-heading-btn-img active" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path  class="fill stroke"  fill="#A5A7A9"  d="m 8.938 13 l 4.958 -4.938 L 12.833 7 l -3.895 3.875 l -1.771 -1.75 l -1.063 1.063 Z M 4.5 17 q -0.625 0 -1.062 -0.438 Q 3 16.125 3 15.5 v -11 q 0 -0.625 0.438 -1.062 Q 3.875 3 4.5 3 h 11 q 0.625 0 1.062 0.438 Q 17 3.875 17 4.5 v 11 q 0 0.625 -0.438 1.062 Q 16.125 17 15.5 17 Z m 0 -1.5 h 11 v -11 h -11 v 11 Z m 0 -11 v 11 v -11 Z"/>
						</svg>
						Сертификаты

					</div>
					<div class="content-heading-btn"
						to="#"
						:class="{'active': showComment}"
						@click=" showComment = !showComment"
						tooltip="Добавить комментарий к заказу" flow="up"
						
					>
					<svg class="content-heading-btn-img" width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill="#A5A7A9" stroke="#A5A7A9"  stroke-width="0.2" 
						d="M 3.2460938,1.2792969 A 0.82590935,0.82590935 0 0 0 2.4199219,2.1074219 L 2.4492188,20.238281 A 0.82590935,0.82590935 0 0 0 3.2734375,21.0625 h 3.7871094 l 0.044922,6.455078 a 0.82590935,0.82590935 0 0 0 1.4101563,0.578125 l 7.003906,-6.994141 h 12.179688 a 0.82590935,0.82590935 0 0 0 0.826172,-0.826171 V 2.1054688 A 0.82590935,0.82590935 0 0 0 27.699219,1.2792969 Z M 4.0742187,2.9316406 H 26.873047 V 19.449219 H 15.177734 A 0.82590935,0.82590935 0 0 0 14.59375,19.691406 L 8.7441406,25.533203 8.7070313,20.230469 A 0.82590935,0.82590935 0 0 0 7.8808594,19.410156 h -3.78125 z"/>

						<path class="stroke" stroke="#A5A7A9"  stroke-width="1.5" 
							d="M 8.0573765,6.5547755 H 13.656047 M 8.1338615,10.770541 H 20.646739 M 8.0637134,15.056176 h 9.2246446"/>
					</svg>

						
					</div>
					
					<div class="content-heading-btn"
						to="#"
						:class="{'active': isOrderInDraft}"
						@click.capture="isOrderInDraft ? addToDraft() : draftShowModal = true"
						:tooltip="isOrderInDraft ? 'Удалить из черновика': 'Сохранить в черновик'" :flow="draftShowModal ? '' : 'up'"
						
					>
						<modal-input-full v-model="draftName" v-model:show="draftShowModal" show-ok @on-ok="addToDraft()"></modal-input-full>
						<svg class="content-heading-btn-img" width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M3 2H18.75C19.3023 2 19.75 2.44772 19.75 3V15H21.75V3C21.75 1.34315 20.4069 0 18.75 0H3C1.34315 0 0 1.34315 0 3V21.8571C0 23.514 1.34315 24.8571 3 24.8571H16.4846C16.1942 24.6822 16 24.3638 16 24V22.8571H3C2.44772 22.8571 2 22.4094 2 21.8571V3C2 2.44772 2.44772 2 3 2Z" fill="#A5A7A9"/>
							<path d="M27.614 22.1745C26.585 23.406 25.1063 24.6558 23.394 26.1031L23.3937 26.1033C22.8085 26.5978 22.1454 27.1584 21.457 27.7553M27.614 22.1745L27.7675 22.3028M27.614 22.1745L27.7675 22.3028C27.7675 22.3028 27.7675 22.3028 27.7675 22.3028M27.614 22.1745C28.7643 20.798 29.3 19.4928 29.3 18.0669C29.3 16.6816 28.8211 15.4035 27.9515 14.4679C27.0715 13.5213 25.8639 13 24.551 13C23.5697 13 22.671 13.3077 21.88 13.9144L20.8 14.703M27.7675 22.3028C26.7274 23.5476 25.2378 24.8066 23.5349 26.2458L23.5228 26.2561L23.5228 26.2561C22.9375 26.7506 22.2753 27.3104 21.5881 27.9064L21.457 27.7553M27.7675 22.3028C28.9399 20.8998 29.5 19.5508 29.5 18.0669C29.5 16.6357 29.0051 15.3076 28.098 14.3318L28.098 14.3318C27.1795 13.3437 25.9184 12.8 24.551 12.8C23.525 12.8 22.5836 13.1227 21.7583 13.7557C21.4091 14.0235 21.0888 14.3408 20.8 14.703M21.457 27.7553L21.5881 27.9064M21.457 27.7553C21.2753 27.913 21.0419 28 20.8 28C20.558 28 20.3246 27.913 20.1428 27.7551C19.456 27.1595 18.7939 26.5998 18.2098 26.1062L18.2068 26.1036C16.4941 24.6561 15.0151 23.406 13.9861 22.1747C12.8358 20.798 12.3 19.4928 12.3 18.0669C12.3 16.6816 12.779 15.4035 13.6486 14.4679C14.5286 13.5213 15.7361 13 17.0491 13C18.0304 13 18.9291 13.3077 19.7201 13.9144C20.0677 14.1811 20.387 14.4998 20.6742 14.8663L21.5881 27.9064M21.5881 27.9064C21.3698 28.0958 21.0898 28.2 20.8 28.2C20.5101 28.2 20.2301 28.0958 20.0117 27.9061C19.3261 27.3115 18.6649 26.7527 18.0807 26.2589L18.0791 26.2576L18.0791 26.2576L18.0777 26.2563L18.0761 26.255L18.0669 26.2472C16.3632 24.8074 14.873 23.5479 13.8326 22.3029L13.8326 22.3029C12.6602 20.8998 12.1 19.5508 12.1 18.0669C12.1 16.6357 12.595 15.3076 13.5021 14.3318L13.5021 14.3318C14.4206 13.3437 15.6815 12.8 17.0491 12.8C18.0752 12.8 19.0165 13.1227 19.8418 13.7557L19.8418 13.7558C20.1908 14.0235 20.5113 14.3407 20.8 14.703M21.5881 27.9064L20.8 14.703M14.9062 21.4162L14.9062 21.4162C15.8663 22.5653 17.299 23.777 18.9807 25.1985C18.9811 25.1987 18.9814 25.199 18.9817 25.1992L18.9831 25.2004L18.9848 25.2018C19.5341 25.6661 20.153 26.1893 20.7988 26.7476C21.4482 26.1882 22.0682 25.6641 22.6187 25.199M14.9062 21.4162L14.5271 15.2735C15.1778 14.5736 16.072 14.1876 17.0491 14.1876C17.7595 14.1876 18.4107 14.4107 18.9892 14.8543C19.508 15.2523 19.873 15.7588 20.0887 16.1174L20.0887 16.1175C20.2397 16.3685 20.5068 16.5186 20.8 16.5186C21.0932 16.5186 21.3602 16.3685 21.5113 16.1175C21.7271 15.7588 22.0921 15.2523 22.6108 14.8543C23.1892 14.4107 23.8404 14.1876 24.551 14.1876C25.528 14.1876 26.4223 14.5737 27.0729 15.2735C27.7343 15.9851 28.1043 16.9751 28.1043 18.0669C28.1043 19.2064 27.6808 20.2351 26.6939 21.4162C25.7336 22.5655 24.3008 23.7772 22.6187 25.199M14.9062 21.4162C13.9192 20.2351 13.4957 19.2064 13.4957 18.0669C13.4957 16.9751 13.8657 15.9851 14.5271 15.2735L14.9062 21.4162ZM22.6187 25.199L22.7478 25.3517L22.6187 25.199Z" fill="#A5A7A9" stroke="#A5A7A9" stroke-width="0.4"/>
							<rect x="17.6071" y="5.17856" width="1.7" height="13.4643" rx="0.85" transform="rotate(90 17.6071 5.17856)" fill="#A5A7A9"/>
							<rect x="10" y="13" width="1.7" height="6" rx="0.85" transform="rotate(90 10 13)" fill="#A5A7A9"/>
							<rect x="14" y="9" width="1.7" height="10" rx="0.85" transform="rotate(90 14 9)" fill="#A5A7A9"/>
						</svg>

						
					</div>
					
					
				</div>
			</div>
			<div class="order-list-delivery">
				

				<ShipmentTransportAddressCard v-if="selectDelivery != 0"
					v-model:date="deliveryDate" 
					v-model:addressId="deliveryAddress" 
					v-model:errorDate="deliveryDateError" 
					v-model:errorAddress="deliveryAddressError" 
					v-model:storage="deliveryStorage"
					v-model:storageError="deliveryStorageError"
					:loadingAddress="loadingAddress"
					:addressList="addressList"
					:other="data.delivery.case=='other'"
					:storagesList="storagesList"
				/>
				
				
			</div>
			<div class="scroll-elem">
				
				<div class="order-list-bottom-wrap"> 
					
					<div class="order-list-row order-list-heading" v-if="data.position.length>0">
						<div class="order-list-elem">№</div>
						<div class="order-list-elem">Артикул</div>
						<div class="order-list-elem">Наименование</div>
						<div class="order-list-elem">{{ open.length != 0 ? 'Цена':'' }}</div>
						<div class="order-list-elem">Кол-во</div>
						<div class="order-list-elem">Стоимость</div>
						<div class="order-list-elem"></div>
						
					</div>
					<div 
						:class="open.indexOf(key) !== -1 ? 'order-list-item active' : 'order-list-item'"
						v-for="(item, key) in data.position"
						:key="key"
					>
						<div 
							class="order-list-row order-list-main-row"
							@click="open.indexOf(key) === -1 ? open.push(key) : open.splice(open.indexOf(key),1)"
						>
							<div class="order-list-elem">
								{{key+1}}
							<div class="table-arrow"></div>
						</div>
						<div class="order-list-elem">
							<router-link 
								tag="a"
								class="order-list-elem"
								:to="'/order/'+item.article"
								title="Добавить"
							>
								<span v-html = "item.article"></span>
							</router-link>
						</div>
						<div class="order-list-elem"><span v-html = "item.product.NAME"></span></div>
						<div class="order-list-elem"></div>
						<div class="order-list-elem">{{ item.count }}</div>
						<div class="order-list-elem">{{ Number(item.total_discount).toLocaleString('RU', {minimumFractionDigits: 0, maximumFractionDigits: 2}).replace(',','.') }} ₽</div>
						<div class="order-list-elem-edit" title="Добавить">
							<EditButton @click.stop="goTo(item.article)"></EditButton>
						</div> 
						<div class="order-list-elem-delete">
							<DeleteButton @onClick="removePosition(false, item.guid)"/>
						</div>
						</div>
						<div
							:class="open.indexOf(key) !== -1 ? 'order-list-sublist active' : 'order-list-sublist'"
						>
							<div
								v-for="(characteristic, k) in item.characteristics"
								:key="k"
								class="order-list-row"
							>
								<div class="order-list-elem"> </div>
								<div class="order-list-elem"> </div>
								<div class="order-list-elem">{{ characteristic.CHARACTERISTIC }}</div>
								<div class="order-list-elem">
									{{ Number(characteristic.price_discount).toLocaleString('RU', {minimumFractionDigits: 0, maximumFractionDigits: 2}).replace(',','.') }} ₽
									<div class="order-list-elem-text" v-if="characteristic.discount>0">скидка {{ characteristic.discount }}% </div>
								</div>
								<div class="order-list-elem"> 
									<AmountInput 
										v-model="characteristic.count"
										:min = "1"
										:max = "characteristic.RESIDUE"
										@onInput="updOrder()"
									/>
								</div>
								<div class="order-list-elem">{{ Number(characteristic.price_discount * characteristic.count).toLocaleString('RU', {minimumFractionDigits: 0, maximumFractionDigits: 2}).replace(',','.') }} ₽</div>

								<div class="order-list-elem-delete">
									<DeleteButton  @onClick="removeCharacteristic(false, {guid: item.guid, characteristics: [characteristic], article: item.article, product:item.product})" />
								</div>
							</div>
							
						</div>
					</div>
					
					
				</div>
				<div class="order-list-bottom-wrap" v-if="data.position_presail.length > 0"> 
					<div class="order-list-row order-list-subheading">
						<div>Позиции для предзаказа</div>
						
					</div>
					
					<div class="order-list-row order-list-heading">
						<div class="order-list-elem">№</div>
						<div class="order-list-elem">Артикул</div>
						<div class="order-list-elem">Наименование</div>
						<div class="order-list-elem">{{ open_presail.length != 0 ? 'Цена':'' }}</div>
						<div class="order-list-elem">Кол-во</div>
						<div class="order-list-elem">Стоимость</div>
						<div class="order-list-elem"></div>
						
					</div>
					<div 
						:class="open_presail.indexOf(key) !== -1 ? 'order-list-item active' : 'order-list-item'"
						v-for="(item, key) in data.position_presail"
						:key="key"
					>
						<div 
							class="order-list-row order-list-main-row"
							@click="open_presail.indexOf(key) === -1 ? open_presail.push(key) : open_presail.splice(open_presail.indexOf(key),1)"
						>
							<div class="order-list-elem">
								{{key+1}}
							<div class="table-arrow"></div>
						</div>
						<div class="order-list-elem"> <span v-html = "item.article"></span></div>
						<div class="order-list-elem"><span v-html = "item.product.NAME"></span></div>
						<div class="order-list-elem"></div>
						<div class="order-list-elem">{{ item.count }}</div>
						<div class="order-list-elem">{{ Number(item.total_discount).toLocaleString('RU', {minimumFractionDigits: 0, maximumFractionDigits: 2}).replace(',','.') }} ₽</div>
						<div class="order-list-elem-edit" title="Добавить"
						>
							<EditButton @click.stop="goTo(item.article)"></EditButton>
						</div> 
						
						<div class="order-list-elem-delete">
							
							<DeleteButton @onClick="removePosition(true, item.guid)"/>
						</div>
						</div>
						<div
							:class="open_presail.indexOf(key) !== -1 ? 'order-list-sublist active' : 'order-list-sublist'"
						>
							<div
								v-for="(characteristic, k) in item.characteristics"
								:key="k"
								class="order-list-row"
							>
								<div class="order-list-elem"> </div>
								<div class="order-list-elem"> </div>
								<div class="order-list-elem">{{ characteristic.CHARACTERISTIC }}</div>
								<div class="order-list-elem">
									{{ Number(characteristic.price_discount).toLocaleString('RU', {minimumFractionDigits: 0, maximumFractionDigits: 2}).replace(',','.') }} ₽
									<div class="order-list-elem-text" v-if="characteristic.discount>0">скидка {{ characteristic.discount }}% </div>
								</div>
								<div class="order-list-elem"> 
									<AmountInput 
										v-model="characteristic.count"
										:min = "characteristic.RESIDUE+1"
										@onInput="updOrder()"
									/>
								</div>
								<div class="order-list-elem">{{ Number(characteristic.price_discount * characteristic.count).toLocaleString('RU', {minimumFractionDigits: 0, maximumFractionDigits: 2}).replace(',','.') }} ₽</div>
								
								<div class="order-list-elem-delete">
									<DeleteButton  @onClick="removeCharacteristic(true, {guid: item.guid, characteristics: [characteristic], article: item.article, product:item.product})" />
								</div>
							</div>
							
						</div>
					</div>
					
					
				</div>
			</div>
		</div>

		<div class="order-comment-form" 
			:class="{show: showComment}">
			<div class="order-comment-title"><span>Комментарий</span></div>
			<textarea class="order-comment-textarea" v-model="comment" @input="addComment()" name=""  ></textarea>
		</div>
		
		<div class="order-list-buttons">
			<button 
				class="order-list-submit gradient-btn disabled" 
				@click="delOrder()"
			> 
				<div class="gradient-btn-text">Отменить</div>
			</button>

			<button 
				class="order-list-submit gradient-btn"
				v-if="data.edit" 
				@click="onClick()"
			> 
				<div class="gradient-btn-text">Изменить заказ</div>
			</button>			
			<button 
				class="order-list-submit gradient-btn" 
				v-else
				@click="onClick()"
			> 
				<div class="gradient-btn-text">Оформить заказ</div>
			</button>
			
		</div>

	<SnackBar v-model="snack" :message="snackMsg" :timeout="2000" notification ></SnackBar>
</template>

<script setup lang="ts">
	import { ref, computed, PropType, onMounted, watch, inject } from 'vue'
	import { useStore } from '/src/store'

	import AmountInput from '/src/components/ui/AmountInput.vue'
	import DeleteButton from '/src/components/ui/DeleteButton.vue'
	import EditButton from '/src/components/ui/EditButton.vue'
	import SelectInput from '/src/components/ui/SelectInput.vue'
	import SnackBar from '/src/components/ui/SnackBar.vue'
	import ShipmentTransportAddressCard from '/src/components/cards/Shipment/ShipmentTransportAddressCard.vue'
	import ModalInputFull from '/src/components/ui/ModalInputFull.vue'

	import { DeliveryCode, DeliveryName } from '/src/store/shipments/types'
	import { OrderMutations } from '/src/store/order/mutations'
	import { OrderActions } from '/src/store/order/actions'
	import { OrderStateDelivery, OrderStateOrder, OrderStatePosition } from '/src/store/order/types'
	import { useRouter } from 'vue-router'
	import { SelectInputData, DateFromRuLocale } from '/src/models/Components'

import { ShipmentsActions } from '/src/store/shipments/actions'
import { KP_TYPES } from '/src/models/KP'

	const props = defineProps(
		{
			data: {
				type: Object as PropType<OrderStateOrder>,
				required: true
			},
			companys:{
				type: Array as PropType<SelectInputData[]>,
				required: true
			},
			modelValue: {
				type: String,
				required: true
			}
		})
	const emits =  defineEmits(['update:modelValue', 'update:data','onClickAdd', 'onClickEdit'])
	const store = useStore()
	const router = useRouter()
	const open = ref<number[]>([])
	const open_presail = ref<number[]>([])

	const error = ref(false)
	const snack = ref(false)
	const snackMsg = ref('')
	const showComment = ref(false)
	const comment = ref('')
	const deliveryDate = ref('')
	const deliveryDateError = ref(false)
	const deliveryAddress = ref(-1)
	const deliveryAddressError = ref(false)
	const deliveryStorage = ref('')
	const deliveryStorageError = ref(false)
	const loadingAddress = ref(false)
	const draftName = ref ('Черновик #')
	const draftShowModal = ref(false)

	const selectDelivery = ref(0)
	
// Computed
	const selectCompany = computed( {
			get: () => props.data?.edit ? props.data.partner_id: props.modelValue,
			set: (v) => emits('update:modelValue', v)
		});
	const isOrderInDraft = computed(()=> store.getters.isOrderInDraft)
	
	const addressList = computed( () => store.getters.getShipmentsAddressInputData)

	const storagesList = computed (() => store.getters.getOrderStorages)
//methods
	const updOrder = () => {store.commit(OrderMutations.CALC_ORDER)	}
	const removePosition = (presail: boolean, guid: string) => {
		deliveryStorage.value = ''
		if (presail)
			store.dispatch(OrderActions.REMOVE_POSITION_PRESAIL, guid)
		else
			store.dispatch(OrderActions.REMOVE_POSITION, guid)

	}
	const removeCharacteristic = (presail: boolean, CHAR: OrderStatePosition) => {
		deliveryStorage.value = ''
		if (presail)
			store.dispatch(OrderActions.REMOVE_CHARACTERISTIC_PRESAIL, CHAR)
		else
			store.dispatch(OrderActions.REMOVE_CHARACTERISTIC, CHAR)
	}
	const onClick = () => {
		let valid = true
		if (!showComment.value)	store.commit(OrderMutations.SET_ORDER_COMMENT, '')
		if (props.modelValue == '') {
			error.value = true;
			setTimeout(() => {error.value=false;}, 5000);
		}
		if (selectDelivery.value > 0 && deliveryDate.value == '') {
			deliveryDateError.value = true;
			setTimeout(() => {deliveryDateError.value=false;}, 5000);
			valid=false
		}
		if (selectDelivery.value > 0 && deliveryAddress.value == -1) {
			deliveryAddressError.value = true;
			setTimeout(() => {deliveryAddressError.value=false;}, 5000);
			valid=false
		}
		if (DeliveryCode[selectDelivery.value].code == 'other'&& storagesList.value.length > 0 && deliveryStorage.value == '') {
			deliveryStorageError.value = true;
			setTimeout(() => {deliveryStorageError.value=false;}, 5000);
			valid=false
		}
	
		if (valid){
			let delivery = <OrderStateDelivery>{
					address: selectDelivery.value == 0 ? '' : store.getters.getShipmentsAddress[deliveryAddress.value].address,
					case: DeliveryCode[selectDelivery.value].code,
					date: DateFromRuLocale(deliveryDate.value).getTime(),		
					cost: DeliveryCode[selectDelivery.value].code == 'other' ? 900 : 0,	
					bill_to: deliveryStorage.value	
			}				
			store.commit(OrderMutations.SET_ORDER_DELIVERY, delivery)
			if (props.data.edit) 
				emits('onClickEdit')
			else
				emits('onClickAdd')
		}
		console.log(valid)
	}
	const delOrder = () => {
		store.commit(OrderMutations.CLEAN_ORDER)
	}
	const addToDraft = () => {
		console.log('addToDraft')
		if (store.getters.isOrderInDraft){
			store.commit(OrderMutations.DEL_ORDER_FROM_DRAFT, props.data?.id)
			snack.value = true
			snackMsg.value = 'Заказ удален из черновика'
		} else {
			store.commit(OrderMutations.ADD_ORDER_TO_DRAFT, draftName.value)
			draftShowModal.value = false
			snack.value = true
			snackMsg.value = 'Заказ добавлен в черновик'
		}
	}
	const goTo = (to: string) =>{
		router.push('/order/'+to)
	}
	const addSert = () => {
		store.commit(OrderMutations.SET_ORDER_REQUEST_SERT, !props.data.request_certificate)
	}
	const addComment= () => {
		store.commit(OrderMutations.SET_ORDER_COMMENT, comment.value)
	}
	onMounted( () => {
		if (props.data.comment.length > 0) {
			showComment.value = true
			comment.value = props.data.comment
		}
		if (store.getters.getShipmentsAddress.length == 0){
			loadingAddress.value=true
			store.dispatch(ShipmentsActions.GET_SHIPMENTS_ADDRESS)
				.then(()=>{				
					loadingAddress.value=false
				})
			
		}
		if (props.data.edit) {
			//console.log(new Date(props.data.delivery.date).toISOString().substr(0, 10))
			let code = DeliveryCode.find(x=>x.code === props.data.delivery.case)?.id
			selectDelivery.value = code ? code : 0
			deliveryDate.value = new Date(props.data.delivery.date).toLocaleString('ru').substr(0, 10)
			emits('update:modelValue', props.data.partner_id)
		}
		
		
	})
	
const updDeliveryCase = ()=>{
	let delivery = <OrderStateDelivery>{
					address: '',
					case: DeliveryCode[selectDelivery.value].code,
					date: 0,
					cost: DeliveryCode[selectDelivery.value].code == 'other' ? 900 : 0,
					bill_to: ''
			}				
	store.commit(OrderMutations.SET_ORDER_DELIVERY, delivery)
	store.commit(OrderMutations.CALC_ORDER)
}

watch(draftShowModal, ()=>{
	if (draftShowModal.value) draftName.value = 'Черновик #' + Number(store.getters.getOrderDraftCount+1)
})

</script>

