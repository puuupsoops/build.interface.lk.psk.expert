import axios from '/src/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "/src/store"
import { AuthState } from "./types"
import { AuthMutations } from "./mutations"
import { AuthRequest, Auth, AuthResponse } from '/src/models/Auth'

export enum AuthActions {
	LOGIN = "LOGIN",
	LOGOUT = "LOGOUT",
	CHECK_AUTH = "CHECK_AUTH"
}

export const actions: ActionTree<AuthState, RootState> =  {
	async [AuthActions.LOGIN] ({ commit }, data: AuthRequest) {
		commit(AuthMutations.CLEAR_LOGIN_ERROR)

		await axios.post<AuthResponse>('/auth', <AuthRequest>data)
			.then(response => {
				const data = <Auth>response.data.response
				if (response.data.error === null) {
					axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
					commit(AuthMutations.SET_AUTH, data.token)
					return Promise.resolve()
				} else {
					commit(AuthMutations.CLEAR_ERROR, response.data.error?.message);
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
