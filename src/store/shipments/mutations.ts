import { MutationTree } from "vuex";
import { ShipmentsState } from "./types";


export enum ShipmentsMutations {
	SET_SHIPMENT = "SET_SHIPMENT",
}

export const mutations: MutationTree<ShipmentsState> = {
	[ShipmentsMutations.SET_SHIPMENT](state){
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