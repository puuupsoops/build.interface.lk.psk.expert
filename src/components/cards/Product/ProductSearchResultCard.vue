<template>

<div class="product-search-table content-elem">
	<div class="product-search-top" v-if="cardType == 'search'"> 
		<div class="product-search-top-elem">Результаты поиска:</div>
		<div class="product-search-top-elem" @click="show = !show"> {{ !show ? 'Показать +' : 'Скрыть —' }}</div>
	</div>
	<transition name="fade">
		<div v-if="show" class="product-search-bottom product-search-table-wrap scroll-elem" >
			<div class="table product-search-table">
				<div class="table-row table-heading">
					<div class="table-elem">Артикул</div>
					<div class="table-elem">Наименование</div>
					<div class="table-elem" v-if="cardType != 'search'"  title="Выбрать другой продукт" @click="$emit('ShowSearch')">
						<div class="product-search-btn-small" >
							<div></div>
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M19.7556 18.5783L14.0682 12.8908C15.1698 11.53 15.8331 9.80087 15.8331 7.91757C15.8331 3.55262 12.2815 0.000976562 7.91655 0.000976562C3.5516 0.000976562 0 3.55258 0 7.91753C0 12.2825 3.55164 15.8341 7.91659 15.8341C9.79989 15.8341 11.5291 15.1708 12.8899 14.0691L18.5773 19.7566C18.7398 19.9191 18.9531 20.0008 19.1665 20.0008C19.3798 20.0008 19.5931 19.9191 19.7556 19.7566C20.0815 19.4308 20.0815 18.9041 19.7556 18.5783ZM7.91659 14.1675C4.46995 14.1675 1.66666 11.3642 1.66666 7.91753C1.66666 4.47089 4.46995 1.6676 7.91659 1.6676C11.3632 1.6676 14.1665 4.47089 14.1665 7.91753C14.1665 11.3642 11.3632 14.1675 7.91659 14.1675Z" fill="white"/>
							</svg>
						</div>
					</div>
				</div>
				<div class="table-wrap">
					<a 
						:class=" modelValue===product.ID ? 'table-row table-element active' : 'table-row table-element'" 
						v-for="(product, i) in data"
						:key="i"
						@click="onClick(product.ID)"
						
					> 
						<div class="table-elem">{{ product.ARTICLE }}</div>
						<div class="table-elem">{{ product.NAME }}</div>
					</a>
				</div>
			</div>
		</div>
	</transition>
</div>
		
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue'
import { Found } from '/src/models/Product'

const props = defineProps({
	modelValue: {
		type: String,
		required: true
	},
	data: {
		type: Array as PropType<Found[]>
	},
	cardType:{
		type: String
	},

})
const emits = defineEmits(['update:modelValue', 'onClick', 'ShowSearch'])

const show=ref(true)

const onClick = (id: string)=> {
	emits('update:modelValue', id) 
	emits('onClick')
}

</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from, .fade-leave-to  {
  transform: translateY(-20px);
  opacity: 0;
}
</style>