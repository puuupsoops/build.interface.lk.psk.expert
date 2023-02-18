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
						:class="{'active': showComment}"
						@click=" showComment = !showComment"
						tooltip="Добавить комментарий к заказу" flow="up"
					>
            <svgComment class="content-heading-btn-img"></svgComment>
					</div>
					<div class="content-heading-btn"
               @click="$emit('goToKP')"
               tooltip="Создать коммерческое предложение из заказа" flow="up">
            <svgKP class="content-heading-btn-img"></svgKP>
          </div>
					<div class="content-heading-btn"
						:class="{'active': isOrderInDraft}"
						@click.capture="isOrderInDraft ? addToDraft() : draftShowModal = true"
						:tooltip="isOrderInDraft ? 'Удалить из черновика': 'Сохранить в черновик'" :flow="draftShowModal ? '' : 'up'"
					>
						<modal-input-full v-model="draftName" v-model:show="draftShowModal" show-ok @on-ok="addToDraft()"></modal-input-full>
            <svgDraft class="content-heading-btn-img"></svgDraft>
					</div>
					
					
				</div>
			</div>
			<div class="order-list-delivery">
				

				<ShipmentTransportAddressCard v-if="selectDelivery !== 0"
					v-model:date="deliveryDate" 
					v-model:addressId="deliveryAddress" 
					v-model:errorDate="deliveryDateError" 
					v-model:errorAddress="deliveryAddressError" 
					v-model:storage="deliveryStorage"
					v-model:storageError="deliveryStorageError"
					:loadingAddress="loadingAddress"
					:addressList="addressList"
					:other="data.delivery.case==='other'"
					:storagesList="storagesList"
				/>
				
				
			</div>
			<div class="scroll-elem">
				
				<div class="order-list-bottom-wrap"> 
					
					<div class="order-list-row order-list-heading" v-if="data.position.length>0">
						<div class="order-list-elem">№</div>
						<div class="order-list-elem">Артикул</div>
						<div class="order-list-elem">Наименование</div>
						<div class="order-list-elem">{{ open.length !== 0 ? 'Цена':'' }}</div>
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
							<router-link class="order-list-elem"
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
						<div class="order-list-elem">{{ open_presail.length !== 0 ? 'Цена':'' }}</div>
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
	import { ref, computed, PropType, onMounted, watch } from 'vue'
  import svgKP from '/src/assets/img/icon/kp.svg'
  import svgDraft from '/src/assets/img/icon/draft.svg'
  import svgComment from '/src/assets/img/icon/comment.svg'
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
	const emits =  defineEmits(['update:modelValue', 'update:data','onClickAdd', 'onClickEdit', 'goToKP'])
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

