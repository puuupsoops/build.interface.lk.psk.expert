import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { auth } from './auth/index'
import { company } from './company/index'
import { news } from './news/index'
import { cases } from './cases/index'
import product from '@/store/product'
import { catalog } from './catalog/index'
import order from '@/store/order'
import orders from '@/store/orders'
import shipments from '@/store/shipments'
import { keys } from './keys/index'


// export default createStore({
// 	modules:{
// 		auth,
// 		company,
// 		product,
// 		catalog,
// 		order,
// 		orders,
// 		shipments,
// 		main_page,
// 	}
// })


export interface RootState {}
export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
	state: {},
	modules:{
		auth,
		company,
		news,
		cases,
		product,
		catalog,
		order,
		orders,
		shipments,
		keys
	}
})