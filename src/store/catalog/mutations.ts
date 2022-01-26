import { Catalog, CatalogMenu } from "@/models/Catalog"
import { MutationTree } from "vuex"
import { CatalogState } from "./types"


export enum CatalogMutations {
	SET_CATALOG_MENU = "SET_CATALOG_MENU",
	SET_CATALOG = "SET_CATALOG",
	CLEAR_CATALOG = "CLEAR_CATALOG",
}

export const mutations: MutationTree<CatalogState> = {
	[CatalogMutations.SET_CATALOG_MENU] (state, data: CatalogMenu){
		state.menu = data
	},
	[CatalogMutations.SET_CATALOG](state, data: Catalog){
		state.catalog = data
		state.pageCount = Math.ceil(data.total/25)
	},
	[CatalogMutations.CLEAR_CATALOG](state){
		state.catalog = {
			products: [],
			count:    0,
			total:    0,
			page:     0,
		}
	}

}