import { Module } from "vuex"
import { RootState } from "/src/store"
import { EmptyState } from "./types"
import { state } from "./state"
import { getters } from "./getters"
import { mutations } from "./mutations"
import { actions } from "./actions"


export const auth: Module<EmptyState, RootState> = {
	state,
	getters,
	mutations,
	actions
}
