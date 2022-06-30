<template>

  <div :class="{'popup': true, 'drop': drop_class, 'close': close_class, }"
    v-if="show && message?.readPopup==false"
  >
    <div class="popup-message">
       <div class="popup-text">{{message?.message}}</div>
      <div class="popup-time"><b>{{(new Date(message?.time)).toLocaleString('ru').replace(',', '')}}</b></div>
    </div>
    <div class="popup-close" @click="close()"></div>
  </div>
  
</template>

<script lang="ts">
import { messageType, } from '/src/plugins/wsStore'
import { defineComponent,  PropType,  ref,  } from 'vue'


export default defineComponent({
  props:{
    message: {
      type: Object as PropType<messageType>
    },
    position: {
      type: Number
    },
    timeout: {
      type: Number,
      default: 10000
    }
  },
  emits:['close'],
  setup(props, { emit } ) {


    const close_class = ref(false)
    const drop_class = ref(true)
    const show = ref(true)
    setTimeout(()=>{drop_class.value=false}, 500 )
    

    let close = function(){
      clearTimeout(lc_timer)
      close_class.value = true
      setTimeout(()=>{
          emit('close')
        }, 300)
    }

    const lc_timer = setTimeout(()=>{
        close_class.value = true
        setTimeout(()=>{
            show.value=false
            emit('close')
          },300)
        }, props.timeout )

    return {
      close_class,
      drop_class,
      show,

      close

    }
  }

})
</script>

<style>

</style>