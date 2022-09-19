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
				v-if="isLoad || loaderCatalog"
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

<script lang="ts">
import Notification from '/src/components/cards/Notification.vue'
import PersonalBar  from '/src/components/cards/PersonalBar.vue'
import CatalogMenu  from '/src/components/cards/Catalog/CatalogMenu.vue'
import CatalogItem  from '/src/components/cards/Catalog/CatalogItem.vue'
import CatalogPagination  from '/src/components/cards/Catalog/CatalogPagination.vue'
import PreloaderLocal  from '/src/components/PreloaderLocal.vue'
import { useStore } from '/src/store'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted, onBeforeUnmount, watch, defineComponent } from 'vue'
;
import { CatalogActions } from '/src/store/catalog/actions'
import { CatalogMutations } from '/src/store/catalog/mutations'

export default defineComponent({
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
			const onScroll = (e: any) => {
				scroll.value = e.target.documentElement.scrollTop;
			}
			const changePage = (offset: number) => {
				if (currentPage.value + offset >= 1 && currentPage.value + offset <= store.getters.getPageCount)
				{
					currentPage.value = currentPage.value + offset;
					loaderCatalog.value = true;
					store.dispatch(CatalogActions.GET_CATALOG, {SECTION: props.id, PAGE: currentPage.value})
						.then(() => {loaderCatalog.value = false})
				}
			}
			watch( () => props.id, () => {
				store.commit(CatalogMutations.CLEAR_CATALOG)
				currentPage.value = 1;
				if (props.id !=='' && props.id !== undefined) {
					loaderCatalog.value = true;
					store.dispatch(CatalogActions.GET_CATALOG, {SECTION: props.id, PAGE: currentPage.value})
						.then(() => {loaderCatalog.value = false})
					}
			})
			onBeforeUnmount(() => { window.removeEventListener("scroll", onScroll)});
			onMounted(() => {
				window.addEventListener("scroll", onScroll);
				if (!store.getters.isCatalogMenuLoad) {
					loaderMenu.value = true;
					store.dispatch(CatalogActions.GET_CATALOG_MENU)
						.then(() => {
							loaderMenu.value = false;
							if (!getMenuCategoryName.value)
								router.push({name: 'Catalog'});
						})
				}
				store.commit(CatalogMutations.CLEAR_CATALOG)
				if (props.id !=='' && props.id !== undefined) {
					loaderCatalog.value = true;
					store.dispatch(CatalogActions.GET_CATALOG, {SECTION: props.id, PAGE: currentPage.value})
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
})
</script>

<style scoped>
</style>