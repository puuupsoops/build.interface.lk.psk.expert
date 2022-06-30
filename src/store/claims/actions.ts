import axios from '/src/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "/src/store"
import { ClaimState, defaultClaim } from "./types"
import { AuthMutations } from '../auth/mutations'
import { ClaimMutations } from './mutations'
import { OrderActions } from '../order/actions'
import { Orders } from '/src/models/Orders'


export enum ClaimActions {
	ADD_CLAIMS = "ADD_CLAIMS",
	ADD_CLAIMS_NEW = "ADD_CLAIMS_NEW",
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
				if (error.response && error.response.status =="404")
					commit(ClaimMutations.SET_CLAIMS, [])
				else
					commit(AuthMutations.SET_ERROR, 'Request GET_CLAIMS error:<br>'+error)
			});
	},
	async [ClaimActions.ADD_CLAIMS_NEW] ({commit, dispatch, getters}, n: number) {
		await dispatch(OrderActions.GET_ORDER_DETAIL, n).then(()=>{
			const res = Object.assign({}, defaultClaim)
			res.id = n
			res.order_detail = Object.assign({},getters.getOrderDetail)
			res.partner_guid = getters.getOrders.find( (x: Orders) => x.n == n).partner_guid
			res.partner_name = getters.getCompanyData(res.partner_guid).name
			commit(ClaimMutations.ADD_CLAIMS_NEW, res)
		})
	}
}