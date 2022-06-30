import axios from '/src/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "/src/store"
import { CatalogState } from "./types"
import { CatalogMenuResponse, CatalogRequest } from '/src/models/Catalog';
import { CatalogMutations } from './mutations';


const site_location =import.meta.env.VITE_APP_SITE_LOCATION;

export enum CatalogActions {
	GET_CATALOG_MENU = "GET_CATALOG_MENU",
	GET_CATALOG = "GET_CATALOG",
}

export const actions: ActionTree<CatalogState, RootState> =  {
	async [CatalogActions.GET_CATALOG_MENU] ({commit}) {
		await axios.get<CatalogMenuResponse>(site_location + `/test/api/dashboard/catalog_page/ajax_menu.php`,
		{
			transformRequest: (_, headers) => {
				delete headers?.common
			}
		})
			.then(response => {
				commit(CatalogMutations.SET_CATALOG_MENU, response.data)
			})
	},
	async [CatalogActions.GET_CATALOG] ({commit}, data: CatalogRequest) {
		commit(CatalogMutations.CLEAR_CATALOG)
		await axios.get(site_location + `/test/api/dashboard/catalog_page/ajax.php`, 
			{
				transformRequest: (_, headers) => {
					delete headers?.common
				},
				params: data,
			})
			.then(response => {
				commit(CatalogMutations.SET_CATALOG, response.data)
			})
	}

}
