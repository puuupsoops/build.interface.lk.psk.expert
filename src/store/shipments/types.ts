import { Shipments, ShipmentsAddress } from "@/models/Shipments";


export interface ShipmentsState {
    address_prompt: any[];
    address: ShipmentsAddress[];
    shipments: Shipments[];
    shipments_success: number;

}


