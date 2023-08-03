import axios from '/src/plugins/axios'
import Hashids from 'hashids'
import { ActionTree } from "vuex"
import { RootState } from "/src/store"
import { AuthState } from "./types"
import { AuthMutations } from "./mutations"
import { AuthRequest, Auth, AuthResponse } from '/src/models/Auth'
const api_location = import.meta.env.VITE_APP_API_LOCATION
export enum AuthActions {
	LOGIN = "LOGIN",
	LOGOUT = "LOGOUT",
	CHECK_AUTH = "CHECK_AUTH"
}

export const actions: ActionTree<AuthState, RootState> =  {
	async [AuthActions.LOGIN] ({ commit }, data: AuthRequest) {
		commit(AuthMutations.CLEAR_LOGIN_ERROR)
		const timestamp = new Date().getTime()
		const hash = new Hashids('XYZabc').encode(timestamp)

		const URL = `${api_location}/api/auth`

		await  axios(URL, {
			method:'POST',
			auth: {
				password: data.password,
				username: data.login
			},
			data: {
				timestamp: timestamp,
				hash: hash
			}
		})
		.then(response => {
			const data = response.data.response

			if(data.src != null) {
				// Если есть src делаем редирект с токеном
				window.open('http://10.68.5.205:3000/login/?token=' + data.token)
			}

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
			commit(AuthMutations.SET_LOGIN_ERROR, error.response.data.error?.message)
			return Promise.reject('Error')
		})

		// axios.post<AuthResponse>('/auth', <AuthRequest>data)
		// 	.then(response => {
		// 		const data = <Auth>response.data.response
		// 		if (response.data.error === null) {
		// 			axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
		// 			commit(AuthMutations.SET_AUTH, data.token)
		// 			return Promise.resolve()
		// 		} else {
		// 			commit(AuthMutations.CLEAR_ERROR, response.data.error?.message);
		// 			return Promise.reject('Error')
		// 		}
		// 	})
		// 	.catch(error => {
		// 			commit(AuthMutations.SET_LOGIN_ERROR, error.response.data.error.message)
		// 			return Promise.reject('Error')
		// 	})
	},
	[AuthActions.LOGOUT]({commit}) {
		commit(AuthMutations.LOGOUT);
	},
	[AuthActions.CHECK_AUTH]({commit}) {
		commit(AuthMutations.CHECK_AUTH_TOKEN);
	}
}
