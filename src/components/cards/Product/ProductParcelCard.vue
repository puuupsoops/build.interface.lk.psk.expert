<template>
<div class="product-parcel">
    <div class="product-parcel-wrap">
            <div class="product-parcel-elem content-elem">
                <div class="content-hide">
                    <div class="product-parcel-row">
                        <div class="product-parcel-text">Наценка: </div>
                        <div class="product-parcel-value">
                        <button class="product-parcel-btn">30</button>
                        <button class="product-parcel-btn">%</button>
                        <button class="product-parcel-btn">₽</button>
                        </div>
                    </div>
                    <div class="product-parcel-row">
                        <div class="product-parcel-text">Цена с наценкой: </div>
                        <div class="product-parcel-value">1 300 ₽</div>
                    </div>
                </div>

            </div>
            
            
            <div class="product-parcel-elem content-elem" >
                <div class="content-hide" >
                    <div class="product-parcel-row">
                        <div class="product-parcel-text">Количество: </div>
                        <div class="product-parcel-value"> 
                        <button class="product-parcel-btn">0</button>
                        </div>
                    </div>
                    <div class="product-parcel-row">
                        <div class="product-parcel-text">Сума: </div>
                        <div class="product-parcel-value">1 300 ₽</div>
                    </div>
                    <div class="product-parcel-row">
                        <div class="product-parcel-text">Средний вес: </div>
                        <div class="product-parcel-value">25 кг</div>
                    </div>
                    <div class="product-parcel-row">
                        <div class="product-parcel-text">Средний объем: </div>
                        <div class="product-parcel-value">26 м.куб</div>
                    </div>
                </div>

            </div>
          
         
     
        <div class="product-parcel-hide-btn content-hide-btn" @click="show = !show">{{ !show ? 'Показать +' : 'Скрыть —' }}</div>
    </div>
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
.product-parcel-inline {
    display: flex;
}

.fade-calc-enter-active, .fade-calc-leave-active .fade-nac-enter-active, .fade-nac-leave-active {
  transition: all 0.5s ease;
}
.fade-calc-enter-from, .fade-calc-leave-to .fade-nac-enter-from, .fade-nac-leave-to  {
  transform: translateY(-20px);
   opacity: 0;
}

</style>