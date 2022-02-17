import { Orders, OrdersDocStatus } from "@/models/Orders";

export interface OrdersState {
    orders: Orders[];
}


export const DefaultDocStatus: OrdersDocStatus = {
	id:          '',
    StatusSchet: false,
    StatusUPD:   false,
    StatusSF:    false,
    StatusUPK:   false,
}