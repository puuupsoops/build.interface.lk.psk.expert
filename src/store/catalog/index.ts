import { Module } from "vuex"
import { RootState } from "/src/store"
import { CatalogState } from "./types"
import { state } from "./state"
import { getters } from "./getters"
import { mutations } from "./mutations"
import { actions } from "./actions"


export const catalog: Module<CatalogState, RootState> = {
	state,
	getters,
	mutations,
	actions
}
