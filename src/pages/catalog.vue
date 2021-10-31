<template>
<div>

		<div class="top-line main-page">
				<div class="top-line-menu-btn"><span></span><span></span><span></span></div>
				<Notification />
				<PersonalBar />
		</div>

	<div class="catalog">		
			<CatalogMenu :loading="loaderMenu" :data="catalogMenu" v-model:catalogName="currentCategory" v-model:showMenu="showMenu" />
	
			<div class="catalog-head-card">
				<span v-if="currentCategory">{{currentCategory}}</span>
				<span v-else>Выберите категорию из каталога</span>
			</div>
		
		
	</div>

<PreloaderLocal v-if="loaderCatalog" />
<div class="content-wrap content-main-wrap" style="flex-direction: column;" v-if="isLoad ">
		
	<a class="news" href="#" style="margin-bottom: 5px" 
		v-for="item of catalog.products" 
		:key="item.id"
		>
					
		<div class="news-img-box">
			<img class="news-img" :src="item.image" alt="" />
		</div>

		<div class="news-text">
			<div class="news-heading">
				<div class="news-heading-text">{{ item.title }}</div>
				<div class="news-heading-date">{{ item.article }}</div>
			</div>
			<div class="news-description">{{ item.description }}</div>
			<div class="news-heading-text"><strong>Цена:</strong> {{item.prices.retail}} ₽</div>
		</div>
	</a>
</div>

</div>
</template>

<script>

import Notification from '@/components/cards/Notification.vue';
import PersonalBar  from '@/components/cards/PersonalBar.vue';
import CatalogMenu  from '@/components/cards/Catalog/CatalogMenu.vue';
import PreloaderLocal  from '@/components/PreloaderLocal.vue';

import { useStore } from 'vuex';
import { ref, computed, onMounted, watch } from 'vue';

export default {
		components:{
				Notification,
				PersonalBar,
				CatalogMenu,
				PreloaderLocal
		},
		props: ['id'],
		setup(props){
			const store = useStore();
			//const {catalog, isLoad} = useCatalog('letnyaya',1);
			let loaderMenu = ref(false);
			let loaderCatalog = ref(false);
			let currentCategory = ref(null);
			let showMenu = ref(true)
			
			watch( () => props.id, () => {
				if (props.id !=='') {
					loaderCatalog.value = true;
					store.dispatch('GET_CATALOG', {code: props.id, page: 1})
						.then(() => {loaderCatalog.value = false})
					}
			})

			onMounted(() => {
				if (!store.getters.isCatalogMenuLoad) {
					loaderMenu.value = true;
					store.dispatch('GET_CATALOG_MENU')
						.then(() => {loaderMenu.value = false})
				}
			});

			return{
				currentCategory,
				loaderMenu,
				loaderCatalog,
				showMenu,
				catalogMenu: computed(() => store.getters.getCatalogMenu),
				catalog: computed(() => store.getters.getCatalog),				
				isLoad: computed(() => store.getters.isCatalogLoad),
			}
		}
};
</script>

<style>
</style>