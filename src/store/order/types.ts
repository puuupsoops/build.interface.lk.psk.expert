import { NewOrder, Order, Position } from "@/models/Order";
import { Offer, Product } from "@/models/Product";

export interface OrderState {
	order: OrderStateOrder;
	new_order: NewOrder;
	order_drafts: OrderStateOrder[];
	error: string|null;
	partner_id: string;
	order_detail: OrderStateOrder;
}

export interface OrderStateOrder {
	id:               number;
	total:            number;
	count:            number;
	partner_id:       string;
	position:         OrderStatePosition[];
	position_presail: OrderStatePosition[];
	total_count:      number;
	total_valume:     number;
	total_weight:     number;
}

export interface OrderStatePosition {
	product:         Product;
	guid:            string;
	article:         string;
	characteristics: OrderStatePositionOffer[];
	total?:           number;
	count?:           number;
}
//ProductOffersOrderCard возвращает тип
export interface OrderStatePositionOffer extends Offer {
	count:           number;
}


export const DefaultOrder: OrderStateOrder = {
	id: 0,				// Идентификатор заказа, генерируется отметкой времени, на стороне личного кабинета
	total: 0,				// Общая стоимость заказа
	count: 0,				// количество позиций в заказе ()
	partner_id: '', 		// GUID контрагента, к которому привязан заказа
	position: [],			// массив с позициями товара
	position_presail: [],	// массив с позициями товара для предзаказа
	total_count: 0,
	total_valume: 0,
	total_weight: 0,
}

export const DefaultNewOrder = {
	id: 0,
	message: '',
}
const order_drafts_saved = localStorage.getItem('orders_drafts')
export const OrderDraftsSaved = <OrderStateOrder[]>JSON.parse(order_drafts_saved ? order_drafts_saved : '[]' ) 
