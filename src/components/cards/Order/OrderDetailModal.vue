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

				<div v-if="loading" style="display: flex; justify-content: center">
					<PreloaderLocal ></PreloaderLocal>
				</div>
				<OrderDraftCard v-else :order="order_detail"></OrderDraftCard>
			</div>
		</div>
		<div v-if="!loading && order_detail.id !=0 ">
			<div v-if="repeatOrder" class="shipment-address-list-row-info" >
				<div>Использовать позиции заказа для оформления нового заказа?</div>
				<div>
					<span @click.stop="setOrder()">Да</span>
					<span @click.stop="$emit('update:repeatOrder', false)">Нет</span>
				</div>
			</div>	
			<div v-if="editOrder" class="shipment-address-list-row-info" >
				<div>Изменить позиции заказа?</div>
				<div>
					<span @click.stop="setOrderToEdit()">Да</span>
					<span @click.stop="$emit('update:editOrder', false)">Нет</span>
				</div>
			</div>	
			<div class="order-modal-action" v-if="!repeatOrder && !editOrder">
			
				<button @click.stop="$emit('update:repeatOrder', true)" class="order-list-btn">Повторить заказ</button>
				<button v-if="order.reserved" @click.stop="$emit('update:editOrder', true)"   class="order-list-btn">Изменить заказ</button>
			</div>
		</div>
	</div>
</div>
</template>

<script setup lang="ts">

import DeleteButton from '/src/components/ui/DeleteButton.vue'
import PreloaderLocal from '/src/components/PreloaderLocal.vue'
import OrderDraftCard from '/src/components/cards/Order/OrderDraftCard.vue'

import { ref, computed, watch } from 'vue'
import { useStore } from '/src/store'
import { onClickOutside } from '@vueuse/core'


import { OrderActions } from '/src/store/order/actions'
import { useRouter } from 'vue-router'
import { OrderMutations } from '/src/store/order/mutations'


	const props = defineProps({
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
	})
	const emits = defineEmits(['update:modelValue', 'update:repeatOrder', 'update:editOrder'])
	const store = useStore()
	const router = useRouter()
	const shake = ref(false)
	const targetModal = ref(null)
	const loading = ref(false)
	
	const order_detail = computed(() => store.getters.getOrderDetail)

	onClickOutside(targetModal, () => {
		shake.value = true
		setTimeout(() => {shake.value=false;}, 500)
	})

	const close = () => {
		emits('update:repeatOrder', false)
		emits('update:editOrder', false)
		emits('update:modelValue', false)
	}

	watch( ()=>props.orderId, ()=>{
		if (props.orderId!=-1){
			loading.value=true
			store.dispatch(OrderActions.GET_ORDER_DETAIL, props.orderId ).finally(()=>{loading.value = false})
		}
	})
	const order = computed(() => store.getters.getOrdersByID(props.orderId))
	
	const setOrder = async () => {
		await store.commit(OrderMutations.CREATE_ORDER_FROM_DETAIL)
		await store.commit(OrderMutations.CALC_ORDER)
		await router.push({name: 'Order'})
	}
	const setOrderToEdit = async () => {
		await store.commit(OrderMutations.EDIT_ORDER, order.value)
		await store.commit(OrderMutations.CALC_ORDER)
		
		router.push({name: 'Order'})
	}
		

</script>