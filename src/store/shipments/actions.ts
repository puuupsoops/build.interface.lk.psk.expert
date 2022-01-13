import axios from '@/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "@/store"
import { ShipmentsState } from "./types"


export enum ShipmentsActions {
	EMPTY = "EMPTY",
}

export const actions: ActionTree<ShipmentsState, RootState> =  {
	
}
