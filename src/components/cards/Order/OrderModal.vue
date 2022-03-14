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
					</div>
				</div>
				<div v-else>
					{{errorMsg}}

				</div>
			</div>
			<div class="order-modal-action" >
				<Button v-if="error" :name="'Сохранить заказ'" @onClick="close()"/>
				<Button v-if="error" :name="'Новый заказ'" @onClick="delOrder()"/>
				<Button v-if="isAddNewOrder" :name="'Список заказов'" @onClick="toOrders()"/>
				<Button v-if="isAddNewOrder" :name="'Новый заказ'" @onClick="delOrder()"/>
				
			</div>
			<div class="order-list-buttons-wrap" v-if="isAddNewOrder">
				<div class="order-list-buttons-item later">
					<router-link
						tag="a"
						to="/shipments/request"
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
						</router-link>
				</div>
				<!-- <div class="order-list-buttons-item mail">
					<svg class="order-list-buttons-item-img" width="41" height="20" viewBox="0 0 41 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M37.4649 2H18.5787L26.6432 9.10183L37.4649 2ZM16.7388 3.03554L14.7128 15.9112C14.6173 16.518 15.0864 17.0667 15.7007 17.0667H35.6268C36.1191 17.0667 36.5382 16.7084 36.6147 16.2221L38.5935 3.64601L27.2621 11.0824C27.2165 11.1123 27.1693 11.138 27.1209 11.1596C26.7546 11.4186 26.2422 11.4065 25.8863 11.0931L16.7789 3.07285C16.7651 3.06071 16.7517 3.04827 16.7388 3.03554ZM14.7931 2.53369C15.0227 1.07482 16.2798 0 17.7567 0H37.6829C39.5257 0 40.9328 1.6459 40.6464 3.46631L38.5904 16.533C38.3608 17.9918 37.1037 19.0667 35.6268 19.0667H15.7007C13.8579 19.0667 12.4507 17.4208 12.7371 15.6004L14.7931 2.53369Z" fill="#A5A7A9"></path>
					<rect x="3.7" y="4" width="8" height="2" rx="1" fill="#A5A7A9"></rect>
					<rect y="8" width="11" height="2" rx="1" fill="#A5A7A9"></rect>
					<rect x="5.30003" y="12" width="5" height="2" rx="1" fill="#A5A7A9"></rect>
					</svg>
				</div>
				<div class="order-list-buttons-item print">
					<svg class="order-list-buttons-item-img" width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M21 7H3C2.44772 7 2 7.44772 2 8V17C2 17.5523 2.44772 18 3 18H21C21.5523 18 22 17.5523 22 17V8C22 7.44772 21.5523 7 21 7ZM3 5C1.34315 5 0 6.34315 0 8V17C0 18.6569 1.34315 20 3 20H21C22.6569 20 24 18.6569 24 17V8C24 6.34315 22.6569 5 21 5H3Z" fill="#A5A7A9"></path>
					<rect class="notfill" x="4" y="13" width="16" height="7" fill="#1F2227"></rect>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M17 2H7C6.44772 2 6 2.44772 6 3V5C6 5.55228 6.44772 6 7 6H17C17.5523 6 18 5.55228 18 5V3C18 2.44772 17.5523 2 17 2ZM7 0C5.34315 0 4 1.34315 4 3V5C4 6.65685 5.34315 8 7 8H17C18.6569 8 20 6.65685 20 5V3C20 1.34315 18.6569 0 17 0H7Z" fill="#A5A7A9"></path>
					<rect class="notfill" x="3" y="7" width="18" height="7" fill="#1F2227"></rect>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M17 15H7C6.44772 15 6 15.4477 6 16V24C6 24.5523 6.44772 25 7 25H17C17.5523 25 18 24.5523 18 24V16C18 15.4477 17.5523 15 17 15ZM7 13C5.34315 13 4 14.3431 4 16V24C4 25.6569 5.34315 27 7 27H17C18.6569 27 20 25.6569 20 24V16C20 14.3431 18.6569 13 17 13H7Z" fill="#A5A7A9"></path>
					<rect x="16" y="17" width="2" height="8" rx="1" transform="rotate(90 16 17)" fill="#A5A7A9"></rect>
					<rect x="16" y="21" width="2" height="8" rx="1" transform="rotate(90 16 21)" fill="#A5A7A9"></rect>
					<rect x="20" y="9" width="2" height="3" rx="1" transform="rotate(90 20 9)" fill="#A5A7A9"></rect>
					</svg>
				</div>
				<div class="order-list-buttons-item save">
					<svg class="order-list-buttons-item-img" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path class="stroke" d="M1 3.5C1 2.39543 1.89543 1.5 3 1.5H16C19.866 1.5 23 4.63401 23 8.5V21.5C23 22.6046 22.1046 23.5 21 23.5H3C1.89543 23.5 1 22.6046 1 21.5V3.5Z" stroke="#A5A7A9" stroke-width="2"></path>
					<rect x="4" y="13.5" width="2" height="10" rx="1" fill="#A5A7A9"></rect>
					<rect x="18" y="13.5" width="2" height="10" rx="1" fill="#A5A7A9"></rect>
					<rect x="4" y="15.5" width="2" height="16" rx="1" transform="rotate(-90 4 15.5)" fill="#A5A7A9"></rect>
					<rect x="6" y="9.5" width="2" height="12" rx="1" transform="rotate(-90 6 9.5)" fill="#A5A7A9"></rect>
					<rect x="8" y="9.5" width="2" height="8" rx="1" transform="rotate(180 8 9.5)" fill="#A5A7A9"></rect>
					<rect x="18" y="9.5" width="2" height="8" rx="1" transform="rotate(180 18 9.5)" fill="#A5A7A9"></rect>
					<rect x="15" y="6.5" width="2" height="3" rx="1" transform="rotate(-180 15 6.5)" fill="#A5A7A9"></rect>
					</svg>
				</div> -->
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
			newOrder: computed(() => store.getters.getOrderAddNew),
		}
	}
})
</script>