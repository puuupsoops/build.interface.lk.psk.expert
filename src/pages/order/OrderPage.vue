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
    <router-link to="/catalog/catalog" class="order-info-link">каталоге</router-link>
    или воспользуйтесь
    <router-link to="/product" class="order-info-link">поиском</router-link>.
  </div>

  <div v-else>
      <ProductSearchInput to="order" v-model:show="showProductSearch"/>
      <ProductHeaderCard
        :title="String(product.NAME)"
        :price="String(product.PRICE_OPT)"
        :discount="discount"
        :status="String(product.STATUS)"
        @ShowSearch="showProductSearch=!showProductSearch"
      />

    <div class="content-wrap content-product-order-wrap ">
      <div class="content-wrap-elem">
        <ProductSearchResultCard
            :data="productFound"
            :cardType="'order'"
            v-model="activeProductId"
            @onClick="loadProduct()"
            @ShowSearch="showProductSearch=!showProductSearch"
            />
      </div>
      <div class="content-wrap-elem">
        <ProductOffersOrderCard
          :data="productOffers"
          :discount="discount"
          v-model="productItems"
          @onClick="addToOrder()"
        />
      </div>
    </div>
    </div>
    <OrderHeaderCard
      v-if="isOrder"
      :discount="discount"
      :data="order"
    />
    <div class="content-heading-wrap product-heading-wrap" v-else>
      <div class="content-heading-wrap-elem" v-if="isProduct">
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
          @onClickAdd="addOrder"
          @onClickEdit="editOrder"
          @goToKP="goToKP"
        />
      </div>
      <div class="content-wrap-elem" >
          <ProductSliderSmallCard
            v-if="isProduct"
            :data="productImages"
          />
      </div>
    </div>

    <OrderModal v-model="showModal"/>

    <SnackBar v-model="error" :message="errorMsg"></SnackBar>

  <OrderDraftModal v-model="showDraft"/>
  </div>
</template>

<script setup lang="ts">
import PersonalBar from '/src/components/cards/PersonalBar.vue'
import Notification from '/src/components/cards/Notification.vue'
import CompanyBarTop from '/src/components/cards/Company/CompanyBarTop.vue'
import TopNav from '/src/components/nav/TopNav.vue'
import ProductHeaderCard from '/src/components/cards/Product/ProductHeaderCard.vue'
import ProductSearchResultCard from '/src/components/cards/Product/ProductSearchResultCard.vue'
import ProductSearchInput from '/src/components/cards/Product/ProductSearchInput.vue'
import ProductOffersOrderCard from '/src/components/cards/Product/ProductOffersOrderCard.vue'
import ProductSliderSmallCard from '/src/components/cards/Product/ProductSliderSmallCard.vue'
import OrderHeaderCard from '/src/components/cards/Order/OrderHeaderCard.vue'
import OrderCard from '/src/components/cards/Order/OrderCard.vue'
import OrderModal from '/src/components/cards/Order/OrderModal.vue'
import OrderDraftModal from '/src/components/cards/Order/OrderDraftModal.vue'
import SnackBar from '/src/components/ui/SnackBar.vue'

import { useStore } from '/src/store'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted, watch } from 'vue'

import { KeysMutations } from '/src/store/keys/mutations'
import { OrderActions } from '/src/store/order/actions'
import { OrderMutations } from '/src/store/order/mutations'
import { ProductActions } from '/src/store/product/actions'
import { CompanyActions } from '/src/store/company/actions'
import { OrderStatePosition, OrderStatePositionOffer } from '/src/store/order/types'
import { KPMutations } from "/src/store/kp/mutations";


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
const activeProductId = ref('')
const error = ref(false)
const errorMsg = ref('')
const showModal = ref(false)
const showDraft = ref(false)
const showProductSearch = ref(false)
const productItems = ref<OrderStatePositionOffer[]>([]);

const addToOrder = () => {
  let new_pos = <OrderStatePosition>{
      article: store.getters.getProduct.ARTICLE,
      guid:store.getters.getProduct.UID,
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
      })
    }, 3000)
  }
}
const editOrder = () => {
			//console.log(activeCompanyUid.value)
			showModal.value=true;
			store.commit(OrderMutations.ADD_ORDER_PARTNER_ID, activeCompanyUid.value)
			setTimeout(() => {
				store.dispatch(OrderActions.EDIT_ORDER_ACTION, store.getters.getOrderToAdd).catch(()=>{
					showModal.value=false
					error.value = true
					setTimeout(() => {error.value=false;}, 5000)
					errorMsg.value = 'Ошибка редактирования заказа. Повторите позже.'
				});
			}, 3000)
		}
const loadProduct = () => {
  loader.value = true
  store.dispatch(ProductActions.GET_PRODUCT_BY_ID, activeProductId.value)
      .then(()=>{
        activeProductId.value=store.getters.getProduct.ID
      })
      .finally(() => {loader.value=false})
}
const goToKP = async () => {
  loader.value=true
  store.commit(KPMutations.SET_KP_OFFER_POSITION, store.getters.getOrder.position)
  store.commit(KPMutations.SET_KP_STEP, 2)
  loader.value=false
  await router.push('/kp')
}
watch( ()=>props.article, (new_val) => {
  // Если есть параметр то загружаем по артиклу
  if (new_val) {
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
watch(activeCompanyUid, () => {
  if (!store.getters.getOrder.edit)
    store.commit(OrderMutations.ADD_ORDER_PARTNER_ID, activeCompanyUid.value)
  store.commit(OrderMutations.CALC_ORDER)
})

onMounted(() => {
  store.commit(OrderMutations.ADD_ORDER_PARTNER_ID, activeCompanyUid.value)
  if (!store.getters.isCompanysLoad)
  {
    store.dispatch(CompanyActions.GET_COMPANYS).finally(() => { setTimeout(()=>{
            activeCompanyUid.value = store.getters.getCompanys.length==0 ? '' : store.getters.getCompanys[0].uid;
          },500);})
  }
  activeProductId.value=store.getters.getProduct.ID;


  if ( props.article) {
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

const discount = computed(() => {
			const status = store.getters.getProduct.STATUS
			if (status == 'Outlet' || status == 'Discount' || status == 'Activity')
				return 0
			else
				return store.getters.getCompanyDiscount(activeCompanyUid.value, store.getters.getProductOffersORGGUID)
		})
const isProduct = computed(() => store.getters.isProduct)
const companyBarTopData = computed(() => store.getters.getCompanysList)
const productOffers = computed(() => store.getters.getProductOffers)
const product = computed(() => store.getters.getProduct)
const productFound = computed(() => store.getters.getProductFound)
const productImages = computed(() => store.getters.getProductImages)
const isOrder = computed(() => store.getters.isOrder)
const order = computed(() => store.getters.getOrder)
const getOrderDraftCount = computed(() => store.getters.getOrderDraftCount)

</script>