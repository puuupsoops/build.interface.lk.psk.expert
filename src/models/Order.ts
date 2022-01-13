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
	id:               number;
	total:            number;
	count:            number;
	partner_id:       string;
	position:         Position[];
	position_presail: Position[];
}

export interface Position {
	guid:            string;
	characteristics: Characteristic[];
}

export interface Characteristic {
	guid:            string;
	orgguid:         string;
	quantity:        number;
}

export interface NewOrder{
	id:              number;
	message:         string;
}
