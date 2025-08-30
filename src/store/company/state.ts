import { CompanyState } from "./types"
import {Partner} from "/src/models/Partner";

export const state: CompanyState = {
	companys:  <Partner[]>[],
	manager: {},
	managers: [],
	activeCompanyId: ''
}