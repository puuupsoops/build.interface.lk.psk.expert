import { GetterTree } from "vuex"
import { RootState } from "@/store"
import { CatalogState } from "./types"
import { CatalogMenu, CatalogMenuItem, } from "@/models/Catalog"

export const getters: GetterTree<CatalogState, RootState> = {
	isCatalogMenuLoad: state => Object.keys(state.menu).length !== 0,
	getCatalogMenu: state => state.menu,
	isCatalogLoad: state => Object.keys(state.catalog).length !== 0,
	getMenuCategoryName: state => (id: string) => {
		for (let i in state.menu) {
			if (state.menu[i] instanceof CatalogMenuItem) {
				let res = state.menu[i].sub.find(cat => cat.code == id)
				if (res) return res.name
			}
		}
		return undefined
	},

	getCatalog: state => state.catalog,
	getPageCount: state => Math.floor(state.catalog.total/state.catalog.count),


}