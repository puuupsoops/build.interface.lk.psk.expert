<template>
	<div class="company-consultant">
		<div v-if="!isLoad" class="company-consultant-wrap content-elem">
			
			<div class="company-consultant-info">
				<div class="company-consultant-img-box"><img class="company-consultant-img" :src="managerData.image" :alt="managerData.name"></div>
				<div class="company-consultant-info-box">
					<div class="company-consultant-info-about"> 
						<div class="company-consultant-name">{{name}}</div>
						<div class="company-consultant-position">Персональный менеджер</div>
					</div>
					<div class="company-consultant-contact">
						<a 
							class="company-consultant-phone" :href="'tel:'+managerData.contact">{{managerData.contact}}
						</a>
						<a v-if="managerData.phone1!==''"
							class="company-consultant-phone" :href="'tel:'+managerData.phone1">{{managerData.phone1}}
						</a>
						<a v-if="managerData.phone2!==''"
							class="company-consultant-phone" :href="'tel:'+managerData.phone2">{{managerData.phone2}}
						</a>
					</div>

					<!-- <div class="company-consultant-info-about"> 
						<div class="company-consultant-name">Иванов Иван Иванович</div>
						<div class="company-consultant-position">Руководитель</div>
					</div>
					<div class="company-consultant-contact">
						<a 
							class="company-consultant-phone" href="tel:">495-103-3030 доб.577
						</a>
					</div>

					<div class="company-consultant-time">
						<div class="company-consultant-time-title">Режим работы</div>
						<div class="company-consultant-time-val">Пн-Пт, 9:00 - 18:00 МСК</div>
					</div> -->
				</div>
			</div>
				<a class="company-consultant-mail" :title="managerData.email" :href="'mailto:'+managerData.email">
					<img class="company-consultant-mail-img" src="/src/assets/img/icon/mail-send.svg" alt="">Написать
				</a>
		</div>
	</div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { key } from '/src/store'
import { ref, computed, onMounted, defineComponent } from 'vue'
import { CompanyActions } from '/src/store/company/actions'

export default defineComponent( {
	props:{
		name: String
	},
	setup(){
		let store = useStore(key);
		let isLoad = ref(true);
		onMounted(() => {
			if (Object.keys(store.getters.getManager).length == 0 ){
				
				store.dispatch(CompanyActions.GET_MANAGER)
					.then(() => {
						isLoad.value = false;
					})}
			else isLoad.value = false;
			});
		return{
			isLoad,
			managerData: computed(() => store.getters.getManager),
		}
	}
})
</script>

<style>
	
</style>