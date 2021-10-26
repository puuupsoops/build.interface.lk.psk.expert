<template>
		<div class="top-line main-page">
				
				<Notification />
				<PersonalBar />
		</div>

		<CompanyBar 
				:data = companys
		/>

		<div class="content-wrap content-main-wrap">
				
<!--				<Showcase /> -->


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