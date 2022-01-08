import { MutationTree } from "vuex";
import { AuthState } from "@/store/auth/types";

import axios from '@/plugins/axios';
import router from '@/plugins/router';

export enum AuthMutations {
	SET_AUTH = "SET_AUTH",
	LOGOUT = "LOGOUT",
	SET_ERROR = "SET_ERROR",
	SET_LOGIN_ERROR = "SET_LOGIN_ERROR",
	CLEAR_ERROR = "CLEAR_ERROR",
	CLEAR_LOGIN_ERROR = "CLEAR_LOGIN_ERROR",
	CHECK_AUTH_TOKEN = "CHECK_AUTH_TOKEN",
}

export const mutations: MutationTree<AuthState> = {
	[AuthMutations.SET_AUTH] (state, data) {
		state.token = data;
		if (data.save) {
			localStorage.setItem('id_token', data.token);
		}
	},
	[AuthMutations.LOGOUT] (state) {
		localStorage.removeItem('id_token');
		state.token = '';
		axios.defaults.headers.common['Authorization'] = ''
		router.push({name: 'Login'});
		router.go(0);
	},
	[AuthMutations.SET_ERROR] (state, data: string) {
		state.error = true;
		state.error_msg = data;
		router.push('/500');
	},
	[AuthMutations.SET_LOGIN_ERROR] (state, data: string) {
		state.error_login = true;
		state.error_login_msg = data;
	},
	[AuthMutations.CLEAR_ERROR]: (state) => {
		state.error = false;
		state.error_msg = '';
	},
	[AuthMutations.CLEAR_LOGIN_ERROR]: (state) => {
		state.error_login = false;
		state.error_login_msg = '';
	},
	[AuthMutations.CHECK_AUTH_TOKEN]: (state) => {
		state.token = localStorage.getItem('id_token')
	},

}