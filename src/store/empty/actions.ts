import axios from '@/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "@/store"
import { EmptyState } from "./types"


export enum EmptyStatections {
	EMPTY = "EMPTY",
}

export const actions: ActionTree<EmptyState, RootState> =  {
	
}
