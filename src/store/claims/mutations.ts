
import { MutationTree } from "vuex";
import { ClaimState, defaultClaim } from "./types";
import { state as stateOrders } from '@/store/orders/state'
import { Claim } from "@/models/Claim";

export enum ClaimMutations {
	CLEAR_CLAIMS_SUCCESS = 'SET_CLEAR_SUCCESS',
	CLEAR_CLAIMS_NEW = 'CLEAR_CLAIMS_NEW',
	SET_CLAIMS_SUCCESS = 'SET_CLAIMS_SUCCESS',
	SET_CLAIMS = 'SET_CLAIMS',
	ADD_CLAIMS_NEW = 'ADD_CLAIMS_NEW',
	DEL_CLAIMS_NEW = 'DEL_CLAIMS_NEW',
}

export const mutations: MutationTree<ClaimState> = {
	[ClaimMutations.CLEAR_CLAIMS_SUCCESS] (state){
		state.claim_success = []
	},
	[ClaimMutations.CLEAR_CLAIMS_NEW] (state){
		state.claim_new = []
	},
	[ClaimMutations.SET_CLAIMS_SUCCESS] (state, data){
		state.claim_success.push(data)
	},
	[ClaimMutations.SET_CLAIMS] (state, data: Claim[]): void{
		data.forEach( x => {
			const order = stateOrders.orders.find(o => o.n == x.id)
			if (order) x.order = order
		})
		state.claims = data.sort((a,b) => (a.date_create < b.date_create) ? 1 : ((b.date_create < a.date_create) ? -1 : 0))
	},
	[ClaimMutations.ADD_CLAIMS_NEW] (state, data: Claim) {
		state.claim_new.push(data)
	},
	[ClaimMutations.DEL_CLAIMS_NEW] (state, id: number) {
		state.claim_new.splice(id, 1)
	},
}