import axios from '@/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "@/store"
import { AuthState } from "@/store/auth/types"
import { AuthMutations } from "./mutations"
import { AuthData, Auth } from '@/models/Auth'

export enum AuthActions {
	LOGIN = "LOGIN",
	LOGOUT = "LOGOUT",
	CHECK_AUTH = "CHECK_AUTH"
}

export const actions: ActionTree<AuthState, RootState> =  {
	async [AuthActions.LOGIN] ({ commit }, data: AuthData) {
		commit(AuthMutations.CLEAR_LOGIN_ERROR)

		await axios.post<Auth>('/auth', data)
			.then(response => {
				const data = <Auth>response.data
				if (response.data.error === null) {
					axios.defaults.headers.common.Authorization = `Bearer ${data.response.token}`
					commit(AuthMutations.SET_AUTH, data.response.token)
				} else {
					commit(AuthMutations.CLEAR_ERROR, data.error?.message);
					return Promise.reject('Error')
				}
			})
			.catch(error => {
					commit(AuthMutations.SET_LOGIN_ERROR, error.response.data.error.message)
					return Promise.reject('Error')
			})
	},
	[AuthActions.LOGOUT]({commit}) {
		commit(AuthMutations.LOGOUT);
	},
	[AuthActions.CHECK_AUTH]({commit}) {
		commit(AuthMutations.CHECK_AUTH_TOKEN);
	}
}
