import axios from '/src/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "/src/store"
import { EmptyState } from "./types"


export enum EmptyActions {
	EMPTY = "EMPTY",
}

export const actions: ActionTree<EmptyState, RootState> =  {
	
}
