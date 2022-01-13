import { MutationTree } from "vuex";
import { OrdersState } from "./types";


export enum OrdersMutations {
	SET_ORDERS = "SET_ORDERS",
}

export const mutations: MutationTree<OrdersState> = {
	[OrdersMutations.SET_ORDERS](state){
        state.orders = [
            {
                name: 'Заказ № 1232 от 02.02.2020',
                partner: 'ООО “Вектор”',
                id: 1232,
                date_created: '02.02.20',
                state: 'Подтверждён',
                bills: [
                    {bill: 'счет1'},
                    {bill: 'счет2'},
                ]
            },
            {
                name: 'Заказ № 1232 от 02.02.2020',
                partner: 'ООО “Вектор”',
                id: 1232,
                date_created: '02.02.20',
                state: 'Подтверждён',
                bills: [
                    {bill: 'счет1'},
                    {bill: 'счет2'},
                ]
            },
            {
                name: 'Заказ № 1232 от 02.02.2020',
                partner: 'ООО “Вектор”',
                id: 1232,
                date_created: '02.02.20',
                state: 'Подтверждён',
                bills: [
                    {bill: 'счет1'},
                    {bill: 'счет2'},
                ]
            },
            {
                name: 'Заказ № 1232 от 02.02.2020',
                partner: 'ООО “Вектор”',
                id: 1232,
                date_created: '02.02.20',
                state: 'Подтверждён',
                bills: [
                    {bill: 'счет1'},
                    {bill: 'счет2'},
                ]
            },
            {
                name: 'Заказ № 1232 от 02.02.2020',
                partner: 'ООО “Вектор”',
                id: 1232,
                date_created: '02.02.20',
                state: 'Подтверждён',
                bills: [
                    {bill: 'счет1'},
                    {bill: 'счет2'},
                ]
            },
        ]
    }

}