import { GetterTree } from "vuex"
import { RootState } from "@/store"
import { OrdersState } from "./types"

export const getters: GetterTree<OrdersState, RootState> = {
	isOrders: state => state.orders.length == 0,
	getOrders: state => state.orders,
}