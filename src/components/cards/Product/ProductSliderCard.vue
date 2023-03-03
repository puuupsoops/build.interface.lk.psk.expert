<template>
<div class="content-elem">
	<div class="product-slider-wrap" v-if="!loader">
    <div class="product-slider-main">
      <button class='product-slider-arrow prev' @click="previous"></button>
      <transition-group name="product-slider-trans" class='product-slider' tag="div">
          <div v-for="slide in slides" class='product-slider-slide' :key="slide.id">
            <img
              v-if="slide.src"
              :src="slide.src"
              @click="fullscreen=true"
              alt=""
            />
          </div>
      </transition-group>
      <div class='product-slider-arrow next' @click="next"></div>
    </div>

	

	</div>
  <transition-group name="product-slider-trans" class='product-slider-small' tag="div">
    <div
        v-for="slide in slides"
        class='product-slider-small-slide'
        :key="slide.id"
    >
      <img
          v-if="slide.src"
          :src="slide.src"
          alt=""
      />
    </div>
  </transition-group>

	<div class="product-slider-buttons">
		<!-- <div class="product-slider-link">Сертификаты</div> -->
		<div
			class="product-slider-link"
			@click="$emit('toOrder', $event.target.click)"
		>Заказать</div>
		<!-- <div class="product-slider-link">Добавить в КП</div> 
		<div class="product-slider-link"
			@click="hideLogoApplicationModalWindow = false;"
		>Создать макет нанесения</div>-->
		<div class="product-slider-link"
			@click="$emit('toLogo')"
		>Создать макет нанесения</div>
	</div>
	
	<ProductSliderFullscreen
		v-model="fullscreen"
		:data="data"
	> </ProductSliderFullscreen>

	<!--<div class="order-modal" v-if="!hideLogoApplicationModalWindow">
		<div class="order-modal-dialog draft">
			<div class="order-modal-content draft">
				<div class="order-modal-header">
					<h3 class="order-modal-header-title">Конструктор макета нанесения логотипа</h3>
					<div class="delete-btn"
						@click="hideLogoApplicationModalWindow = true;"
					>
						<svg class="delete-btn-img" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.250031" y="2.07935" width="2.25351" height="22.5351" 
							rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"></rect><rect width="2.25351" height="22.5351" rx="1.12676" 
							transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"></rect>
						</svg>
					</div>
				</div>
				<div class="order-modal-body draft">
					<LogoApplication :images="slides"/>
				</div>
			</div>
		</div>
	</div>-->
</div>
</template>

<script lang="ts">
import {ref, onUpdated, computed, defineComponent, PropType} from 'vue'
import { useStore } from '/src/store'
import { KeysMutations } from '/src/store/keys/mutations'
import { Sliders } from '/src/models/Components'
import ProductSliderFullscreen from '/src/components/cards/Product/ProductSliderFullscreen.vue'
//import LogoApplication from '/src/components/cards/KP/LogoApplicationModal.vue'

export default defineComponent({
	props:{
		data: {
      type: Array as PropType<string[]>
		},
	},
	components:{
		ProductSliderFullscreen,
		//LogoApplication
	},
	emits: ['toOrder','toLogo'],
	setup(props){

		let slides = ref<Sliders[]>([]);
		const store = useStore();
		const loader = computed<boolean>({
			get: () => store.getters.getLoader,
			set: (val: boolean) => store.commit(KeysMutations.SET_LOADER, val)
		})
		const fullscreen = ref(false)
		props.data?.forEach( (v, i) => slides.value.push(<Sliders>{ id: i, src: v }))
		// if (slides.value.length % 2 == 0){
		// 			slides.value.push({id: slides.value.length, src:props.data[0]})
		// 		}

		onUpdated( () => {
				slides.value = [];
				props.data?.forEach( (v, i) => slides.value.push(<Sliders>{id: i, src: v}))
				// if (slides.value.length % 2 == 0){
				// 	slides.value.push({id: slides.value.length, src:props.data[0]})
				// }
				});

		let next = () => {
			const first = <Sliders>slides.value.shift();
			slides.value = slides.value.concat(first);
		};
		let previous = () => {
			const last = <Sliders>slides.value.pop();
			slides.value = [last].concat(slides.value);
		};
		
		// закрытие модельного окна с комнонентом нанесения логотипа
		let hideLogoApplicationModalWindow = ref(true)

		return {
			loader,
			slides,
			fullscreen,
			hideLogoApplicationModalWindow,
			next,
			previous,
			
		}
	}
})
</script>

<style lang="sass" scoped>
.product-slider-buttons
  display: flex
  align-items: center
.product-slider-buttons
   & > div
     margin: auto
     width: auto
</style>