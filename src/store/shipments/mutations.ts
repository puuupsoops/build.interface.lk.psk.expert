import { Shipments, ShipmentsAddress } from "@/models/Shipments";
import { MutationTree } from "vuex";
import { ShipmentsState } from "./types";
import { state as stateOrders } from '@/store/orders/state'

export enum ShipmentsMutations {
	SET_SHIPMENT = "SET_SHIPMENT",
	SET_ADDRESS_PROMPT = "SET_ADDRESS_PROMPT",
	CLEAR_ADDRESS_PROMPT = "CLEAR_ADDRESS_PROMPT",
	SET_SHIPMENTS_ADDRESS = "SET_SHIPMENTS_ADDRESS",
	SET_SHIPMENTS_SUCCESS = "SET_SHIPMENTS_SUCCESS",
	SET_SHIPMENTS = "SET_SHIPMENTS",
}

export const mutations: MutationTree<ShipmentsState> = {

	[ShipmentsMutations.SET_SHIPMENT](state, data){
		state.address_prompt = data
	},
	[ShipmentsMutations.CLEAR_ADDRESS_PROMPT](state){
		state.address_prompt = []
	},
	[ShipmentsMutations.SET_SHIPMENTS_ADDRESS](state, data:ShipmentsAddress[]){
		state.address = data
	},
	[ShipmentsMutations.SET_SHIPMENTS_SUCCESS](state, data:number){
		state.shipments_success = data
	},
	[ShipmentsMutations.SET_SHIPMENTS](state, data:Shipments[]){
		data.forEach( x => {
			const order = stateOrders.orders.find(o => o.n == parseInt(x.id))
			if (order) x.order = order
		})

		state.shipments = data.sort((a,b) => (a.date_create < b.date_create) ? 1 : ((b.date_create < a.date_create) ? -1 : 0))
	}
}