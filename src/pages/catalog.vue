<template>
    <div class="top-line main-page">
        <div class="top-line-menu-btn"><span></span><span></span><span></span></div>
        <Notification />
        <PersonalBar />
    </div>
<Preloader v-if="isLoad"/>
<div class="content-wrap content-main-wrap" style="flex-direction: column;" v-else>
  <a class="news" href="#" style="margin-bottom: 5px" 
    v-for="item of catalog.products" 
    :key="item.id"
    >
    <div class="news-img-box">
      <img class="news-img" :src="item.image" alt="" />
    </div>

    <div class="news-text">
      <div class="news-heading">
        <div class="news-heading-text">{{ item.title }}</div>
        <div class="news-heading-date">{{ item.article }}</div>
      </div>
      <div class="news-description">{{ item.description }}</div>
      <div class="news-heading-text"><strong>Цена:</strong> {{item.prices.retail}} ₽</div>
    </div>
  </a>
</div>  
</template>

<script>

import Notification from '../components/cards/Notification.vue';
import PersonalBar  from '../components/cards/PersonalBar.vue';

import Preloader from '../components/Preloader.vue';

import { useCatalog } from '../hooks/useCatalog';

export default {
    components:{
        Notification,
        PersonalBar,
        Preloader
    },
    setup(){
        const {catalog, isLoad} = useCatalog('letnyaya',1);

        return{
            catalog,
            isLoad
        }
    }
};
</script>

<style>
</style>