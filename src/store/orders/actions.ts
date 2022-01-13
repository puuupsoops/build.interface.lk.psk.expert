import axios from '@/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "@/store"
import { OrdersState } from "./types"


export enum OrdersActions {
	EMPTY = "EMPTY",
}

export const actions: ActionTree<OrdersState, RootState> =  {
	
}
