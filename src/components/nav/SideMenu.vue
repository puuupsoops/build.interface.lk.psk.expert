<template>
	<div>
    <aside :class="'sidebar '+scroll_class"  >
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

import { SideNavigation } from '/src/components/nav'
import { OrderDraftModal } from '/src/components/cards/Order'


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



</script>


<style lang="sass" scoped>


</style>