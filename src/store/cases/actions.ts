import axios from '/src/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "/src/store"
import { CasesState } from "./types"
import { CaseResponse } from '/src/models/Cases';
import { CasesMutations } from './mutations';
import { AuthMutations } from '../auth/mutations';

const site_location =import.meta.env.VITE_APP_SITE_LOCATION;

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
				commit(AuthMutations.SET_ERROR, 'Request GET_CASE error:<br>'+error)
			})

	},
}
