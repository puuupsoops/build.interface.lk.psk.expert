<template>
<div>
	<div class="top-line product-page">
		<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid"></CompanyBarTop>
		<Notification></Notification>
		<PersonalBar></PersonalBar>
		
	</div>
	<top-nav></top-nav>

<div v-if="!isProduct" class="order-info">
	Для оформления заказа выберите товар в 
	<router-link tag="a" to="/catalog" class="order-info-link">каталоге</router-link> 
	и нажмите Заказать.
</div>
<div v-else>
		<ProductHeaderCard
			:title="String(product.NAME)"
			:price="String(product.PRICE)"
			:status="String(product.STATUS)"
		/>

	<div class="content-wrap content-product-wrap">
		<div class="content-wrap-elem">
			<ProductSearchResultCard 
					:data="productFound" 
					:cardType="'order'"
					v-model="activeProductId" 
					@onClick="loadProduct()"
					/>

		</div>
		<div class="content-wrap-elem">
			<ProductOffersOrderCard 
				:data="productOffers"
				v-model="characteristicArray"
				@onClick="addToOrder()"
			/>
		</div>
	</div>
	<OrderHeaderCard v-if="isOrder"/>
	<div class="content-heading-wrap proudct-heading-wrap" v-else>
		<div class="content-heading-wrap-elem">
			<div class="order-info">Добавьте позиции к заказу и тогда он будет сформирован</div>
		</div>
		
	</div>
	<div class="content-wrap content-order-wrap">
		<div class="content-wrap-elem">
			<OrderCard 
				v-if="isOrder"
			/>
		</div>
		<div class="content-wrap-elem"> 
			<ProductPropertiesCard
				:protect="productProtect"
			/>
			<div class="order-product-prev">
				<ProductSliderSmallCard 
					:data="productImages"
				/>
			</div>
		</div>
	</div>
</div>
</div>
</template>

<script>
import PersonalBar from '@/components/cards/PersonalBar'
import Notification from '@/components/cards/Notification'
import CompanyBarTop from '@/components/cards/Company/CompanyBarTop'
import TopNav from '@/components/nav/TopNav'
import ProductHeaderCard from '@/components/cards/Product/ProductHeaderCard'
import ProductSearchResultCard from '@/components/cards/Product/ProductSearchResultCard'
import ProductOffersOrderCard from '@/components/cards/Product/ProductOffersOrderCard'
import ProductPropertiesCard from '@/components/cards/Product/ProductPropertiesCard';
import ProductSliderSmallCard from '@/components/cards/Product/ProductSliderSmallCard';
import OrderHeaderCard from '@/components/cards/Order/OrderHeaderCard';
import OrderCard from '@/components/cards/Order/OrderCard';

import { useStore } from 'vuex'
import { ref, computed, onMounted, inject } from 'vue'

export default {
	components: {
		PersonalBar,
		Notification,
		CompanyBarTop,
		TopNav,
		ProductHeaderCard,
		ProductSearchResultCard,
		ProductOffersOrderCard,
		ProductPropertiesCard,
		ProductSliderSmallCard,
		OrderHeaderCard,
		OrderCard,
	},
	setup() {
		const store = useStore();
		const loader = inject('loader');
		
		const activeCompanyUid = ref('');
		const activeProductId = ref('');
		const characteristicArray = ref([]);

		const addToOrder = () => {
			console.log(characteristicArray.value)
			store.dispatch('CREATE_ORDER')
		}

		onMounted(() => {
			if (!store.getters.isCompanysLoad)
			{
				store.dispatch('GET_PARTNER')
			}
			activeProductId.value=store.getters.getProduct.ID;

			// If order is empty then create newOrder and 
		});

		const loadProduct = () => {
			loader.value = true;
			store.dispatch('GET_PRODUCT_BY_ID', activeProductId.value)
				.then(()=>{
					activeProductId.value=store.getters.getProduct.ID;
					})
				.finally(() => {loader.value=false})
		};

		return {
			companyBarTopData: computed(() => store.getters.getCompanys),
			activeCompanyUid,
			isProduct: computed(() => store.getters.isProduct),
			activeProductId,
			loadProduct,
			productOffers: computed(() => store.getters.getProductOffers),
			product: computed(() => store.getters.getProduct),
			productFound: computed(() => store.getters.getProductFound),
			productImages: computed(() => store.getters.getProductImages),
			productProtect: computed(() => store.getters.getProductProtect),
			addToOrder,
			characteristicArray,
			isOrder: computed(() => store.getters.isOrder),
		}
	}
}
</script>