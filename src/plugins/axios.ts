
import axios from 'axios'
import { store } from '/src/store'
import { AuthActions } from '/src/store/auth/actions'
import { AuthMutations } from '/src/store/auth/mutations'


const api_location = import.meta.env.VITE_APP_API_LOCATION + '/api'

const instanse = axios.create({
	baseURL: api_location,
	headers: {
		"Content-type": "application/json"
	},
	withCredentials: false
});

const token = localStorage.getItem('id_token')
if (token) {
	instanse.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

instanse.interceptors.response.use(
	(response)=>{return response},
	async (error) =>  {
		try {
			if (error.response.status == 401 && error.response.config.url != '/auth') {
				await store.dispatch(AuthActions.LOGOUT)
			}
			return Promise.reject(error);
		} catch (e) {
			
			store.commit(AuthMutations.SET_ERROR, 'Ошибка ответа сервера: <br>' + (e as Error).message)
			return Promise.resolve()
		}
	});



export default instanse;


export const axios_dadata = axios.create({
	baseURL: import.meta.env.VITE_APP_DADATA_LOCATION,
	headers: {
		"Content-type": "application/json",
		"Accept": "application/json",
		"Authorization": "Token " + import.meta.env.VITE_APP_DADATA_TOKEN
	},
	withCredentials: false
});