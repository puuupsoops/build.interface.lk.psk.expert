import { MutationTree } from "vuex";
import { ShipmentsState } from "./types";


export enum ShipmentsMutations {
	SET_SHIPMENT = "SET_SHIPMENT",
}

export const mutations: MutationTree<ShipmentsState> = {
	[ShipmentsMutations.SET_SHIPMENT](state){
    }

}