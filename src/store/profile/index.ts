import { Module } from "vuex"
import { RootState } from "/src/store"
import { ProfileState } from "./types"
import { state } from "./state"
import { getters } from "./getters"
import { mutations } from "./mutations"
import { actions } from "./actions"


export const profile: Module<ProfileState, RootState> = {
	state,
	getters,
	mutations,
	actions
}
