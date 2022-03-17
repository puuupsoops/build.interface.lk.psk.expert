import { GetterTree } from "vuex"
import { RootState } from "@/store"
import { KeysState } from "./types"

export const getters: GetterTree<KeysState, RootState> = {
	getLoader: state => state.loader,
	getIsDebug: state => state.isDebug,
	getCollapsed: state => state.collapsed,
	getCurrentOrderId: state => state.order_id,
}