import { Module } from "vuex"
import { RootState } from "@/store"
import { CompanyState } from "./types"
import { state } from "./state"
import { getters } from "./getters"
import { mutations } from "./mutations"
import { actions } from "./actions"


export const company: Module<CompanyState, RootState> = {
	state,
	getters,
	mutations,
	actions
}
