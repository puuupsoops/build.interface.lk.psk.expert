<template>

	<div class="order-list content-elem">
			<div class="order-list-top">
			<div class="order-list-top-elem">
				<div class="product-search-text">Контрагент:</div>
				<SelectInput 
					:data="companys"
					:error="error"
					v-model="selectCompany"
				/>
			</div>
			<div class="order-list-top-elem">
				<button class="order-list-btn">Добавить печатный каталог</button>
			</div>
			</div>
			<div class="order-list-bottom scroll-elem">
				
				<div class="order-list-bottom-wrap"> 
					
					<div class="order-list-row order-list-heading" v-if="data.position.length>0">
						<div class="order-list-elem">№</div>
						<div class="order-list-elem">Наименование</div>
						<div class="order-list-elem">Цена</div>
						<div class="order-list-elem">Кол-во</div>
						<div class="order-list-elem">Стоимость</div>
						<div class="order-list-elem"></div>
						
					</div>
					<div 
						:class="open.indexOf(key) !== -1 ? 'order-list-item active' : 'order-list-item'"
						v-for="(item, key) in <OrderStateOrder>data.position"
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

						<div class="order-list-elem"><span v-html = "item.product.NAME"></span></div>
						<div class="order-list-elem">{{ Number(item.product.PRICE).toLocaleString() }} ₽</div>
						<div class="order-list-elem">{{ item.count }}</div>
						<div class="order-list-elem">{{ Number(item.total).toLocaleString() }} ₽</div>

						<div class="order-list-elem-delete">
							<DeleteButton @onClick="removePosition(false, item.product.ID)"/>
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
								<div class="order-list-elem">{{ characteristic.CHARACTERISTIC }}</div>
								<div class="order-list-elem">{{ Number(characteristic.PRICE).toLocaleString() }} ₽</div>
								<div class="order-list-elem"> 
									<AmountInput 
										v-model="characteristic.count"
										:min = "1"
										:max = "characteristic.RESIDUE"
										@onInput="updOrder()"
									/>
								</div>
								<div class="order-list-elem">{{ Number(characteristic.PRICE * characteristic.count).toLocaleString() }} ₽</div>
								
								<div class="order-list-elem-delete">
									<DeleteButton  @onClick="removeCharacteristic(false, {product: item.product, characteristics: [characteristic]})" />
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
						<div class="order-list-elem">Наименование</div>
						<div class="order-list-elem">Цена</div>
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

						<div class="order-list-elem"><span v-html = "item.product.NAME"></span></div>
						<div class="order-list-elem">{{ Number(item.product.PRICE).toLocaleString() }} ₽</div>
						<div class="order-list-elem">{{ item.count }}</div>
						<div class="order-list-elem">{{ Number(item.total).toLocaleString() }} ₽</div>

						<div class="order-list-elem-delete">
							<DeleteButton @onClick="removePosition(true, item.product.ID)"/>
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
								<div class="order-list-elem">{{ characteristic.CHARACTERISTIC }}</div>
								<div class="order-list-elem">{{ Number(characteristic.PRICE).toLocaleString() }} ₽</div>
								<div class="order-list-elem"> 
									<AmountInput 
										v-model="characteristic.count"
										:min = "characteristic.RESIDUE+1"
										@onInput="updOrder()"
									/>
								</div>
								<div class="order-list-elem">{{ Number(characteristic.PRICE * characteristic.count).toLocaleString() }} ₽</div>
								
								<div class="order-list-elem-delete">
									<DeleteButton  @onClick="removeCharacteristic(true, {product: item.product, characteristics: [characteristic]})" />
								</div>
							</div>
							
						</div>
					</div>
					
					
				</div>
			</div>
		</div>
		<div class="order-list-buttons">
			<button 
				class="order-list-submit gradient-btn" 
				@click="onClick()"
			> 
				<div class="gradient-btn-text">Оформить заказ</div>
			</button>
			
		</div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, PropType } from 'vue'
import { useStore } from 'vuex'

import AmountInput from '@/components/ui/AmountInput.vue'
import DeleteButton from '@/components/ui/DeleteButton.vue'
import SelectInput from '@/components/ui/SelectInput.vue'
import { key } from '@/store/index'
import { OrderMutations } from '@/store/order/mutations'
import { OrderActions } from '@/store/order/actions'
import { OrderStateOrder, OrderStatePosition } from '@/store/order/types'

export default defineComponent({
	props: {
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
	},
	emits: ['update:modelValue', 'onClick'],
	components: {
		AmountInput,
		DeleteButton,
		SelectInput,
	},
	setup(props, { emit }) {
		const store = useStore(key);
		const open = ref([]);
		const open_presail = ref([]);
		let error = ref(false);
		const selectCompany = computed( {
			get: () => props.modelValue,
			set: (v) => emit('update:modelValue', v)
		});

		let updOrder = () => {
			store.commit(OrderMutations.CALC_ORDER)
		}
		let removePosition = (presail: boolean, ID: number) => {
			if (presail)
				store.dispatch(OrderActions.REMOVE_POSITION_PRESAIL, ID)
			else
				store.dispatch(OrderActions.REMOVE_POSITION, ID)

		}
		let removeCharacteristic = (presail: boolean, CHAR: OrderStatePosition) => {
			if (presail)
				store.dispatch(OrderActions.REMOVE_CHARACTERISTIC_PRESAIL, CHAR)
			else
				store.dispatch(OrderActions.REMOVE_CHARACTERISTIC, CHAR)
		};
		let onClick = () => {
			if (props.modelValue == '') {
				error.value = true;
				setTimeout(() => {error.value=false;}, 5000);
			}
			emit('onClick');
		}
		return {
			updOrder,
			removePosition,
			removeCharacteristic,
			onClick,
			selectCompany,
			open,
			open_presail,
			error,
		}
	},
})
</script>

