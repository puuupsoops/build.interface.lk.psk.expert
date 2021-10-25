<template>
		<div class="top-line main-page">
				<div class="top-line-menu-btn"><span></span><span></span><span></span></div>
				<Notification />
				<PersonalBar />
		</div>

		<CompanyBar 
				:data = companys
		/>

		<div class="content-wrap content-main-wrap">
				
<!--				<Showcase /> -->

				<div class="content-wrap-elem">
						<a class="banner" href="">
								<div class="banner-img-box">
										<img class="banner-img" src="@/assets/img/product/product-4.png" alt="">
								</div>
								<div class="banner-btn">Подробнее</div>
						</a>
				</div>

		</div>
</template>

<script>
import Notification from '../components/cards/Notification.vue';
import PersonalBar  from '../components/cards/PersonalBar.vue';
import CompanyBar   from '../components/cards/Company/CompanyBar.vue';
//import Showcase     from '../components/cards/Showcase.vue'; 

import { useStore } from 'vuex'
import {  computed, onMounted, inject} from 'vue'
export default {
	components: {
			Notification,
			PersonalBar,
			CompanyBar,
	//				Showcase
	},
	setup(){
		const store = useStore();
		const loader = inject('loader');
		onMounted(() => {
			if (!store.getters.isCompanysLoad)
			{
				loader.value=true;
				store.dispatch('GET_PARTNER').finally(() => loader.value=false)
			}
		});
		return {
			companys: computed(() => store.getters.getCompanys),
		}
	}
}
</script>

<style>

</style>