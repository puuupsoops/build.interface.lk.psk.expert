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

<script setup lang="ts">
	import Notification from '/src/components/cards/Notification.vue'
	import PersonalBar  from '/src/components/cards/PersonalBar.vue'
	import CompanyBar   from '/src/components/cards/Company/CompanyBar.vue'
	import News         from '/src/components/cards/Main/News.vue'
	import ShowCases	from '/src/components/cards/Main/ShowCases.vue'

	import { useStore } from '/src/store'
	import { computed, onMounted, ref} from 'vue'

	import { CompanyActions } from '/src/store/company/actions'

	const store = useStore();

	const loading = ref(false);

	onMounted(() => {
			if (!store.getters.isCompanysLoad)
			{
				loading.value=true;
				store.dispatch(CompanyActions.GET_COMPANYS).finally(() => loading.value=false)
			}
		});

	const randomCase = computed(() => store.getters.getRandomCase)
	const companys = computed(() => store.getters.getCompanys)
</script>

<style>

</style>