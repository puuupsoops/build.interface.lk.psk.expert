import { DefaultNewOrder, DefaultOrder, OrderDraftsSaved, OrderState } from "./types";

export const state: OrderState = {
	order: Object.assign({}, DefaultOrder),
	new_order: DefaultNewOrder,
	error: null,
	partner_id: '',
	order_drafts: OrderDraftsSaved,
	order_detail: Object.assign({}, DefaultOrder),
}

