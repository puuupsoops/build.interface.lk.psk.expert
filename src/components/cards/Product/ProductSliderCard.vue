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

		// хелпер, для преобразования в base64
		const toBase64 = (res: Blob) => new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(res);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});

		let exploreImage = async () => {
			let sliderCurrentValue = <{id: number,src: string}>slides.value[0];
			let url = new URL(sliderCurrentValue.src);
			let arPaths = url.pathname.split('/');
			let fileNameData = arPaths[arPaths.length - 1]; 
			let arFileName = fileNameData.split('.');
			let fileName = arFileName[0]; // имя файла

			
			let w = window.open('about:blank',fileName)
			w?.document.write(`<img src="${url.href}" alt="${fileNameData}" />`);
		}

		let downloadImageAsPng = async () => {
			await downloadCurrentImage('png');
		}

		let downloadImageAsJpeg = async () => {
			await downloadCurrentImage('jpg');
		}

		let downloadImageAsWebp = async () => {
			await downloadCurrentImage('webp');
		}

		let downloadCurrentImage = async (ext: string) => {
			let sliderCurrentValue = <{id: number,src: string}>slides.value[0];
			let url = new URL(sliderCurrentValue.src);
			
			//определяем имя файла и его тип
			let arPaths = url.pathname.split('/');
			let fileNameData = arPaths[arPaths.length - 1]; // берем последнее значение url
			let arFileName = fileNameData.split('.');
			let fileName = arFileName[0]; // имя файла
			let fileExt = arFileName[1]; // расширение файла
			
			var image = new Image();
			image.onload = function () {
				let ctx = <HTMLImageElement>this;
				var canvas = <HTMLCanvasElement>document.createElement('canvas');
				canvas.width = ctx.naturalWidth;
				canvas.height = ctx.naturalHeight;
				canvas.getContext('2d')?.drawImage(ctx, 0, 0);
				//document.getElementById(id).src = canvas.toDataURL('image/jpeg');

				canvas.toBlob( (blob: Blob) => {
					const url = window.URL.createObjectURL(blob);
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', `${fileName}.${ext}`);
					document.body.appendChild(link);
					link.click();
					
					// clean up "a" element & remove ObjectURL
					document.body.removeChild(link);
					window.URL.revokeObjectURL(url);
				});
    		};

			image.crossOrigin = 'Anonymous'
  			image.src = sliderCurrentValue.src + '?not-from-cache-please'
			
		}


		return {
			loader,
			slides,
			fullscreen,
			hideLogoApplicationModalWindow,
			next,
			previous,
			toBase64,
			downloadCurrentImage,
			downloadImageAsPng,
			downloadImageAsJpeg,
			downloadImageAsWebp,
			exploreImage,
		}
	}
})
</script>
<template>
<div class="content-elem">
	<div class="product-slider-wrap" v-if="!loader">
    <div class="product-slider-main">
      <button class='product-slider-arrow prev' @click="previous"></button>
      <transition-group name="product-slider-trans" class='product-slider touch' tag="div">

			<!-- Кнопка скачивания изображений-->
			<div 
				@click="downloadImageAsPng"
				class="product-buttons-stance"
			>
								<div  class="product-buttons-stance-download">	
									<div class="product-buttons-stance-download-picture">
										<a >
											<svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
											<path d="M20 15V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18L4 15M8 11L12 15M12 15L16 11M12 15V3" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
											</svg>
										</a>
									</div>
								</div>
							</div>

			<!-- Блок кнопок снизу-->
			<div class="product-buttons-position" >
				<!--
				<div class="product-buttons-position-btn ">
					<div class="product-buttons-position-btn-img">
						<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
							<path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/>
						</svg>
					</div>
				</div>-->
				<div
					@click="exploreImage"
					class="product-buttons-position-btn product-buttons-position-radius"
				>
					<div class="product-buttons-position-btn-img">
						<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
							<path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z"/>
						</svg>
					</div>
				</div>
				<!--<div
					@click="downloadImageAsWebp"
					class="product-buttons-position-btn"
				>
					<div class="product-buttons-position-btn-img">
						<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
							<path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/>
						</svg>
					</div>
				</div>-->
				<div
					@click="downloadImageAsJpeg"
					class="product-buttons-position-btn product-buttons-position-rad"
				>
					<div class="product-buttons-position-btn-img">
						<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="24" height="24" viewBox="0 0 1024 1024">
							<path d="M874.6 301.8L596.8 21.3c-4.5-4.5-9.4-8.3-14.7-11.5-1.4-.8-2.8-1.6-4.3-2.3-.9-.5-1.9-.9-2.8-1.3-9-4-18.9-6.2-29-6.2H201c-39.8 0-73 32.2-73 72v880c0 39.8 33.2 72 73 72h623c39.8 0 71-32.2 71-72V352.5c0-19-7-37.2-20.4-50.7zM583 110.4L783.8 312H583V110.4zM823 952H200V72h311v240c0 39.8 33.2 72 73 72h239v568zM350 696.5c0 24.2-7.5 31.4-21.9 31.4-9 0-18.4-5.8-24.8-18.5L272.9 732c13.4 22.9 32.3 34.2 61.3 34.2 41.6 0 60.8-29.9 60.8-66.2V577h-45v119.5zM501.3 577H437v186h44v-62h21.6c39.1 0 73.1-19.6 73.1-63.6 0-45.8-33.5-60.4-74.4-60.4zm-.8 89H481v-53h18.2c21.5 0 33.4 6.2 33.4 24.9 0 18.1-10.5 28.1-32.1 28.1zm182.5-9v36h30v30.1c-4 2.9-11 4.7-17.7 4.7-34.3 0-50.7-21.4-50.7-58.2 0-36.1 19.7-57.4 47.1-57.4 15.3 0 25 6.2 34 14.4l23.7-28.3c-12.7-12.8-32.1-24.2-59.2-24.2-49.6 0-91.1 35.3-91.1 97 0 62.7 40 95.1 91.5 95.1 25.9 0 49.2-10.2 61.5-22.6V657H683z"/>
						</svg>
					</div>
				</div>
			</div>

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
		<!-- <div
			class="product-slider-link"
			@click="$emit('toOrder', $event.target.click)"
		>Заказать</div>-->
		<!-- <div class="product-slider-link">Добавить в КП</div> 
		<div class="product-slider-link"
			@click="hideLogoApplicationModalWindow = false;"
		>Создать макет нанесения</div>
		<div class="product-slider-link"
			@click="$emit('toLogo')"
		>Создать макет нанесения</div>
		-->
		
		<router-link
				style="width: 100%"
				class="product-slider-link"
				to="/logo"
				title="Нанести логотип"
		> Создать макет нанесения</router-link>
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

<style lang="sass" scoped>
.product-slider-buttons
	display: flex
	align-items: center
.product-slider-buttons
	& > div
		margin: auto
		width: auto
</style>