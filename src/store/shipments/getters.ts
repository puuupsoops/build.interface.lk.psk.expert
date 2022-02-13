import { GetterTree } from "vuex"
import { RootState } from "@/store"
import { ShipmentsState } from "./types"

export const getters: GetterTree<ShipmentsState, RootState> = {
	isShipments: state => state.orders.length == 0,
    getShipments: state => state.orders,
    getAddressPrompt: state => state.address_prompt,
}