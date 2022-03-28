
import { MutationTree } from "vuex";
import { ClaimState } from "./types";
import { state as stateOrders } from '@/store/orders/state'
import { Claim } from "@/models/Claim";

export enum ClaimMutations {
	CLEAR_CLAIMS_SUCCESS = 'SET_CLEAR_SUCCESS',
	SET_CLAIMS_SUCCESS = 'SET_CLAIMS_SUCCESS',
	SET_CLAIMS = 'SET_CLAIMS',
	
}

export const mutations: MutationTree<ClaimState> = {
	[ClaimMutations.CLEAR_CLAIMS_SUCCESS] (state){
		state.claimSuccess = []
	},
	[ClaimMutations.SET_CLAIMS_SUCCESS] (state, data){
		state.claimSuccess.push(data)
	},
	[ClaimMutations.SET_CLAIMS] (state, data: Claim[]): void{
		data.forEach( x => {
			const order = stateOrders.orders.find(o => o.n == x.id)
			if (order) x.order = order
		})
		state.claims = data.sort((a,b) => (a.date_create < b.date_create) ? 1 : ((b.date_create < a.date_create) ? -1 : 0))
	},
}