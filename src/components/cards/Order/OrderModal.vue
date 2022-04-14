<template>
<div
	class="order-modal" 
	v-if="modelValue"
>
	<div 
		:class="shake ? 'order-modal-dialog shake' : 'order-modal-dialog'"
	ref="target_modal" >
		<div class="order-modal-content" >
			
			<div class="order-modal-header">
				<h3 class="order-modal-header-title">Создание заказа</h3>
			
					<DeleteButton @onClick="close()"/>
				
			</div>
			<div class="order-modal-body">
			
				<div v-if="!error">
					<div v-if="!isAddNewOrder">
						<span class="loading">Ваш заказ регистрируется!
						<br> Подождите минутку<span>.</span><span>.</span><span>.</span></span>

						<svg  width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect class="fill" x="0.0802612" y="2.04846" width="4.25606" height="2.07613" rx="1.03806" fill="#A5A7A9"></rect>
							<rect class="fill" x="3.9931" y="2" width="17.8806" height="2.07613" rx="1.03806" transform="rotate(69.6255 3.9931 2)" fill="#A5A7A9"></rect>
							<rect class="fill" x="8.38477" y="6.20068" width="16.609" height="2.07613" rx="1.03806" fill="#A5A7A9"></rect>
							<rect class="fill" x="21.0491" y="19.1241" width="13.0871" height="2.07613" rx="1.03806" transform="rotate(-80.9286 21.0491 19.1241)" fill="#A5A7A9"></rect>
							<rect class="fill" x="7.34668" y="17.6194" width="15.8824" height="2.07613" rx="1.03806" fill="#A5A7A9"></rect>
							<rect class="fill" x="6.30865" y="21.7716" width="9.34257" height="2.07613" rx="1.03806" fill="#A5A7A9"></rect>
							<path class="stroke" d="M8.38477 18.6575C6.82768 18.6575 5.78961 18.9374 5.78961 20.7336C5.78961 22.8097 7.34671 22.8097 7.86574 22.8097" stroke="#A5A7A9" stroke-width="2"></path>
							<circle class="stroke" cx="9.42285" cy="24.8858" r="2.11419" stroke="#A5A7A9" stroke-width="2"></circle>
							<circle class="stroke" cx="20.8415" cy="24.8858" r="2.11419" stroke="#A5A7A9" stroke-width="2"></circle>
							<animateTransform 
								attributeName="transform" 
								dur="1s" 
								type="translate" 
								values="0 0; 1 -1; 1 1; 0 0;"

								repeatCount="indefinite" 
								begin="0.1"/>
						</svg>
					</div>
					<div v-else>
						{{newOrder.message}} 
						<!-- Заказ: №12345678912345 зарегистрирован -->
					</div>
				</div>
				<div v-else>
					{{errorMsg}}

				</div>
			</div>
			<div class="order-modal-action" >
				<Button v-if="error" :name="'Сохранить заказ'" @onClick="close()"/>
				<Button v-if="error" :name="'Новый заказ'" @onClick="delOrder()"/>
				<button 
					class="order-modal-action-btn" 
					v-if="isAddNewOrder"
					@click="toOrders()"
				> 
						<svg class="order-list-buttons-item-img" width="31" height="29" viewBox="0 0 31 29" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect class="stroke" x="1" y="1" width="19.75" height="22.8571" rx="2" stroke="#A5A7A9"  stroke-width="2"></rect>
							<circle cx="21.2322" cy="20.1964" r="8.80357" fill="#53565B"></circle>
							<circle class="stroke" cx="21.2322" cy="20.1964" r="7.80357" stroke="#A5A7A9" stroke-width="2"></circle>
							<rect class="fill" x="19.6786" y="15.5358" width="1.7" height="6.21429" rx="0.85" fill="#A5A7A9"></rect>
							<rect class="fill" x="24.8571" y="20.1" width="1.7" height="5.17857" rx="0.85" transform="rotate(90 24.8571 20.1)" fill="#A5A7A9"></rect>
							<rect class="fill" x="17.6071" y="5.17859" width="1.7" height="13.4643" rx="0.85" transform="rotate(90 17.6071 5.17859)" fill="#A5A7A9"></rect>
							<rect class="fill" x="11.3929" y="13" width="1.7" height="7.25" rx="0.85" transform="rotate(90 11.3929 13)" fill="#A5A7A9"></rect>
							<rect class="fill" x="14.5" y="9" width="1.7" height="10.3571" rx="0.85" transform="rotate(90 14.5 9)" fill="#A5A7A9"></rect>
						</svg>
						<div class="order-modal-action-btn-text" >Список заказов</div>
				</button>	
				
				<button 
					class="order-modal-action-btn" 
					v-if="isAddNewOrder"
					@click="delOrder()"
				> 
					<svg class="order-list-buttons-item-img" width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect class="fill" x="0.0802612" y="2.04846" width="4.25606" height="2.07613" rx="1.03806" fill="#A5A7A9"></rect>
						<rect class="fill" x="3.9931" y="2" width="17.8806" height="2.07613" rx="1.03806" transform="rotate(69.6255 3.9931 2)" fill="#A5A7A9"></rect>
						<rect class="fill" x="8.38477" y="6.20068" width="16.609" height="2.07613" rx="1.03806" fill="#A5A7A9"></rect>
						<rect class="fill" x="24" y="3" width="8" height="2" rx="1" fill="#A5A7A9"></rect>
						<rect class="fill" x="29" width="8" height="2" rx="1" transform="rotate(90 29 0)" fill="#A5A7A9"></rect>
						<rect class="fill" x="21.0491" y="19.1241" width="13.0871" height="2.07613" rx="1.03806" transform="rotate(-80.9286 21.0491 19.1241)" fill="#A5A7A9"></rect>
						<rect class="fill" x="7.34668" y="17.6194" width="15.8824" height="2.07613" rx="1.03806" fill="#A5A7A9"></rect>
						<rect class="fill" x="6.30865" y="21.7716" width="9.34257" height="2.07613" rx="1.03806" fill="#A5A7A9"></rect>
						<path class="stroke" d="M8.38477 18.6575C6.82768 18.6575 5.78961 18.9374 5.78961 20.7336C5.78961 22.8097 7.34671 22.8097 7.86574 22.8097" stroke="#A5A7A9" stroke-width="2"></path>
						<circle class="stroke" cx="9.42285" cy="24.8858" r="2.11419" stroke="#A5A7A9" stroke-width="2"></circle>
						<circle class="stroke" cx="20.8415" cy="24.8858" r="2.11419" stroke="#A5A7A9" stroke-width="2"></circle>
					</svg>
						<div class="order-modal-action-btn-text" >Новый заказ</div>
				</button>	
				
			</div>
			<div class="order-list-buttons-wrap" v-if="isAddNewOrder">

					<router-link
						tag="div"
						to="/shipments/request"
						class="order-modal-action-btn"
						title="Заявка на транспорт"
					>
						<svg class="order-list-buttons-item-img" width="32" height="21" viewBox="0 0 32 21" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect class="fill" x="2.06573" y="4.13147" width="10.3286" height="2.06571" rx="1.03286" fill="#A5A7A9"></rect>
							<rect class="fill" y="7.74646" width="10.3286" height="2.06571" rx="1.03286" fill="#A5A7A9"></rect>
							<rect class="fill" x="2.06573" y="11.3615" width="7.23" height="2.06571" rx="1.03286" fill="#A5A7A9"></rect>
							<rect class="fill" x="3.09857" width="18.5914" height="2.06571" rx="1.03286" fill="#A5A7A9"></rect>
							<rect class="fill" x="27.3458" y="10.0944" width="8.32268" height="2.14434" rx="1.07217" transform="rotate(-116.966 27.3458 10.0944)" fill="#A5A7A9"></rect>
							<rect class="fill" x="29.761" y="12.6008" width="6.17839" height="2.14434" rx="1.07217" transform="rotate(-128.694 29.761 12.6008)" fill="#A5A7A9"></rect>
							<rect class="fill" x="19.6243" y="8.26282" width="9.29572" height="2.06571" rx="1.03286" fill="#A5A7A9"></rect>
							<rect class="fill" x="21.69" width="10.3286" height="2.06571" rx="1.03286" transform="rotate(90 21.69 0)" fill="#A5A7A9"></rect>
							<rect class="fill" x="25.8214" y="4.13147" width="5.16429" height="2.06571" rx="1.03286" transform="rotate(-180 25.8214 4.13147)" fill="#A5A7A9"></rect>
							<rect class="fill" x="30.9857" y="18.5914" width="5.16429" height="2.06571" rx="1.03286" transform="rotate(-180 30.9857 18.5914)" fill="#A5A7A9"></rect>
							<rect class="fill" x="28.92" y="18.5914" width="8.26286" height="2.06571" rx="1.03286" transform="rotate(-90 28.92 18.5914)" fill="#A5A7A9"></rect>
							<rect class="fill" x="12.3943" y="16.5258" width="9.64955" height="2.14434" rx="1.07217" fill="#A5A7A9"></rect>
							<rect class="fill" x="4.13141" y="16.5258" width="5.16429" height="2.06571" rx="1.03286" fill="#A5A7A9"></rect>
							<circle class="stroke" cx="10.6824" cy="17.4406" r="2.21652" stroke="#A5A7A9" stroke-width="2"></circle>
							<circle class="stroke" cx="23.8737" cy="17.4406" r="2.21652" stroke="#A5A7A9" stroke-width="2"></circle>
						</svg>
						<div class="order-modal-action-btn-text" >Способ получения товара</div>
					</router-link>
					
				
				
			</div>
		</div>
	</div>
</div>
</template>

<script lang="ts">

import Button from '@/components/ui/Button.vue'
import DeleteButton from '@/components/ui/DeleteButton.vue'

import { ref, computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { onClickOutside } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { key } from '@/store'
import { OrderMutations } from '@/store/order/mutations'

export default defineComponent({
	components:{
		Button,
		DeleteButton,
	},
	props:{
		modelValue:{
			type: Boolean
		}
	},
	emits: ['update:modelValue'],
	setup(props, { emit }){
		const store = useStore(key);
		const router = useRouter();
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
		const delOrder = () => {
			store.commit(OrderMutations.CLEAN_ORDER);
			store.commit(OrderMutations.CLEAN_ORDER_ERROR);
			store.commit(OrderMutations.CLEAN_ADD_ORDER);
			emit('update:modelValue', false);
		}
		const toOrders = () => {
			store.commit(OrderMutations.CLEAN_ORDER);
			store.commit(OrderMutations.CLEAN_ADD_ORDER);
			emit('update:modelValue', false);
			router.push({name: 'Orders'});
		};
		
		return {
			close,
			delOrder,
			toOrders,
			shake,
			target_modal,
			error: computed(() => store.getters.getOrderError),
			errorMsg: computed(() => store.getters.getOrderErrorMsg),
			isAddNewOrder: computed(() => store.getters.isOrderAddNew),
			// isAddNewOrder: true,
			newOrder: computed(() => store.getters.getOrderAddNew),
		}
	}
})
</script>