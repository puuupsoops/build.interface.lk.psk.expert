<template>
  <div class="prev-slider-elem">
    <div class="prev-slider-elem-wrap">
      <div class="prev-slider-elem-box">
        <div class="prev-slider-new">
          <div class="prev-slider-new-box">
            <img
              class="prev-slider-new-img"
              src="@/assets/img/icon/horn.svg"
              alt=""
            />
            <div class="prev-slider-new-text">Новинка</div>
          </div>
        </div>
        <div class="prev-slider-img-box">
          <img
            class="prev-slider-img"
            :src="data.image"
            alt=""
          />
        </div>
        <div class="prev-slider-info">
          <div class="prev-slider-name">{{data.title}}</div>
          <div class="prev-slider-about">
            {{data.desc}} <span class="prev-slider-about-code">{{data.article}}</span>
          </div>
        </div>
      </div>
      <a class="prev-slider-price" href="">
        <div class="prev-slider-price-val">
          ₽ {{data.price}}<span class="prev-slider-price-info">{{data.priceType}}</span>
        </div></a
      >
    </div>
  </div>
</template>

<script>
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