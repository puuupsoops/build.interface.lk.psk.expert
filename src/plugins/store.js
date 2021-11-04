import { createStore } from 'vuex'
import company from '@/store/company'
import product from '@/store/product'
import auth from '@/store/auth'
import catalog from '@/store/catalog'
import cart from '@/store/cart'


export default createStore({
	modules:{
		auth,
		company,
		product,
		catalog,
		cart
	}
})