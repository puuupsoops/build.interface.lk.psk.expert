import { Module } from "vuex"
import { RootState } from "/src/store"
import { KPState } from "./types"
import { state } from "./state"
import { getters } from "./getters"
import { mutations } from "./mutations"
import { actions } from "./actions"


export const kp: Module<KPState, RootState> = {
	state,
	getters,
	mutations,
	actions
}
