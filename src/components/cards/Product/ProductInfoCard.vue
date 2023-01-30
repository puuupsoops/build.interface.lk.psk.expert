<template>
<div class="product-info product-info-tab content-elem">
	<div class="content-elem-heading"> 
		<div class="content-elem-heading-text">Подробно</div>
		<ul class="product-info-tab-nav">
			<li :class="content_switch === 'detail' ? 'product-info-tab-link active':'product-info-tab-link'"
				@click="content_switch = 'detail'">Описание</li>

			<li :class="content_switch === 'characteristics' ? 'product-info-tab-link active':'product-info-tab-link'"
				@click="content_switch = 'characteristics'">Характеристика</li>
			
			<li v-if="data.CERTIFICATES" :class="content_switch === 'certificate' ? 'product-info-tab-link active':'product-info-tab-link'"
				@click="content_switch = 'certificate'">Сертификат</li>	
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
				<p>
					<div 
						:class="'certificate-download-container'"
						@click="download();isDownload=true"
					>
							<svg :class="'sidebar-btn-img'" xmlns="http://www.w3.org/2000/svg" version="1.0" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" 
							preserveAspectRatio="xMidYMid meet"
							fill="#A5A7A9"
							:style="'width: 32px; height: 32px;'">
								<g :class="'svg-line'" transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#A5A7A9" stroke="#A5A7A9">
									<path :class="'svg-line'" fill="#A5A7A9" stroke="#A5A7A9" d="M930 4464 c-229 -49 -431 -246 -484 -474 -14 -57 -16 -241 -16 -1430 0 -1516 -4 -1425 68 -1570 54 -110 168 -223 282 -279 154 -75 45 -71 1780 -71 1327 0 1565 2 1625 15 233 49 435 245 489 475 23 98 23 2122 0 2220 -41 175 -172 340 -334 419 -147 72 -132 71 -990 71 -502 0 -778 4 -803 11 -65 18 -102 61 -179 213 -64 124 -83 151 -153 222 -63 64 -98 90 -165 123 -138 67 -168 71 -640 70 -315 0 -431 -4 -480 -15z m952 -449 c36 -26 55 -54 118 -173 41 -79 93 -165 115 -193 72 -91 205 -178 331 -215 54 -16 132 -18 869 -23 728 -5 813 -8 840 -23 37 -20 67 -52 91 -98 18 -34 19 -78 19 -1050 l0 -1015 -25 -45 c-14 -24 -45 -58 -68 -75 l-44 -30 -1546 -3 c-1079 -2 -1558 0 -1584 8 -49 14 -94 53 -121 104 l-22 41 0 1335 0 1335 22 40 c26 49 57 79 103 99 30 13 95 15 447 13 l411 -2 44 -30z"/>
									<path :class="'svg-line'" fill="#A5A7A9" stroke="#A5A7A9" d="M2510 2981 c-74 -24 -119 -63 -145 -123 -12 -30 -15 -83 -15 -272 l0 -234 -138 -4 c-128 -3 -140 -5 -184 -31 -84 -49 -124 -148 -98 -244 12 -43 38 -73 254 -291 136 -138 258 -253 281 -264 26 -14 59 -21 95 -21 36 0 69 7 95 21 23 11 145 126 281 264 216 218 242 248 254 291 26 96 -14 195 -98 244 -44 26 -56 28 -184 31 l-138 4 0 234 c0 251 -5 281 -53 332 -47 51 -149 82 -207 63z"/>
								</g>
							</svg>
						<span :class="'certificate-download-container-text'">{{ isDownload ? 'Идет скачивание...' : 'Скачать сертификаты архивом.' }}</span>
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
		:data="data.CERTIFICATES"
> </ProductSliderFullscreen>

</template>

<script lang="ts">
import { ref, onUpdated } from 'vue'
import ProductPropertiesCard from '/src/components/cards/Product/ProductPropertiesCard.vue'
import ProductSliderFullscreen from '/src/components/cards/Product/ProductSliderFullscreen.vue'
import { Sliders } from '/src/models/Components'
import axios from '/src/plugins/axios'

export default {
	components: { ProductPropertiesCard, ProductSliderFullscreen },
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
		props.data.CERTIFICATES?.forEach( (v: string, i: number) => slides.value.push(<Sliders>{ id: i, src: v })) 
		
		onUpdated( () => {
			slides.value = [];
			props.data.CERTIFICATES?.forEach( (v: string, i: number) => slides.value.push(<Sliders>{id: i, src: v}))
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
		let isDownload = ref(false)
		let download = () => {
			let productID = props.data.UID

			axios.get('/product/'+ productID +'/certificates',
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
					console.log('error')
					console.log(error)
					//commit(OrdersMutations.SET_ORDERS_DOCSTATUS_ERROR)
					//commit(AuthMutations.SET_ERROR, 'Request GET_ORDERS_DOCSTATUS error:<br>'+error)
				})
		}

		return {
			content_switch,
			show,
			fullscreen,
			slides,
			isDownload,
			download,
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