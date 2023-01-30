<template>
<div
	class="order-modal" 
	v-if="modelValue"
>
    <div 
        :class="'order-modal-dialog draft' + (shake? ' shake' : '')"
        ref="targetModal" 
    >
        <div class="order-modal-content draft" >
            <div class="order-modal-header">
                <h3 class="order-modal-header-title">Добавить позицию </h3>
                    <DeleteButton @onClick="close()"/>
            </div>
            
            <div class="order-modal-body draft">
                <ProductSearchInput v-model="article" @search="loadProduct()"/>
                <PreloaderLocal v-if="loader" style="margin: auto"/>
                <ProductSearchResultCard v-else-if="isProduct"
                    :data="productFound"
                    v-model="activeProductId"
                />
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

import { onClickOutside  } from '@vueuse/core'
import { computed, ref } from 'vue'

import { useStore } from '/src/store'
import { ProductActions } from '/src/store/product/actions'
import { ProductMutations } from '/src/store/product/mutations'

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
const activeProductId = ref('')

const loadProduct = ():void => {
    loader.value = true
    store.dispatch(ProductActions.SEARCH_PRODUCT, article.value).finally(() => {loader.value=false})
}

const productFound = computed(() => store.getters.getProductFound)
const isProduct = computed(() => store.getters.isProduct)
</script>