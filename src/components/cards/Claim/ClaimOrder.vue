<template>

	<div class="order-list content-elem">
		
			<div class="order-list-bottom scroll-elem" v-if="data">
				
				<div class="order-list-bottom-wrap" > 
					
					<div class="order-list-row order-list-heading" v-if="data.position.length>0">
						<div class="order-list-elem">№</div>
						<div class="order-list-elem">Наименование</div>
						<div class="order-list-elem">Цена</div>
						<div class="order-list-elem">Кол-во</div>
						<div class="order-list-elem">Стоимость</div>
						<div class="order-list-elem">Выбрано</div>
						
					</div>
					<div 
						:class="open.indexOf(key) !== -1 ? 'order-list-item active' : 'order-list-item'"
						v-for="(item, key) in data.position"
						:key="key"
					>
						<div 
							class="order-list-row order-list-main-row"
							@click="open.indexOf(key) === -1 ? open.push(key) : open.splice(open.indexOf(key),1)"
						>
							<div class="order-list-elem">
								{{key+1}} 
								
							</div>

						<div class="order-list-elem"> <span v-html = "item.product.NAME"></span></div>		
						<div class="order-list-elem">{{ Number(item.product.PRICE).toLocaleString() }} ₽</div>
						<div class="order-list-elem">{{ item.count }}</div>
						<div class="order-list-elem">{{ Number(item.total).toLocaleString() }} ₽</div>

						<div class="order-list-elem">
							{{selectedVal.filter(x => x.productUID==item.product.UID).length}}
						</div>
						</div>
						<div
							:class="open.indexOf(key) !== -1 ? 'order-list-sublist active' : 'order-list-sublist'"
						>
							<div
								v-for="(characteristic, k) in item.characteristics"
								:key="k"
								class="order-list-row"
							> 
								<div class="order-list-elem"> 
									
									<CheckButton 
										v-if="selectedVal.findIndex(x => x.productUID==item.product.UID && x.characteristicGUID==characteristic.GUID)==-1"
										@onClick="add(item.product.UID, characteristic.GUID)"
										f
									></CheckButton> 
								
									<CheckButton
										v-else
										@onClick="del(item.product.UID, characteristic.GUID)" 
										t
									></CheckButton> 
								
								</div>
								<div class="order-list-elem">{{ characteristic.CHARACTERISTIC }}</div>
								<div class="order-list-elem">{{ Number(characteristic.PRICE).toLocaleString() }} ₽</div>
								<div class="order-list-elem"> 
									<span>{{characteristic.count}}</span>
								</div>
								<div class="order-list-elem">{{ Number(characteristic.PRICE * characteristic.count).toLocaleString() }} ₽</div>
								
								<div class="order-list-elem-delete">
									
								</div>
							</div>
							
						</div>
					</div>
					
					
				</div>
				
			</div>
		</div>
		

</template>

<script lang="ts">
import CheckButton from '@/components/ui/CheckButton.vue'
import { ref, defineComponent, PropType } from 'vue'

import { OrderStateOrder } from '@/store/order/types'
import { ProductCharacteristic } from '@/models/Product';



export default defineComponent({
	props: {
		data: {
			type: Object as PropType<OrderStateOrder>,
			required: true
		},
		modelValue: {
			type: Array as PropType<ProductCharacteristic[]>,
			required: true
		
		}
	},
	emits:['update:modelValue'],
	components:{
		CheckButton
	},
	setup(props, {emit}) {
		const open = ref([]);
		const open_presail = ref({});
		const selectedVal = ref<ProductCharacteristic[]>([])
		
		const add = (productUID: string, characteristicGUID: string) =>{
			selectedVal.value.push({productUID, characteristicGUID})
			emit('update:modelValue', selectedVal.value)
		}
		
		const del = (productUID: string, characteristicGUID: string) =>{
			selectedVal.value = selectedVal.value.filter(x=> x.characteristicGUID != characteristicGUID)
			emit('update:modelValue', selectedVal.value)
		}
		return {
			open,
			open_presail,
			selectedVal,
			
			add,
			del,
		}
	},
})
</script>

