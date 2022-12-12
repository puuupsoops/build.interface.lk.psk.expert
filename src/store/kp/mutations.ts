import { MutationTree } from "vuex";
import { KPState } from "./types";


export enum KPMutations {
	SET_KP_FILE = "SET_KP_FILE",
	SET_KP_FILE_TYPE = "SET_KP_FILE_TYPE",
	SET_KP_ORG_NAME = "SET_KP_ORG_NAME"
}

export const mutations: MutationTree<KPState> = {
	[KPMutations.SET_KP_FILE] (state, data: any): void{
		state.file = data
	},
	[KPMutations.SET_KP_FILE_TYPE] (state, data: string): void{
		if (data=='PDF') 
			state.file_type = 'pdf'
		else
			state.file_type = 'docx'
	},
	[KPMutations.SET_KP_ORG_NAME] (state, data: string): void{
		state.org_name = data
	},
}