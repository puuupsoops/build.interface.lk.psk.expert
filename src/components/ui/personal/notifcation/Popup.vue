<template>

  <div :class="{'popup': true, 'drop': drop_class, 'close': close_class, }"
        v-if="show"
  > 
    <div class="popup-box">
      <div class="popup-message" @click="more_event()">
        <div class="popup-text" :class="{'more': more | more_show}">{{message?.message}}</div>

        <div class="popup-time"><b>{{(new Date(message?.time)).toLocaleString('ru').replace(',', '')}}</b></div>
      </div>
      <div class="popup-close" @click="close()"></div>
    </div>
  
    <div class="popup-bar" v-if="auto_close && more_show==false"></div>
  </div>
  
</template>

<script setup lang="ts">


import { messageType, } from '/src/plugins/wsStore'
import { PropType,  ref,  } from 'vue'


const props = defineProps({
    message: {
      type: Object as PropType<messageType>
    },
    auto_close: {
      type: Boolean,
      default: false,
    },
    more: {
      type: Boolean,
      default: false,
    },
    timeout: {
      type: Number,
      default: 10000,
    }
  })
const emits = defineEmits(['close'])

const close_class = ref(false)
const drop_class = ref(true)
const show = ref(true)
const more_show = ref(false)
const lc_timer = ref()
setTimeout(()=>{drop_class.value=false}, 500 )

const close = function(){
  close_class.value = true
  setTimeout(()=>{emits('close')}, 300)
}
if (props.auto_close) {
  lc_timer.value = setTimeout(()=>{
    close_class.value = true
    setTimeout(()=>{ show.value=false; emits('close')},300)
  }, props.timeout )
} else close_class.value = false

const more_event = ()=> {
  if (more_show.value == false) {
    more_show.value = true
    clearTimeout(lc_timer.value)
  } else {
      more_show.value = false
      lc_timer.value = setTimeout(()=>{
        close_class.value = true
        setTimeout(()=>{ show.value=false; emits('close')},300)
       }, props.timeout )
  }
}
</script>

<style>

</style>