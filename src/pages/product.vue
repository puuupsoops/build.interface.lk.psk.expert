<template>
<div>
	<div class="top-line product-page">
		<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid"></CompanyBarTop>
		<Notification></Notification>
		<PersonalBar></PersonalBar>
		
	</div>
	<top-nav></top-nav>

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
		<ProductHeaderCard
			:title="String(product.NAME)"
			:price="String(product.PRICE)"
			:status="String(product.STATUS)"
			v-if="isLoad"/>
		<div class="content-wrap content-product-wrap" v-if="isLoad">
			<div class="content-wrap-elem">

				<ProductSearchResultCard 
					:data="productFound" 
					:cardType="'search'"
					v-model="activeProductId" 
					@onClick="loadProduct()"

				/>
				<div class="content-elem-desc">
					<ProductOffersCard :data="productOffers"/>
				</div>
				<ProductAddInfoCard></ProductAddInfoCard>
		
			</div>
			<div class="content-wrap-elem">
				<ProductSliderCard :data="productImages" @toOrder="toOrder"></ProductSliderCard>
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
import ProductOffersCard from '@/components/cards/Product/ProductOffersCard'
import ProductAddInfoCard from '@/components/cards/Product/ProductAddInfoCard'
import ProductSliderCard from '@/components/cards/Product/ProductSliderCard'
import ProductParcelCard from '@/components/cards/Product/ProductParcelCard'
import ProductInfoCard from '@/components/cards/Product/ProductInfoCard'
import TopNav from '@/components/nav/TopNav'

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, onMounted, computed, inject } from 'vue'

export default {
	components:{
		PersonalBar,
		Notification,
		CompanyBarTop,
		ProductHeaderCard,
		ProductSearchResultCard,
		ProductOffersCard,
		ProductAddInfoCard,
		ProductSliderCard,
		ProductParcelCard,
		ProductInfoCard,
		TopNav
	},
	props: ['article'],
	setup(props) {
		const store = useStore();
		const router = useRouter();
		const loader = inject('loader');

		const activeCompanyUid = ref('');
		const search_str = ref('')
		const isLoad = ref(false);
		const activeProductId = ref('');
		

		const toOrder = () => {
			router.push({name: 'Order'});
			//store.dispatch('ADD_PRODUCT_TO_CART', store.getters.getPtoductToCart)
			//	.then(()=>{router.push({name: 'Order'});})
		}

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

		const loadProduct = () => {
			loader.value = true;
			store.dispatch('GET_PRODUCT_BY_ID', activeProductId.value)
				.then(()=>{
					activeProductId.value=store.getters.getProduct.ID;
					})
				.finally(() => {loader.value=false})
		};

		const clearSearch = () => {
			isLoad.value = false;
			store.commit('setSearchProductClear');
		};

		const doSearch = () => {
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
			toOrder,
		}
	},
}
</script>


<style lang="sass">

</style>