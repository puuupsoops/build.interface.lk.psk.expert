import { MutationTree } from "vuex";
import { KPState } from "./types";
import { KPLogoList } from "/src/models/KP"


export enum KPMutations {
	SET_KP_FILE = "SET_KP_FILE",
	SET_KP_FILE_TYPE = "SET_KP_FILE_TYPE",
	SET_KP_ORG_NAME = "SET_KP_ORG_NAME",
	SET_KP_LOGO = "SET_KP_LOGO",
	SET_KP_LOGO_LIST = "SET_KP_LOGO_LIST",
	SET_KP_LOGO_LIST_NEXT = "SET_KP_LOGO_LIST_NEXT",
	SET_KP_LOGO_LIST_PREV = "SET_KP_LOGO_LIST_PREV",
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
	[KPMutations.SET_KP_LOGO] (state, data: KPLogoList): void{
		state.logo_list = [data].concat(state.logo_list)
	},
	[KPMutations.SET_KP_LOGO_LIST] (state, data: KPLogoList[]){
		state.logo_list = data
	},
	[KPMutations.SET_KP_LOGO_LIST_NEXT] (state, data: KPLogoList[]){
		const first = state.logo_list.shift()
		if (first) state.logo_list = state.logo_list.concat(first)
	},
	[KPMutations.SET_KP_LOGO_LIST_PREV] (state, data: KPLogoList[]){

		const last = state.logo_list.pop() as KPLogoList
		state.logo_list = [last].concat(state.logo_list)
	},
}