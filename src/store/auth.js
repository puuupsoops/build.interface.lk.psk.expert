import axios from '@/plugins/axios';
import router from '@/plugins/router';

export default {
state:  {
		error_login: false,
		error_login_msg: null,
		token: '',
		error: false,
		error_msg: '',
	},

	getters: {
		isAuthenticated: state => !!state.token,
		getLoginError: state => state.error_login,
		getLoginErrorMsg: state => state.error_login_msg,
		getError: state => state.error,
		getErrorMsg: state => state.error_msg,
	},
	mutations: {
		setAuth(state, data) {
			state.token = data.token;
			if (data.save) {
				localStorage.setItem('id_token', data.token);
			}
		},
		logout(state) {
			localStorage.removeItem('id_token');
			state.tocken = '';
			axios.defaults.headers.common['Authorization'] = ''
			router.push({name: 'Login'});
			router.go();
		},
		setError(state, data) {
			state.error = true;
			state.error_msg = data;
			router.push('/500');
		},
		setLoginError(state, data) {
			state.error_login = true;
			state.error_login_msg = data;
		},
		clearError: (state) => {
			state.error = false;
			state.error_msg = '';
		},
		clearLoginError: (state) => {
			state.error_login = false;
			state.error_login_msg = '';
		},
		checkAuth: (state) => {
			state.token = localStorage.getItem('id_token')
		},

	},
	actions: {
		LOGIN: async function({ commit }, data) {
			commit('clearLoginError')
			await axios.post('/auth', {login: data.login, password: data.password})
				.then(response => {
					///console.log(response.data)
					if (response.data.error === null) {
						axios.defaults.headers.common.Authorization = `Bearer ${response.data.response.token}`;
						commit('setAuth', {token:response.data.response.token, save:data.save})
					} else {
						commit('setError', response.data.error);
						return Promise.reject('Error')
					}
				})
				.catch(error => {
						commit('setLoginError', error.response.data.error.message)
				})
		},
		LOGOUT: function({commit}) {
			commit('logout');
		},
		CHECK_AUTH:async function({commit}) {
			commit('checkAuth');
		},
	}

}