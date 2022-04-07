<template>
<div>
	<div class="top-line product-page">
		<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid"></CompanyBarTop>
		<Notification></Notification>
		<PersonalBar></PersonalBar>
		
	</div>
	<top-nav catalog></top-nav>

	<ProductSearchInput v-model="search_str" @search="doSearch()"></ProductSearchInput>
		


	<div v-if="productFound.length>0">  
		<ProductHeaderCard
			:title="String(product.NAME)"
			:price="String(product.PRICE_OPT)"
			:status="String(product.STATUS)"
			:discount="discount"
			@ShowSearch="newSearch()"
			v-if="isLoad"/>
		<br>
			
		<div class="content-wrap content-product-wrap" v-if="isLoad">
			<div class="content-wrap-elem">

				<ProductSearchResultCard 
					:data="productFound" 
					:cardType="'search'"
					v-model="activeProductId" 
					@onClick="loadProduct()"

				/>
				<div class="content-elem-desc">
					<ProductOffersCard 
						:data="productOffers"
						:discount="discount"
					/>
				</div>
				<ProductAddInfoCard></ProductAddInfoCard>
		
			</div>
			<div class="content-wrap-elem">
				<ProductSliderCard :data="productImages" @toOrder="toOrder"></ProductSliderCard>
				<ProductParcelCard :data="product" :discount="discount"></ProductParcelCard>
				<ProductInfoCard :data="product" :protect="productProtect"></ProductInfoCard>
			</div>
		</div>
	</div>
	<div v-else>
		<div v-if="isLoad">не найдено</div>
	</div>
</div>
</template>

<script lang="ts">
import PersonalBar from '@/components/cards/PersonalBar.vue'
import Notification from '@/components/cards/Notification.vue'
import CompanyBarTop from '@/components/cards/Company/CompanyBarTop.vue'
import ProductHeaderCard from '@/components/cards/Product/ProductHeaderCard.vue'
import ProductSearchResultCard from '@/components/cards/Product/ProductSearchResultCard.vue'
import ProductOffersCard from '@/components/cards/Product/ProductOffersCard.vue'
import ProductAddInfoCard from '@/components/cards/Product/ProductAddInfoCard.vue'
import ProductSliderCard from '@/components/cards/Product/ProductSliderCard.vue'
import ProductParcelCard from '@/components/cards/Product/ProductParcelCard.vue'
import ProductInfoCard from '@/components/cards/Product/ProductInfoCard.vue'
import ProductSearchInput from '@/components/cards/Product/ProductSearchInput.vue'
import TopNav from '@/components/nav/TopNav.vue'

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, onMounted, computed, defineComponent } from 'vue'
import { key } from '@/store'
import { KeysMutations } from '@/store/keys/mutations'
import { CompanyActions } from '@/store/company/actions'
import { ProductActions } from '@/store/product/actions'
import { ProductMutations } from '@/store/product/mutations'

export default defineComponent({
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
		ProductSearchInput,
		TopNav
	},
	props: ['article'],
	setup(props) {
		const store = useStore(key);
		const router = useRouter();
		const loader = computed<boolean>({
			get: () => store.getters.getLoader,
			set: (val: boolean) => store.commit(KeysMutations.SET_LOADER, val)
		})

		const activeCompanyUid = ref('');
		const search_str = ref('')
		const isLoad = ref(false);
		const activeProductId = ref('');
		const productSearch = ref(true);

		const toOrder = () => {
			router.push({name: 'Order'});
			//store.dispatch('ADD_PRODUCT_TO_CART', store.getters.getPtoductToCart)
			//	.then(()=>{router.push({name: 'Order'});})
		}

		onMounted(() => {
			if (!store.getters.isCompanysLoad || !store.getters.isManagerLoad)
				{
					Promise.all([
						store.dispatch(CompanyActions.GET_COMPANYS),
						])
						//.catch(()=>{alert('error')})
						.finally(() => { setTimeout(()=>{
								activeCompanyUid.value = store.getters.getCompanys === [] ? '' : store.getters.getCompanys[0].uid;
							},500); })
				}
				// if get parametr aticle is not emty when using product page else using search
			if (props.article !=='' && props.article !== undefined) {
				loader.value = true;
				store.dispatch(ProductActions.SEARCH_PRODUCT, props.article)
					.then(()=>{

						isLoad.value=true;
						if (store.getters.getProduct.ID)
							activeProductId.value=store.getters.getProduct.ID;
						else
							router.push({name: 'Product'});
						
						})
					.finally(() => {loader.value=false})
			}
		});
		
		const discount = computed(() => store.getters.getCompanyDiscount(activeCompanyUid.value, store.getters.getProductOffersORGGUID))

		const loadProduct = () => {
			loader.value = true;
			store.dispatch(ProductActions.GET_PRODUCT_BY_ID, activeProductId.value)
				.then(()=>{
					activeProductId.value=store.getters.getProduct.ID;
					})
				.finally(() => {loader.value=false})
		};

		const clearSearch = () => {
			isLoad.value = false;
			store.commit(ProductMutations.SET_SEARCH_PRODUCT_CLEAR);
		};

		const doSearch = () => {
			if (search_str.value.trim() !=='') {
				clearSearch();
				loader.value = true;
				store.dispatch(ProductActions.SEARCH_PRODUCT, search_str.value)
					.then(()=>{
						isLoad.value=true;
						activeProductId.value=store.getters.getProduct.ID;
						})
					.finally(() => {loader.value=false})
			}
		}
		const newSearch = () => {
			clearSearch()
			search_str.value = ''
			router.push('/product')
		}
		return {
			companyBarTopData: computed(() => store.getters.getCompanysList),
			resultSearch: computed(() => store.getters.getProductSearchResult),
			productOffers: computed(() => store.getters.getProductOffers),
			product: computed(() => store.getters.getProduct),
			productFound: computed(() => store.getters.getProductFound),
			productImages: computed(() => store.getters.getProductImages),
			productProtect: computed(() => store.getters.getProductProtect),
			discount,
			productSearch,
			isLoad,
			activeCompanyUid,
			activeProductId,
			search_str,
			doSearch,
			clearSearch,
			loadProduct,
			toOrder,
			newSearch
		}
	},
})
</script>


<style lang="sass">

</style>