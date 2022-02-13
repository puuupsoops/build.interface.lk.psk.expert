import { axios_dadata } from '@/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "@/store"
import { ShipmentsState } from "./types"
import { AuthMutations } from '../auth/mutations'
import { ShipmentsMutations } from './mutations'

export enum ShipmentsActions {
	EMPTY = "EMPTY",
	ADDRESS_PROMPT = "ADDRESS_PROMPT",
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
}
