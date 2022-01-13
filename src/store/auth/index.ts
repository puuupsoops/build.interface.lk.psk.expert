import { Module } from "vuex"
import { RootState } from "@/store"
import { AuthState } from "./types"
import { state } from "./state"
import { getters } from "./getters"
import { mutations } from "./mutations"
import { actions } from "./actions"


export const auth: Module<AuthState, RootState> = {
	state,
	getters,
	mutations,
	actions
}
