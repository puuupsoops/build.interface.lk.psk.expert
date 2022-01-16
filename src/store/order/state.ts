import { DefaultNewOrder, DefaultOrder, OrderState } from "./types";

export const state: OrderState = {
	order: Object.assign({}, DefaultOrder),
	new_order: DefaultNewOrder,
	error: null,
	partner_id: ''
}