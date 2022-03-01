import { Orders } from "@/models/Orders";
import { ShipmentsAddress } from "@/models/Shupments";


export interface ShipmentsState {
    orders: Orders[];
    address_prompt: any[];
    order_id: number;
    address: ShipmentsAddress[];
}

export enum ShipmentsConst {
	DEFAULT_ORDER_ID = -1,
}

