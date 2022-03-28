import { Orders } from "./Orders";
import { ProductCharacteristic } from "./Product";



export interface Claim {
    bitrix_id?:    string;
    date_create:   string;
    status:        number;
    title:         string;
    partner_name:  string;
    partner_guid:  string;
    id:            number;
    case:          number; //Причина притензии. [0 - другое, 1 - недосдача, 2 - пересорт , 3 - качество ]
    products:      ProductCharacteristic[];
    message:       string;
    files:         any[];
    order?:        Orders|undefined;
}



