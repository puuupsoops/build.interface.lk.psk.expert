<template>
<div :class="'product-search fullwidth' + (modelValue ? '': ' none')" ref="target">
	<div class="product-search-input-container">
	
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
			<div class="product-search-clear" @click="close()"></div>
		</div>
		<div 
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
</template>
<script lang="ts">
import PreloaderLocal from '/src/components/PreloaderLocal.vue'
import { key } from '/src/store';
import { ProductActions } from '/src/store/product/actions';
import { ProductMutations } from '/src/store/product/mutations';
import { computed, defineComponent, ref, watch, nextTick} from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStore } from 'vuex';



export default defineComponent({
	props:{
		modelValue: {
			type: Boolean,
			required: true,
		}
	},
	components:{
		PreloaderLocal
	},
	setup(props, { emit }) {
		const store = useStore(key)
		const search_str = ref('')
		const loading = ref(false)
		const debounce = ref()
		const target = ref(null)
		const searchInput = ref<any>(null)
		
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
		const close = () => {
			search_str.value = ''
			store.commit(ProductMutations.SET_PRODUCT_ARTICLS, [])
			emit('update:modelValue', false)
		}
		onClickOutside(target, () => {close()})
		
		watch( ()=>props.modelValue, () => {
			nextTick(() => {
				searchInput.value.focus();
			});
			
			})

		return {
			search_str,
			loading,
			target,
			searchInput,
			articles: computed(()=>store.getters.getProductArticles),
			doSearch,
			close,
		}
	},
})
</script>

<style lang="sass" scoped>

</style>

