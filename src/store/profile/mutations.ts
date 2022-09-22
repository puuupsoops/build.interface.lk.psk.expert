import { MutationTree } from "vuex";
import { ProfileState } from "./types";
import { ProfileNotificationsList, ProfilePersonal, } from "/src/models/Propfile";


export enum ProfileMutations {
	SET_PROFILE = "SET_PROFILE",
	SET_NOTIFICATION = "SET_NOTIFICATION",
	SЕT_IS_LOAD = "SЕT_IS_LOAD",
	SET_LOADING = "SET_LOADING",
	SET_IMAGE = "SET_IMAGE",
}

export const mutations: MutationTree<ProfileState> = {
	[ProfileMutations.SET_PROFILE] (state, data: ProfilePersonal) {
		state.personal = data
	},
	[ProfileMutations.SET_NOTIFICATION] (state, data: ProfileNotificationsList) {
		state.notifications = data
	},
	[ProfileMutations.SЕT_IS_LOAD] (state){
		state.is_load = true
	},
	[ProfileMutations.SET_LOADING] (state, data: boolean){
		state.loading = data
	},
	[ProfileMutations.SET_IMAGE] (state, data: string){
		state.image = data
	}

}