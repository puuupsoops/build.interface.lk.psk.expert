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
	GET_DELIVERY_ADDRESS = "GET_DELIVERY_ADDRESS",
	ADD_DELIVERY_ADDRESS = "ADD_DELIVERY_ADDRESS",
	
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
	async [ShipmentsActions.GET_DELIVERY_ADDRESS] ({ commit }) {
		await axios.get('/user/delivery')
			.then(response => {
				console.log(response)
			})
			.catch(error => {
					commit(AuthMutations.SET_ERROR, 'Request GET_DELIVERY_ADDRESS error:<br>'+error)
			})
	},
	async [ShipmentsActions.ADD_DELIVERY_ADDRESS] ({ commit }, data) {
		await axios.post('/user/delivery/add', data)
			.then(response => {
				console.log(response)
			})
			.catch(error => {
					commit(AuthMutations.SET_ERROR, 'Request GET_DELIVERY_ADDRESS error:<br>'+error)
			})
	},
}
