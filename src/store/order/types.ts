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
	id:                       number;
	date?:		              Date;
	edit:			          boolean;
	reserved:                 boolean;
	total:                    number;
	total_discount?:          number;
	total_presail?:           number;
	total_presail_discount?:  number;
	count:                    number;
	partner_id:               string;
	position:                 OrderStatePosition[];
	position_presail:         OrderStatePosition[];
	total_count:              number;
	total_valume:             number;
	total_weight:             number;
	comment:                  string;
	request_certificate:      boolean;
	delivery:                 OrderStateDelivery;
	name?:                    string; // нужно для имени черновика
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
	price_discount:  number;
	discount:        number;
	fullprice?:      number;
}

export interface OrderStateDelivery {
	case:      string,// "pek", // <String> это код, который DeliveryCode
	date:      number, // это дата, на какой день. в <Integer> timestamp милисекунды
	address:   string, //  <String> это адрес, из списка адресов, (если самовывоз, то пустая строка)
	cost:      number, // 900р если доставка до транспортной, иначе 0
	bill_to:   string, // storage куда выставлять счет за доставку
//	extra:     number[] // Array<Int> Дополнительное условие к доставке, если есть. [1 - Жесткая упаковка, 2 - Ополечивание], перечисление через массив. или пустой параметр
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
	comment: '',
	delivery: {
		address: '',
		case: '',
		date: 0,
		cost: 0,
		bill_to: ''
	},
	request_certificate: false,
}



export const DefaultNewOrder = {
	id: 0,
	message: '',
}
const order_drafts_saved = localStorage.getItem('orders_drafts')
export const OrderDraftsSaved = <OrderStateOrder[]>JSON.parse(order_drafts_saved ? order_drafts_saved : '[]' ) 
