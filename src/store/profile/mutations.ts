import { MutationTree } from "vuex";
import { ProfileState } from "./types";
import { ProfilePersonal, ProfileResponse } from "/src/models/Propfile";


export enum ProfileMutations {
	SET_PROFILE = "SET_PROFILE",
	SET_LOADING = "SET_LOADING",
	SET_IMAGE = "SET_IMAGE",
}

export const mutations: MutationTree<ProfileState> = {
	[ProfileMutations.SET_PROFILE] (state, data: ProfilePersonal) {
		state.is_load = true;
		state.personal = data;
	},
	[ProfileMutations.SET_LOADING] (state, data: boolean){
		state.loading = data
	},
	[ProfileMutations.SET_IMAGE] (state, data: string){
		state.image = data
	}

}