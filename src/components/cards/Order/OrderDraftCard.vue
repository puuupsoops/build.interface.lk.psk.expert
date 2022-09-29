<template>

	<div class="order-list content-elem">
		
	
			<div class="order-list-bottom scroll-elem">
				
				<div class="order-list-bottom-wrap"> 
					<div class="content-heading-wrap order-draft"  v-if="data.total">
						<div class="content-heading-price"> 
							<div class="content-heading-price" > 
								<div class="content-heading-price-text">Сумма заказа: </div>
								<div class="content-heading-price-value" v-if="data.total !== data.total_discount">
									<span class="strikethrough">{{ Number(data.total).toLocaleString('ru', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.')}} ₽</span>
									{{ Number(data.total_discount).toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.') }} ₽
									
								</div>
								<div class="content-heading-price-value" v-else>{{Number(data.total).toLocaleString('ru', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.')}} ₽</div>
							</div>
						</div>
					</div>

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
						<div class="order-list-elem">{{ Number(item.total).toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.') }} ₽</div>

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
								<div class="order-list-elem">{{ Number(characteristic.PRICE).toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.') }} ₽</div>
								<div class="order-list-elem"> 
									<span>{{characteristic.count}}</span>
								</div>
								<div class="order-list-elem">{{ Number(characteristic.PRICE * characteristic.count).toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.') }} ₽</div>
								
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
					<div class="content-heading-wrap order-draft"  v-if="data.total_presail">
						<div class="content-heading-price"> 
							<div class="content-heading-price" > 
								<div class="content-heading-price-text">Сумма заказа: </div>
								<div class="content-heading-price-value" v-if="data.total_presail !== data.total_presail_discount">
									<span class="strikethrough">{{ Number(data.total_presail).toLocaleString('ru', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.')}} ₽</span>
									{{ Number(data.total_presail_discount).toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.') }} ₽
									
								</div>
								<div class="content-heading-price-value" v-else>{{Number(data.total_presail).toLocaleString('ru', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.')}} ₽</div>
							</div>
						</div>
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
						<div class="order-list-elem">{{ Number(item.total).toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.') }} ₽</div>

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
								<div class="order-list-elem">{{ Number(characteristic.PRICE).toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.') }} ₽</div>
								<div class="order-list-elem"> 
									<span>{{characteristic.count}}</span>
								</div>
								<div class="order-list-elem">{{ Number(characteristic.PRICE * characteristic.count).toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.') }} ₽</div>
								
								<div class="order-list-elem-delete">
									
								</div>
							</div>
							
						</div>
					</div>
					
					
				</div>
			</div>
	</div>
		

</template>

<script setup lang="ts">
import { ref, PropType } from 'vue'

import { OrderStateOrder } from '/src/store/order/types'

const props = defineProps( {
		data: {
			type: Object as PropType<OrderStateOrder>,
		},
    })
		const open = ref([]);
		const open_presail = ref([]);
</script>

