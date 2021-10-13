<template>

<div class="product-search-table content-elem">
    <div class="product-search-top"> 
        <div class="product-search-top-elem">Результаты поиска:</div>
        <div class="product-search-top-elem" @click="show = !show"> {{ !show ? 'Показать +' : 'Скрыть —' }}</div>
    </div>
    <transition name="fade">
        <div v-if="show" class="product-search-bottom product-search-table-wrap scroll-elem" >
            <div class="table product-search-table">
                <div class="table-row table-heading">
                    <div class="table-elem">Артикул</div>
                    <div class="table-elem">Наименование</div>
                </div>
            
                <a 
                    :class=" modelValue===product.ID ? 'table-row table-element active' : 'table-row table-element'" 
                    v-for="(product, i) in data"
                    :key="i"
                    @click="$emit('update:modelValue', product.ID); $emit('onClick', $event)"
                    
                > 
                    <i style="display: none">{{ product.ID }}</i>
                    <div class="table-elem">{{ product.ARTICLE }}</div>
                    <div class="table-elem">{{ product.NAME }}</div>
                </a>
            </div>     
        </div>
    </transition>
</div>
        
</template>

<script>
import { ref } from 'vue'

export default {
    props:{
        data: {
            type: Array
        },
        modelValue: {
			type: String,
			//required: true
		},
    },
    emits: ['update:modelValue', 'onClick'],
    setup(){
        let show=ref(true);
        return{
            show
        }
    }
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