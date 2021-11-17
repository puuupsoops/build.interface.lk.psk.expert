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
					{{errorMsg}}

				</div>
			</div>
			<div class="order-modal-action" >
				<Button v-if="error" :name="'Сохранить заказ'" @onClick="close()"/>
				<Button v-if="error" :name="'Новый заказ'" @onClick="delOrder()"/>
			</div>
		</div>
	</div>
</div>
</template>

<script>

import Button from '@/components/ui/Button';
import DeleteButton from '@/components/ui/DeleteButton';

import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { onClickOutside } from '@vueuse/core';

export default {
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
		const store = useStore();
		const shake = ref(false);
		const target_modal = ref(null);
		onClickOutside(target_modal, () => {
			shake.value = true;
			setTimeout(() => {shake.value=false;}, 500);
		});
		const close = () => {
			store.commit('cleanOrderError');
			emit('update:modelValue', false);
		}
		const delOrder = () => {
			store.commit('cleanOrder');
			emit('update:modelValue', false);
		}
		return {
			close,
			delOrder,
			shake,
			target_modal,
			error: computed(() => store.getters.getOrderError),
			errorMsg: computed(() => store.getters.getOrderErrorMsg),
		}
	}
}
</script>