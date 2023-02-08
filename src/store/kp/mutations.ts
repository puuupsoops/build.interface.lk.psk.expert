import { MutationTree } from "vuex";
import { KPState } from "./types";
import { KPLogoList } from "/src/models/KP"
import _ from 'lodash'


export enum KPMutations {
	SET_KP_FILE = "SET_KP_FILE",
	SET_KP_FILE_TYPE = "SET_KP_FILE_TYPE",
	SET_KP_ORG_NAME = "SET_KP_ORG_NAME",
	SET_KP_LOGO = "SET_KP_LOGO",
	SET_KP_LOGO_LIST = "SET_KP_LOGO_LIST",
	SET_KP_LOGO_LIST_NEXT = "SET_KP_LOGO_LIST_NEXT",
	SET_KP_LOGO_LIST_PREV = "SET_KP_LOGO_LIST_PREV",
	SET_KP_LOGO_LIST_SIFT = "SET_KP_LOGO_LIST_SIFT",
	DELETE_KP_LOGO_BY_ID = "DELETE_KP_LOGO_BY_ID",
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
	//[KPMutations.SET_KP_LOGO] (state, data: KPLogoList): void{
	//	state.logo_list = [data].concat(state.logo_list)
	//},
	[KPMutations.SET_KP_LOGO] (state, data): void{
		// присваиваем новые значения, т.к. Битрикс дичит с файлами, и генерирует новые айдишники
		state.logo_list_origin = _.cloneDeep(data)
		state.logo_list_origin.reverse()
		state.logo_list = _.cloneDeep(state.logo_list_origin)
	},
	[KPMutations.SET_KP_LOGO_LIST] (state, data: KPLogoList[]){
		state.logo_list = data
		state.logo_list_origin = _.cloneDeep(state.logo_list)
	},
	[KPMutations.SET_KP_LOGO_LIST_NEXT] (state, data: KPLogoList[]){
		const first = state.logo_list.shift()
		if (first) state.logo_list = state.logo_list.concat(first)
	},
	[KPMutations.SET_KP_LOGO_LIST_PREV] (state, data: KPLogoList[]){

		const last = state.logo_list.pop() as KPLogoList
		state.logo_list = [last].concat(state.logo_list)
	},
	[KPMutations.SET_KP_LOGO_LIST_SIFT] (state, n: number):void{
		if (n > 0){
			state.logo_list = state.logo_list.concat(state.logo_list.splice(0, n))
		} else {
			state.logo_list = state.logo_list.splice(state.logo_list.length + n ,-1*n).concat(state.logo_list)
		}
	},
	[KPMutations.DELETE_KP_LOGO_BY_ID] (state, data): void{
		// присваиваем новые значения, т.к. Битрикс дичит с файлами, и генерирует новые айдишники
		state.logo_list_origin = _.cloneDeep(data)
		state.logo_list_origin.reverse()
		state.logo_list = _.cloneDeep(state.logo_list_origin)
	},
}