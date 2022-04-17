<template>

<div :class="'product-search fullwidth' + (show ? '': ' none')" ref="target">
	<div class="product-search-input-container">
		<div class="product-search-input options" >
			<input 
				type="text"
				placeholder="Поиск"
				autocomplete="off"
				@keyup="doSearch($event)"
				v-model="search_str"
				ref="searchInput"
			>
			<PreloaderLocal small v-if="loading"></PreloaderLocal>
			<div 
				class="product-search-save" 
				title="Сохранить" 
				v-if="search_str.length>10"
				@click="save();"
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
				@click="search_str != '' ? search_str = '' : clear()"
			></div>
		</div>
		<div 
			:class="'product-search-input-options' + (search_str == '' || addressPrompt.length == 0 ? ' default': '')"
		>
			<!-- <PreloaderLocal v-if="loading"></PreloaderLocal> -->
			
			<span v-if="search_str == ''">{{edit == -1 ? 'Чтобы добавить новый адрес - начните ввод': 'Чтобы изменить адрес - начните ввод'}}</span>
			<div v-else>
			
				<p
					v-for="item, key in addressPrompt"
					:key="key"
					:class="'product-search-input-options-item' + (loading ? ' loading': '') 
																+ (key==active_item ? ' active':'')"
				> 
					<router-link
						tag="a"
						@click="search_str=item.value+' '; active_elem =  Object.assign({},item) ;searchInput.focus();"
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
import { ShipmentsMutations } from '@/store/shipments/mutations';



export default defineComponent({
	name: 'ShipmentAddressInput',
	props:{
		modelValue: {
			type: String,
			required: true,
		},
		edit: {
			type: Number,
			default: -1
		},
		show: {
			type: Boolean,
			default: false
		}
	},
	emits:['update:modelValue', 'update:show',  'update:edit', 'save'],
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
		const active_item = ref(-1)
		const active_elem = <any>ref(null)
		const options = ref(true)
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
				if (e.keyCode == 27) close()
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
		}
		const clear = () => {
			search_str.value = ''
			emit('update:edit', -1)
			emit('update:modelValue', '')
			emit('update:show', false)
		}
		onClickOutside(target, () => {options.value == false; emit('update:show', false)})
		
		watch( ()=>props.show, () => {
			search_str.value= props.modelValue
			store.commit(ShipmentsMutations.CLEAR_ADDRESS_PROMPT)
			nextTick(() => {
				searchInput.value.focus();
			});
			
			})
			
		const save = ()=>{
		
			if (props.edit == -1) {
					const res = [{
					label:  active_elem.value !=-1 ? active_elem.value.value : '',
					latitude:  active_elem.value !=-1 ? active_elem.value.data.geo_lat : '',
					longitude:  active_elem.value !=-1 ? active_elem.value.data.geo_lon : '',
				}]
				store.dispatch(ShipmentsActions.ADD_SHIPMENTS_ADDRESS, res)
			} else{
				const res = [{
					index: props.edit,
					label:  active_elem.value !=-1 ? active_elem.value.value : '',
					latitude:  active_elem.value !=-1 ? active_elem.value.data.geo_lat : '',
					longitude:  active_elem.value !=-1 ? active_elem.value.data.geo_lon : '',
				}]
				store.dispatch(ShipmentsActions.UPDATE_SHIPMENTS_ADDRESS, res)
			}
			
			emit('update:modelValue', '')
			clear();
		}
		return {
			search_str,
			loading,
			target,
			searchInput,
			active_item,
			active_elem,
			options,
			addressPrompt: computed(()=>store.getters.getAddressPrompt),
			
			doSearch,
			clear,
			save,
		}

	},
})
</script>
