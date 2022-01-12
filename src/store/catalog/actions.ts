import axios from '@/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "@/store"
import { CatalogState } from "./types"
import { CatalogMenuResponse, CatalogRequest } from '@/models/Catalog';
import { CatalogMutations } from './mutations';

const site_location = process.env.VUE_APP_SITE_LOCATIONL;

export enum CatalogActions {
	GET_CATALOG_MENU = "GET_CATALOG_MENU",
	GET_CATALOG = "GET_CATALOG",
}

export const actions: ActionTree<CatalogState, RootState> =  {
	async [CatalogActions.GET_CATALOG_MENU] ({commit}) {
		await axios.get<CatalogMenuResponse>(site_location + `/test/api/dashboard/catalog_page/ajax_menu.php`, {transformRequest: (data, headers) => {
			delete headers.common['Authorization'];
			return data;
			}})
			.then(response => {
				commit(CatalogMutations.SET_CATALOG_MENU, response.data)
			})
	},
	async [CatalogActions.GET_CATALOG] ({commit}, data: CatalogRequest) {
		commit(CatalogMutations.CLEAR_CATALOG)
		await axios.get(site_location + `/test/api/dashboard/catalog_page/ajax.php`, 
			{
				transformRequest: (data, headers) => {
					delete headers.common['Authorization'];
					return data;
				},
				params: data,
			})
			.then(response => {
				commit(CatalogMutations.SET_CATALOG, response.data)
			})
	}

}
