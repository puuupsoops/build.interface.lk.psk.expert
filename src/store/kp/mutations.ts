import { MutationTree } from "vuex";
import { KPState } from "./types";


export enum KPMutations {
	SET_KP_FILE = "SET_KP_FILE",
}

export const mutations: MutationTree<KPState> = {
	[KPMutations.SET_KP_FILE] (state, data: any): void{
		state.file = data
	},
}