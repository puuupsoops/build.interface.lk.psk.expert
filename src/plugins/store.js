import { createStore } from 'vuex'
import company from '@/store/company'
import product from '@/store/product'
import auth from '@/store/auth'


export default createStore({
	modules:{
		auth,
		company,
		product,
	}
})