<template>
<div class="catalog-item">
	<div class="catalog-item-img">
		<img :src="data.image" alt="" />
	</div>

	<div class="catalog-item-info">
		<div class="content-wrap">
			<div class="content-heading-wrap-elem">
				<div class="content-heading">{{ data.title }}</div>
			</div>
			<div class="content-heading-info"> 
				<span class="content-heading-info-elem">{{data.article}}</span>
			</div>
		</div>
		<div :class="more ? 'catalog-item-text more' : 'catalog-item-text'" v-html="data.description" >
			
		</div>
		<div class="content-hide-btn catalog-item-more" @click="more=!more" >
			{{ more ? 'Меньше' : 'Больше'}}
		</div>
		<div class="catalog-item-btn-block">
			<div class="content-heading-price">
				<div class="content-heading-price-text">Цена:</div>
				<div class="content-heading-price-value"> {{data.prices.retail}} ₽</div>
			</div>

				<router-link
					class="catalog-item-btn"
					:to="'/product/' + data.article"
				>
          <svgDoc/>
					<span>К описанию</span>
				</router-link>
				
				<router-link
					class="catalog-item-btn"
					:to="'/order/' + data.article"
				>
          <svgCart/>
					<span> Заказать</span>
				</router-link>
			
		</div>
	
	</div> 
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import svgDoc from '/src/assets/img/icon/doc.svg'
import svgCart from '/src/assets/img/icon/cart.svg'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  data: {
    type: Object
  }
});
const more = ref(false);
</script>