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
		

	</div>
</div>
</template>

<script lang="ts">

import DeleteButton from '@/components/ui/DeleteButton.vue'
import PreloaderLocal from '@/components/PreloaderLocal.vue'
import OrderDraftCard from '@/components/cards/Order/OrderDraftCard.vue'

import { ref, computed, defineComponent, watch } from 'vue'
import { useStore } from 'vuex'
import { onClickOutside } from '@vueuse/core'

import { key } from '@/store'
import { OrderActions } from '@/store/order/actions'


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
	},
	emits: ['update:modelValue'],
	setup(props, { emit }){
		const store = useStore(key)
		const shake = ref(false)
		const targetModal = ref(null)
		const loading = ref(false)
		
		onClickOutside(targetModal, () => {
			shake.value = true;
			setTimeout(() => {shake.value=false;}, 500);
		});
		const close = () => {
			emit('update:modelValue', false);
		};
		watch( ()=>props.orderId, ()=>{
			if (props.orderId!=-1){
				loading.value=true
				store.dispatch(OrderActions.GET_ORDER_DETAIL, props.orderId ).finally(()=>{loading.value = false})
			}
		})
		
		
		return {
			//data
			shake,
			targetModal,
			loading,

			//computed
			order_detail: computed(() => store.getters.getOrderDetail),
			order: computed(() => store.getters.getOrdersByID(props.orderId)),

			//methods
			close,
		
		}
	}
})
</script>