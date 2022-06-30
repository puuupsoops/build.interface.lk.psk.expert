import { Module } from "vuex"
import { RootState } from "/src/store"
import { KeysState } from "./types"
import { state } from "./state"
import { getters } from "./getters"
import { mutations } from "./mutations"
import { actions } from "./actions"


export const keys: Module<KeysState, RootState> = {
	state,
	getters,
	mutations,
	actions
}
