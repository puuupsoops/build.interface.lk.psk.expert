import axios from '/src/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "/src/store"
import { KeysState } from "./types"


export enum KeyActions {
	LOGIN = "LOGIN",
	LOGOUT = "LOGOUT",
	CHECK_AUTH = "CHECK_AUTH"
}

export const actions: ActionTree<KeysState, RootState> =  {
	
}
