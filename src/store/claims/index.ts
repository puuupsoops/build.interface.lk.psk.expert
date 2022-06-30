import { Module } from "vuex"
import { RootState } from "/src/store"
import { ClaimState } from "./types"
import { state } from "./state"
import { getters } from "./getters"
import { mutations } from "./mutations"
import { actions } from "./actions"


export const claims: Module<ClaimState, RootState> = {
	state,
	getters,
	mutations,
	actions
}
