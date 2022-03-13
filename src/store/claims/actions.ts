import axios from '@/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "@/store"
import { ClaimState } from "./types"
import { AuthMutations } from '../auth/mutations'
import { ClaimMutations } from './mutations'


export enum ClaimActions {
	ADD_CLAIMS = "ADD_CLAIMS",
}

export const actions: ActionTree<ClaimState, RootState> =  {
	async [ClaimActions.ADD_CLAIMS] ({commit}, data) {
		axios.post( '/user/claims/add',
				data,
				{
					headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
			).then(response=> {
				commit(ClaimMutations.SET_SUCCESS, response.data.response.id)
			})
			.catch(error => {
				commit(AuthMutations.SET_ERROR, 'Request ADD_CLAIMS error:<br>'+error)
			});
		}
}