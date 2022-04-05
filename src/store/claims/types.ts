import { Claim } from "@/models/Claim";
import { ProductCharacteristic } from "@/models/Product";

export interface ClaimState {
	claims: Claim[],
	claim_success: number[],
	claim_new: Claim[],
}


export const defaultClaim: Claim = {
	date_create:'',
	status: 0,
	title: '',
	partner_name: '',
	partner_guid: '',
	id: 0,
	case: 1, //Причина притензии. [0 - другое, 1 - недосдача, 2 - пересорт , 3 - качество ]
	products: <ProductCharacteristic[]>[],
	message: '',
	files: [],
	
}