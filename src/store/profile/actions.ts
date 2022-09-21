import axios from '/src/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "/src/store"
import { ProfileState } from "./types"
import { ProfileResponse } from '/src/models/Propfile'
import { ProfileMutations } from './mutations'
import { AuthMutations } from '../auth/mutations'


export enum ProfileActions {
	GET_PROFILE = "GET_PROFILE_ACTION",
	UPD_PERSONAL = "UPD_PERSONAL",
	GET_IMAGE = "GET_IMAGE_ACTION"
}

export const actions: ActionTree<ProfileState, RootState> =  {
	async [ProfileActions.GET_PROFILE] ({ commit }) {
		commit(ProfileMutations.SET_LOADING, true)
		await axios.get<ProfileResponse>('/user/settings')
			.then(response => {
				commit(ProfileMutations.SET_PROFILE, response.data.response.personal)
				setTimeout(()=>{commit(ProfileMutations.SET_LOADING, false)}, 500)
			})
			.catch(error => {
				commit(AuthMutations.SET_ERROR, 'Request GET_PROFILE error:<br>'+error)
				commit(ProfileMutations.SET_LOADING, false)
			})
	},

	async [ProfileActions.UPD_PERSONAL] ({commit}, data) {
		await axios.post( '/user/settings/personal/update',
				data,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			).then(response=> {
				commit(ProfileMutations.SET_PROFILE, response.data.response)
			})
			.catch(error => {
				commit(AuthMutations.SET_ERROR, 'Request UPD_PERSONAL error:<br>'+error)
			});
	},
	async [ProfileActions.GET_IMAGE] ({commit, state}) {
		commit(ProfileMutations.SET_LOADING, true)
		await axios.get(state.personal.image, {
				timeout: 1000 * 3,
				responseType: 'arraybuffer',
				headers: {'Content-type': 'image/jpeg'}
			})
			.then(response => { 
				commit(ProfileMutations.SET_IMAGE, `data:${response.headers['content-type']};base64,${btoa(String.fromCharCode(...new Uint8Array(response.data)))}`)
				commit(ProfileMutations.SET_LOADING, false)
			})
			// .catch(()=>{
			// 	commit(ProfileMutations.SET_LOADING, false)
			// })
	}
}
