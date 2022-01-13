import { Module } from "vuex"
import { RootState } from "@/store"
import { OrdersState } from "./types"
import { state } from "./state"
import { getters } from "./getters"
import { mutations } from "./mutations"
import { actions } from "./actions"


export const orders: Module<OrdersState, RootState> = {
	state,
	getters,
	mutations,
	actions
}
