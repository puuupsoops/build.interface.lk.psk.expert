import axios from '@/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "@/store"
import { CasesState } from "./types"
import { CaseResponse } from '@/models/Cases';
import { CasesMutations } from './mutations';

const site_location = process.env.VUE_APP_SITE_LOCATIONL;

export enum CasesActions {
	GET_CASE = "GET_SHOW_CASE",
}

export const actions: ActionTree<CasesState, RootState> =  {
	async [CasesActions.GET_CASE] ({commit}) {
		await axios.get<CaseResponse>(site_location+`/test/api/dashboard/main_page/ajax.php.php`)
			.then(response => {
				commit(CasesMutations.SET_CASE, response.data)
			})
			.catch( error => {
				commit('setError', 'Request GET_CASE error:<br>'+error)
			})

	},
}
