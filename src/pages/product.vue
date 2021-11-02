<template>
<div>
	<div class="top-line product-page">
		<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid"></CompanyBarTop>
		<Notification></Notification>
		<PersonalBar></PersonalBar>
		
	</div>
	<nav class="nav">
		<ul class="nav-list">
		<li class="active">
			<router-link
						tag="a"
						class="nav-link" 
						:to="'/product'">Поиск товара</router-link>
		</li>
		<li><a class="nav-link" href="#">Заказы</a></li>
		<li><a class="nav-link" href="#">Отгрузки</a></li>
		<li><a class="nav-link" href="#">Возвраты</a></li>
		<li><a class="nav-link" href="#">Претензии</a></li>
		<li><a class="nav-link" href="#">Договора</a></li>
		<li><a class="nav-link" href="#">Взаиморасчеты</a></li>
		</ul>
	</nav>


	<div class="product-search" v-if="article==''">
		<div class="product-search-input" >
			<input type="text" placeholder="Поиск" autocomplete="off" @keyup.enter="doSearch()" v-model="search_str">
			<div class="product-search-clear" @click="clearSearch();search_str = '';"></div>
		</div>
		<button class="product-search-btn gradient-btn" @click="doSearch()">
			<div>Поиск</div>
		</button><section></section>

	</div>

	<div v-if="productFound">  
		<ProductHeaderCard :title="String(product.NAME)" :price="String(product.PRICE)" :status="String(product.STATUS)" v-if="isLoad"></ProductHeaderCard>
		<div class="content-wrap content-product-wrap" v-if="isLoad">
			<div class="content-wrap-elem">

				<ProductSearchResultCard :data="productFound" v-model="activeProductId" @onClick="loadProduct()"></ProductSearchResultCard>
				<ProductMoreCard :data="productOffers"></ProductMoreCard>
				<ProductAddInfoCard></ProductAddInfoCard>
		
			</div>
			<div class="content-wrap-elem">
				<ProductSliderCard :data="productImages"></ProductSliderCard>
				<ProductParcelCard :data="product"></ProductParcelCard>
				<ProductInfoCard :data="product" :protect="productProtect"></ProductInfoCard>
			</div>
		</div>
	</div>
	<div v-else>
		<div v-if="isLoad">не найдено</div>
	</div>
</div>
</template>

<script>
import PersonalBar from '@/components/cards/PersonalBar'
import Notification from '@/components/cards/Notification'
import CompanyBarTop from '@/components/cards/Company/CompanyBarTop'
import ProductHeaderCard from '@/components/cards/Product/ProductHeaderCard'
import ProductSearchResultCard from '@/components/cards/Product/ProductSearchResultCard'
import ProductMoreCard from '@/components/cards/Product/ProductMoreCard'
import ProductAddInfoCard from '@/components/cards/Product/ProductAddInfoCard'
import ProductSliderCard from '@/components/cards/Product/ProductSliderCard'
import ProductParcelCard from '@/components/cards/Product/ProductParcelCard'
import ProductInfoCard from '@/components/cards/Product/ProductInfoCard'


import { useStore } from 'vuex'
import { ref, onMounted, computed, inject } from 'vue'

export default {
	components:{
		PersonalBar,
		Notification,
		CompanyBarTop,
		ProductHeaderCard,
		ProductSearchResultCard,
		ProductMoreCard,
		ProductAddInfoCard,
		ProductSliderCard,
		ProductParcelCard,
		ProductInfoCard,
	},
	props: ['article'],
	setup(props) {
		let store = useStore();

		let activeCompanyUid = ref('');
		let search_str = ref('')
		let isLoad = ref(false);
		let activeProductId = ref('');

		const loader = inject('loader');

		onMounted(() => {
			if (!store.getters.isCompanysLoad || !store.getters.isManagerLoad)
				{
					Promise.all([
						store.dispatch('GET_PARTNER'),
						])
						//.catch(()=>{alert('error')})
						.finally(() => { setTimeout(()=>{
								activeCompanyUid.value = store.getters.getCompanys === [] ? '' : store.getters.getCompanys[0].uid;
							},500); })
				}
				// if get parametr aticle is not emty when using product page else using search
			if (props.article !=='') {
				loader.value = true;
				store.dispatch('SEARCH_PRODUCT', props.article)
					.then(()=>{
						isLoad.value=true;
						activeProductId.value=store.getters.getProduct.ID;
						})
					.finally(() => {loader.value=false})
			}
		});

		let loadProduct = () => {
			loader.value = true;
			store.dispatch('GET_PRODUCT_BY_ID', activeProductId.value)
				.then(()=>{
					activeProductId.value=store.getters.getProduct.ID;
					})
				.finally(() => {loader.value=false})
		};

		let clearSearch = () => {
			isLoad.value = false;
			store.commit('setSearchProductClear');
		};

		let doSearch = () => {
			clearSearch();
			loader.value = true;
			store.dispatch('SEARCH_PRODUCT', search_str.value)
				.then(()=>{
					isLoad.value=true;
					activeProductId.value=store.getters.getProduct.ID;
					})
				.finally(() => {loader.value=false})
		}

		return {
			companyBarTopData: computed(() => store.getters.getCompanys),
			resultSearch: computed(() => store.getters.getProductSearchResult),
			productOffers: computed(() => store.getters.getProductOffers),
			product: computed(() => store.getters.getProduct),
			productFound: computed(() => store.getters.getProductFound),
			productImages: computed(() => store.getters.getProductImages),
			productProtect: computed(() => store.getters.getProductProtect),
			isLoad,
			activeCompanyUid,
			activeProductId,
			search_str,
			doSearch,
			clearSearch,
			loadProduct,
		}
	},
}
</script>


<style lang="sass">

</style>