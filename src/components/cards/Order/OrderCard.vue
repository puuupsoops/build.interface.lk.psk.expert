<template>

	<div class="order-list content-elem">
			<div class="order-list-top">
			<div class="order-list-top-elem">
				<div class="product-search-text">Контрагент:</div>
				<SelectInput 
					:data="companys"
					:error="error"
					:read-only="data.edit"
					v-model="selectCompany"
				/>
			</div>
			<div class="order-list-top-elem">
				<div class="order-list-btn ">
					<svg class="content-heading-btn-img active" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path  class="fill stroke"  fill="#A5A7A9"  d="m 8.938 13 l 4.958 -4.938 L 12.833 7 l -3.895 3.875 l -1.771 -1.75 l -1.063 1.063 Z M 4.5 17 q -0.625 0 -1.062 -0.438 Q 3 16.125 3 15.5 v -11 q 0 -0.625 0.438 -1.062 Q 3.875 3 4.5 3 h 11 q 0.625 0 1.062 0.438 Q 17 3.875 17 4.5 v 11 q 0 0.625 -0.438 1.062 Q 16.125 17 15.5 17 Z m 0 -1.5 h 11 v -11 h -11 v 11 Z m 0 -11 v 11 v -11 Z"/>
					</svg>
					Добавить печатный каталог
				</div>
				<div class="order-list-btn"
					 tooltip="Резервирование товаров позволяет закрепить товар за клиентом."
					 flow="up"
					 @click="$emit('update:data', data.reserved = !data.reserved)"
				>
					<svg  v-if="!data.reserved" class="content-heading-btn-img " width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path  class="fill stroke"  fill="#A5A7A9"  d="M 4.5 17 q -0.625 0 -1.062 -0.438 Q 3 16.125 3 15.5 v -11 q 0 -0.625 0.438 -1.062 Q 3.875 3 4.5 3 h 11 q 0.625 0 1.062 0.438 Q 17 3.875 17 4.5 v 11 q 0 0.625 -0.438 1.062 Q 16.125 17 15.5 17 Z m 0 -1.5 h 11 v -11 h -11 v 11 Z"/>
					</svg>
					<svg  v-else class="content-heading-btn-img active" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path  class="fill stroke"  fill="#A5A7A9"  d="m 8.938 13 l 4.958 -4.938 L 12.833 7 l -3.895 3.875 l -1.771 -1.75 l -1.063 1.063 Z M 4.5 17 q -0.625 0 -1.062 -0.438 Q 3 16.125 3 15.5 v -11 q 0 -0.625 0.438 -1.062 Q 3.875 3 4.5 3 h 11 q 0.625 0 1.062 0.438 Q 17 3.875 17 4.5 v 11 q 0 0.625 -0.438 1.062 Q 16.125 17 15.5 17 Z m 0 -1.5 h 11 v -11 h -11 v 11 Z m 0 -11 v 11 v -11 Z"/>
					</svg>
					Резерв

				</div>
				<div
					to="#"
					:class="'content-heading-btn' +(isOrderInDraft ? ' active':'')"
					@click="addToDraft()"
				    :tooltip="isOrderInDraft ? 'Удалить из черновика': 'Сохранить в черновик'" flow="up"
					
				>
					<svg class="content-heading-btn-img" width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path class="fill stroke" d="M23.3935 26.1033L23.3938 26.1031C25.1061 24.6558 26.5848 23.406 27.6138 22.1745M23.3935 26.1033L20.9256 14.8664C21.2129 14.4998 21.5321 14.1811 21.8798 13.9144C22.6709 13.3077 23.5695 13 24.5508 13C25.8637 13 27.0713 13.5213 27.9513 14.4679C28.821 15.4035 29.2998 16.6816 29.2998 18.0669C29.2998 19.4928 28.7641 20.798 27.6138 22.1745M23.3935 26.1033C22.8083 26.5978 22.1452 27.1584 21.4569 27.7553C21.2752 27.913 21.0417 28 20.7998 28C20.5578 28 20.3245 27.913 20.1426 27.7551M23.3935 26.1033L20.1426 27.7551M27.6138 22.1745L27.7673 22.3028C27.7673 22.3028 27.7673 22.3028 27.7673 22.3028M27.6138 22.1745L27.7673 22.3028M27.7673 22.3028C26.7272 23.5475 25.2376 24.8066 23.5348 26.2458L23.5226 26.2561L23.5226 26.2561C22.9374 26.7506 22.2752 27.3104 21.588 27.9064L21.4575 27.7561L21.5879 27.9064C21.3696 28.0958 21.0896 28.2 20.7998 28.2C20.5099 28.2 20.2299 28.0958 20.0115 27.9061C19.3259 27.3115 18.6647 26.7527 18.0805 26.2589L18.0789 26.2576L18.079 26.2576L18.0775 26.2563L18.076 26.255L18.0667 26.2472C16.3631 24.8074 14.8728 23.5479 13.8324 22.3029L13.8324 22.3029C12.66 20.8998 12.0998 19.5508 12.0998 18.0669C12.0998 16.6357 12.5949 15.3076 13.5019 14.3318L13.5019 14.3318C14.4205 13.3437 15.6814 12.8 17.0489 12.8C18.075 12.8 19.0163 13.1227 19.8416 13.7557L19.8417 13.7558C20.1907 14.0235 20.5111 14.3407 20.7998 14.703C21.0886 14.3408 21.409 14.0235 21.7581 13.7557C22.5834 13.1227 23.5248 12.8 24.5508 12.8C25.9183 12.8 27.1793 13.3437 28.0978 14.3318L28.0978 14.3318C29.0049 15.3076 29.4998 16.6357 29.4998 18.0669C29.4998 19.5508 28.9397 20.8998 27.7673 22.3028ZM14.906 21.4162L14.906 21.4162C15.8662 22.5653 17.2989 23.7771 18.9807 25.1986C18.9809 25.1988 18.9812 25.199 18.9815 25.1992L18.9829 25.2004L18.9846 25.2018C19.5339 25.6661 20.1528 26.1893 20.7986 26.7476C21.448 26.1882 22.068 25.6641 22.6186 25.199C24.3006 23.7772 25.7334 22.5655 26.6937 21.4162C27.6806 20.2351 28.1041 19.2064 28.1041 18.0669C28.1041 16.9751 27.7341 15.9851 27.0727 15.2735C26.4221 14.5737 25.5279 14.1876 24.5508 14.1876C23.8402 14.1876 23.1891 14.4107 22.6106 14.8543C22.0919 15.2523 21.7269 15.7588 21.5111 16.1175C21.36 16.3685 21.093 16.5186 20.7998 16.5186C20.5066 16.5186 20.2396 16.3685 20.0885 16.1175L20.0885 16.1174C19.8728 15.7588 19.5078 15.2523 18.989 14.8543C18.4105 14.4107 17.7594 14.1876 17.0489 14.1876C16.0718 14.1876 15.1776 14.5736 14.5269 15.2735L14.906 21.4162ZM14.906 21.4162C13.919 20.2351 13.4955 19.2064 13.4955 18.0669C13.4955 16.9751 13.8655 15.9851 14.5269 15.2735L14.906 21.4162ZM20.1426 27.7551C19.4559 27.1595 18.7937 26.5998 18.2096 26.1062L20.1426 27.7551Z" fill="#A5A7A9" stroke="#A5A7A9" stroke-width="0.4"/>
						<path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M3 2H18.75C19.3023 2 19.75 2.44772 19.75 3V15H21.75V3C21.75 1.34315 20.4069 0 18.75 0H3C1.34315 0 0 1.34315 0 3V21.8571C0 23.514 1.34315 24.8571 3 24.8571H16.4846C16.1942 24.6822 16 24.3638 16 24V22.8571H3C2.44772 22.8571 2 22.4094 2 21.8571V3C2 2.44772 2.44772 2 3 2Z" fill="#A5A7A9"/>
						<rect class="fill" x="17.6074" y="5.17871" width="1.7" height="13.4643" rx="0.85" transform="rotate(90 17.6074 5.17871)" fill="#A5A7A9"/>
						<rect class="fill" x="10" y="13" width="1.7" height="6" rx="0.85" transform="rotate(90 10 13)" fill="#A5A7A9"/>
						<rect class="fill" x="14" y="9" width="1.7" height="10" rx="0.85" transform="rotate(90 14 9)" fill="#A5A7A9"/>
					</svg>

					
				</div>
				
				
			</div>
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
									<DeleteButton  @onClick="removeCharacteristic(false, {guid: item.guid, characteristics: [characteristic]})" />
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
									<DeleteButton  @onClick="removeCharacteristic(true, {guid: item.guid, characteristics: [characteristic]})" />
								</div>
							</div>
							
						</div>
					</div>
					
					
				</div>
			</div>
		</div>
		<div class="order-list-buttons"
			
		>
			<button 
				class="order-list-submit gradient-btn"
				v-if="data.edit" 
				@click="onClickEdit()"
			> 
				<div class="gradient-btn-text">Изменить заказ</div>
			</button>			
			<button 
				class="order-list-submit gradient-btn" 
				v-else
				@click="onClickAdd()"
			> 
				<div class="gradient-btn-text">Оформить заказ</div>
			</button>
			<button 
				class="order-list-submit gradient-btn" 
				@click="delOrder()"
			> 
				<div class="gradient-btn-text">Отменить</div>
			</button>			
		</div>

	<SnackBar v-model="snack" :message="snackMsg" :timeout="2000" notification ></SnackBar>
</template>

<script setup lang="ts">
	import { ref, computed, PropType } from 'vue'
	import { useStore } from 'vuex'

	import AmountInput from '/src/components/ui/AmountInput.vue'
	import DeleteButton from '/src/components/ui/DeleteButton.vue'
	import EditButton from '/src/components/ui/EditButton.vue'
	import SelectInput from '/src/components/ui/SelectInput.vue'
	import SnackBar from '/src/components/ui/SnackBar.vue'

	import { key } from '/src/store/index'
	import { OrderMutations } from '/src/store/order/mutations'
	import { OrderActions } from '/src/store/order/actions'
	import { OrderStateOrder, OrderStatePosition } from '/src/store/order/types'
	import { useRouter } from 'vue-router'

	const props = defineProps(
		{
			data: {
				type: Object as PropType<OrderStateOrder>,
			},
			companys:{
				type: Array,
			},
		modelValue: {
				type: String,
				required: true
			}
		})
	const emits =  defineEmits(['update:modelValue', 'update:data','onClickAdd', 'onClickEdit'])
	const store = useStore(key)
	const router = useRouter()
	const open = ref([])
	const open_presail = ref([])

	const error = ref(false)
	const snack = ref(false)
	const snackMsg = ref('')
// Computed
	const selectCompany = computed( {
			get: () => props.data?.edit ? props.data.partner_id: props.modelValue,
			set: (v) => emits('update:modelValue', v)
		});
	const isOrderInDraft = computed(()=> store.getters.isOrderInDraft)
//methods
	const updOrder = () => {store.commit(OrderMutations.CALC_ORDER)}
	const removePosition = (presail: boolean, guid: string) => {
		if (presail)
			store.dispatch(OrderActions.REMOVE_POSITION_PRESAIL, guid)
		else
			store.dispatch(OrderActions.REMOVE_POSITION, guid)

	}
	const removeCharacteristic = (presail: boolean, CHAR: OrderStatePosition) => {
		if (presail)
			store.dispatch(OrderActions.REMOVE_CHARACTERISTIC_PRESAIL, CHAR)
		else
			store.dispatch(OrderActions.REMOVE_CHARACTERISTIC, CHAR)
	}
	const onClickAdd = () => {
		if (props.modelValue == '') {
			error.value = true;
			setTimeout(() => {error.value=false;}, 5000);
		}
		emits('onClickAdd');
	}
	const onClickEdit = () => {
		if (props.modelValue == '') {
			error.value = true;
			setTimeout(() => {error.value=false;}, 5000);
		}
		emits('onClickEdit');
	}
	const delOrder = () => {
		store.commit(OrderMutations.CLEAN_ORDER)
	}
	const addToDraft = () => {
		if (store.getters.isOrderInDraft){
			store.commit(OrderMutations.DEL_ORDER_FROM_DRAFT, props.data?.id)
			snack.value = true
			snackMsg.value = 'Заказ удален из черновика'
		} else {
			store.commit(OrderMutations.ADD_ORDER_TO_DRAFT)
			snack.value = true
			snackMsg.value = 'Заказ добавлен в черновик'
		}
	}
	const goTo = (to: string) =>{
		router.push('/order/'+to)
	}

</script>

