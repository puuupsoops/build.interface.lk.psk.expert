import axios from '/src/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "/src/store"
import { ProductState } from "./types"
import { AuthMutations } from '../auth/mutations'
import { ProductMutations } from './mutations'
import { Found } from '/src/models/Product'


export enum ProductActions {
	SEARCH_PRODUCT = "SEARCH_PRODUCT_ACTION",
	GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID_ACTION",
	SEARCH_PRODUCT_ARTICLE = "SEARCH_PRODUCT_ARTICLE_ACTION",
}

export const actions: ActionTree<ProductState, RootState> =  {
	async [ProductActions.SEARCH_PRODUCT] ({commit}, data: string) {
		commit(ProductMutations.SET_PRODUCT_FOUND_ERR_STR, '')
		//console.log('ProductActions.SEARCH_PRODUCT')
		//опция поиска по точному совпадению
		let option = 2
		if(/^([А-Яа-я]{3}\d{3}).*$/.test(data)) {
			// если похоже на артикул, поиск по артикулу
			option = 0
		}

		await axios.get(`/product/search?QUERY=${data}&OPTION=${option}`, {transformRequest: (_, headers) => {
			delete headers?.common
			}})
			.then(response => {
				commit(ProductMutations.SET_SEARCH_PRODUCT_RESULT, response.data)
			})
			.catch( error => {
				if (error.response && error.response.status =="404") {
					commit(ProductMutations.SET_PRODUCT_FOUND_ERR_STR, error.response)
				} 
				else
					commit(AuthMutations.SET_ERROR, 'Request SEARCH_PRODUCT error:<br>'+error)
			})

	},
	async [ProductActions.GET_PRODUCT_BY_ID] ({commit}, data: string) {
		commit(ProductMutations.SET_PRODUCT_FOUND_ERR_STR, '')
		await axios.get(`/product/search?QUERY=${data}&OPTION=9`, {transformRequest: (_, headers) => {
			delete headers?.common
			}})
			.then(response => {
				commit(ProductMutations.SET_PRODUCT_RESULT, response.data)
			})
			.catch( error => {
				if (error.response && error.response.status =="404") {
					commit(ProductMutations.SET_PRODUCT_FOUND_ERR_STR, error.response)
				} 
				else
					commit(AuthMutations.SET_ERROR, 'Request GET_PRODUCT_BY_ID error:<br>'+error)
			})
	},
	async [ProductActions.SEARCH_PRODUCT_ARTICLE] ({commit}, data: string) {
		commit(ProductMutations.SET_PRODUCT_FOUND_ERR_STR, '')

		//console.log('ProductActions.SEARCH_PRODUCT_ARTICLE')
		//опция поиска по точному совпадению
		let option = 2
		if(/^([А-Яа-я]{3}\d{3}).*$/.test(data)) {
			// если похоже на артикул, поиск по артикулу
			option = 0
		}

		await axios.get(`/product/search?QUERY=${data}&OPTION=${option}`, {transformRequest: (_, headers) => {
			delete headers?.common
			}})
			.then(response => {
				const found =  <Found[]>response.data.FOUND
				console.log(found)
				const dataModify = (data: string) => data.replaceAll('"','').replace(/ +/g, ' ').trim().toUpperCase();

				// используем строгое сравнение
				let serachResult = found.filter(x=> dataModify(x.ARTICLE).indexOf(dataModify(data))!=-1 || dataModify(x.NAME).indexOf(dataModify(data))!=-1);

				// если с сервера пришли данные по поиску, но строгое сравнение ничего не нашло. Ищем по вхождению слов
				if(serachResult.length === 0 && found.length > 0 ){
					let arrWords = dataModify(data).split(' ');
					serachResult = found.filter( (x) => {
						let count = 0;
						arrWords.forEach( (word) => { if (dataModify(x.NAME).indexOf(word) != - 1 || dataModify(x.ARTICLE).indexOf(dataModify(data))!=-1) count++; });
						return count == arrWords.length
					});
				}

				commit(ProductMutations.SET_PRODUCT_ARTICLES,serachResult);
			})
			.catch( error => {
				if (error.response && error.response.status =="404") {
					commit(ProductMutations.SET_PRODUCT_ARTICLES, [])
					commit(ProductMutations.SET_PRODUCT_FOUND_ERR_STR, error.response.data.error.message)
				} else
					commit(AuthMutations.SET_ERROR, 'Request GET_PRODUCT_BY_ID error:<br>'+error)
			})
	
	}
}
