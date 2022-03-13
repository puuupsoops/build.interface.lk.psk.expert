import { ProductCharacteristic } from "./Product";



export interface Claim {
    title:         string;
    partner_name:  string;
    partner_guid:  string;
    id:            number;
    case:          number; //Причина притензии. [0 - другое, 1 - недосдача, 2 - пересорт , 3 - качество ]
    products:      ProductCharacteristic[];
    message:       string;
    files:         number;
}



