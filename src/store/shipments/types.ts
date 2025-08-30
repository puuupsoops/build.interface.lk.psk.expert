import { SelectInputData } from '/src/models/Components';
import { Shipments, ShipmentsAddress } from '/src/models/Shipments';

export interface ShipmentsState {
    address_prompt: any[];
    address: ShipmentsAddress[];
    shipments: Shipments[];
    shipments_success: number;
}

export const DeliveryName = <SelectInputData[]>[
    {id: 0, name: 'САМОВЫВОЗ'},
    {id: 1, name: 'ДЕЛОВЫЕ ЛИНИИ'}, 
    //{id: 2, name: 'БАЙКАЛ'},
    {id: 2, name: 'ПЭК'},
    {id: 3, name: 'ДРУГАЯ ТРАНСПОРТНАЯ'},
    {id: 4, name: 'ЦАП'},
];

export const DeliveryCode =  [
    {id: 0, code: 'pickup'},
    {id: 1, code: 'del_line'}, 
    //{id: 2, code: 'baikal'},
    {id: 2, code: 'pek'},
    {id: 3, code: 'other'},
    {id: 4, code: 'cap'}
];

export const PSKWorkTime: string = ' Понедельник-Пятница 8.00 - 18.00';
export const PSKAddress:string = 'Россия, 141402, Московская область, г. Химки, Вашутинское шоссе, вл35с1';