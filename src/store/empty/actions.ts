import axios from '@/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "@/store"
import { EmptyState } from "./types"


export enum EmptyActions {
	EMPTY = "EMPTY",
}

export const actions: ActionTree<EmptyState, RootState> =  {
	
}
