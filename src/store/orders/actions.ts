import axios from '/src/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "/src/store"
import { GetOrderBillRequestData, OrdersState } from "./types"
import { OrdersMutations } from './mutations'
import { AuthMutations } from '../auth/mutations'
import {  Orders } from '/src/models/Orders'


export enum OrdersActions {
	GET_ORDERS = "GET_ORDERS_ACTION",
	GET_ORDERS_DOCSTATUS = "GET_ORDERS_DOCSTATUS",
	GET_ORDERS_BILL_REQUEST = "GET_ORDERS_BILL_REQUEST",
}

export const actions: ActionTree<OrdersState, RootState> =  {
	async [OrdersActions.GET_ORDERS] ({ commit }) {
		await axios.get<Orders[]>('/orders')
			.then(response => {
				commit(OrdersMutations.SET_ORDERS, response.data)
			})
			.catch(error => {
				commit(AuthMutations.SET_ERROR, 'Request ADD_ORDERS error:<br>'+error)
			})
	},
	async [OrdersActions.GET_ORDERS_DOCSTATUS] ({ commit }, data) {
		await axios.get('/order/'+data+'/documents')
			.then(response => {
				commit(OrdersMutations.SET_ORDERS_DOCSTATUS, response.data[0].response[0])
			})
			.catch(error => {
				commit(OrdersMutations.SET_ORDERS_DOCSTATUS_ERROR)
				commit(AuthMutations.SET_ERROR, 'Request GET_ORDERS_DOCSTATUS error:<br>'+error)
			})
	},

	async [OrdersActions.GET_ORDERS_BILL_REQUEST] ({commit}, data: GetOrderBillRequestData) {
		await axios.post('/user/request/check/'+data.id, data.check)
		.then(response => {
			commit(OrdersMutations.SET_ORDERS_BILL_REQUEST, {id: data.id, check: response.data.response[0]})
		})
		.catch(error => {
			commit(AuthMutations.SET_ERROR, 'Request GET_ORDERS_BILL_REQUEST error:<br>'+error)
		})
	}
}
