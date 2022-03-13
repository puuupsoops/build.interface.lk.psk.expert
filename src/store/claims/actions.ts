import axios from '@/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "@/store"
import { ClaimState } from "./types"


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
			).then(function(){
				console.log('SUCCESS!!');
			})
			.catch(function(){
				console.log('FAILURE!!');
			});
		}
}