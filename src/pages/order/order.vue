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
	или воспользуйтесь 
	<router-link tag="a" to="/product" class="order-info-link">поиском</router-link>.

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
	<OrderHeaderCard 
		v-if="isOrder"
		:data="order"
	/>
	<div class="content-heading-wrap proudct-heading-wrap" v-else>
		<div class="content-heading-wrap-elem">
			<div class="order-info">Добавьте позиции к заказу и тогда он будет сформирован</div>
		</div>
		
	</div>
	<div class="content-wrap content-order-wrap">
		<div class="content-wrap-elem">
			<OrderCard 
				v-if="isOrder"
				:data="order"
				:companys="companyBarTopData"
				v-model="activeCompanyUid"
				@onClick="addOrder"
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
	<OrderModal v-model="showModal"/>
	<SnackBar v-model="error" :message="errorMsg"></SnackBar>
</div>
</div>
</template>

<script lang="ts">
import PersonalBar from '@/components/cards/PersonalBar.vue'
import Notification from '@/components/cards/Notification.vue'
import CompanyBarTop from '@/components/cards/Company/CompanyBarTop.vue'
import TopNav from '@/components/nav/TopNav.vue'
import ProductHeaderCard from '@/components/cards/Product/ProductHeaderCard.vue'
import ProductSearchResultCard from '@/components/cards/Product/ProductSearchResultCard.vue'
import ProductOffersOrderCard from '@/components/cards/Product/ProductOffersOrderCard.vue'
import ProductPropertiesCard from '@/components/cards/Product/ProductPropertiesCard.vue'
import ProductSliderSmallCard from '@/components/cards/Product/ProductSliderSmallCard.vue'
import OrderHeaderCard from '@/components/cards/Order/OrderHeaderCard.vue'
import OrderCard from '@/components/cards/Order/OrderCard.vue'
import OrderModal from '@/components/cards/Order/OrderModal.vue'
import SnackBar from '@/components/ui/SnackBar.vue'

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted, defineComponent } from 'vue'
import { key } from '@/store'
import { KeysMutations } from '@/store/keys/mutations'
import { OrderActions } from '@/store/order/actions'
import { OrderMutations } from '@/store/order/mutations'
import { ProductActions } from '@/store/product/actions'
import { CompanyActions } from '@/store/company/actions'
import { OrderStateAddPosition } from '@/store/order/types'


export default defineComponent({
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
		OrderModal,
		SnackBar,
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
		const activeProductId = ref('');
		const error = ref(false);
		const errorMsg = ref('');
		const characteristicArray = ref({position: [], position_presail:[]});
		const showModal = ref(false)

		const addToOrder = () => {
			let new_pos = { 
					position: {
						product: store.getters.getProduct, 
						characteristics: characteristicArray.value.position
					},
					position_presail:{
						product: store.getters.getProduct, 
						characteristics: characteristicArray.value.position_presail
					}
				}
			store.dispatch(OrderActions.ADD_POSITION, <OrderStateAddPosition>new_pos);
		}
		const addOrder = () => {
			if (activeCompanyUid.value == '') {
				error.value = true;
				setTimeout(() => {error.value=false;}, 5000);
				errorMsg.value = 'Для оформления заказа выберите контрагента';
			} else {
				showModal.value=true;
				store.commit(OrderMutations.ADD_ORDER_PARTNER_ID, activeCompanyUid.value);
				setTimeout(() => {
					store.dispatch(OrderActions.ADD_ORDER, store.getters.getOrderToAdd);
				}, 3000);
			}

		}

		onMounted(() => {
			if (!store.getters.isCompanysLoad)
			{
				store.dispatch(CompanyActions.GET_COMPANYS)
			}
			activeProductId.value=store.getters.getProduct.ID;

			// if get parametr aticle is not emty when using product page else using search
			if (props.article !=='' && props.article !== undefined) {
				loader.value = true;
				store.dispatch(ProductActions.SEARCH_PRODUCT, props.article)
					.then(()=>{
						if (store.getters.getProduct.ID)
							activeProductId.value=store.getters.getProduct.ID;
						else
							router.push({name: 'Order'});
						})
					.finally(() => {loader.value=false})
			}
		});

		const loadProduct = () => {
			loader.value = true;
			store.dispatch(ProductActions.GET_PRODUCT_BY_ID, activeProductId.value)
				.then(()=>{
					activeProductId.value=store.getters.getProduct.ID;
					})
				.finally(() => {loader.value=false})
		};

		return {
			error,
			errorMsg,
			companyBarTopData: computed(() => store.getters.getCompanysList),
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
			addOrder,
			showModal,
			characteristicArray,
			isOrder: computed(() => store.getters.isOrder),
			order: computed(() => store.getters.getOrder),
		}
	}
})
</script>