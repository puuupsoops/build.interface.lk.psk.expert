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
                    <a class="table-row table-element" onclick="getProductByID(this)">
                        <i style="display: none">16372</i>
                        <div class="table-elem">КОС598Р</div>
                        <div class="table-elem">Костюм "Финикс" св.серый/серый</div>
                    </a>
                    <a class="table-row table-element" onclick="getProductByID(this)">
                        <i style="display: none">12729</i>
                        <div class="table-elem">КОС598</div>
                        <div class="table-elem">Костюм "Финикс" бежевый / т.бежевый</div>
                    </a>
            </div>        
        </div>
    </transition>
</div>
        
</template>

<script>
import { ref } from 'vue'

export default {
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
.table-head .text{
    padding: 10px; 
    width: 30%; 
    font-size: 16px; 
    color: #A5A7A9;  
    line-height: 25px;
}
.table-head .hide-btn{
    font-size: 16px;
    line-height: 25px;
    color: #A5A7A9;
    cursor: pointer;

}
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from, .fade-leave-to  {
  transform: translateY(-20px);
  opacity: 0;
}
</style>