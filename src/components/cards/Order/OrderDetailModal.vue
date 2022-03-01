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
				Детали заказа <br>
				{{order}}
			</div>

		</div>
		

	</div>
</div>
</template>

<script lang="ts">

import DeleteButton from '@/components/ui/DeleteButton.vue'
//import OrderDraftCard from '@/components/cards/Order/OrderDraftCard.vue'

import { ref, computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { onClickOutside } from '@vueuse/core'

import { key } from '@/store'


export default defineComponent({
	name: 'OrderDetailModal',
	components:{
		DeleteButton,
		//OrderDraftCard,
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
		
		onClickOutside(targetModal, () => {
			shake.value = true;
			setTimeout(() => {shake.value=false;}, 500);
		});
		const close = () => {
			
			emit('update:modelValue', false);
		};
		
		
		return {
			//data

			shake,
			targetModal,

			//computed
			order: computed(() => store.getters.getOrdersByID(props.orderId)),
			//methods
			close,
		
		}
	}
})
</script>