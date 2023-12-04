<template>
	<div>
    <aside :class="'sidebar '+scroll_class" style=""> <!-- display: flex; flex-direction: column; justify-content: space-around; -->
      <div class="sidebar-btn sidebar-menu-btn"  @click="$emit('update:modelValue', !modelValue)">
        <svgMenu class="sidebar-btn-img"></svgMenu>
      </div>
      <div class="sidebar-btn"  @click="$emit('update:modelValue', false)">
        <router-link to="/" title="На главную" >
          <svgMonitor class="sidebar-btn-img"></svgMonitor>
        </router-link>
      </div>
      <div class="sidebar-btn"  @click="$emit('update:modelValue', false)">
        <router-link to="/product" title="Поиск товаров">
          <svgSearch class="sidebar-btn-img"></svgSearch>
        </router-link>
      </div>
      <div class="sidebar-btn"  @click="$emit('update:modelValue', false)">
      <router-link to="/order" title="Сделать заказ">
        <div class="sidebar-btn-notification" v-if="orderPositionLength>0">
          {{orderPositionLength}}
        </div>
        <svgCart class="sidebar-btn-img"></svgCart>
      </router-link>
      </div>
      <div class="sidebar-btn"  @click="$emit('update:modelValue', false)">
        <router-link to="/orders" title="История заказов">
          <svgHistory class="sidebar-btn-img"></svgHistory>
        </router-link>
      </div>

      <div class="sidebar-btn"  @click="$emit('update:modelValue', false)">
        <router-link to="/kp" title="Коммерческое предложение">
          <svgKP class="sidebar-btn-img"></svgKP>
        </router-link>
      </div>
    
      <div class="sidebar-btn"  @click="$emit('update:modelValue', false)" title="Черновик">
        <div @click="showDraft = true">
          <div class="sidebar-btn-notification draft" v-if="draft>0">
            {{draft}}
          </div>
          <svgDraft class="sidebar-btn-img"></svgDraft>
        </div>
      </div>

      <!--Кнопка открытия модального окна infoModal
      <div class="sidebar-btn" @click="$emit('update:modelValue', false)" title="Объявление"> 
        <div @click="showModalInfo">
        <svgInfo class="sidebar-btn-img"></svgInfo>
        </div>
      </div>-->

      <div 
        class="sidebar-btn"
        @click="downloadLogFile"
        title="Скачать лог"
      >
        <div>
          <svg class="sidebar-btn-img" width="26" height="26">
            <path stroke="#A5A7A9" class="stroke" d="M28,6H4C2.343,6,1,7.343,1,9v14c0,1.657,1.343,3,3,3h24c1.657,0,3-1.343,3-3V9C31,7.343,29.657,6,28,6z   M8.477,25l0.697-1.743C9.48,22.493,10.209,22,11.031,22h9.938c0.823,0,1.551,0.493,1.857,1.257L23.523,25H8.477z M30,23  c0,1.103-0.897,2-2,2h-3.4l-0.846-2.114C23.299,21.747,22.196,21,20.969,21h-9.938c-1.227,0-2.33,0.747-2.785,1.886L7.4,25H4  c-1.103,0-2-0.897-2-2V9c0-1.103,0.897-2,2-2h24c1.103,0,2,0.897,2,2V23z M23,12H9c-1.657,0-3,1.343-3,3s1.343,3,3,3h14  c1.657,0,3-1.343,3-3S24.657,12,23,12z M20.779,13C20.3,13.532,20,14.228,20,15s0.3,1.468,0.779,2h-9.557  C11.7,16.468,12,15.772,12,15s-0.3-1.468-0.779-2H20.779z M7,15c0-1.103,0.897-2,2-2c1.103,0,2,0.897,2,2c0,1.103-0.897,2-2,2  C7.897,17,7,16.103,7,15z M23,17c-1.103,0-2-0.897-2-2c0-1.103,0.897-2,2-2c1.103,0,2,0.897,2,2C25,16.103,24.103,17,23,17z M5,23  c0,0.552-0.448,1-1,1s-1-0.448-1-1c0-0.552,0.448-1,1-1S5,22.448,5,23z M3,9c0-0.552,0.448-1,1-1s1,0.448,1,1c0,0.552-0.448,1-1,1  S3,9.552,3,9z M29,23c0,0.552-0.448,1-1,1s-1-0.448-1-1c0-0.552,0.448-1,1-1S29,22.448,29,23z M29,9c0,0.552-0.448,1-1,1  s-1-0.448-1-1c0-0.552,0.448-1,1-1S29,8.448,29,9z"/>
          </svg>
        </div>
      </div>
    </aside>
  </div>

		<SideNavigation 
			:modelValue="modelValue"
			@close="$emit(`update:modelValue`, !modelValue)"
		></SideNavigation>
		<OrderDraftModal v-model="showDraft"/>
    
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import svgKP from '/src/assets/img/icon/kp.svg'
import svgDraft from '/src/assets/img/icon/draft.svg'
import svgHistory from '/src/assets/img/icon/history.svg'
import svgCart from '/src/assets/img/icon/cart.svg'
import svgSearch from '/src/assets/img/icon/search.svg'
import svgMonitor from '/src/assets/img/icon/monitor.svg'
import svgMenu from '/src/assets/img/icon/menu.svg'
import svgInfo from '/src/assets/img/icon/info.svg'


import { SideNavigation } from '/src/components/nav'
import { OrderDraftModal } from '/src/components/cards/Order'
import { useStore } from '/src/store'
import { ModalActions } from '/src/store/modal/actions'




// eslint-disable-next-line no-unused-vars
const props = defineProps({
	modelValue: {
			type: Boolean,
			required: true
		},
	orderPositionLength: {
		type: Number,
		default: 0
	},
	draft: {
		type: Number,
		default: 0,
	},

})
// eslint-disable-next-line no-unused-vars
const emits = defineEmits(['update:modelValue'])
const scroll_class = ref('show')
const scroll = ref(0)
let scroll_last = 0
const showDraft = ref(false)

const onScroll = (e: Event) => {
			const scr = e.target as Document
			scroll.value = scr.documentElement.scrollTop

			if (scroll_last < scroll.value && scroll.value > 100) {
				scroll_class.value ='hide'
			} else if (scroll_last > scroll.value) {
				scroll_class.value ='show'
			}

			scroll_last = scroll.value
		}

onBeforeUnmount(() => { window.removeEventListener("scroll", onScroll)})
onMounted(() => {
				window.scrollTo(0,0)
				window.addEventListener("scroll", onScroll)
		})

// Функция открывает модальное окно infoModal.
const store = useStore()
const showModalInfo = () => {

  store.dispatch(ModalActions.VALUE, true)
}

const downloadLogFile = async () => {
  let logs = {
    token: localStorage.getItem('id_token') ?? '',
    log: JSON.parse(localStorage.getItem('logs') ?? '[]'),
    draft: JSON.parse(localStorage.getItem('orders_drafts') ?? '[]')
  }

  const blob = new Blob([JSON.stringify(logs)], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `log.json`);
  document.body.appendChild(link);
  link.click();
  // clean up "a" element & remove ObjectURL
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

</script>


<style lang="sass" scoped>


</style>