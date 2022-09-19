import axios from '/src/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "/src/store"
import { ProfileState } from "./types"
import { ProfileResponse } from '/src/models/Propfile'
import { ProfileMutations } from './mutations'
import { AuthMutations } from '../auth/mutations'


export enum ProfileActions {
	GET_PROFILE = "GET_PROFILE_ACTION",
}

export const actions: ActionTree<ProfileState, RootState> =  {
	async [ProfileActions.GET_PROFILE] ({ commit }) {
		await axios.get<ProfileResponse>('/user/settings')
			.then(response => {
				commit(ProfileMutations.GET_PROFILE, response.data)

			})
			.catch(error => {
				commit(AuthMutations.SET_ERROR, 'Request GET_PROFILE error:<br>'+error)
			})
	},
}
