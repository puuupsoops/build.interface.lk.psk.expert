<template>
  <div class="case-slider-elem">

    <div class="case-slider-elem-wrap">
      <div class="case-slider-elem-box">
        <div class="case-slider-new">
          <div class="case-slider-new-box">
            <img
              class="case-slider-new-img"
              src="/src/assets/img/icon/horn.svg"
              alt=""
            />
            <div class="case-slider-new-text">Новинка</div>
          </div>
        </div>
        <div class="case-slider-img-box">
          <img
            class="case-slider-img"
            :src="data.image"
            alt=""
          />
        </div>
        <div class="case-slider-info">
          <div class="case-slider-name">{{data.title}}</div>
          <div class="case-slider-about">
            {{data.desc}} <span class="case-slider-about-code">{{data.article}}</span>
          </div>
        </div>
      </div>
      <router-link class="case-slider-price" :to="'/product/'+data.article">
        <div class="case-slider-price-val">
          ₽ {{data.price}}<span class="case-slider-price-info">{{data.priceType}}</span>
        </div>
      </router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
export default {
    props: {
        data: {
            type: Object,
            reqired: true
        }
    },
    mounted(){
        
    }
};
</script>

<style>
</style>