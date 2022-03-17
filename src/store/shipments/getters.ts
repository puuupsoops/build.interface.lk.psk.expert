import { GetterTree } from "vuex"
import { RootState } from "@/store"
import { ShipmentsState } from "./types"

export const getters: GetterTree<ShipmentsState, RootState> = {
	isShipments: state => state.shipments.length == 0,
    getShipments: state => state.shipments,
    getAddressPrompt: state => state.address_prompt,
    getShipmentsAddressById: state => (id:number) => state.address.find(x => x.index == id),
    getShipmentsAddress: state => state.address,
    getShipmentsSuccess: state => state.shipments_success,
}