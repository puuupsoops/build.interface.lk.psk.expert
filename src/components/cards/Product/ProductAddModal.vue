<template>
<div
	class="order-modal" 
	v-if="modelValue"
>
    <div 
        class="order-modal-dialog fullscreen" 
        :class="{shake}"
        ref="targetModal" 
    >
        <div class="order-modal-content" >
            <div class="order-modal-header draft">
                <h3 class="order-modal-header-title">Добавить позицию </h3>
                    <DeleteButton @onClick="close()"/>
            </div>
            
            <div class="order-modal-body">
                <ProductSearchInput v-model="search" @search="searchProduct()"/>
                <PreloaderLocal v-if="loader" center/>
                <div class="content-wrap content-product-wrap" v-else-if="isProduct">
		            <div class="content-wrap-elem">
                        <ProductSearchResultCard 
                            :data="productFound"
                            v-model="activeProductId"
                            @onClick="loadProduct()"
                        />
                    </div>
		            <div class="content-wrap-elem" style="min-width: 760px">
                        <PreloaderLocal v-if="loadOffers" center/>
                        <ProductOffersOrderCard 
                            v-else
                            :data="productOffers"
                            v-model="productItems"
                            
                        />
                    </div>
                </div>
            </div>
            <div class="order-modal-action">
                    
            </div>
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
import ProductSearchInput from '/src/components/cards/Product/ProductSearchInput.vue'
import DeleteButton from '/src/components/ui/DeleteButton.vue'
import PreloaderLocal from '/src/components/PreloaderLocal.vue'
import ProductSearchResultCard from '/src/components/cards/Product/ProductSearchResultCard.vue'
import ProductOffersOrderCard from '/src/components/cards/Product/ProductOffersOrderCard.vue'

import { onClickOutside  } from '@vueuse/core'
import { computed, ref } from 'vue'

import { useStore } from '/src/store'
import { ProductActions } from '/src/store/product/actions'
import { ProductMutations } from '/src/store/product/mutations'
import { OrderStatePositionOffer } from '/src/store/order/types'

const props = defineProps({
		modelValue:{
			type: Boolean,
			required: true,
		}
	})
const emits = defineEmits(['update:modelValue'])

const store = useStore()
store.commit(ProductMutations.SET_PRODUCT_CLEAR)

const close = () => {
        emits('update:modelValue', false)
    };
const shake = ref(false)
const targetModal = ref(null)


onClickOutside(targetModal, () => {
        shake.value = true;
        setTimeout(() => {shake.value=false;}, 500);
    });



const article = ref()
const loader = ref(false)
const loadOffers = ref(false)
const search = ref('')
const activeProductId = ref('')
const productItems = ref<OrderStatePositionOffer[]>([]);


const searchProduct = ():void => {
    loader.value = true
    store.dispatch(ProductActions.SEARCH_PRODUCT, search.value)
        .then(()=>{
            activeProductId.value=store.getters.getProduct.ID
        })
        .finally(() => {
            loader.value=false
        })
}

const loadProduct = ():void => {
    loadOffers.value = true
    store.dispatch(ProductActions.GET_PRODUCT_BY_ID, activeProductId.value)
        .then(()=>{
            activeProductId.value=store.getters.getProduct.ID
        })
        .finally(() => {
            loadOffers.value=false
        })
}


const productFound = computed(() => store.getters.getProductFound)
const productOffers = computed(() => store.getters.getProductOffers)
const isProduct = computed(() => store.getters.isProduct)
</script>