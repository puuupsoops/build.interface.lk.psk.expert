<template>
<div class="product-search show" 
	:class="''/*{'show': show}*/"
	ref="target">
	<div class="product-search-input-container">
		<div :class="'product-search-input' + (show_options ? ' options':'')" >
			<input 
				type="text"
				placeholder="Поиск"
				autocomplete="off"
				@keyup="doSearch()"
				@keyup.enter="done(search_str)"
				v-model="search_str"
				@click="show_options=true"
			>
			<PreloaderLocal small v-if="loading"></PreloaderLocal>
			<div class="product-search-clear" @click="close()"></div>
		</div>
		<div 
			v-if="show_options"
			class="product-search-input-options"
			:class="{'default': search_str === '' || articles.length === 0 }"
		>

			<span v-if="search_str === ''">Чтобы добавить в заказ новый продукт - начните ввод для поиска продукта</span>
			<div v-else>
			
				<div
					v-for="(item, key) in articles"
					:key="key"
					class="product-search-input-options-item"
					:class="{loading}"
				>
					<router-link v-if="to"
						:to="`/${to}/${item.article}`"
						@click="show_options=false; emits('search',item.article);"
					>
						<div class="article">{{item.article}}</div> <div class="name">{{item.name}}</div>
					</router-link>
					<a v-else  @click="emits('catch',item.article); done(item.article)">
						<div class="article">{{item.article}}</div> <div class="name">{{item.name}}</div>
					</a>
				</div>
				<span v-if="loading && articles.length === 0"> Поиск...</span>
				<span v-if="!loading && articles.length === 0"> Не найдено</span>
			</div>
		</div>

	</div>
	<button class="product-search-btn gradient-btn" 
		v-if="to==='product'"
		@click="done(search_str)">
		<div>Поиск</div>
  </button>
</div>
</template>
<script setup lang="ts">
import { PreloaderLocal } from '/src/components'
import { ProductActions } from '/src/store/product/actions'
import { ProductMutations } from '/src/store/product/mutations'
import { computed, ref} from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStore } from '/src/store'
import {ProductArticles} from "/src/models/Product";


const props = defineProps({
		modelValue: {
			type: String,
		},
		to: {
			type: String
		},
		show: {
			type: Boolean,
			default: true
		}
		
	})
const emits = defineEmits( ['update:modelValue', 'update:show', 'search','catch'])
const store = useStore()
const search_str = ref('')
const loading = ref(false)
const debounce = ref()
const target = ref(null)
const show_options = ref(false)
const articles = computed<ProductArticles[]>(()=>store.getters.getProductArticles)
		
const doSearch = () => {
	clearTimeout(debounce.value)
	show_options.value = true
	emits('update:modelValue', search_str.value)
	loading.value=true;
	debounce.value = setTimeout(() => {
			if (search_str.value.length >=2)
			store.dispatch(ProductActions.SEARCH_PRODUCT_ARTICLE, search_str.value)
					.then(()=>{ setTimeout( ()=> {loading.value=false}, 500)})
					//.finally(() => {loading.value=false})
		}, 500)
}
const close = () => {
	search_str.value = ''
	show_options.value = false
	store.commit(ProductMutations.SET_PRODUCT_ARTICLES, [])
	emits('update:modelValue', '')
}

const done = (str: string) => {
	show_options.value = false
	emits('update:modelValue', str)			
	emits('search')
}

onClickOutside(target, () => {
	if (props.to === 'order')	{
		emits('update:show', false)
	} else {
		show_options.value = false
	}
})

</script>

