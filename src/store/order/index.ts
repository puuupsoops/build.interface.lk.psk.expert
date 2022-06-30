import { Module } from "vuex"
import { RootState } from "/src/store"
import { OrderState } from "./types"
import { state } from "./state"
import { getters } from "./getters"
import { mutations } from "./mutations"
import { actions } from "./actions"


export const order: Module<OrderState, RootState> = {
	state,
	getters,
	mutations,
	actions
}
