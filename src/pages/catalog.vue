<template>
<div>

		<div class="top-line main-page">
				<div class="top-line-menu-btn"><span></span><span></span><span></span></div>
				<Notification />
				<PersonalBar />
		</div>

	<div class="catalog">
		<div :class="'catalog-elem-menu' + (showMenu ? ' menu-open' : '')">
			<CatalogMenu :loading="loaderMenu" :data="catalogMenu" v-model:showMenu="showMenu" />
		</div>

		<div class="catalog-elem">
			<div class="catalog-head-card">
				<span v-if="getMenuCategoryName">{{getMenuCategoryName}}</span>
				<span v-else>Выберите категорию из каталога</span>
			</div>
		</div>

		<div :class="'catalog-body' + (showMenu ? ' menu-open' : '')">
			<PreloaderLocal v-if="loaderCatalog" class="catalog-body-preloader" />
			<div class="content-wrap content-main-wrap" style="flex-direction: column;" v-if="isLoad ">
					
				<router-link
						tag="a"
						class="news" 
						v-for="item of catalog.products" 
						:key="item.id"
						:to="'/product/' + item.article" 
				>
								
					<div class="news-img-box">
						<img class="news-img" :src="item.image" alt="" />
					</div>

					<div class="news-text">
						<div class="news-heading">
							<div class="news-heading-text">{{ item.title }}</div>
							<div class="news-heading-date">{{ item.article }}</div>
						</div>
						<div class="news-description" v-html="item.description" ></div>
						<div class="news-heading-text"><strong>Цена:</strong> {{item.prices.retail}} ₽</div>
					</div>
				</router-link>
			</div>
		</div>
	</div>
	<a class="page_up_down_butn" href="#" v-if="scroll > 200">Наверх</a>
</div>
</template>

<script>

import Notification from '@/components/cards/Notification.vue';
import PersonalBar  from '@/components/cards/PersonalBar.vue';
import CatalogMenu  from '@/components/cards/Catalog/CatalogMenu.vue';
import PreloaderLocal  from '@/components/PreloaderLocal.vue';

import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

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
			const router = useRouter();
			let loaderMenu = ref(false);
			let loaderCatalog = ref(false);
			let currentCategory = ref(null);
			let showMenu = ref(true);
			let getMenuCategoryName = computed(() => store.getters.getMenuCategoryName(props.id));
			let scroll = ref();
			let onScroll = (e) => {
				scroll.value = e.target.documentElement.scrollTop;
			}

			watch( () => props.id, () => {
				store.commit('clearCatalog')
				
				if (props.id !=='' & props.id !== undefined) {
					loaderCatalog.value = true;
					store.dispatch('GET_CATALOG', {code: props.id, page: 1})
						.then(() => {loaderCatalog.value = false})
					}
			})
			onBeforeUnmount(() => { window.removeEventListener("scroll", onScroll)});
			onMounted(() => {
				window.addEventListener("scroll", onScroll);
				if (!store.getters.isCatalogMenuLoad) {
					loaderMenu.value = true;
					store.dispatch('GET_CATALOG_MENU')
						.then(() => {
							loaderMenu.value = false;
							if (!getMenuCategoryName.value) 
								router.push({name: 'Catalog'});
						})
				}
				store.commit('clearCatalog')
				if (props.id !=='' & props.id !== undefined) {
					loaderCatalog.value = true;
					store.dispatch('GET_CATALOG', {code: props.id, page: 1})
						.then(() => {loaderCatalog.value = false})
					}
			});

			return{
				currentCategory,
				loaderMenu,
				loaderCatalog,
				showMenu,
				catalogMenu: computed(() => store.getters.getCatalogMenu),
				catalog: computed(() => store.getters.getCatalog),
				getMenuCategoryName,
				isLoad: computed(() => store.getters.isCatalogLoad),
				scroll,
			}
		}
};
</script>

<style scoped>
</style>