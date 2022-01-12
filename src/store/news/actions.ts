import axios from '@/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "@/store"
import { NewsState } from "./types"
import { NewsMutations } from './mutations';
import { NewsResponse } from '@/models/News';
import { AuthMutations } from '../auth/mutations';

const site_location = process.env.VUE_APP_SITE_LOCATIONL;

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
