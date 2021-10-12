<template>
<div class="product-slider-block content-elem">
    <div class="product-slider">
        <vueper-slides
            lazy lazy-load-on-drag
            class="no-shadow slider"
            arrows-outside 
            bullets-outside
            ref="vueperslides1"
            :touchable="false"
            fade
            :autoplay="false"
            :bullets="false"
            @slide="$refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })"
            fixed-height="300px"
            slide-image-inside
        >
            <vueper-slide
                v-for="(slide, i) in data"
                :key="i"
                :image="slide"
                >

                <template #loader>
                    <i class="icon icon-loader spinning"></i>
                    <span>Загрузка...</span>
                </template>
            </vueper-slide>
        </vueper-slides>

        <vueper-slides
            lazy lazy-load-on-drag
            class="no-shadow thumbnails"
            ref="vueperslides2"
            @slide="$refs.vueperslides1.goToSlide($event.currentSlide.index, { emit: false })"
            :visible-slides="3"
            fixed-height="75px"
            :bullets="false"
            :touchable="false"
            :gap="5"
            slide-image-inside
            :arrows="false">
            <vueper-slide
                v-for="(slide, i) in data"
                :key="i"
                :image="slide"
                @click="$refs.vueperslides2.goToSlide(i)">
                <template #loader>
                    <i class="icon icon-loader spinning"></i>
                    <span>Загрузка...</span>
                </template>
            </vueper-slide>
        </vueper-slides>
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
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
    components: { VueperSlides, VueperSlide },
    props:{
        data: {
            type: Array
        },
    },
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

<style >
.thumbnails {
  margin: auto;
    max-width: 300px;
}

.thumbnails .vueperslide {
  box-sizing: border-box;
  border: 1px solid #fff;
  transition: 0.3s ease-in-out;
  opacity: 0.7;
  cursor: pointer;
}

.thumbnails .vueperslide--active {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  opacity: 1;
  border-color: #000;
}
.thumbnails .vueperslide__image {
    background-size: contain;
    background-repeat: no-repeat;
    outline: none;
    border-radius: 6px;
    overflow: hidden;
    width: auto;
}

.product-slider-img {
    max-width:300;
    max-height:100%;
}
.product-slider{
    margin-left: auto;
    margin-right: auto;
    width: 100%;
}
.slider .vueperslide__image {
    background-size: contain;
    background-repeat: no-repeat;
    outline: none;
    border-radius: 6px;
    overflow: hidden;
    width: auto;
}

</style>