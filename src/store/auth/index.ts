import { Module } from "vuex"
import { RootState } from "@/store"
import { AuthState } from "@/store/auth/types"
import { state } from "@/store/auth/state"
import { getters } from "@/store/auth/getters"
import { mutations } from "@/store/auth/mutstions"
import { actions } from "@/store/auth/actions"


console.log(actions)
export const auth: Module<AuthState, RootState> = {
	state,
	getters,
	mutations,
	actions
}
