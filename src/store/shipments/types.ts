import { SelectInputData } from '/src/models/Components';
import { Shipments, ShipmentsAddress } from '/src/models/Shipments'


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
    {id: 3, name: 'ПЭК'},
    {id: 4, name: 'ДРУГАЯ ТРАНСПОРТНАЯ'},
    {id: 5, name: 'ЦАП'},
]

export const DeliveryCode =  [
    {id: 0, code: 'pickup'},
    {id: 1, code: 'del_line'}, 
    //{id: 2, code: 'baikal'},
    {id: 3, code: 'pek'},
    {id: 4, code: 'other'},
    {id: 5, name: 'cap'}
]

export const PSKWorkTime: string = '8.00 до 18.00 (пн-пт) сб,вс-вых.'
export const PSKAddress:string = 'Россия, 141580, Московская область, Солнечногорский район, сельское поселение Лунёвское, в районе деревни Дубровки, ул. Аэропортовская, строение 6, корпус 1.'