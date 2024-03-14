import { Partner } from "/src/models/Partner";
import { MutationTree } from "vuex";
import { CompanyState } from "./types";
import { Manager } from "/src/models/Manager";

export enum CompanyMutations {
	SET_COMPANYS = 'SET_COMPANYS',
	SET_MANAGER = 'SET_MANAGER',
	CLEAR_MANAGER = 'CLEAR_MANAGER',
	SET_ACTIVE_COMPANY_ID = 'SET_ACTIVE_COMPANY_ID'
}

export const mutations: MutationTree<CompanyState> = {
	[CompanyMutations.SET_COMPANYS] (state, data: Partner[]) {
		state.companys = data;
	},
	[CompanyMutations.SET_MANAGER] (state, data: Manager) {
		state.manager = data;
	},
	[CompanyMutations.CLEAR_MANAGER] (state) {
		state.manager = {};
	},
	[CompanyMutations.SET_ACTIVE_COMPANY_ID] (state, data: string) {
		state.activeCompanyId = data
	}
}