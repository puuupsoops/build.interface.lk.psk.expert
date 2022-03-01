import { Orders, OrdersDocStatus } from "@/models/Orders";
import { MutationTree } from "vuex";

import { OrdersState } from "./types";


export enum OrdersMutations {
	SET_ORDERS = "SET_ORDERS",
	SET_ORDERS_DOCSTATUS = "SET_ORDERS_DOCSTATUS",
}

export const mutations: MutationTree<OrdersState> = {

	[OrdersMutations.SET_ORDERS](state, data: Orders[]){
		state.orders = data
	},
	[OrdersMutations.SET_ORDERS_DOCSTATUS](state, data: OrdersDocStatus){
		state.orders.forEach( order => {
			if (Array.isArray(order.checks) )
				order.checks.forEach(check => {
					if (check.guid == data.id) check.doc_status = data
				})
		})
	},
	
}