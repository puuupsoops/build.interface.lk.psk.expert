import { Case } from "@/models/Cases";
import { MutationTree } from "vuex";
import { CasesState } from "./types";


export enum CasesMutations {
	SET_CASE = "SET_SHOW_CASE",
	SET_CASE_NEXT = "SET_SHOW_CASE_NEXT",
	SET_CASE_PREV = "SET_SHOW_CASE_PREV",
}

export const mutations: MutationTree<CasesState> = {
	
	[CasesMutations.SET_CASE] (state, data: Case[]){
		state.cases=data;
	},
	[CasesMutations.SET_CASE_NEXT] (state){
		const first: Case = <Case>state.cases.shift();
		state.cases =  state.cases.concat(first);
	},
	[CasesMutations.SET_CASE_PREV] (state){
		const last = state.cases.pop();
		state.cases = <Case[]>[last].concat(state.cases);
	},
}