import { NewOrder, Order, Position } from "/src/models/Order";
import { Offer, Product } from "/src/models/Product";

export interface OrderState {
	order:          OrderStateOrder;
	new_order:      NewOrder;
	order_drafts:   OrderStateOrder[];
	error:          string|null;
	partner_id:     string;
	order_detail:   OrderStateOrder;
	order_is_edit:  Boolean;
}

export interface OrderStateOrder {
	id:               number;
	date?:		      Date;
	edit:			  boolean;
	reserved:         boolean;
	total:            number;
	total_discount?:  number;
	total_presail?:   number;
	total_presail_discount?:   number;
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
	total?:          number;
	total_discount?: number;
	count?:          number;
}
//ProductOffersOrderCard возвращает тип
export interface OrderStatePositionOffer extends Offer {
	count:           number;
	price_discount?: number;
	discount?:       number;
	fullprice?:      number;
}


export const DefaultOrder: OrderStateOrder = {
	id: 0,
	edit: false,
	reserved: true,
	total: 0,
	count: 0,
	partner_id: '',
	position: [],
	position_presail: [],
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
