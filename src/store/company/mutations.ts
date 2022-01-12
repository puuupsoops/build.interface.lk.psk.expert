import { Partner } from "@/models/Partner";
import { MutationTree } from "vuex";
import { CompanyState } from "./types";

export enum CompanyMutations {
	SET_COMPANYS = 'SET_COMPANYS',
	SET_MANAGER = 'SET_MANAGER',
}

export const mutations: MutationTree<CompanyState> = {
	[CompanyMutations.SET_COMPANYS] (state, data: Partner[]) {
		state.companys = data;
	},
	[CompanyMutations.SET_MANAGER] (state, data) {
		state.manager = data;
	},

}