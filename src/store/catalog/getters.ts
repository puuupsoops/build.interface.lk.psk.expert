import { GetterTree } from "vuex"
import { RootState } from "@/store"
import { CatalogState } from "./types"
import { CatalogMenu, CatalogMenuItem, CatalogMenuItemSub } from "@/models/Catalog"

export const getters: GetterTree<CatalogState, RootState> = {
	isCatalogMenuLoad: state => Object.keys(state.menu).length !== 0,
	getCatalogMenu: state => state.menu,
	isCatalogLoad: state => Object.keys(state.catalog).length !== 0,
	getMenuCategoryName: state => (id: string) => {

		for (const i in Object.values(state.menu)) {
			const res =  Object.values(state.menu)[i].sub.find((cat: CatalogMenuItemSub) => cat.code == id)
			if (res) return res.name
		}
		return undefined
	},

	getCatalog: state => state.catalog,
	getPageCount: state => Math.floor(state.catalog.total/state.catalog.count),


}