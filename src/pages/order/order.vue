<template>
<div>
	<div class="top-line product-page">
		<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid"></CompanyBarTop>
		<Notification></Notification>
		<PersonalBar></PersonalBar>
		
	</div>
	<top-nav 
		toDraft
		:draft="getOrderDraftCount"
		@onClick="showDraft=true"
	></top-nav>

<div v-if="!isProduct" class="order-info">
	Для оформления заказа выберите товар в 
	<router-link tag="a" to="/catalog" class="order-info-link">каталоге</router-link> 
	или воспользуйтесь 
	<router-link tag="a" to="/product" class="order-info-link">поиском</router-link>.
</div>

<div v-else>
		<OrderProductSearchInput v-model="productSearch"/>
		<ProductHeaderCard
			:title="String(product.NAME)"
			:price="String(product.PRICE_OPT)"
			:discount="discount"
			:status="String(product.STATUS)"
			@ShowSearch="productSearch=!productSearch"
		/>

	<div class="content-wrap content-product-wrap">
		<div class="content-wrap-elem">
			<ProductSearchResultCard 
					:data="productFound" 
					:cardType="'order'"
					v-model="activeProductId" 
					@onClick="loadProduct()"
					@ShowSearch="productSearch=!productSearch"
					/>

		</div>
		<div class="content-wrap-elem">
			<ProductOffersOrderCard 
				:data="productOffers"
				v-model="productItems"
				@onClick="addToOrder()"
			/>
		</div>
	</div>
	</div>
	<OrderHeaderCard 
		v-if="isOrder"
		:data="order"
	/>
	<div class="content-heading-wrap proudct-heading-wrap" v-else>
		<div class="content-heading-wrap-elem" v-if="isProduct">
			<div class="order-info">Добавьте позиции к заказу и тогда он будет сформирован</div>
		</div>
		
	</div>
	<div :class="isProduct ? 'content-wrap content-order-wrap' : ''">
		<div class="content-wrap-elem">
			<OrderCard 
				v-if="isOrder"
				:data="order"
				:companys="companyBarTopData"
				v-model="activeCompanyUid"
				@onClick="addOrder"
			/>
		</div>
		<div class="content-wrap-elem" v-if="isProduct"> 
				<ProductSliderSmallCard 
					:data="productImages"
				/>
			
		</div>
	</div>
	<OrderModal v-model="showModal"/>
	
	<SnackBar v-model="error" :message="errorMsg"></SnackBar>

<OrderDraftModal v-model="showDraft"/>
</div>
</template>

<script lang="ts">
import PersonalBar from '@/components/cards/PersonalBar.vue'
import Notification from '@/components/cards/Notification.vue'
import CompanyBarTop from '@/components/cards/Company/CompanyBarTop.vue'
import TopNav from '@/components/nav/TopNav.vue'
import ProductHeaderCard from '@/components/cards/Product/ProductHeaderCard.vue'
import ProductSearchResultCard from '@/components/cards/Product/ProductSearchResultCard.vue'
import OrderProductSearchInput from '@/components/cards/Order/OrderProductSearchInput.vue'
import ProductOffersOrderCard from '@/components/cards/Product/ProductOffersOrderCard.vue'
import ProductSliderSmallCard from '@/components/cards/Product/ProductSliderSmallCard.vue'
import OrderHeaderCard from '@/components/cards/Order/OrderHeaderCard.vue'
import OrderCard from '@/components/cards/Order/OrderCard.vue'
import OrderModal from '@/components/cards/Order/OrderModal.vue'
import OrderDraftModal from '@/components/cards/Order/OrderDraftModal.vue'
import SnackBar from '@/components/ui/SnackBar.vue'

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted, defineComponent, watch } from 'vue'
import { key } from '@/store'
import { KeysMutations } from '@/store/keys/mutations'
import { OrderActions } from '@/store/order/actions'
import { OrderMutations } from '@/store/order/mutations'
import { ProductActions } from '@/store/product/actions'
import { CompanyActions } from '@/store/company/actions'
import { OrderStatePosition, OrderStatePositionOffer } from '@/store/order/types'


export default defineComponent({
	components: {
		PersonalBar,
		Notification,
		CompanyBarTop,
		TopNav,
		ProductHeaderCard,
		ProductSearchResultCard,
		OrderProductSearchInput,
		ProductOffersOrderCard,
		ProductSliderSmallCard,
		OrderHeaderCard,
		OrderCard,
		OrderModal,
		SnackBar,
		OrderDraftModal,
	},
	props: ['article'],
	setup(props) {
		const store = useStore(key)
		const router = useRouter()
		const loader = computed<boolean>({
			get: () => store.getters.getLoader,
			set: (val: boolean) => store.commit(KeysMutations.SET_LOADER, val)
		})
		
		const activeCompanyUid = ref('')
		const activeProductId = ref('')
		const error = ref(false)
		const errorMsg = ref('')
		const showModal = ref(false)
		const showDraft = ref(false)
		const productSearch = ref(false)
		const productItems = ref<OrderStatePositionOffer[]>([]);

		const addToOrder = () => {
			let new_pos = <OrderStatePosition>{ 
					product: store.getters.getProduct, 
					characteristics: productItems.value,
				}
			store.dispatch(OrderActions.ADD_POSITION, <OrderStatePosition>new_pos)
		}
		const addOrder = () => {
			if (activeCompanyUid.value == '') {
				error.value = true;
				setTimeout(() => {error.value=false;}, 5000)
				errorMsg.value = 'Для оформления заказа выберите контрагента'
			} else {
				showModal.value=true;
				store.commit(OrderMutations.ADD_ORDER_PARTNER_ID, activeCompanyUid.value)
				setTimeout(() => {
					store.dispatch(OrderActions.ADD_ORDER, store.getters.getOrderToAdd).catch(()=>{
						showModal.value=false
						error.value = true
						setTimeout(() => {error.value=false;}, 5000)
						errorMsg.value = 'Ошибка создания заказа. Повторите позже.'
					});
				}, 3000)
			}

		}
		

		watch( ()=>props.article, (new_val) => {
			// if get parametr aticle is changed then reload product
			if (new_val !=='' && new_val !== undefined) {
				loader.value = true;
				store.dispatch(ProductActions.SEARCH_PRODUCT, props.article)
					.then(()=>{
						if (store.getters.getProduct.ID)
							activeProductId.value=store.getters.getProduct.ID
						else
							router.push({name: 'Order'});
						})
					.finally(() => {loader.value=false})
			}
		});

		onMounted(() => {
			if (!store.getters.isCompanysLoad)
			{
				store.dispatch(CompanyActions.GET_COMPANYS).finally(() => { setTimeout(()=>{
								activeCompanyUid.value = store.getters.getCompanys === [] ? '' : store.getters.getCompanys[0].uid;
							},500);})
			}
			activeProductId.value=store.getters.getProduct.ID;

			// if get parametr aticle is not emty when using product page else using search
			if (props.article !=='' && props.article !== undefined) {
				loader.value = true;
				store.dispatch(ProductActions.SEARCH_PRODUCT, props.article)
					.then(()=>{
						if (store.getters.getProduct.ID)
							activeProductId.value=store.getters.getProduct.ID
						else
							router.push({name: 'Order'});
						})
					.finally(() => {loader.value=false})
			}
		});

		const loadProduct = () => {
			loader.value = true
			store.dispatch(ProductActions.GET_PRODUCT_BY_ID, activeProductId.value)
				.then(()=>{
					activeProductId.value=store.getters.getProduct.ID
					})
				.finally(() => {loader.value=false})
		};
		const discount = computed(() => store.getters.getCompanyDiscount(activeCompanyUid.value, store.getters.getProductOffersORGGUID))

		return {
			//data
			error,
			errorMsg,
			activeCompanyUid,
			activeProductId,
			showModal,
			showDraft,
			productItems,
			productSearch,
			//computed
			isProduct: computed(() => store.getters.isProduct),
			companyBarTopData: computed(() => store.getters.getCompanysList),
			productOffers: computed(() => store.getters.getProductOffers),
			product: computed(() => store.getters.getProduct),
			productFound: computed(() => store.getters.getProductFound),
			productImages: computed(() => store.getters.getProductImages),
			productProtect: computed(() => store.getters.getProductProtect),
			isOrder: computed(() => store.getters.isOrder),
			order: computed(() => store.getters.getOrder),
			getOrderDraftCount: computed(() => store.getters.getOrderDraftCount),
			discount,
			//method
			addToOrder,
			addOrder,
			loadProduct,
			
		}
	}
})
</script>