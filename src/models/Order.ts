import { OrderStateDelivery } from "../store/order/types";
import { ResponseError } from "./Error";

// Input Data
export interface OrderRequest extends Order{
}


// Output Data
export interface OrderResponse{
	response:         NewOrder;
	error:            ResponseError|null;
}

export interface Order {
	id:                  number;
	edit:			     Boolean;
	reserved:		     Boolean;
	total:               number;
	count:               number;
	comment:             string;
    delivery:            OrderStateDelivery;
    request_certificate: boolean;
	partner_id:          string;
	position:            Position[];
	position_presail:    Position[];
}

export interface Position {
	guid:            string;
	characteristics: Characteristic[];
}

export interface Characteristic {
	discount:        number;
	fullprice:       number;
	price:           number;
	guid:            string;
	orgguid:         string;
	quantity:        number;
}

export interface NewOrder{
	id:              number;
	message:         string;
}
