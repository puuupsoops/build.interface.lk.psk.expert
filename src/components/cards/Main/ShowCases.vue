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

<script lang="ts">
import CaseCard from '/src/components/cards/Main/CaseCard.vue'
import PreloaderLocal from '/src/components/PreloaderLocal.vue'
;

import { ref, computed, onMounted, } from 'vue';
import { useStore } from '/src/store';
import { CasesActions } from '/src/store/cases/actions';
import { CasesMutations } from '/src/store/cases/mutations';

export default {
	components: {
		CaseCard,
		PreloaderLocal,
	},
	setup(){
		const store = useStore();
		let loading = ref(false);
		
		onMounted( () =>
		{
			if (!store.getters.isShowCases) {
				loading.value=true;
				store.dispatch(CasesActions.GET_CASE)
					.finally(() => {
						loading.value=false;
					})
					.catch(()=>{
					});
			}
		});
	

		let next = () => {
			store.commit(CasesMutations.SET_CASE_NEXT);
		};
		let previous = () => {
			store.commit(CasesMutations.SET_CASE_PREV);
		};

		return {
			loading,
			isLoad: computed(() => store.getters.isCases),
			showCases: computed(() => store.getters.getCases),
			next,
			previous,
		};
	}
}
</script>

<style>

</style>