import axios from '/src/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "/src/store"
import { ProductState } from "./types"
import { AuthMutations } from '../auth/mutations'
import { ProductMutations } from './mutations'
import { ProductArticles, Found } from '/src/models/Product'


export enum ProductActions {
	SEARCH_PRODUCT = "SEARCH_PRODUCT_ACTION",
	GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID_ACTION",
	SEARCH_PRODUCT_ARTICLE = "SEARCH_PRODUCT_ARTICLE_ACTION",
}

export const actions: ActionTree<ProductState, RootState> =  {
	async [ProductActions.SEARCH_PRODUCT] ({commit}, data: string) {
		commit(ProductMutations.SET_PROFUCT_FOUND_ERR_STR, '')
		await axios.get(`/product/search?QUERY=${data}&OPTION=2`, {transformRequest: (_, headers) => {
			delete headers?.common
			}})
			.then(response => {
				commit(ProductMutations.SET_SEARCH_PRODUCT_RESULT, response.data)
			})
			.catch( error => {
				if (error.response && error.response.status =="404") {
					commit(ProductMutations.SET_PROFUCT_FOUND_ERR_STR, error.response)
				} 
				else
					commit(AuthMutations.SET_ERROR, 'Request SEARCH_PRODUCT error:<br>'+error)
			})

	},
	async [ProductActions.GET_PRODUCT_BY_ID] ({commit}, data: string) {
		commit(ProductMutations.SET_PROFUCT_FOUND_ERR_STR, '')
		await axios.get(`/product/search?QUERY=${data}&OPTION=9`, {transformRequest: (_, headers) => {
			delete headers?.common
			}})
			.then(response => {
				commit(ProductMutations.SET_PRODUCT_RESULT, response.data)
			})
			.catch( error => {
				if (error.response && error.response.status =="404") {
					commit(ProductMutations.SET_PROFUCT_FOUND_ERR_STR, error.response)
				} 
				else
					commit(AuthMutations.SET_ERROR, 'Request GET_PRODUCT_BY_ID error:<br>'+error)
			})
	},
	async [ProductActions.SEARCH_PRODUCT_ARTICLE] ({commit}, data: string) {
		commit(ProductMutations.SET_PROFUCT_FOUND_ERR_STR, '')
		await axios.get(`/product/search?QUERY=${data}&OPTION=2`, {transformRequest: (_, headers) => {
			delete headers?.common
			}})
			.then(response => {
				const found =  <Found[]>response.data.FOUND 
				commit(ProductMutations.SET_PRODUCT_ARTICLS, found.filter(x=> x.ARTICLE.toUpperCase().indexOf(data.toUpperCase())!=-1 || x.NAME.toUpperCase().indexOf(data.toUpperCase())!=-1))
				//commit(ProductMutations.SET_PRODUCT_RESULT, )
			})
			.catch( error => {
				if (error.response && error.response.status =="404") {
					commit(ProductMutations.SET_PRODUCT_ARTICLS, [])
					commit(ProductMutations.SET_PROFUCT_FOUND_ERR_STR, error.response.data.error.message)
				} else
					commit(AuthMutations.SET_ERROR, 'Request GET_PRODUCT_BY_ID error:<br>'+error)
			})
	
	}
}
