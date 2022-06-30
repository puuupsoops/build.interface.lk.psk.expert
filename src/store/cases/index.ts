import { Module } from "vuex"
import { RootState } from "/src/store"
import { CasesState } from "./types"
import { state } from "./state"
import { getters } from "./getters"
import { mutations } from "./mutations"
import { actions } from "./actions"


export const cases: Module<CasesState, RootState> = {
	state,
	getters,
	mutations,
	actions
}
