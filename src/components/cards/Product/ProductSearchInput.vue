<template>
<div :class="'product-search '" ref="target">
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
			:class="'product-search-input-options' + (search_str == '' || articles.length == 0 ? ' default': '')"
		>
			<!-- <PreloaderLocal v-if="loading"></PreloaderLocal> -->
			<span v-if="search_str == ''">Чтобы добавить в заказ новый продукт - начните ввод для поиска продукта</span>
			<div v-else>
			
				<p
					v-for="item, key in articles"
					:key="key"
					:class="'product-search-input-options-item' + (loading ? ' loading': '')"
				>
					<a
						
						@click="done(item.article); search_str=item.name"
						
					>
						<div class="article">{{item.article}}</div> <div class="name">{{item.name}}</div>
					</a>
				</p>
				<span v-if="loading && articles.length == 0"> Поиск...</span>
				<span v-if="!loading && articles.length == 0"> Не найдено</span>
			</div>
		</div>

	</div>
	<button class="product-search-btn gradient-btn" @click="doSearch()">
			<div>Поиск</div>
	</button>
</div>
</template>
<script lang="ts">
import PreloaderLocal from '/src/components/PreloaderLocal.vue'
;
import { ProductActions } from '/src/store/product/actions';
import { ProductMutations } from '/src/store/product/mutations';
import { computed, defineComponent, ref} from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStore } from '/src/store';



export default defineComponent({
	props:{
		modelValue: {
			type: String,
			required: true,
		}
	},
	emits: ['update:modelValue', 'search'],
	components:{
		PreloaderLocal
	},
	setup(props, { emit }) {
		const store = useStore()
		const search_str = ref('')
		const loading = ref(false)
		const debounce = ref()
		const target = ref(null)
		const show_options = ref(false)

		
		const doSearch = () => {
			clearTimeout(debounce.value)
			show_options.value = true
			emit('update:modelValue', search_str.value)
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
			store.commit(ProductMutations.SET_PRODUCT_ARTICLS, [])
			emit('update:modelValue', '')
		}
		
		const done = (str: string) => {
			show_options.value = false
			emit('update:modelValue', str)			
			emit('search')
		}
		
		onClickOutside(target, () => {show_options.value = false})
	
		return {
			search_str,
			loading,
			target,
			show_options,
			articles: computed(()=>store.getters.getProductArticles),
			doSearch,
			close,
			done,
		}
	},
})
</script>

<style lang="sass" scoped>

</style>

