<template>
<div>
		<div class="top-line main-page">
				
				<Notification />
				<PersonalBar />
		</div>

		<CompanyBar 
				:data = companys
				:loading= loading
		/>

		<div class="content-wrap content-main-wrap">
			<div class="content-wrap-elem">
				<news></news>
				<show-cases></show-cases>
			</div>
			<div class="content-wrap-elem" v-if="randomCase">
				<router-link class="banner" :to="'/product/'+randomCase.article">
					<div class="banner-img-box">
						<img
							class="banner-img" 
							:src="randomCase.image"
							alt=""></div>
					<div class="banner-btn">Подробнее</div>
				</router-link>
			</div>
		</div>
</div>
</template>

<script lang="ts">
import Notification from '@/components/cards/Notification.vue'
import PersonalBar  from '@/components/cards/PersonalBar.vue'
import CompanyBar   from '@/components/cards/Company/CompanyBar.vue'
import News         from '@/components/cards/Main/News.vue'
import ShowCases from '@/components/cards/Main/ShowCases.vue'

import { useStore } from 'vuex'
import { computed, defineComponent, onMounted, ref} from 'vue'
import { key } from '@/store'
import { CompanyActions } from '@/store/company/actions'

export default defineComponent({
	components: {
			Notification,
			PersonalBar,
			CompanyBar,
			News,
			ShowCases
	},
	setup(){
		const store = useStore(key);
		const loading = ref(false);
		onMounted(() => {
			if (!store.getters.isCompanysLoad)
			{
				loading.value=true;
				store.dispatch(CompanyActions.GET_COMPANYS).finally(() => loading.value=false)
			}
		});
		return {
			loading,
			randomCase: computed(() => store.getters.getRandomCase),
			companys: computed(() => store.getters.getCompanys),
		}
	}
})
</script>

<style>

</style>