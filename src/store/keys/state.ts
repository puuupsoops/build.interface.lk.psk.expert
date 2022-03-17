import { KeysConst, KeysState } from "./types";

export const state: KeysState = {
	loader: false,
	collapsed: false,
	isDebug: false,
	order_id: KeysConst.DEFAULT_ORDER_ID, // выбранный id заказа 
}