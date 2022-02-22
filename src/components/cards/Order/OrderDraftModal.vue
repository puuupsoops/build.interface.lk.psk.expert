<template>
<div
	class="order-modal" 
	v-if="modelValue"
>
	<div 
		:class="'order-modal-dialog draft' + (shake? ' shake' : '')"
		ref="target_modal" 
	>
		<div class="order-modal-content draft" >
			
			<div class="order-modal-header">
				<h3 class="order-modal-header-title">Черновики</h3>
					<DeleteButton @onClick="close()"/>
			</div>
			<div class="order-modal-body">
				<div v-for="(item, key) in orderDraft"
					:key="key"
				>
					<OrderCard 
						:data="item"
					/>
				</div>
				
			</div>

		</div>
	</div>
</div>
</template>

<script lang="ts">

import DeleteButton from '@/components/ui/DeleteButton.vue'
import OrderCard from '@/components/cards/Order/OrderCard.vue'

import { ref, computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { onClickOutside } from '@vueuse/core'

import { key } from '@/store'
import { OrderMutations } from '@/store/order/mutations'

export default defineComponent({
	name: 'OrderDraftModal',
	components:{
		DeleteButton,
		OrderCard,
	},
	props:{
		modelValue:{
			type: Boolean
		}
	},
	emits: ['update:modelValue'],
	setup(props, { emit }){
		const store = useStore(key);
		
		const shake = ref(false);
		const target_modal = ref(null);
		onClickOutside(target_modal, () => {
			shake.value = true;
			setTimeout(() => {shake.value=false;}, 500);
		});
		const close = () => {
			store.commit(OrderMutations.CLEAN_ORDER_ERROR);
			store.commit(OrderMutations.CLEAN_ADD_ORDER);
			emit('update:modelValue', false);
		};
		
		
		
		return {
			//data

			shake,
			target_modal,
			//computed
			orderDraft: computed(() => store.getters.getOrderDraft),
			//methods
			close,
			
		}
	}
})
</script>