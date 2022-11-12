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
				<div v-else class="order-draft-list">
					<div class="shipment-address-list-wrap" >
						
						<div 
							v-for="(item, key) in orderDraft"
							:key="key"
						>
							<div :class="'shipment-address-list-row' + ( item.id == active ? ' active': '' )"
								@click.stop="clickItem(item.id)"
							>
								<div class="shipment-address-list-elem">
									{{key+1}}
								</div>
								<div class="shipment-address-list-elem">
									<div class="input-textfield"
										v-if="editItem && item.id == active"
										@click.stop=""
										:style="'width: 100%'"
									>
										<input type="text" placeholder=" " v-model="item.name" >
                                    	<label>Имя</label>
									</div>
									<div v-else>{{item.name}}</div>
									<div v-if="item.id != active" class="date">{{new Date(item.id).toLocaleString('ru')}}</div>
								</div>

								<div class="shipment-address-list-elem actions"
									:class="{'active': editItem}"
									v-if="item.id == active && editItem==false"
									tooltip="Переименовать"
									flow="up"
								>
									<div
										@click.stop="editItem=!editItem; delItem=false; delAll=false; useDraft=false"
									>
										<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill="#8D8D8D">
										<path d="M0 0h24v24H0V0z" fill="none"/>
										<path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/>
										</svg>
									</div>
								</div>

								<div class="shipment-address-list-elem actions"
									:class="{'active': editItem}"
									v-if="item.id == active && editItem==true"
									tooltip="Сохранить"
									flow="up"
								>
									<div
										@click.stop="editItem=!editItem; delItem=false; delAll=false; useDraft=false; saveName(item.id, item.name)"
									>
										<svg width="24px" height="25px" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path class="save" d="M1 3.5C1 2.39543 1.89543 1.5 3 1.5H16C19.866 1.5 23 4.63401 23 8.5V21.5C23 22.6046 22.1046 23.5 21 23.5H3C1.89543 23.5 1 22.6046 1 21.5V3.5Z" stroke="#A5A7A9" stroke-width="2"/>
											<rect x="4" y="13.5" width="2" height="10" rx="1" fill="#A5A7A9"/>
											<rect x="18" y="13.5" width="2" height="10" rx="1" fill="#A5A7A9"/>
											<rect x="4" y="15.5" width="2" height="16" rx="1" transform="rotate(-90 4 15.5)" fill="#A5A7A9"/>
											<rect x="6" y="9.5" width="2" height="12" rx="1" transform="rotate(-90 6 9.5)" fill="#A5A7A9"/>
											<rect x="8" y="9.5" width="2" height="8" rx="1" transform="rotate(180 8 9.5)" fill="#A5A7A9"/>
											<rect x="18" y="9.5" width="2" height="8" rx="1" transform="rotate(180 18 9.5)" fill="#A5A7A9"/>
											<rect x="15" y="6.5" width="2" height="3" rx="1" transform="rotate(-180 15 6.5)" fill="#A5A7A9"/>
										</svg>
									</div>
								</div>
								<div class="shipment-address-list-elem actions"
									:class="{'active': delItem}"
									:style="'margin-right: 60px;'"
									tooltip="Удалить"
									flow="up"
									v-if="item.id  == active"
								>
									<div
										@click.stop="delItem=!delItem; editItem = false; delAll=false; useDraft=false"
									>
										<svg 
											height="30" viewBox="0 0 24 24" width="30px" fill="#8D8D8D" xmlns="http://www.w3.org/2000/svg" 
										>
											<path d="M0 0h24v24H0V0z" fill="none"/>
											<path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
										</svg>
									</div>
								</div>
		
								
							</div>
							
							<div class="shipment-address-list-row-info"
								v-if="delItem && item.id == active"
							>
								<div>Удалить черновик?</div>
								<div>
									<span @click="del(item.id)">Да</span>
									<span href="#" @click="delItem=false">Нет</span>
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
				<span @click.stop="del(-1)">Да</span>
				<span @click.stop="delAll=false">Нет</span>
			</div>
		</div>	
		<div v-if="useDraft" class="shipment-address-list-row-info" >
			<div>Использовать черновик для продолжения оформления заказа?</div>
			<div>
				<span @click.stop="draftToOrder(active)">Да</span>
				<span @click.stop="useDraft=false">Нет</span>
			</div>
		</div>	
		<div v-if="!delAll && !useDraft" class="order-modal-action">
			<button @click="active=-1; delAll=true" class="order-list-btn">Удалить все черновики</button>
			<button v-if="active!=-1" @click="useDraft=true" class="order-list-btn">Использовать черновик</button>
		</div>
	</div>
</div>
</template>


<script setup lang="ts">

import DeleteButton from '/src/components/ui/DeleteButton.vue'
import OrderDraftCard from '/src/components/cards/Order/OrderDraftCard.vue'

import { ref, computed } from 'vue'
import { useStore } from '/src/store'
import { onClickOutside } from '@vueuse/core'
import { useRouter } from 'vue-router'

import { OrderMutations } from '/src/store/order/mutations'

const props = defineProps({
		modelValue:{
			type: Boolean,
			required: true,
		}
	})
const emits = defineEmits(['update:modelValue'])
	
		const store = useStore()
		const router = useRouter();
		const delItem = ref(false)
		const editItem = ref(false)
		const delAll = ref(false)
		const useDraft = ref(false)
		const shake = ref(false)
		const targetModal = ref(null)
		const active = ref(-1)
		const orderDraft = computed(() => store.getters.getOrderDraft)
		onClickOutside(targetModal, () => {
			shake.value = true;
			setTimeout(() => {shake.value=false;}, 500);
		});
		const close = () => {
			store.commit(OrderMutations.CLEAN_ORDER_ERROR);
			store.commit(OrderMutations.CLEAN_ADD_ORDER);
			emits('update:modelValue', false);
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
			emits('update:modelValue', false)
			router.push({name: 'Order'});
		}
		const clickItem = ( id: number) => {
			if (id  === active.value)
				active.value = -1
			else
				active.value = id 
			delAll.value = false
			useDraft.value = false
			delItem.value = false
			editItem.value = false
		}

		const saveName = (id: number, name: string) => {
			store.commit(OrderMutations.UPD_ALL_DRAFT)
		}
		
</script>