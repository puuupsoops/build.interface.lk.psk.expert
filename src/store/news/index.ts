import { Module } from "vuex"
import { RootState } from "@/store"
import { NewsState } from "./types"
import { state } from "./state"
import { getters } from "./getters"
import { mutations } from "./mutations"
import { actions } from "./actions"


export const news: Module<NewsState, RootState> = {
	state,
	getters,
	mutations,
	actions
}
