<template>

<div class="product-search content-elem">
    <div class="table-head"> 
        <div class="text">Результаты поиска:</div>
        <div class="hide-btn" @click="show = !show"> {{ !show ? 'Показать +' : 'Скрыть —' }}</div>
    </div>
    <transition name="fade">
        <div v-if="show" class="product-search-bottom product-search-table-wrap scroll-elem" >
            <div class="table-more-info-arrow"></div>
            <div id="table-found" class="table product-search-table">
                
                <div class="table-row table-heading">
                    <div class="table-elem">Артикул</div>
                    <div class="table-elem">Наименование</div>
                </div>
            
                <a 
                    :class=" modelValue===product.ID ? 'table-row table-element active' : 'table-row table-element'" 
                    v-for="(product, i) in data"
                    :key="i"
                    @click="$emit('update:modelValue', product.ID)"
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
    emits: ['update:modelValue'],
    setup(){
        let show=ref(true);
        return{
            show
        }
    }
}
</script>

<style scoped>
.table-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;
    }
.text{
    padding: 10px; 
    width: 30%; 
    font-size: 16px; 
    color: #A5A7A9;  
    line-height: 25px;
}
.hide-btn{
    font-size: 16px;
    line-height: 25px;
    color: #A5A7A9;
    cursor: pointer;
}

.table-row.table-element.active {
    border: 2px solid #FF9900;
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from, .fade-leave-to  {
  transform: translateY(-20px);
  opacity: 0;
}
</style>