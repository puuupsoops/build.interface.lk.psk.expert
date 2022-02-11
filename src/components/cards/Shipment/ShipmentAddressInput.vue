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
			<span v-if="search_str == ''">Чтобы добавить новый адрес - начните ввод</span>
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
				<span v-if="articles.length == 0">Не найдено</span>
			</div>
		</div>

	</div>
</div>
</template>

<script lang="ts">
import PreloaderLocal from '@/components/PreloaderLocal.vue'

import { key } from '@/store'
import { useStore } from 'vuex';


import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core';

export default defineComponent({
	name: 'ShipmentAddressInput',
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
		const debounce = ref<number|undefined>(undefined)
		const target = ref(null)
		const searchInput = ref<any>(null)
		
		const doSearch = () => {
			clearTimeout(debounce.value)
			loading.value=true;
			debounce.value = setTimeout(() => {
					
				}, 500)
		}
		const close = () => {
			search_str.value = ''
			
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
