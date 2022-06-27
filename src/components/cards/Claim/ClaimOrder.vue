<template>

	<div class="order-list content-elem">
			<div class="order-list-bottom scroll-elem" v-if="val">
					
				<div class="order-list-bottom-wrap" > 
					
					<div class="order-list-row order-list-heading" v-if="val.position.length>0">
						<div class="order-list-elem">№</div>
						<div class="order-list-elem">Артикул</div>
						<div class="order-list-elem">Наименование</div>
						<div class="order-list-elem">{{ open.length != 0 ? 'Цена':'' }}</div>
						<div class="order-list-elem">Кол-во</div>
						<div class="order-list-elem">Стоимость</div>
						<div class="order-list-elem">Выбрано</div>
						
					</div>
					<div 
						:class="open.indexOf(key) !== -1 ? 'order-list-item active' : 'order-list-item'"
						v-for="(item, key) in val.position"
						:key="key"
					>
						<div 
							class="order-list-row order-list-main-row"
							@click="open.indexOf(key) === -1 ? open.push(key) : open.splice(open.indexOf(key),1)"
						>
							<div class="order-list-elem">
								{{key+1}} 
								
							</div>
						<div class="order-list-elem">{{ item.article }}</div>
						<div class="order-list-elem"> <span v-html = "item.product.NAME"></span></div>		
						<div class="order-list-elem"></div>
						<div class="order-list-elem">{{ item.count }}</div>
						<div class="order-list-elem" v-if="item.total">{{ Number(item.total).toLocaleString('ru') }} ₽</div><div class="order-list-elem" v-else> -- </div>

						<div class="order-list-elem">
							{{item.characteristics.filter(x => x.select>0).length}}
						</div>
						</div>
						<div :class="open.indexOf(key) !== -1 ? 'order-list-sublist active' : 'order-list-sublist'">
							<div
								v-for="(characteristic, k) in item.characteristics"
								:key="k"
								class="order-list-row"
							> 
								<div class="order-list-elem"></div>
								<div class="order-list-elem"></div>
								<div class="order-list-elem">{{ characteristic.CHARACTERISTIC }}</div>
								<div class="order-list-elem" v-if="characteristic.PRICE">{{  Number(characteristic.PRICE).toLocaleString('ru') }} ₽</div><div class="order-list-elem" v-else> -- </div>
								<div class="order-list-elem"> <span>{{characteristic.count}}</span></div>
								<div class="order-list-elem" v-if="characteristic.PRICE">{{ Number(characteristic.PRICE * characteristic.count).toLocaleString('ru') }} ₽</div><div class="order-list-elem" v-else> -- </div>
						
								<div class="order-list-elem">
									<amount-input :max="characteristic.count" v-model="characteristic.select" @onInput="upd"></amount-input>
								</div>
							</div>
							
						</div>
					</div>
					
					
				</div>
				
			</div>
		</div>
		

</template>

<script lang="ts">

import AmountInput from '@/components/ui/AmountInput.vue'


import { ref, defineComponent, PropType,  computed } from 'vue'

import { OrderStateOrder } from '@/store/order/types'
import { ProductCharacteristic } from '@/models/Product';



export default defineComponent({
	props: {
		data: {
			type: Object as PropType<OrderStateOrder>,
			
		},
		modelValue: {
			type: Array as PropType<ProductCharacteristic[]>,
			required: true
		
		}
	},
	emits:['update:modelValue'],
	components:{
		AmountInput,

	},
	setup(props, { emit }) {
		const open = ref([])
		const open_presail = ref({})
		
		const val = computed(
			()=>{
				let res = Object.assign({}, props.data)

				if (res.position)
					res.position.forEach((x : any) => {
							x.characteristics.forEach((c :any ) => c.select=0)
					})
					else return null
				return res
		})
		
		const upd = () =>{
			let selectedVal = <ProductCharacteristic[]>[]
			if (val.value)
				val.value.position.forEach((x : any) => {
					x.characteristics.forEach((c :any ) => {
						if (c.select > 0) selectedVal.push({
															productUID: <string>x.product.UID,
															characteristicGUID: <string>c.CHARACTERISTIC, 
															count: <number>c.select
														})
					})
				})
			emit('update:modelValue', selectedVal)
		}
	
		return {
			open,
			open_presail,
			val,
			
		
			upd,
		}
	},
})
</script>

