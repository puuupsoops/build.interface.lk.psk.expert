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
			
			<CatalogPagination
				v-if="isLoad"
				:currentPage="currentPage"
				:maxPage="catalogPageCount"
				@prev="changePage(-1)"
				@next="changePage(+1)"
			/>
			<PreloaderLocal v-if="loaderCatalog" class="catalog-body-preloader" />
			<div class="catalog-body-items" >
				
				<div  v-if="isLoad ">
					<CatalogItem 
					
						v-for="item of catalog.products"
						:key="item.id"
						:data="item"/>
				</div>
				<CatalogPagination
					v-if="isLoad"
					:currentPage="currentPage"
					:maxPage="catalogPageCount"
					@prev="changePage(-1)"
					@next="changePage(+1)"
				/>
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
import CatalogItem  from '@/components/cards/Catalog/CatalogItem.vue';
import CatalogPagination  from '@/components/cards/Catalog/CatalogPagination.vue';
import PreloaderLocal  from '@/components/PreloaderLocal.vue';

import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

export default {
		components:{
				Notification,
				PersonalBar,
				CatalogMenu,
				CatalogItem,
				CatalogPagination,
				PreloaderLocal
		},
		props: ['id'],
		setup(props){
			const store = useStore();
			const router = useRouter();
			const loaderMenu = ref(false);
			const loaderCatalog = ref(false);
			const currentCategory = ref(null);
			const showMenu = ref(true);
			const getMenuCategoryName = computed(() => store.getters.getMenuCategoryName(props.id));
			const scroll = ref();
			const currentPage = ref(1);

			const onScroll = (e) => {
				scroll.value = e.target.documentElement.scrollTop;
			}

			const changePage = (offset) => {
				if (currentPage.value + offset >= 1 & currentPage.value + offset <= store.getters.getPageCount)
				{
					currentPage.value = currentPage.value + offset;
					loaderCatalog.value = true;
					store.dispatch('GET_CATALOG', {code: props.id, page: currentPage.value})
						.then(() => {loaderCatalog.value = false})
				}
			}

			watch( () => props.id, () => {
				store.commit('clearCatalog')
				currentPage.value = 1;
				if (props.id !=='' & props.id !== undefined) {
					loaderCatalog.value = true;
					store.dispatch('GET_CATALOG', {code: props.id, page: currentPage.value})
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
					store.dispatch('GET_CATALOG', {code: props.id, page: currentPage.value})
						.then(() => {loaderCatalog.value = false})
					}
			});

			return{
				currentCategory,
				loaderMenu,
				loaderCatalog,
				showMenu,
				currentPage,
				catalogPageCount:computed(() => store.getters.getPageCount),
				changePage,
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