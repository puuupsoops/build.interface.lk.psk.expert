<template>
<div class="content-elem">
	<div class="product-slider-wrap" v-if="!loader">
    <div class="product-slider-main">
      <div class='product-slider-arrow prev' @click="previous"></div>

      <transition-group
        name="product-slider-horisont-trans"
        class='product-slider-horisont' tag="div"
      >
        <div
          v-for="slide in slides"
          class='product-slider-horisont-slide'
          :key="slide.id"
        >
          <img v-if="slide.src"
               :src="slide.src"
               alt=""
               @click="fullscreen=true"
          />
        </div>
      </transition-group>

      <div class='product-slider-arrow next' @click="next"></div>
    </div>
	</div>
		
    <ProductInfoCard :data="product" :protect="productProtect"></ProductInfoCard>
	
	<ProductSliderFullscreen
		v-model="fullscreen"
		:data="data"
	> </ProductSliderFullscreen>
</div>
</template>

<script setup lang="ts">
import { KeysMutations } from '/src/store/keys/mutations'
import { ProductSliderFullscreen, ProductInfoCard } from '/src/components/cards/Product'
import { ref, onUpdated, computed, PropType } from 'vue'
import { useStore } from '/src/store'
import { Sliders } from '/src/models/Components'


const props = defineProps({
		data: {
			type: Array as PropType<string[]>
		},
	})

const slides = ref<Sliders[]>([])
const store = useStore()
const loader = computed<boolean>({
  get: () => store.getters.getLoader,
  set: (val: boolean) => store.commit(KeysMutations.SET_LOADER, val)
})
		
const fullscreen = ref(false)
		
props.data?.forEach( (v, i) => slides.value.push(<Sliders>{id: i, src:v}))

onUpdated( () => {
  slides.value = []
  props.data?.forEach( (v, i) => slides.value.push(<Sliders>{id: i, src:v}))
});

const next = () => {
  const first = <Sliders>slides.value.shift()
  slides.value = slides.value.concat(first)
}
const previous = () => {
  const last = <Sliders>slides.value.pop()
  slides.value = [last].concat(slides.value)
}

const product = computed(() => store.getters.getProduct)
const productProtect = computed(() => store.getters.getProductProtect)

</script>

<style lang="sass" scoped>


</style>