<template>
<div class="product-info product-info-tab content-elem">
	<div class="content-elem-heading" style="flex-wrap: wrap"> 
		<div class="content-elem-heading-text">Подробно</div>
		<ul class="product-info-tab-nav">
			<li :class="content_switch === 'detail' ? 'product-info-tab-link active':'product-info-tab-link'"
				@click="content_switch = 'detail'">Описание</li>

			<li :class="content_switch === 'characteristics' ? 'product-info-tab-link active':'product-info-tab-link'"
				@click="content_switch = 'characteristics'">Характеристика</li>
			
			<li :class="content_switch === 'certificate' ? 'product-info-tab-link active':'product-info-tab-link'"
				@click="getCirtificates(showCertificates);content_switch = 'certificate'">Сертификат</li>	
		</ul>
		<div class="content-elem-heading-btn content-hide-btn product-info-hide-btn" @click="show = !show">{{ !show ? 'Показать +' : 'Скрыть —' }}</div>
	</div>
	<transition name="fade" mode="out-in">
		<div class="content-hide"  v-if="show" >
			<div :class="content_switch === 'detail' ? 'product-info-desc product-info-tab-elem active':'product-info-desc product-info-tab-elem'">
				<product-properties-card
					:protect="protect"
				/>
				
				<p>
					<span v-html="data.DETAIL_TEXT"></span>
				</p>
			</div>
			<div :class="content_switch === 'characteristics' ? 'product-info-table-wrap product-info-tab-elem active':'product-info-table-wrap product-info-tab-elem'">
				<div class="table product-info-table scroll-elem">
				
					<div class="table-wrap">
						<div class="table-row"
							v-for="(v, i) in data.CHARACTERISTICS"
							:key="i"
						>
							<div class="table-elem"><span v-html="v.NAME"></span></div>
							<div class="table-elem"><span v-html="v.VALUE"></span></div>
						</div>
					
					</div>
				</div>
			</div>
			<div :class="content_switch === 'certificate' ? 'product-info-desc product-info-tab-elem active':'product-info-desc product-info-tab-elem'">
				<p v-if="!showCertificates"
				 :style="'text-align: center; display: table; margin: 0 auto 0 auto;'"
				>
					Загрузка...
					<Preloader />
				</p>
				<p v-else>
					<div :style="'margin: 0 auto 0 auto; display: table;'">
						<ButtonWithIcon 
							:text="btnText"
							:icon="btnIcon"
							:state="btnState"
							@click="download()"
						/>
					</div>

					<div class="product-slider-wrap">
					<button class='product-slider-arrow prev' @click="prev"></button>

					<transition-group name="product-slider-trans" class='product-slider' tag="div">
							<div v-for="slide in slides" class='product-slider-slide' :key="slide.id">
								<img
									v-if="slide.src"
									:src="slide.src" 
									@click="fullscreen=true"
								/>
							</div>
					</transition-group>
					<div class='product-slider-arrow next' @click="next"></div>
					
				
					<!--<transition-group name="product-slider-trans" class='product-slider-small' tag="div">
						<div 
							v-for="slide in slides" 
							class='product-slider-small-slide'
							:key="slide.id"
						>
							<img 
								v-if="slide.src"
								:src="slide.src" 
							/>
						</div>
					</transition-group>-->
				
					</div>
				</p>
			</div>
		</div>
	</transition>
</div>
<ProductSliderFullscreen
		v-model="fullscreen"
		:data="certificates"
> </ProductSliderFullscreen>

</template>

<script lang="ts">
import { ref, onUpdated, watch } from 'vue'
import ProductPropertiesCard from '/src/components/cards/Product/ProductPropertiesCard.vue'
import ProductSliderFullscreen from '/src/components/cards/Product/ProductSliderFullscreen.vue'
import ButtonWithIcon from '/src/components/ui/ButtonWithIcon.vue'
import { Sliders } from '/src/models/Components'
import axios from '/src/plugins/axios'
import { ButtonState } from '/src/components/ui/button/state'
import { IconsSVG } from '/src/components/ui/button/icons'
import Preloader from '/src/components/PreloaderLocal.vue' 
import { useStore } from '/src/store'

export default {
	components: { ProductPropertiesCard, ProductSliderFullscreen,ButtonWithIcon,Preloader },
	props: {
		data: {
		type: Object
		},
	protect: {
			type: Array
		},
	},
	setup(props) {
		let content_switch = ref('detail')
		let show = ref(true)

		//Слайдер с сертефикатами
		let slides = ref<Sliders[]>([])
		let fullscreen = ref(false)
		let certificates = ref([])
		let showCertificates = ref(false)
		// костыль для переключения на закладку ОПИСАНИЕ
		let productID = ref(useStore().getters.getProduct.ID)

		onUpdated( () => {
			// костыль для переключения на закладку ОПИСАНИЕ
			if(productID.value != useStore().getters.getProduct.ID) {
				productID.value = useStore().getters.getProduct.ID
				content_switch.value = 'detail'
				showCertificates.value = false;
			}
		});

		let next = () => {
			const first = <Sliders>slides.value.shift();
			slides.value = slides.value.concat(first);
		};
		let prev = () => {
			const last = <Sliders>slides.value.pop();
			slides.value = [last].concat(slides.value);
		};

		//Скачивание сертификатов
		let btnText = ref('Скачать сертификаты архивом ')
		let btnState = ref<ButtonState>(ButtonState.Active)
		let btnIcon = IconsSVG.Download
		let isDownload = ref(false)
		let getCirtificates = (state: boolean) => {
			if(state)
				return;
			
			slides.value = []
			certificates.value = [];

			let productID = props.data.UID
			console.log(productID)

			axios.get('/product/'+ productID +'/certificates')
				.then(response => {
					response.data?.forEach( (v: string, i: number) => { 
						slides.value.push(<Sliders>{id: i, src: v})
						certificates.value.push(v)	
					})
				})
				.catch(error => {
					//todo: сделать проверку на ошибки
					console.log('error')
					console.log(error)
					//commit(OrdersMutations.SET_ORDERS_DOCSTATUS_ERROR)
					//commit(AuthMutations.SET_ERROR, 'Request GET_ORDERS_DOCSTATUS error:<br>'+error)
				})
				.finally( function() { 
					showCertificates.value = true;
				})
		}

		let download = () => { 
			btnState.value = ButtonState.InProgress
			btnText.value = 'Архив скачивается, подождите'
			let productID = props.data.UID

			axios.get('/product/'+ productID +'/certificates/download',
				{
					responseType: 'blob',
					transformRequest: (_, headers) => {
						delete headers?.common
					}
				})
				.then(response => {
					const url = window.URL.createObjectURL(new Blob([response.data]));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', 'cert.zip');
					document.body.appendChild(link);
					link.click();
					
					// clean up "a" element & remove ObjectURL
					document.body.removeChild(link);
					window.URL.revokeObjectURL(url);
					isDownload.value = !isDownload
				})
				.catch(error => {
					//todo: сделать проверку на ошибки
					console.log('error')
					console.log(error)
					//commit(OrdersMutations.SET_ORDERS_DOCSTATUS_ERROR)
					//commit(AuthMutations.SET_ERROR, 'Request GET_ORDERS_DOCSTATUS error:<br>'+error)
				})
				.finally( function() { 
					btnState.value = ButtonState.Active
					btnText.value = 'Скачать сертификаты архивом ' 
				})
		}

		return {
			content_switch,
			show,
			fullscreen,
			slides,
			isDownload,
			btnText,
			btnState,
			btnIcon,
			certificates,
			showCertificates,
			download,
			getCirtificates,
			prev,
			next
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

.certificate-download-container
  cursor: pointer 
  display: table 
  position: relative 
  align-items: center 
  margin: 0 0 0 auto

.certificate-download-container-text
  font-weight: 800
  vertical-align: super
	
.certificate-download-container
  &:hover
    .certificate-download-container-text
      color: #FAC12E
    .svg-line
      fill: #FAC12E
      stroke: #FAC12E
    .svg-line
      fill: #FAC12E
      stroke: #FAC12E
</style>