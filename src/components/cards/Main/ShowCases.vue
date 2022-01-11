<template>

<div class="case-slider-wrap" >
	<div class='case-slider-arrow prev' @click="previous"></div>
		<preloader-local v-if="loading"></preloader-local>
		<transition-group 
			v-if="isLoad"
			class='case-slider'
			tag="div"
		>
			<case-card
				v-for="item in showCases" 
				:key="item.id"
				:data="item"
			/>
		</transition-group>

	<div class='case-slider-arrow next' @click="next"></div>

</div>

</template>

<script>
import CaseCard from '@/components/cards/Main/CaseCard';
import PreloaderLocal from '@/components/PreloaderLocal.vue';
import { key } from '@/store';

import { ref, computed, onMounted, } from 'vue';
import { useStore } from 'vuex';

export default {
	components: {
		CaseCard,
		PreloaderLocal,
	},
	setup(){
		const store = useStore(key);
		let loading = ref(false);
		
		onMounted( () =>
		{
			if (!store.getters.isShowCases) {
				loading.value=true;
				store.dispatch('GET_SHOW_CASE')
					.finally(() => {
						loading.value=false;
					})
					.catch(()=>{
					});
			}
		});
	

		let next = () => {
			store.commit('setSowCaseNext');
		};
		let previous = () => {
			store.commit('setSowCasePrev');
		};

		return {
			loading,
			isLoad: computed(() => store.getters.isShowCases),
			showCases: computed(() => store.getters.getShowCases),
			next,
			previous,
		};
	}
}
</script>

<style>

</style>