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
	GET_ORDERS_DOWNLOAD_CERTIFICATED = "GET_ORDERS_DOWNLOAD_CERTIFICATED",
	GET_ORDERS_DOWNLOAD_CERTIFICATED_ALL = "GET_ORDERS_DOWNLOAD_CERTIFICATED_ALL"
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
	},

	async [OrdersActions.GET_ORDERS_DOWNLOAD_CERTIFICATED] ({commit}, id: string) {
		await axios.get('/order/'+ id +'/certificates',
		{
			responseType: 'blob',
			transformRequest: (_, headers) => {
				delete headers?.common
			}
		})
		.then(response => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'cert.zip');
			document.body.appendChild(link);
			link.click();
			
			// clean up "a" element & remove ObjectURL
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		})
		.catch(error => {
			console.log('error')
			console.log(error)
			//commit(OrdersMutations.SET_ORDERS_DOCSTATUS_ERROR)
			//commit(AuthMutations.SET_ERROR, 'Request GET_ORDERS_DOCSTATUS error:<br>'+error)
		})
	},

	async [OrdersActions.GET_ORDERS_DOWNLOAD_CERTIFICATED_ALL] ({commit}, arUids) {
		console.log(arUids)
		await axios.post('/order/certificates',arUids,
		{
			responseType: 'blob',
			//transformRequest: (_, headers) => {
			//	delete headers?.common
			//}
		})
		.then(response => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'cert.zip');
			document.body.appendChild(link);
			link.click();
			
			// clean up "a" element & remove ObjectURL
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		})
		.catch(error => {
			console.log('error')
			console.log(error)
			//commit(OrdersMutations.SET_ORDERS_DOCSTATUS_ERROR)
			//commit(AuthMutations.SET_ERROR, 'Request GET_ORDERS_DOCSTATUS error:<br>'+error)
		})
	}
}
