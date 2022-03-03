import { axios_dadata } from '@/plugins/axios'
import axios from '@/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "@/store"
import { ShipmentsState } from "./types"
import { AuthMutations } from '../auth/mutations'
import { ShipmentsMutations } from './mutations'

export enum ShipmentsActions {
	EMPTY = "EMPTY",
	ADDRESS_PROMPT = "ADDRESS_PROMPT",
	GET_SHIPMENTS_ADDRESS = "GET_SHIPMENTS_ADDRESS",
	ADD_SHIPMENTS_ADDRESS = "ADD_SHIPMEN_ADDRESS",
	DEL_SHIPMENTS_ADDRESS = "DEL_SHIPMENTS_ADDRESS",
}

export const actions: ActionTree<ShipmentsState, RootState> =  {
	async [ShipmentsActions.ADDRESS_PROMPT] ({ commit }, query: string) {
		await axios_dadata.post('/suggestions/api/4_1/rs/suggest/address', {query},
			)
			.then(response => {
				commit(ShipmentsMutations.SET_SHIPMENT, response.data.suggestions)	
			})
			.catch(error => {
					commit(AuthMutations.SET_LOGIN_ERROR, error.response.data.error.message)
					return Promise.reject('Error')
			})
	},
	async [ShipmentsActions.GET_SHIPMENTS_ADDRESS] ({ commit }) {
		// await axios.get('/user/delivery')
		// 	.then(response => {
		// 		console.log(response)
		// 	})
		// 	.catch(error => {
		// 			commit(AuthMutations.SET_ERROR, 'Request GET_DELIVERY_ADDRESS error:<br>'+error)
		// 	})
		commit(ShipmentsMutations.SET_SHIPMENTS_ADDRESS, [
			{
				index:      0,
				label: 'Москва0',
				latitude: '55.760077',
				longitude: '37.617677'
			},
			{
				index:      1,
				label: 'Москва1',
				latitude: '55.760077',
				longitude: '37.617677'
			},
			{
				index:      2,
				label: 'Москва2',
				latitude: '55.760077',
				longitude: '37.617677'
			}
		])
	},
	async [ShipmentsActions.ADD_SHIPMENTS_ADDRESS] ({ state }, data) {
		// await axios.post('/user/delivery/add', data)
		// 	.then(response => {
		// 		console.log(response)
		// 	})
		// 	.catch(error => {
		// 			commit(AuthMutations.SET_ERROR, 'Request GET_DELIVERY_ADDRESS error:<br>'+error)
		// 	})
		state.address.push(data)
	},
	async [ShipmentsActions.DEL_SHIPMENTS_ADDRESS] ({ state }, data) {
		state.address = state.address.filter(x => x.index!=data)
		// await axios.post('/user/delivery/delete', {index:data})
		// 	.then(response => {
		// 		console.log(response)
		// 	})
		// 	.catch(error => {
		// 		state.address = state.address.filter(x => x.index!=data)
		//		commit(AuthMutations.SET_ERROR, 'Request GET_DELIVERY_ADDRESS error:<br>'+error)
		//	})
		
	},
}
