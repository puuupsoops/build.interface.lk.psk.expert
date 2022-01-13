import axios from '@/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "@/store"
import { OrderState, OrderStateAddPosition } from "./types"
import { OrderMutations } from './mutations'
import { Order } from '@/models/Order'


export enum OrderActions {
	CREATE_ORDER = "CREATE_ORDER",
	ADD_POSITION = "ADD_POSITION",
	REMOVE_POSITION = "REMOVE_POSITION",
	REMOVE_CHARACTERISTIC = "REMOVE_CHARACTERISTIC",
	ADD_ORDER = "ADD_ORDER",
}

export const actions: ActionTree<OrderState, RootState> =  {
	[OrderActions.CREATE_ORDER] ({ commit }) {
		commit(OrderMutations.CREATE_ORDER);
	},

	[OrderActions.ADD_POSITION] ({ commit, getters }, data: OrderStateAddPosition) {
		// If order is empty then create newOrder and 
		if (!getters.isOrder) commit(OrderMutations.CREATE_ORDER);
		commit(OrderMutations.ADD_POSITION, data.position);
		commit(OrderMutations.ADD_POSITION_PRESAIL, data.position_presail);
		commit(OrderMutations.CALC_ORDER);
	},
	[OrderActions.REMOVE_POSITION] ({ commit }, data) {
		commit(OrderMutations.REMOVE_POSITION, data);
		commit(OrderMutations.CALC_ORDER);
	},

	[OrderActions.REMOVE_CHARACTERISTIC] ({ commit }, data) {
		commit(OrderMutations.REMOVE_CHARACTERISTIC, data);
		commit(OrderMutations.CALC_ORDER);
	},
	
	async [OrderActions.ADD_ORDER] ({ commit }, data: Order) {
		await axios.post('/order/add', data)
			.then(response => {
				commit(OrderMutations.ADD_ORDER, response.data.response)
			})
			.catch(error => {
				if (error.response.status == 400) {
					commit(OrderMutations.CLEAN_ORDER_ERROR, error.response.data.error.message)
				}
			})
	},
}
