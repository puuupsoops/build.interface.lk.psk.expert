import { NewOrder } from "@/models/Order";
import { MutationTree } from "vuex";
import { DefaultNewOrder, DefaultOrder, OrderState, OrderStatePosition, OrderStatePositionOffer } from "./types";


export enum OrderMutations {
	CREATE_ORDER = "CREATE_ORDER",
	ADD_POSITION = "ADD_POSITION",
	ADD_POSITION_PRESAIL = "ADD_POSITION_PRESAIL",
	REMOVE_POSITION = "REMOVE_POSITION",
	REMOVE_CHARACTERISTIC = "REMOVE_CHARACTERISTIC",
	CALC_ORDER = "CALC_ORDER",
	ADD_ORDER = "ADD_ORDER",
	CLEAN_ADD_ORDER = "CLEAN_ADD_ORDER",
	SET_ORDER_ERROR = "SET_ORDER_ERROR",
	CLEAN_ORDER_ERROR = "CLEAN_ORDER_ERROR",
	CLEAN_ORDER = "CLEAN_ORDER",
	ADD_ORDER_PARTNER_ID = "ADD_ORDER_PARTNER_ID",
}

export const mutations: MutationTree<OrderState> = {
	[OrderMutations.CREATE_ORDER](state): void{
		state.order.id = (new Date()).getTime()
		state.error = null;
	},
	[OrderMutations.ADD_POSITION] (state, data: OrderStatePosition): void{
		if (data.characteristics.length > 0)
		{
			let exist = state.order.position.find(x => x.product.ID == data.product.ID);
			if (exist) {
				let add_characteristics = data.characteristics.filter(x => {
					let e = exist?.characteristics.find(m => m.ID == x.ID)
					if (e){
						e.count = Number(e.count) + Number(x.count)
						if (Number(e.count) > Number(e.RESIDUE)) e.count=e.RESIDUE
					} else 
					return true
				});
				exist.characteristics = exist.characteristics.concat(add_characteristics);
			} else
				state.order.position.push(data);
		}

	},
	[OrderMutations.ADD_POSITION_PRESAIL] (state, data: OrderStatePosition): void{
		if (data.characteristics.length > 0)
		{
			let exist = state.order.position_presail.find(x => x.product.ID == data.product.ID);
			if (exist) {
				//console.log(exist)
				let add_characteristics = data.characteristics.filter(x => {
					let e = exist?.characteristics.find(m => m.ID == x.ID)
					if (e){
						e.count = Number(e.count) + Number(x.count)
					} else 
					return true
				});
				exist.characteristics = exist.characteristics.concat(add_characteristics);
			} else
				state.order.position_presail.push(data);
		}

	},
	[OrderMutations.REMOVE_POSITION] (state, data): void{
		if (data.position)
			state.order.position=state.order.position.filter(x=> Number(x.product.ID) !== Number(data.id));
		if (data.position_presail)
			state.order.position_presail=state.order.position_presail.filter(x=> Number(x.product.ID) !== Number(data.id));
	},
	[OrderMutations.REMOVE_CHARACTERISTIC] (state, data){
		if (data.position)
		{
			state.order.position.forEach(pos => {
				pos.characteristics = pos.characteristics.filter(x=> Number(x.ID) !== Number(data.id))
			});
			state.order.position = state.order.position.filter(x=> x.characteristics.length > 0)
		}
		if (data.position_presail)
		{
			state.order.position_presail.forEach(pos => {
				pos.characteristics = pos.characteristics.filter(x=> Number(x.ID) !== Number(data.id))
			});
			state.order.position_presail = state.order.position_presail.filter(x=> x.characteristics.length > 0)
		}
	},
	[OrderMutations.CALC_ORDER] (state){
		let total = 0;
		let total_count = 0;
		let total_valume = 0;
		let total_weight = 0;

		state.order.position.forEach(pos => {
			let total_pos = 0;
			let total_count_pos = 0;
			let total_valume_pos = Number(pos.product.VALUME);
			let total_weigth_pos = Number(pos.product.WEIGHT);
			pos.characteristics.forEach( c => {
				total_pos = total_pos + Number(c.PRICE) * Number(c.count);
				total_count_pos = total_count_pos + Number(c.count);
			});
			pos.total = total_pos;
			pos.count = total_count_pos

			total = total + total_pos;
			total_count = total_count + total_count_pos;
			total_valume = total_valume_pos * total_count_pos;
			total_weight = total_weigth_pos * total_count_pos;
		});
		state.order.position_presail.forEach(pos => {
			let total_pos = 0;
			let total_count_pos = 0;
			pos.characteristics.forEach( c => {
				total_pos = total_pos + Number(c.PRICE) * Number(c.count);
				total_count_pos = total_count_pos + Number(c.count);
			});
			pos.total = total_pos;
			pos.count = total_count_pos;
		});

		state.order.count = state.order.position.length;
		state.order.total = total;
		state.order.total_count = total_count;
		state.order.total_valume = Number(total_valume.toFixed(3));
		state.order.total_weight = Number(total_weight.toFixed(3));
		
		if (total == 0 && state.order.position_presail.length == 0 ) state.order.id = 0;
	},
	[OrderMutations.ADD_ORDER] (state, data: NewOrder){
		state.new_order = data;
	},
	[OrderMutations.CLEAN_ADD_ORDER] (state){
		state.new_order = DefaultNewOrder;
	},
	[OrderMutations.SET_ORDER_ERROR] (state, data: string|null){
		state.error = data
	}, 
	[OrderMutations.CLEAN_ORDER] (state){
		state.error = null;
	},
	[OrderMutations.CLEAN_ORDER] (state){
		state.order = DefaultOrder
	},
	[OrderMutations.ADD_ORDER_PARTNER_ID] (state, data: string) {
		state.partner_id = data;
	}

}