import { MutationTree } from "vuex";
import { AuthState } from "./types";

import axios from '/src/plugins/axios';
import router from '/src/plugins/router';

export enum AuthMutations {
	SET_AUTH = "SET_AUTH",
	SET_AUTH_LOGIN = "SET_AUTH_LOGIN",
	SET_SAVE_AUTH = "SET_SAVE_AUTH",
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
	},
	[AuthMutations.SET_AUTH_LOGIN] (state, data) {
		state.login = data;
	},
	[AuthMutations.SET_SAVE_AUTH] (state) {
		if (state.token) {
			localStorage.setItem('id_token', state.token);
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