import axios from '@/plugins/axios';
import { ActionTree } from "vuex";
import { RootState } from "@/store";
import { AuthState } from "@/store/auth/types";
import { AuthMutations } from './mutstions';

export enum AuthActions {
	LOGIN = "LOGIN",
	LOGOUT = "LOGOUT",
	CHECK_AUTH = "CHECK_AUTH"
}

export const actions: ActionTree<AuthState, RootState> = {
	async [AuthActions.LOGIN] ({ commit }, data) {
		commit(AuthMutations.CLEAR_LOGIN_ERROR)
		await axios.post('/auth', {login: data.login, password: data.password})
			.then(response => {
				///console.log(response.data)
				if (response.data.error === null) {
					axios.defaults.headers.common.Authorization = `Bearer ${response.data.response.token}`
					commit(AuthMutations.SET_AUTH, {token:response.data.response.token, save:data.save})
				} else {
					commit(AuthMutations.CLEAR_ERROR, response.data.error);
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

console.log(actions)