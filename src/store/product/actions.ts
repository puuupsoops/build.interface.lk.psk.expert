import axios from '@/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "@/store"
import { ProductState } from "./types"
import { AuthMutations } from '../auth/mutations'
import { ProductMutations } from './mutations'


export enum ProductActions {
	SEARCH_PRODUCT = "SEARCH_PRODUCT",
	GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID",
}

export const actions: ActionTree<ProductState, RootState> =  {
	async [ProductActions.SEARCH_PRODUCT] ({commit}, data: string) {
		await axios.get(`/product/search?QUERY=${data}&OPTION=2`, {transformRequest: (data, headers) => {
			delete headers.common['Authorization'];
			return data;
			}})
			.then(response => {
				commit(ProductMutations.SET_SEARCH_PRODUCT_RESULT, response.data)
			})
			.catch( error => {
				commit(AuthMutations.SET_ERROR, 'Request SEARCH_PRODUCT error:<br>'+error)
			})

	},
	async [ProductActions.GET_PRODUCT_BY_ID] ({commit}, data: string) {
		await axios.get(`/product/search?QUERY=${data}&OPTION=9`, {transformRequest: (data, headers) => {
			delete headers.common['Authorization'];
			return data;
			}})
			.then(response => {
				commit(ProductMutations.SET_PRODUCT_RESULT, response.data)
			})
			.catch( error => {
				commit(AuthMutations.SET_ERROR, 'Request GET_PRODUCT_BY_ID error:<br>'+error)
			})
	}
}
