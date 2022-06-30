import { Manager } from "/src/models/Manager";
import { Partner } from "/src/models/Partner";

export interface CompanyState {
	companys: Partner[],
	manager: Manager|{},
}

