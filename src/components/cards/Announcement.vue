<template>
    <transition name="fade" appear mode="out-in">
        <Preloader v-if="isLoad" key="loader"/>

        <a class="news" href="#" v-else key="news">

            <div class="news-img-box">
                <img class="news-img" :src="news.image" alt="">
            </div>

            <div class="news-text">
                <div class="news-heading">
                    <div class="news-heading-text">{{news.title}}</div>
                    <div class="news-heading-date">{{news.date}}</div>
                </div>
                <div class="news-description">{{news.text}}</div>
            </div>

        </a>
        
        
    </transition>
</template>

<script>
import { useAnnouncement } from '@/hooks/useAnnouncement';
import Preloader from '../Preloader.vue';

export default {
  components: { Preloader },
    /*props: {
        data: {
            type: Array,
            reqired: true
        }
    },*/
    setup(){

        const {news, isLoad} = useAnnouncement();

        return {
            news,
            isLoad
        }
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .9s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>