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
                <div :class="'product-search fullwidth '">
                    <div class="product-search-input-container" ref="targetInput">
        
                        <div class="product-search-input options" >
                            <input 
                                type="text"
                                placeholder="Поиск"
                                autocomplete="off"
                                @keyup="doSearch()"
                                v-model="search_str"
                                ref="searchInput"
                            >
                            <PreloaderLocal small v-if="loading"></PreloaderLocal>
                            <div class="product-search-clear" @click="clear()"></div>
                        </div>
                        <div 
                            :class="'product-search-input-options' + (search_str == '' || articles.length == 0 ? ' default': '')"
                        >
                            <!-- <PreloaderLocal v-if="loading"></PreloaderLocal> -->
                            <span v-if="search_str == ''">Чтобы добавить новый продукт - начните ввод для поиска продукта</span>
                            <div v-else>
                            
                                <p
                                    v-for="item, key in articles"
                                    :key="key"
                                    :class="'product-search-input-options-item' + (loading ? ' loading': '')"
                                >
                                    <router-link
                                        tag="a"
                                        @click="close()"
                                        :to="'/order/' + item.article"
                                    >
                                        <div class="article">{{item.article}}</div> <div class="name">{{item.name}}</div>
                                    </router-link>
                                </p>
                                <span v-if="loading && articles.length == 0"> Поиск...</span>
                                <span v-if="!loading && articles.length == 0">Не найдено</span>
                            </div>
                        </div>

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
import { onClickOutside  } from '@vueuse/core'
import { ref, computed, nextTick, watch } from 'vue'
import PreloaderLocal from '/src/components/PreloaderLocal.vue'
import DeleteButton from '/src/components/ui/DeleteButton.vue'
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
const close = () => {
        emits('update:modelValue', false)
    };
const shake = ref(false)
const targetModal = ref(null)


onClickOutside(targetModal, () => {
        shake.value = true;
        setTimeout(() => {shake.value=false;}, 500);
    });


const store = useStore()
const search_str = ref('')
const loading = ref(false)
const debounce = ref()
const targetInput = ref(null)
const searchInput = ref<any>(null)

const articles = computed(()=>store.getters.getProductArticles)

const doSearch = () => {
    clearTimeout(debounce.value)
    loading.value=true;
    debounce.value = setTimeout(() => {
            if (search_str.value.length >=2)
            store.dispatch(ProductActions.SEARCH_PRODUCT_ARTICLE, search_str.value)
                    .then(()=>{ setTimeout( ()=> {loading.value=false}, 500)})
                    //.finally(() => {loading.value=false})
        }, 500)
}
const clear = () => {
    search_str.value = ''
    store.commit(ProductMutations.SET_PRODUCT_ARTICLS, [])
    
}
onClickOutside(targetInput, () => {clear()})
		
watch( ()=>props.modelValue, () => {
    nextTick(() => {
        searchInput.value.focus();
    });
    
    })


</script>