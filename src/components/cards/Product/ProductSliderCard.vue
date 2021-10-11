<template>
<div class="product-slider-block content-elem">
    <div class="product-slider-wrap">
        <div class="product-slider slick-initialized slick-slider">
            <button class="slick-prev slick-arrow" aria-label="Previous" type="button" style="">Previous</button>
            <div class="slick-list draggable">
                <div class="slick-track" style="opacity: 1; width: 1167px;">
                    <div class="product-slider-elem slick-slide" style="width: 389px; position: relative; left: 0px; top: 0px; z-index: 998; opacity: 0; transition: opacity 500ms ease 0s;" tabindex="-1" data-slick-index="0" aria-hidden="true"><img class="product-slider-img" src="https://psk.expert/upload/iblock/b4d/kos619_new_bezh_chern1.jpg" alt=""></div><div class="product-slider-elem slick-slide" style="width: 389px; position: relative; left: -389px; top: 0px; z-index: 998; opacity: 0; transition: opacity 500ms ease 0s;" tabindex="-1" data-slick-index="1" aria-hidden="true"><img class="product-slider-img" src="https://psk.expert/upload/iblock/def/kos619_new_bezh_chern2.jpg" alt=""></div><div class="product-slider-elem slick-slide slick-current slick-active" style="width: 389px; position: relative; left: -778px; top: 0px; z-index: 999; opacity: 1;" data-slick-index="2" aria-hidden="false" tabindex="0">
                        <img class="product-slider-img" :src="cur_img" alt="">
                    </div>
                </div>
            </div>
            <button class="slick-next slick-arrow" aria-label="Next" type="button" style="">Next</button>
        </div>

        <div class="product-slider-nav slick-initialized slick-slider slick-vertical">  
            <div class="slick-list draggable" >
                <div class="slick-track" >

                    <div v-for="(link, i) in img" :key="i" class="product-slider-nav-elem slick-slide slick-active" 
                        @click="cur_img=link.link"
                    >
                        <img class="product-slider-nav-img" :src="link.link" alt="">
                       
                    </div>
                    
                </div>
            </div>
        
        </div>
        
    </div>

    <div class="product-slider-buttons">
        <a class="product-slider-link" href="#">Сертификаты</a>
        <a id="product-slider-buttons-order" class="product-slider-link" href="#" style="display: block;">Заказать</a>
        <a class="product-slider-link" href="#">Добавить в КП</a>
    </div>
</div>  
</template>

<script>
import { ref } from 'vue'
export default {
    setup(){
        let img = ref([]);
        let cur_img = ref('');
        
        img.value = [
            {link: 'https://psk.expert/upload/iblock/b4d/kos619_new_bezh_chern1.jpg'},
            {link: 'https://psk.expert/upload/iblock/def/kos619_new_bezh_chern2.jpg'},
            {link: 'https://psk.expert/upload/iblock/f3a/kos619_new_bezh_chern3.jpg'},
        ];

        cur_img.value = img.value[0].link;
        return {
            img,
            cur_img
        }
    }
}
</script>