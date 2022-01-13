import { Module } from "vuex"
import { RootState } from "@/store"
import { ShipmentsState } from "./types"
import { state } from "./state"
import { getters } from "./getters"
import { mutations } from "./mutations"
import { actions } from "./actions"


export const shipments: Module<ShipmentsState, RootState> = {
	state,
	getters,
	mutations,
	actions
}
