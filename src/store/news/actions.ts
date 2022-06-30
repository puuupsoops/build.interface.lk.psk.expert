import axios from '/src/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "/src/store"
import { NewsState } from "./types"
import { NewsMutations } from './mutations';
import { NewsResponse } from '/src/models/News';
import { AuthMutations } from '../auth/mutations';

const site_location =import.meta.env.VITE_APP_SITE_LOCATION;

export enum NewsActions {
	GET_NEWS = "GET_NEWS",
}

export const actions: ActionTree<NewsState, RootState> =  {
	async [NewsActions.GET_NEWS] ({commit}) {
		await axios.get<NewsResponse>(site_location+`/test/api/dashboard/main_page/ajax_news.php`)
			.then(response => {
				commit(NewsMutations.SET_NEWS, response.data)
			})
			.catch( error => {
				commit(AuthMutations.SET_ERROR, 'Request GET_NEWS error:<br>'+error)
			})
	},
	
}
