import { InjectionKey } from 'vue'
import { createStore, Store as StoreT, useStore as baseUseStore } from 'vuex'
import { auth } from './auth/index'
import { company } from './company/index'
import { news } from './news/index'
import { cases } from './cases/index'
import { product } from './product/index'
import { catalog } from './catalog/index'
import { order } from './order/index'
import { orders } from './orders/index'
import { shipments } from './shipments/index'
import { claims } from './claims/index'
import { keys } from './keys/index'
import { profile } from './profile/index'
import { wsStore } from '/src/plugins/wsStore'
import { kp } from './kp/index'


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
export const key: InjectionKey<StoreT<RootState>> = Symbol()


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
		claims,
		keys,
		profile,
		wsStore,
		kp,
	}
})

export function useStore () {
	return baseUseStore(key)
  }