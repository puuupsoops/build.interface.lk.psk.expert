<template>
<div class="product-search fullwidth" ref="target">
	<div class="product-search-input-container">

		<div :class="'product-search-input'+ (error ? ' error': '') + (options_show ? ' options' : '')" >
			<input 
				type="text"
				placeholder="Поиск"
				autocomplete="off"
				@keyup="doSearch($event)"
				@input="options_show=true"
				@click="options_show=true"
				v-model="search_str"
				ref="searchInput"
			>
			<PreloaderLocal small v-if="loading"></PreloaderLocal>
			
			<div 
				class="product-search-clear" 
				
				@click="clear()"
			></div>
		</div>
		<div 
			v-if="options_show"
			:class="'product-search-input-options' + (search_str == '' || addressPrompt.length == 0 ? ' default': '')"
		>
			<!-- <PreloaderLocal v-if="loading"></PreloaderLocal> -->
			<span v-if="search_str == ''">Чтобы добавить новый адрес - начните ввод</span>
			<div v-else>
			
				<p
					v-for="item, key in addressPrompt"
					:key="key"
					:class="'product-search-input-options-item' + (loading ? ' loading': '') 
																+ (key==active_item ? ' active':'')"
				>
				
					<span
						@click="optClick(item)"
					>
						<div class="name">{{item.value}}</div>
					</span>
				</p>
				<span v-if="addressPrompt.length == 0">Не найдено</span>
			</div>
		</div>

	</div>
</div>
</template>

<script lang="ts">
import PreloaderLocal from '/src/components/PreloaderLocal.vue'

import { key } from '/src/store'
import { useStore } from 'vuex';


import { computed, defineComponent, nextTick, onMounted, ref } from 'vue'
import { onClickOutside } from '@vueuse/core';
import { ShipmentsActions } from '/src/store/shipments/actions';
import { ShipmentsMutations } from '/src/store/shipments/mutations';



export default defineComponent({
	name: 'ShipmentAddressInput',
	props:{
		modelValue: {
			type: String,
			required: true,
		},
		error:{
			type: Boolean,
			default: false
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
		const debounce = ref()
		const target = ref(null)
		const searchInput = ref<any>(null)
		const active_item = ref(-1)
		const active_elem = <any>ref(null)
		const options_show = ref(true)
		const doSearch = (e:any) => {
			
			if ([13, 16, 17, 18, 27, 37, 38, 39, 40].includes(e.keyCode)){
				if (e.keyCode == 40 && active_item.value < store.getters.getAddressPrompt.length-1 ) {
					active_item.value=active_item.value+1
					active_elem.value = Object.assign({}, store.getters.getAddressPrompt[active_item.value])
					search_str.value = store.getters.getAddressPrompt[active_item.value].value+' '
				}
				if (e.keyCode == 38 && active_item.value !=- 1) {
					active_item.value=active_item.value-1
					active_elem.value = Object.assign({}, store.getters.getAddressPrompt[active_item.value])
					search_str.value = store.getters.getAddressPrompt[active_item.value].value + ' '
				}
				if (e.keyCode == 27) clear()
			} else {
				active_item.value = -1
				clearTimeout(debounce.value)
				loading.value=true;
				debounce.value = setTimeout(() => {
						store.dispatch(ShipmentsActions.ADDRESS_PROMPT, search_str.value)
								.then(()=>{ setTimeout( ()=> {loading.value=false}, 100)})
								//.finally(() => {loading.value=false})
					}, 500)
			}
			emit('update:modelValue', search_str.value)
		}
		const clear = () => {
			search_str.value = ''
			emit('update:modelValue', '')
		}
		const optClick = (item: any) => {
				options_show.value=false
				search_str.value=item.value+' '
				active_elem.value =  Object.assign({},item) 
				searchInput.value.focus()
				emit('update:modelValue', search_str.value)
		}
		onClickOutside(target, () => {

			options_show.value = false})
		
		onMounted(() => {
			store.commit(ShipmentsMutations.CLEAR_ADDRESS_PROMPT)
			nextTick(() => {
				searchInput.value.focus();
			});
			
			})
	
		return {
			search_str,
			loading,
			target,
			searchInput,
			active_item,
			active_elem,
			options_show,
			addressPrompt: computed(()=>store.getters.getAddressPrompt),
			
			doSearch,
			clear,
			optClick,
			
		}

	},
})
</script>
