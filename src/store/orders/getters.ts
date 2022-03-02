import { GetterTree } from "vuex"
import { RootState } from "@/store"
import { OrdersState } from "./types"
import { SearchData } from "@/models/Components"

export const getters: GetterTree<OrdersState, RootState> = {
	isOrders: state => state.orders.length != 0,
	getOrdersByID: state => (id: number) => state.orders.find(x => x.n == id),
	getOrders: state => state.orders,
	getOrdersFiltred: state => (filter: SearchData|null ) => {
		if (filter) {
			switch (filter.id) {
				case 1:
					return state.orders.filter(x=>x.name.indexOf(filter.search) !=-1)
				case 2:
					return state.orders.filter(x=>x.partner_name.indexOf(filter.search) !=-1)
				case 3:
					return state.orders.filter(x=>x.n == parseInt(filter.search))
				case 4:
					return state.orders.filter(x=>x.date.indexOf(filter.search) !=-1)
				case 5:
					return state.orders.filter(x=>x.status.indexOf(filter.search) !=-1)
		}
		} else {
			return state.orders
		}
	},
	getCompanyFromOrders: state => {
		const unique = <Object[]>[...new Set(state.orders.map(item => item.partner_guid))]
		const res = unique.map(id => ({id, name:  state.orders.find(x => x.partner_guid ==id)?.partner_name}))
		res.unshift({id: '', name: "Все"})
		return res
	},
	getOrdersDataPeriodArray: state => {
		let res = [{id: 0, name: "Все",}]
		if (state.orders.length != 0) {
			const unique = <Object[]>[...new Set(state.orders.map(item => item.date.substring(3,10)))]
			res = unique.map((x, index) => {
				const start = new Date(parseInt(String(x).substring(3,7)), parseInt(String(x).substring(0,2))-1, 1 );
				const end = (new Date(start.getFullYear(), start.getMonth()+1, 0));
				const name = start.toLocaleString().substr(0,10) + ' - ' + end.toLocaleString().substr(0,10)
				return {
					id: index+1,
					name,
				// start,
				// end
				}
			})
			res.unshift({id: 0, name: "Все",})
		}
		return res
	},
} 