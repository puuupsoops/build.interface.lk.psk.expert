<template>
<div>
	<div class="top-line product-page">
		<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid"></CompanyBarTop>
		<Notification></Notification>
		<PersonalBar></PersonalBar>
		
	</div>
	<top-nav catalog></top-nav>

	<ProductSearchInput 
		v-model="search_str" 
		to="product"
		@search="doSearch()"
	/>
		


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
          <ProductOffersOrderCard
              v-model="productItems"
              :data="productOffers"
              :discount="discount"
              @onClick="addToOrder()"
          />
				</div>
				<ProductAddInfoCard :data="product"></ProductAddInfoCard>
		
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
  <SnackBar v-model="snack" :message="'Добавлено в заказ'" :timeout="5000" notification ></SnackBar>
</div>
</template>

<script setup lang="ts">
import { Notification, PersonalBar } from '/src/components/cards'
import { ProductHeaderCard, ProductSearchResultCard, ProductOffersOrderCard, ProductAddInfoCard, ProductSliderCard,
         ProductParcelCard, ProductInfoCard, ProductSearchInput } from '/src/components/cards/Product'
import { CompanyBarTop } from '/src/components/cards/Company'
import { TopNav } from '/src/components/nav'
import { SnackBar } from '/src/components/ui'

import { useStore } from '/src/store'
import { useRouter } from 'vue-router'
import { ref, onMounted, computed, watch} from 'vue'

import { KeysMutations } from '/src/store/keys/mutations'
import { CompanyActions } from '/src/store/company/actions'
import { ProductActions } from '/src/store/product/actions'
import { ProductMutations } from '/src/store/product/mutations'
import { OrderStatePosition, OrderStatePositionOffer } from '/src/store/order/types'
import { OrderActions } from '/src/store/order/actions'

const props = defineProps({
  article: {
    type: String
  }
})


const store = useStore()
const router = useRouter()
const loader = computed<boolean>({
  get: () => store.getters.getLoader,
  set: (val: boolean) => store.commit(KeysMutations.SET_LOADER, val)
})
const activeCompanyUid = ref('')
const search_str = ref('')
const isLoad = ref(false)
const snack = ref(false)
const activeProductId = ref('')
const productItems = ref<OrderStatePositionOffer[]>([])

const toOrder = () => {
			router.push({name: 'Order'})
		}

onMounted(() => {
  if (!store.getters.isCompanysLoad || !store.getters.isManagerLoad)
    {
      Promise.all([
        store.dispatch(CompanyActions.GET_COMPANYS),
        ])
        //.catch(()=>{alert('error')})
        .finally(() => { setTimeout(()=>{
            activeCompanyUid.value = store.getters.getCompanys.length == 0 ? '' : store.getters.getCompanys[0].uid
          },500) })
    }

  if (props.article) {
    loader.value = true
    store.dispatch(ProductActions.SEARCH_PRODUCT, props.article)
      .then(()=>{

        isLoad.value=true
        if (store.getters.getProduct.ID)
          activeProductId.value=store.getters.getProduct.ID
        else
          router.push({name: 'Product'})

        })
      .finally(() => {loader.value=false})
  }
})
watch( ()=>props.article, (new_val) => {
  if (new_val) {
    loader.value = true
    store.dispatch(ProductActions.SEARCH_PRODUCT, props.article)
      .then(()=>{
        isLoad.value=true
        if (store.getters.getProduct.ID)
          activeProductId.value=store.getters.getProduct.ID
        else
          router.push({name: 'Product'})
        })
      .finally(() => {loader.value=false})
  }
})

const loadProduct = () => {
  loader.value = true
  store.dispatch(ProductActions.GET_PRODUCT_BY_ID, activeProductId.value)
    .then(()=>{
      activeProductId.value=store.getters.getProduct.ID
      })
    .finally(() => {loader.value=false})
}
const clearSearch = () => {
  isLoad.value = false
  store.commit(ProductMutations.SET_SEARCH_PRODUCT_CLEAR)
}
const doSearch = () => {
  if (search_str.value.trim() !=='') {
    clearSearch()
    loader.value = true
    store.dispatch(ProductActions.SEARCH_PRODUCT, search_str.value)
      .then(()=>{
        isLoad.value=true
        activeProductId.value=store.getters.getProduct.ID
        })
      .finally(() => {loader.value=false})
  }
}
const newSearch = () => {
  clearSearch()
  search_str.value = ''
  router.push('/product')
}
const addToOrder = () => {
  const new_pos = <OrderStatePosition>{
    article: store.getters.getProduct.ARTICLE,
    guid:store.getters.getProduct.UID,
    product: store.getters.getProduct,
    characteristics: productItems.value,
  }
  store.dispatch(OrderActions.ADD_POSITION, <OrderStatePosition>new_pos)
  snack.value = true
}

const companyBarTopData = computed(() => store.getters.getCompanysList)
const productOffers = computed(() => store.getters.getProductOffers)
const product = computed(() => store.getters.getProduct)
const productFound = computed(() => store.getters.getProductFound)
const productImages = computed(() => store.getters.getProductImages)
const productProtect = computed(() => store.getters.getProductProtect)
const discount = computed(() => {
  let status = store.getters.getProduct.STATUS
  if (status == 'Outlet' || status == 'Discount' || status == 'Activity')
    return 0
  else
    return store.getters.getCompanyDiscount(activeCompanyUid.value, store.getters.getProductOffersORGGUID)
})


</script>


<style lang="sass">

</style>