import { Manager } from "@/models/Manager";
import { Partner } from "@/models/Partner";

export interface CompanyState {
	companys: Partner[],
	manager: Manager|{},
}

