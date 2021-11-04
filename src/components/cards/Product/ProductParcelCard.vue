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
							<div class="product-parcel-value">{{ Number( markup ).toLocaleString() }} ₽</div>
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
							<div class="product-parcel-text">Сума: </div>
							<div class="product-parcel-value">{{ Number(markup * count).toLocaleString() }} ₽</div>
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


<script>
import { ref, computed } from 'vue';
import AmountInput from '@/components/ui/AmountInput.vue';

export default {
	props: {
		data:{
			type: Object
		}
	},
	components: {
		AmountInput
	},
	setup(props){
		let show=ref(true);
		let count = ref(1);
		let markup_val = ref(0);
		let parcel_type = ref('percent')
		let markup = computed(()=>{
			//console.log(Number(props.data.PRICE) + Number(markup).value * (Number(props.data.PRICE)/100));
			if ( props.data.PRICE ){
				return parcel_type.value === 'add' ? Number(props.data.PRICE)+Number(markup_val.value) : Number(props.data.PRICE) + Number(props.data.PRICE)/100*Number(markup_val.value)
			} else return 0
		})
		return{
			show,
			count,
			markup,
			markup_val,
			parcel_type
		}
	}
}
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