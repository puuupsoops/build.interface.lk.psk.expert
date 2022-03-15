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

export const OrdersSatusCode =  ['Создан.', 'В ожидании.', 'Подтвержден.', 'Передан на склад.', 'Собран.', 'Отгружен.']