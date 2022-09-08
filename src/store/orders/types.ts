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
    {id: 1, name: 'Зарегистрирован.'},
    {id: 2, name: 'Предзаказ'}, 
    {id: 3, name: 'Подтвержден.'},
    {id: 4, name: 'Передан на склад.'},
    {id: 5, name: 'Собран.'},
    {id: 6, name: 'Отгружен.'},
    {id: 7, name: 'Создан.'},
    {id: 8, name: 'Истек.'},
    {id: 9, name: 'Отменен.'},
    {id: 10, name: 'Закрыт.'},
] //https://polshakov.atlassian.net/wiki/spaces/LKPSKEXPERT/pages/65791 -- deprecated
  //https://psk-expert.atlassian.net/wiki/spaces/PSKEXPERT/pages/295169