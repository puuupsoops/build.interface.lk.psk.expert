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
			<div 
				class="product-search-save" 
				title="Сохранить" 
				v-if="search_str.length>10"
				@click="$emit('save'); ('update:value', search_str ); close()"
			>

				<svg width="16" height="16" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 3.5C1 2.39543 1.89543 1.5 3 1.5H16C19.866 1.5 23 4.63401 23 8.5V21.5C23 22.6046 22.1046 23.5 21 23.5H3C1.89543 23.5 1 22.6046 1 21.5V3.5Z" stroke="#A5A7A9" stroke-width="2"/>
					<rect x="4" y="13.5" width="2" height="10" rx="1" fill="#A5A7A9"/>
					<rect x="18" y="13.5" width="2" height="10" rx="1" fill="#A5A7A9"/>
					<rect x="4" y="15.5" width="2" height="16" rx="1" transform="rotate(-90 4 15.5)" fill="#A5A7A9"/>
					<rect x="6" y="9.5" width="2" height="12" rx="1" transform="rotate(-90 6 9.5)" fill="#A5A7A9"/>
					<rect x="8" y="9.5" width="2" height="8" rx="1" transform="rotate(180 8 9.5)" fill="#A5A7A9"/>
					<rect x="18" y="9.5" width="2" height="8" rx="1" transform="rotate(180 18 9.5)" fill="#A5A7A9"/>
					<rect x="15" y="6.5" width="2" height="3" rx="1" transform="rotate(-180 15 6.5)" fill="#A5A7A9"/>
				</svg>

			</div>
			<div 
				class="product-search-clear" 
				title="Отмена"  
				@click="close()"
			></div>
		</div>
		<div 
			:class="'product-search-input-options' + (search_str == '' || addressPrompt.length == 0 ? ' default': '')"
		>
			<!-- <PreloaderLocal v-if="loading"></PreloaderLocal> -->
			<span v-if="search_str == ''">Чтобы добавить новый адрес - начните ввод</span>
			<div v-else>
			
				<p
					v-for="item, key in addressPrompt"
					:key="key"
					:class="'product-search-input-options-item' + (loading ? ' loading': '')"
				>
					<router-link
						tag="a"
						@click="search_str=item.value+' '; searchInput.focus();"
						to="#"
					>
						<div class="name">{{item.value}}</div>
					</router-link>
				</p>
				<span v-if="addressPrompt.length == 0">Не найдено</span>
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
import { ShipmentsActions } from '@/store/shipments/actions';

export default defineComponent({
	name: 'ShipmentAddressInput',
	props:{
		modelValue: {
			type: Boolean,
			required: true,
		},
		value: {
			type: String,
			default: ''
		}
	},
	emits:['update:modelValue', 'update:value', 'save'],
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
					store.dispatch(ShipmentsActions.ADDRESS_PROMPT, search_str.value)
							.then(()=>{ setTimeout( ()=> {loading.value=false}, 500)})
							//.finally(() => {loading.value=false})
				}, 500)
		}
		const close = () => {
			search_str.value = ''
			emit('update:modelValue', false)
		}
		onClickOutside(target, () => {close()})
		
		watch( ()=>props.modelValue, () => {
			search_str.value= props.value
			nextTick(() => {
				searchInput.value.focus();
			});
			
			})

		return {
			search_str,
			loading,
			target,
			searchInput,
			addressPrompt: computed(()=>store.getters.getAddressPrompt),
			doSearch,
			close,
		}

	},
})
</script>
