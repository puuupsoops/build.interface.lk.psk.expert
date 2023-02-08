<template>
  <div class="product-addinfo content-elem content-elem-info">
            <div class="content-elem-heading"> 
              <transition name="text" mode="out-in">
                <div :key="show" :class="show ? 'content-elem-heading-text' : 'hide-text'">Доп. материал</div>
              </transition>
                
              
                <div class="content-elem-heading-btn content-hide-btn" @click="show = !show">{{ !show ? 'Показать +' : 'Скрыть —' }}</div>
                
            </div>
            <transition name="fade">
              <div v-if="show" class="content-elem-bottom content-elem-desc content-hide">
                  Сообщаем вам что согласно Постановлению Правительства 
                  Российской Федерации № 216 от 29.02.2020 дата запрета 
                  оборота немаркированной обуви перенесена на 1 июля 2020 года.
                  <div class="video-area" v-html="link" :style="'padding-top: 10px;'"></div>
              </div>
            </transition>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
    props : {
      data: {
	    },
    },
    setup(props){
        let show=ref(true);
        let link = props.data.VIDEO
        //console.log(props.data.value.VIDEO)
        console.log(props.data)
        return{
            show,
            link
        }
    }
}
</script>


<style lang="sass" scoped>
.fade-enter-active, .fade-leave-active 
  transition: all 0.5s ease

.fade-enter-from, .fade-leave-to 
  transform: translateY(-20px)
  opacity: 0


.text-enter-active, .text-leave-active
    transition: all .5s ease

.text-enter-from, .text-leave-to
    font-size: 16px
    line-height: 25px
    color: #A5A7A9

.hide-text
    font-size: 16px
    line-height: 25px
    color: #A5A7A9

</style>