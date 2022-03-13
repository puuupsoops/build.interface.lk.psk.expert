
import { MutationTree } from "vuex";
import { ClaimState } from "./types";

export enum ClaimMutations {
	SET_CLEAR_SUCCESS = 'SET_CLEAR_SUCCESS',
	SET_SUCCESS = 'SET_SUCCESS',
}

export const mutations: MutationTree<ClaimState> = {

	[ClaimMutations.SET_CLEAR_SUCCESS] (state){
		state.claimSuccess = []
	},
	[ClaimMutations.SET_SUCCESS] (state, data){
		state.claimSuccess.push(data)
	},
}