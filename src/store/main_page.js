import axios from '@/plugins/axios';
let site_location = process.env.VUE_APP_SITE_LOCATIONL;
export default {
state:  {
		news: [],
		show_cases: [],
	},

	getters: {
		isNews: state => state.news.length != 0,
		getNews: state => state.news,
		getOneNews: state => state.news.length != 0 ?state.news[0]: null,

		isShowCases: state => state.show_cases.length != 0,
		getShowCases: state => state.show_cases,
		getRandomCase: state => state.show_cases[Math.floor(Math.random()*state.show_cases.length)]
	},
	mutations: {
		setNews(state, data){
			state.news=data;
		},
		setSowCase(state, data){
			state.show_cases=data;
		},
		setSowCaseNext(state){
			const first = state.show_cases.shift();
			state.show_cases =  state.show_cases.concat(first);
		},
		setSowCasePrev(state){
			const last = state.show_cases.pop();
			state.show_cases = [last].concat(state.show_cases);
		},
	},
	actions: {
		GET_NEWS: async function({commit}) {
			await axios.get(site_location+`/test/api/dashboard/main_page/ajax_news.php`)
				.then(response => {
					commit('setNews', response.data)
				})
				.catch( error => {
					commit('setError', 'Request GET_NEWS error:<br>'+error)
				})

		},
		GET_SHOW_CASE: async function({commit}) {
			await axios.get(site_location+`/test/api/dashboard/main_page/ajax.php.php`)
				.then(response => {
					commit('setSowCase', response.data)
				})
				.catch( error => {
					commit('setError', 'Request SHOW_CASE error:<br>'+error)
				})

		},
		
	}

}