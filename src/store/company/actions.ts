import axios from '/src/plugins/axios'
import { ActionTree } from 'vuex'
import { RootState } from "/src/store"
import { CompanyState } from './types'
import { CompanyMutations } from './mutations'
import { AuthMutations } from '../auth/mutations'
import { PartnerResponse } from '/src/models/Partner'
import { ManagerResponse } from '/src/models/Manager'


export enum CompanyActions {
	GET_COMPANYS = "GET_COMPANYS",
	GET_MANAGER = "GET_MANAGER",
}

export const actions: ActionTree<CompanyState, RootState> =  {
	// API https://documenter.getpostman.com/view/15374835/UUxwBoF3#e1274708-aee2-4901-a4fa-40b9c3202c14
	async [CompanyActions.GET_COMPANYS] ({commit}) {
		await axios.get<PartnerResponse>('/partners')
			.then(response => {
				commit(CompanyMutations.SET_COMPANYS, response.data.response)
			})
			.catch( error => {
				commit(AuthMutations.SET_ERROR, 'Request GET_PARTNER error:<br>'+error)
			})
			
	},
	async [CompanyActions.GET_MANAGER] ({commit}) {
		await axios.get<ManagerResponse>('/manager')
			.then(response => {
					commit(CompanyMutations.SET_MANAGER, response.data.response)
			})
			.catch( error => {
				commit(AuthMutations.SET_ERROR, 'Request GET_MANAGER error:<br>'+error)
			})
			
	},
}
