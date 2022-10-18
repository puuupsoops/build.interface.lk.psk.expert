import { SelectInputData } from '/src/models/Components';
import { Shipments, ShipmentsAddress } from '/src/models/Shipments'


export interface ShipmentsState {
    address_prompt: any[];
    address: ShipmentsAddress[];
    shipments: Shipments[];
    shipments_success: number;

}


export const DeliveryName = <SelectInputData[]>[
    {id: 0, name: 'ПЭК'},
    {id: 1, name: 'ДЕЛОВЫЕ ЛИНИИ'}, 
    {id: 2, name: 'БАЙКАЛ'},
    {id: 3, name: 'САМОВЫВОЗ'},
    {id: 4, name: 'ДОСТАВКА'},
]



export const DeliveryCode =  [
    {id: 0, code: 'pek'},
    {id: 1, code: 'del_lin'}, 
    {id: 2, code: 'baikal'},
    {id: 3, code: 'self'},
    {id: 4, code: 'shipment'},
]