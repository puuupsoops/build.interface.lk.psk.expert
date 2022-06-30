import { Orders, OrdersDocStatus } from "/src/models/Orders";

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

export const OrdersSatusCode =  [
    {id: 0, name: 'Все'},
    {id: 1, name: 'Создан.'},
    {id: 2, name: 'В ожидании.'},
    {id: 3, name: 'Подтвержден.'},
    {id: 4, name: 'Передан на склад.'},
    {id: 5, name: 'Собран.'},
    {id: 6, name: 'Отгружен.'},
] //https://polshakov.atlassian.net/wiki/spaces/LKPSKEXPERT/pages/65791