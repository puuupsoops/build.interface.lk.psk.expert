import axios from '/src/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "/src/store"
import { ProductState } from "./types"
import { AuthMutations } from '../auth/mutations'
import { ProductMutations } from './mutations'
import { Found } from '/src/models/Product'
import { useStore } from '/src/store';

export enum ProductActions {
	SEARCH_PRODUCT = "SEARCH_PRODUCT_ACTION",
	GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID_ACTION",
	SEARCH_PRODUCT_ARTICLE = "SEARCH_PRODUCT_ARTICLE_ACTION",
}

export const actions: ActionTree<ProductState, RootState> =  {
	async [ProductActions.SEARCH_PRODUCT] ({commit, getters}, data: string) {
		commit(ProductMutations.SET_PRODUCT_FOUND_ERR_STR, '')
		//console.log('ProductActions.SEARCH_PRODUCT')
		let query = data;
		//опция поиска по точному совпадению
		let option = 2;
		if(/^([А-Яа-я]{3}\d{3}[А-Яа-я]{1})*$/.test(data)){
			// тест на артикулы с буквой после цифры, например: бот242м
			// поиск по артикулу
			option = 0;
			// устанавиваем дефис
			query = data.replace(/(\d)([а-яёa-z])$/i, '$1-$2');
		}
		else if(/^([А-Яа-я]{3}\d{3}).*$/.test(data)) {
			// если похоже на артикул, поиск по артикулу
			option = 0;
		}

		const activeCompanyId = getters.getActiveCompanyId;
		const storages: Storage[] = getters.getCompanyStoragesData(activeCompanyId);
		const priceUid = storages[0]?.pricetype ?? '';

		await axios.get(`/product/search?QUERY=${query}&OPTION=${option}&PRICEUID=${priceUid}`, {transformRequest: (_, headers) => {
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
	async [ProductActions.GET_PRODUCT_BY_ID] ({commit, getters}, data: string) {
		commit(ProductMutations.SET_PRODUCT_FOUND_ERR_STR, '');

		const activeCompanyId = getters.getActiveCompanyId;
		const storages: Storage[] = getters.getCompanyStoragesData(activeCompanyId);
		const priceUid = storages[0]?.pricetype ?? '';

		await axios.get(`/product/search?QUERY=${data}&OPTION=9&PRICEUID=${priceUid}`, {transformRequest: (_, headers) => {
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
	async [ProductActions.SEARCH_PRODUCT_ARTICLE] ({commit, getters}, data: string) {
		commit(ProductMutations.SET_PRODUCT_FOUND_ERR_STR, '')
		//console.log('ProductActions.SEARCH_PRODUCT_ARTICLE')
		let query = data;
		//опция поиска по точному совпадению
		let option = 2
		if(/^([А-Яа-я]{3}\d{3}[А-Яа-я]{1})*$/.test(data)){
			// тест на артикулы с буквой после цифры, например: бот242м
			// поиск по артикулу
			option = 0;
			// устанавиваем дефис
			query = data.replace(/(\d)([а-яёa-z])$/i, '$1-$2');
		}
		else if(/^([А-Яа-я]{3}\d{3}).*$/.test(data)) {
			// если похоже на артикул, поиск по артикулу
			option = 0;
		}

		const activeCompanyId = getters.getActiveCompanyId;
		const storages: Storage[] = getters.getCompanyStoragesData(activeCompanyId);
		const priceUid = storages[0]?.pricetype ?? '';
		await axios.get(`/product/search?QUERY=${query}&OPTION=${option}&PRICEUID=${priceUid}`, {transformRequest: (_, headers) => {
			delete headers?.common
			}})
			.then(response => {
				const found =  <Found[]>response.data.FOUND
				const dataModify = (data: string) => data.replaceAll('"','').replace(/ +/g, ' ').trim().toUpperCase();

				// используем строгое сравнение
				let serachResult = found.filter(x=> dataModify(x.ARTICLE).indexOf(dataModify(query))!=-1 || dataModify(x.NAME).indexOf(dataModify(query))!=-1);

				// если с сервера пришли данные по поиску, но строгое сравнение ничего не нашло. Ищем по вхождению слов
				if(serachResult.length === 0 && found.length > 0 ){
					const arrWords = dataModify(query).split(' ');
					serachResult = found.filter( (x) => {
						let count = 0;
						arrWords.forEach( (word) => { if (dataModify(x.NAME).indexOf(word) != - 1 || dataModify(x.ARTICLE).indexOf(dataModify(query))!=-1) count++; });
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
