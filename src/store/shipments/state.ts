import { ShipmentsState, ShipmentsConst } from "./types";

export const state: ShipmentsState = {
	orders: [],
	address_prompt: [],
	order_id: ShipmentsConst.DEFAULT_ORDER_ID, // выбранный id заказа 
	address: [],
}