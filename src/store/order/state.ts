import { DefaultNewOrder, DefaultOrder, OrderState } from "./types";

export const state: OrderState = {
	order: DefaultOrder,
	new_order: DefaultNewOrder,
	error: null,
	partner_id: ''
}