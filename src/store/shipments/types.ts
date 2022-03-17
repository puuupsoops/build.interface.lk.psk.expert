import { Shipments, ShipmentsAddress } from "@/models/Shupments";


export interface ShipmentsState {
    address_prompt: any[];
    address: ShipmentsAddress[];
    shipments: Shipments[];
    shipments_success: number;

}


