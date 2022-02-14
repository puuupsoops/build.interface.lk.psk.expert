import { MutationTree } from "vuex";
import { ShipmentsState } from "./types";


export enum ShipmentsMutations {
	SET_SHIPMENT = "SET_SHIPMENT",
	SET_ADDRESS_PROMPT = "SET_ADDRESS_PROMPT",
	CLEAR_ADDRESS_PROMPT = "CLEAR_ADDRESS_PROMPT",
}

export const mutations: MutationTree<ShipmentsState> = {
	[ShipmentsMutations.SET_SHIPMENT](state){
	},
	[ShipmentsMutations.SET_SHIPMENT](state, data){
		state.address_prompt = data
	},
	[ShipmentsMutations.CLEAR_ADDRESS_PROMPT](state){
		state.address_prompt = []
	}

}