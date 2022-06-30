<template>
<div class="product-parcel">
	<div class="product-parcel-wrap">
			<div class="product-parcel-elem content-elem">
				<transition name="fade1"  mode="out-in">
					<div class="content-hide" v-if="show">
						<div class="product-parcel-row">
							<div class="product-parcel-text">Наценка: </div>
							<div class="product-parcel-value">
								<div class="product-parcel-value-block">
									<AmountInput v-model="markup_val"></AmountInput>
									<button 
											:class="'product-parcel-btn' + (parcel_type === 'percent' ? ' active':'')"
											@click="parcel_type='percent'"
									>%</button>
									<button 
											:class="'product-parcel-btn' + (parcel_type === 'add' ? ' active':'')"
											@click="parcel_type='add'"
									>₽</button>
								</div>
							</div>
						</div>
						<div class="product-parcel-row">
							<div class="product-parcel-text">Цена с наценкой: </div>
							<div class="product-parcel-value">{{ Number( markup ).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.') }} ₽</div>
						</div>
					</div>
				</transition>
				<div class="product-parcel-text" v-if="!show">Наценка</div>
			</div>
			<div class="product-parcel-elem content-elem">
				<transition name="fade2">		
					<div class="content-hide"  v-if="show">
						<div class="product-parcel-row">
							<div class="product-parcel-text">Количество: </div>
							<AmountInput v-model="count"></AmountInput>
						</div>
						<div class="product-parcel-row">
							<div class="product-parcel-text">Сумма: </div>
							<div class="product-parcel-value">{{ Number(markup * count).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.') }} ₽</div>
						</div>
						<div class="product-parcel-row">
							<div class="product-parcel-text">Средний вес: </div>
							<div class="product-parcel-value">{{ (Number(data.WEIGHT ? data.WEIGHT:0) * count).toFixed(3) }}</div>
						</div>
						<div class="product-parcel-row">
							<div class="product-parcel-text">Средний объем: </div>
							<div class="product-parcel-value">{{ (Number(data.VALUME ? data.VALUME:0) * count).toFixed(3) }}</div>
						</div>
					</div>
				</transition>
				<div class="product-parcel-text" v-if="!show">Количество</div>
			</div>
		<div class="product-parcel-hide-btn content-hide-btn" @click="show = !show">{{ !show ? 'Показать +' : 'Скрыть —' }}</div>
	</div>
</div>

</template>


<script setup lang="ts">
import { ref, computed, PropType } from 'vue'
import AmountInput from '/src/components/ui/AmountInput.vue'
import { Product } from '/src/models/Product';

const props = defineProps({
		data:{
			type: Object as PropType<Product>
		},
		discount:{
			type: Number
		}
	})
const show=ref(true)
const count = ref(1)
const markup_val = ref(0)
const parcel_type = ref('percent')
const markup = computed(()=>{
		if ( props.data?.PRICE_OPT ){
			let price = props.discount ? Number(props.data.PRICE_OPT)-(Number(props.data.PRICE_OPT/100))*props.discount : props.data.PRICE_OPT
			return parcel_type.value === 'add' ? Number(price)+Number(markup_val.value) : Number(price) + Number(price)/100*Number(markup_val.value)
		} else return 0
	})
</script>

<style lang="sass" scoped>
.fade1-enter-active, .fade1-leave-active 
  transition: all .3s ease

.fade1-enter-from, .fade1-leave-to 
  transform: translateY(-20px)
  opacity: 0

.fade2-enter-active, .fade2-leave-active 
  transition: all .3s ease

.fade2-enter-from, .fade2-leave-to 
  transform: translateY(-20px)
  opacity: 0


</style>