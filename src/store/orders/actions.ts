import axios from '@/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "@/store"
import { OrdersState } from "./types"
import { OrdersMutations } from './mutations'
import { AuthMutations } from '../auth/mutations'
import { Orders } from '@/models/Orders'


export enum OrdersActions {
	GET_ORDERS = "GET_ORDERS_ACTION",
	GET_ORDERS_DOCSTATUS = "GET_ORDERS_DOCSTATUS",
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
				commit(AuthMutations.SET_ERROR, 'Request ADD_ORDERS error:<br>'+error)
			})
	},
}
