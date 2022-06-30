import { Module } from "vuex"
import { RootState } from "/src/store"
import { ProductState } from "./types"
import { state } from "./state"
import { getters } from "./getters"
import { mutations } from "./mutations"
import { actions } from "./actions"


export const product: Module<ProductState, RootState> = {
	state,
	getters,
	mutations,
	actions
}
