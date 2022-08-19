<template>
<div
	class="order-modal" 
	v-if="modelValue"
>
	<div 
		:class="'order-modal-dialog draft' + (shake? ' shake' : '')"
		ref="targetModal" 
	>
		<div class="order-modal-content draft" >
			
			<div class="order-modal-header">
				<h3 class="order-modal-header-title">Детали заказа </h3>
					<DeleteButton @onClick="close()"/>
			</div>
			<div class="order-modal-body draft">
				{{order.name}} 
				<br>
				<br>
				<div v-if="loading" style="display: flex; justify-content: center">
					<PreloaderLocal ></PreloaderLocal>
				</div>
				<OrderDraftCard v-else :data="order_detail"></OrderDraftCard>
			</div>
		</div>
		<div v-if="!loading && order_detail.id !=0 ">
			<div v-if="repeatOrder" class="shipment-address-list-row-info" >
				<div>Использовать позиции заказа для оформления нового заказа?</div>
				<div>
					<a href="#" @click="setOrder()">Да</a>
					<a href="#" @click="$emit('update:repeatOrder', false)">Нет</a>
				</div>
			</div>	
			<div v-if="editOrder" class="shipment-address-list-row-info" >
				<div>Изменить позиции заказа?</div>
				<div>
					<a href="#" @click="setOrderToEdit()">Да</a>
					<a href="#" @click="$emit('update:editOrder', false)">Нет</a>
				</div>
			</div>	
			<div class="order-modal-action" v-if="!repeatOrder && !editOrder">
				<button @click="$emit('update:repeatOrder', true)" class="order-list-btn">Повторить заказ</button>
				<button @click="$emit('update:editOrder', true)"   class="order-list-btn">Изменить заказ</button>
			</div>
		</div>
	</div>
</div>
</template>

<script lang="ts">

import DeleteButton from '/src/components/ui/DeleteButton.vue'
import PreloaderLocal from '/src/components/PreloaderLocal.vue'
import OrderDraftCard from '/src/components/cards/Order/OrderDraftCard.vue'

import { ref, computed, defineComponent, watch } from 'vue'
import { useStore } from 'vuex'
import { onClickOutside } from '@vueuse/core'

import { key } from '/src/store'
import { OrderActions } from '/src/store/order/actions'
import { useRouter } from 'vue-router'
import { OrderMutations } from '/src/store/order/mutations'


export default defineComponent({
	name: 'OrderDetailModal',
	components:{
		DeleteButton,
		PreloaderLocal,
		OrderDraftCard,
	},
	props:{
		modelValue:{
			type: Boolean
		},
		orderId: {
			type: Number,
			default: -1
		},
		repeatOrder: {
			type: Boolean,
			default: false
		},
		editOrder: {
			type: Boolean,
			default: false
		}
	},
	emits: ['update:modelValue', 'update:repeatOrder', 'update:editOrder'],
	setup(props, { emit }){
		const store = useStore(key)
		const router = useRouter()
		const shake = ref(false)
		const targetModal = ref(null)
		const loading = ref(false)
		const useRepeat = ref(false)
		
		onClickOutside(targetModal, () => {
			shake.value = true
			setTimeout(() => {shake.value=false;}, 500)
		});
		const close = () => {
			emit('update:repeatOrder', false)
			emit('update:editOrder', false)
			emit('update:modelValue', false)
		};
		watch( ()=>props.orderId, ()=>{
			if (props.orderId!=-1){
				loading.value=true
				store.dispatch(OrderActions.GET_ORDER_DETAIL, props.orderId ).finally(()=>{loading.value = false})
			}
		})
		const order = computed(() => store.getters.getOrdersByID(props.orderId))
		
		const  setOrder = async () => {
			await store.commit(OrderMutations.CREATE_ORDER_FROM_DETAIL)
			router.push({name: 'Order'})
		}
		const setOrderToEdit = async () => {
			await store.commit(OrderMutations.EDIT_ORDER, order.value)
			await store.commit(OrderMutations.CALC_ORDER)
			
			router.push({name: 'Order'})
		}
		
		return {
			//data
			shake,
			targetModal,
			loading,
			useRepeat,

			//computed
			order_detail: computed(() => store.getters.getOrderDetail),
			order,

			//methods
			close,
			setOrder,
			setOrderToEdit,
		}
	}
})
</script>