<template>
	<div class="company-consultant">
	
		<div v-if="manager && Object.keys(manager).length>0 " class="company-consultant-wrap content-elem">
			
			<div class="company-consultant-info">
				<PreloaderLocal style="margin: auto" v-if="loadingImage"/>
				<div class="company-consultant-img-box" v-else>
					
					<img class="company-consultant-img" :src="image" v-if="loadImage">
					<img class="company-consultant-img" src="/src/assets/img/user.png" alt=""  v-else>
					

				</div>
				<div class="company-consultant-info-box">
					<div class="company-consultant-info-about"> 
						<div class="company-consultant-name">{{manager.name}}</div>
						<div class="company-consultant-position">Персональный менеджер</div>
					</div>
					<div class="company-consultant-contact">
						<a 
							class="company-consultant-phone" :href="'tel:'+manager.contact">{{manager.contact}}
						</a>
						<a v-if="manager.phone1!==''"
							class="company-consultant-phone" :href="'tel:'+manager.phone1">{{manager.phone1}}
						</a>
						<a v-if="manager.phone2!==''"
							class="company-consultant-phone" :href="'tel:'+manager.phone2">{{manager.phone2}}
						</a>
					</div>
				</div>
			</div>
				<a class="company-consultant-mail" :title="manager.email" :href="'mailto:'+manager.email">
					<img class="company-consultant-mail-img" src="/src/assets/img/icon/mail-send.svg" alt="">Написать
				</a>
		</div>
		<div v-else class="company-consultant-wrap content-elem">
			
			<div class="company-consultant-info">
				<PreloaderLocal style="margin: auto"/>
				
			</div>
				<a class="company-consultant-mail">
					<img class="company-consultant-mail-img" src="/src/assets/img/icon/mail-send.svg" alt="">Написать
				</a>
		</div>
	</div>
</template>

<script setup lang="ts">
	import PreloaderLocal from '/src/components/PreloaderLocal.vue';
	import { ref, PropType, watch } from 'vue'
	import { Manager } from '/src/models/Manager'
	import axios from 'axios'

	const props = defineProps({
		manager: {
			type: Object as PropType<Manager>,
		}
	})
	const loadImage = ref(false)
	const loadingImage = ref(false)
	const image = ref('')
	watch (()=> props.manager, ()=>{
		loadImage.value=false
		loadingImage.value=true
		if (props.manager && props.manager.image){
			image.value = ''
			axios({
				method: 'get',
				timeout: 1000 * 3,
				// url: props.manager.image,
				url: props.manager.image,
				headers: {'Content-type': 'image/jpeg'}
			}).then(response => { 
				loadImage.value = true
				loadingImage.value=false
				image.value = 'data:image/jpg;base64,'.concat(image.value.concat(response.data))
			}).catch(()=>{
				loadingImage.value=false
				console.log('fail load img', props.manager?.image)
			})
  		}
		
	})
</script>

<style>
	
</style>