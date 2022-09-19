import { MutationTree } from "vuex";
import { ProfileState } from "./types";
import { ProfilePersonal, ProfileResponse } from "/src/models/Propfile";


export enum ProfileMutations {
	GET_PROFILE = "GET_PROFILE",
}

export const mutations: MutationTree<ProfileState> = {
	[ProfileMutations.GET_PROFILE] (state, data: ProfileResponse) {
		state.is_load = true;
		state.personal = data.response.personal;
	},

}