<template>

	<div class="order-list content-elem">
		
			<div class="order-list-bottom scroll-elem">
				
				<div class="order-list-bottom-wrap"> 
					
					<div class="order-list-row order-list-heading" v-if="data.position.length>0">
						<div class="order-list-elem">№</div>
						<div class="order-list-elem">Артикул</div>
						<div class="order-list-elem">Наименование</div>
						<div class="order-list-elem">{{ open.length != 0 ? 'Цена':'' }}</div>
						<div class="order-list-elem">Кол-во</div>
						<div class="order-list-elem">Стоимость</div>
						<div class="order-list-elem"></div>
						
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
						<div class="order-list-elem">{{ item.article }}</div>
						<div class="order-list-elem"><span v-html = "item.product.NAME"></span></div>
						<div class="order-list-elem"></div>
						<div class="order-list-elem">{{ item.count }}</div>
						<div class="order-list-elem">{{ Number(item.total).toLocaleString() }} ₽</div>

						<div class="order-list-elem-delete">
							
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
								<div class="order-list-elem"> </div>
								<div class="order-list-elem"> </div>
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
				<div class="order-list-bottom-wrap" v-if="data.position_presail.length > 0"> 
					<div class="order-list-row order-list-subheading">
						<div>Позиции для предзаказа</div>
					</div>
					
					<div class="order-list-row order-list-heading">
						<div class="order-list-elem">№</div>
						<div class="order-list-elem">Артикул</div>
						<div class="order-list-elem">Наименование</div>
						<div class="order-list-elem">{{ open_presail.length != 0 ? 'Цена':'' }}</div>
						<div class="order-list-elem">Кол-во</div>
						<div class="order-list-elem">Стоимость</div>
						<div class="order-list-elem"></div>
						
					</div>
					<div 
						:class="open_presail.indexOf(key) !== -1 ? 'order-list-item active' : 'order-list-item'"
						v-for="(item, key) in data.position_presail"
						:key="key"
					>
						<div 
							class="order-list-row order-list-main-row"
							@click="open_presail.indexOf(key) === -1 ? open_presail.push(key) : open_presail.splice(open_presail.indexOf(key),1)"
						>
							<div class="order-list-elem">
								{{key+1}}
							</div>
						<div class="order-list-elem">{{ item.article }}</div>
						<div class="order-list-elem"><span v-html = "item.product.NAME"></span></div>
						<div class="order-list-elem"></div>
						<div class="order-list-elem">{{ item.count }}</div>
						<div class="order-list-elem">{{ Number(item.total).toLocaleString() }} ₽</div>

						<div class="order-list-elem-delete">
							
						</div>
						</div>
						<div
							:class="open_presail.indexOf(key) !== -1 ? 'order-list-sublist active' : 'order-list-sublist'"
						>
							<div
								v-for="(characteristic, k) in item.characteristics"
								:key="k"
								class="order-list-row"
							>
								<div class="order-list-elem"> </div>
								<div class="order-list-elem"> </div>
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
import { ref, defineComponent, PropType } from 'vue'

import { OrderStateOrder } from '@/store/order/types'

export default defineComponent({
	props: {
		data: {
			type: Object as PropType<OrderStateOrder>,
		},
    },
	setup() {
		
		const open = ref([]);
		const open_presail = ref([]);
		


		return {
			
			open,
			open_presail,
			
		}
	},
})
</script>

