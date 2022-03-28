import axios from '@/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "@/store"
import { ClaimState } from "./types"
import { AuthMutations } from '../auth/mutations'
import { ClaimMutations } from './mutations'


export enum ClaimActions {
	ADD_CLAIMS = "ADD_CLAIMS",
	GET_CLAIMS = "GET_CLAIMS",
}

export const actions: ActionTree<ClaimState, RootState> =  {
	async [ClaimActions.ADD_CLAIMS] ({commit}, data) {
		await axios.post( '/user/claims/add',
				data,
				{
					headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
			).then(response=> {
				commit(ClaimMutations.SET_CLAIMS_SUCCESS, response.data.response.id)
			})
			.catch(error => {
				commit(AuthMutations.SET_ERROR, 'Request ADD_CLAIMS error:<br>'+error)
			});
		},

	async [ClaimActions.GET_CLAIMS] ({commit}) {
		await axios.get( '/user/claims').then(response=> {
				
				commit(ClaimMutations.SET_CLAIMS, response.data.response)
			})
			.catch(error => {
				commit(AuthMutations.SET_ERROR, 'Request GET_CLAIMS error:<br>'+error)
			});
		}
}