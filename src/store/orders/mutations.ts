import { Orders, OrdersDocStatus } from "/src/models/Orders";
import { MutationTree } from "vuex";

import { GetOrderBillRequestData, OrdersState } from "./types";


export enum OrdersMutations {
	SET_ORDERS = "SET_ORDERS",
	SET_ORDERS_DOCSTATUS = "SET_ORDERS_DOCSTATUS",
	SET_ORDERS_DOCSTATUS_ERROR = "SET_ORDERS_DOCSTATUS_ERROR",
	SET_ORDERS_BILL_REQUEST = "SET_ORDERS_BILL_REQUEST",
}

export const mutations: MutationTree<OrdersState> = {

	[OrdersMutations.SET_ORDERS](state, data: Orders[]){
		state.orders = data
		state.orders.forEach(x => {
			let reserved = true // заменяем флаг резерва на те заказы у которых есть счета со статусом  1 - Предзаказ и  6 - В резерве.
			if (x.checks && Array.isArray(x.checks)){
				if (x.checks.filter(check => check.status != '1' && check.status != '6').length > 0 ){
					reserved = false
				}
			}
			x.reserved = reserved
		})
		
	},
	[OrdersMutations.SET_ORDERS_DOCSTATUS](state, data: OrdersDocStatus){
		state.orders.forEach( order => {
			if (Array.isArray(order.checks) )
				order.checks.forEach(check => {
					if (check.guid == data.id) check.doc_status = data
				})
		})
	},
	[OrdersMutations.SET_ORDERS_DOCSTATUS_ERROR](state){
		state.orders.forEach( order => {
			if (Array.isArray(order.checks) )
				order.checks.forEach(check => {check.doc_status = {id: '0', StatusSchet: false, StatusSF:false, StatusUPD: false, StatusUPK: false}	})
		})
	},
	[OrdersMutations.SET_ORDERS_BILL_REQUEST](state, data: GetOrderBillRequestData){
		state.orders.forEach( order => {
			if (order.n == data.id && order.checks )
				order.checks.forEach(check => {
					if (check.id == data.check.id)
						check.status = data.check.status
					})
		})
	},
	
}