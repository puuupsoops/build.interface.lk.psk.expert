import { GetterTree } from "vuex"
import { RootState } from "/src/store"
import { CatalogState } from "./types"
import { CatalogMenu, CatalogMenuItem, CatalogMenuItemSub } from "/src/models/Catalog"

export const getters: GetterTree<CatalogState, RootState> = {
	isCatalogMenuLoad: state => Object.keys(state.menu).length !== 0,
	getCatalogMenu: state => state.menu,
	isCatalogLoad: state => state.catalog.count !== 0,
	getMenuCategoryName: state => (id: string) => {

		for (const i in Object.values(state.menu)) {
			const res =  Object.values(state.menu)[i].sub.find((cat: CatalogMenuItemSub) => cat.code == id)
			if (res) return res.name
		}
		return undefined
	},

	getCatalog: state => state.catalog,
	getPageCount: state => state.pageCount,


}