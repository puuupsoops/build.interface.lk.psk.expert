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
				<h3 class="order-modal-header-title">Черновики</h3>
					<DeleteButton @onClick="close()"/>
			</div>
			<div class="order-modal-body draft">
				<div v-if="orderDraft.length ==0" >		
						Черновики отсутсвуют
				</div>
				<div v-else class="shipment-address-list">
					<div class="shipment-address-list-wrap" >
						
						<div 
							v-for="(item, key) in orderDraft"
							:key="key"
							
						>
							<div :class="'shipment-address-list-row' + ( item.id == active ? ' active': '' )"
								@click="item.id  === active ? active = -1 : active = item.id ; delAll=false; useDraft=false"
							>
								<div class="shipment-address-list-elem">
									{{key+1}}
								</div>
								<div class="shipment-address-list-elem">
									Создан {{new Date(item.id).toLocaleString('ru')}}
								</div>

								<div :class="'shipment-address-list-elem actions' + (delItem? ' active':'')"
									v-if="item.id  == active"
								>
								<div
									@click.stop="delItem=!delItem;delAll=false; useDraft=false"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill="#8D8D8D">
										<path d="M0 0h24v24H0V0z" fill="none"/>
										<path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
									</svg>
								</div>
								</div>
								
							</div>

							<div
								v-if="delItem && item.id == active"
								class="shipment-address-list-row-info"
							>
								<div>Удалить черновик?</div>
								<div>
									<a href="#" @click="del(item.id)">Да</a>
									<a href="#" @click="delItem=false">Нет</a>
								</div>
							
							</div>
							
							<div :class="'orders-list-info draft'   + (!delItem && item.id  == active ? ' active': '' )"  >
								<div class="orders-list-info-row draft">
									<OrderDraftCard 
										:data="item"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
					
			</div>
			
					
				
		</div>
		

		<div v-if="delAll" class="shipment-address-list-row-info" >
			<div>Удалить все черновики?</div>
			<div>
				<a href="#" @click="del(-1)">Да</a>
				<a href="#" @click="delAll=false">Нет</a>
			</div>
		</div>	
		<div v-if="useDraft" class="shipment-address-list-row-info" >
			<div>Использовать черновик для продолжения оформления заказа?</div>
			<div>
				<a href="#" @click="draftToOrder(active)">Да</a>
				<a href="#" @click="useDraft=false">Нет</a>
			</div>
		</div>	
		<div v-if="!delAll && !useDraft" class="order-modal-action">
			<button @click="active=-1; delAll=true" class="order-list-btn">Удалить все черновики</button>
			<button v-if="active!=-1" @click="useDraft=true" class="order-list-btn">Использовать черновик</button>
		</div>
	</div>
</div>
</template>

<script lang="ts">

import DeleteButton from '@/components/ui/DeleteButton.vue'
import OrderDraftCard from '@/components/cards/Order/OrderDraftCard.vue'

import { ref, computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { onClickOutside } from '@vueuse/core'

import { key } from '@/store'
import { OrderMutations } from '@/store/order/mutations'

export default defineComponent({
	name: 'OrderDraftModal',
	components:{
		DeleteButton,
		OrderDraftCard,
	},
	props:{
		modelValue:{
			type: Boolean
		}
	},
	emits: ['update:modelValue'],
	setup(props, { emit }){
		const store = useStore(key)
		const delItem = ref(false)
		const delAll = ref(false)
		const useDraft = ref(false)
		const shake = ref(false)
		const targetModal = ref(null)
		const active = ref(-1)

		onClickOutside(targetModal, () => {
			shake.value = true;
			setTimeout(() => {shake.value=false;}, 500);
		});
		const close = () => {
			store.commit(OrderMutations.CLEAN_ORDER_ERROR);
			store.commit(OrderMutations.CLEAN_ADD_ORDER);
			emit('update:modelValue', false);
		};
		const del = (id: number) =>{
			if (id!=-1){
				store.commit(OrderMutations.DEL_ORDER_FROM_DRAFT, id)
				delItem.value = false
				active.value = -1
			}else{
				store.commit(OrderMutations.DEL_ALL_DRAFT)
				delAll.value=false
			}
		}
		const draftToOrder = (id: number) => {
			store.commit(OrderMutations.USE_DRAFT, id)
			delAll.value=false
			useDraft.value=false
			delItem.value = false
			active.value = -1
			emit('update:modelValue', false)
		}
		
		
		
		return {
			//data

			shake,
			targetModal,
			active,
			delItem,
			delAll,
			useDraft,
			//computed
			orderDraft: computed(() => store.getters.getOrderDraft),
			//methods
			close,
			del,
			draftToOrder,			
		}
	}
})
</script>