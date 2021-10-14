<template>
  <transition name="fade" >
    <div class="top-line-info" v-if="show">
      <div class="top-line-info-text">
        Уважаемые клиенты, в связи с короновирусорм склад работает до 15600
      </div>
      <div class="top-line-info-close" @click="show=!show"></div>
    </div>
  </transition>
</template>

<script>
import { ref}  from 'vue'

export default {  
  setup() {
    let show=ref(true)
    return{
      show
    }
  }
};
</script>

<style lang="sass" scoped>

.fade-enter-active, .fade-leave-active 
  transition: opacity .5s

.fade-enter,.fade-leave-to
  opacity: 0

</style>