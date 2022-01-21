import axios from '@/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "@/store"
import { ProductState } from "./types"
import { AuthMutations } from '../auth/mutations'
import { ProductMutations } from './mutations'
import { ProductArticles } from '@/models/Product'


export enum ProductActions {
	SEARCH_PRODUCT = "SEARCH_PRODUCT_ACTION",
	GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID_ACTION",
	SEARCH_PRODUCT_ARTICLE = "SEARCH_PRODUCT_ARTICLE_ACTION",
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
	},
	async [ProductActions.SEARCH_PRODUCT_ARTICLE] ({commit}, data: string) {
		// await axios.get(`/product/search?QUERY=${data}&OPTION=9`, {transformRequest: (data, headers) => {
		// 	delete headers.common['Authorization'];
		// 	return data;
		// 	}})
		// 	.then(response => {
		// 		commit(ProductMutations.SET_PRODUCT_RESULT, response.data)
		// 	})
		// 	.catch( error => {
		// 		commit(AuthMutations.SET_ERROR, 'Request GET_PRODUCT_BY_ID error:<br>'+error)
		// 	})
		const articles = <ProductArticles[]> [
			{
				article: 'КОС619',
				name: 'Костюм "Умелец 1" серый/черный'
			},
			{
				article: 'БРЮ652',
				name: 'Брюки "Форест" хаки/черный'
			},
			{
				article: 'КУР690',
				name: 'Куртка "Велар" бежевый/черный'
			},
			{
				article: 'КУР695',
				name: 'Куртка "Азур" синий/черный'
			},
			{
				article: 'БРЮ723',
				name: 'Брюки-джоггеры "Аксель" Кмф хаки'
			},
			{
				article: 'КУР752',
				name: 'Куртка "Смарт" т.синий'
			},
			{
				article: 'ПОЛ695',
				name: 'Полукомбинезон "Азур" синий/черный'
			},
			{
				article: 'КУР722',
				name: 'Куртка-толстовка "Аксель" Кмф хаки/черный'
			},
			{
				article: 'КУР724',
				name: 'Куртка-ветровка "Аксель" Кмф хаки/черный'
			},
		]
		commit(ProductMutations.SET_PRODUCT_ARTICLS, articles.filter(x=> x.article.toUpperCase().indexOf(data.toUpperCase())!=-1 || x.name.toUpperCase().indexOf(data.toUpperCase())!=-1))
	}
}
