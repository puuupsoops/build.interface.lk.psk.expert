import { NewOrder } from "@/models/Order";
import { MutationTree } from "vuex";
import { DefaultNewOrder, DefaultOrder, OrderState, OrderStatePosition, OrderStatePositionOffer } from "./types";


export enum OrderMutations {
	CREATE_ORDER = "CREATE_ORDER",
	ADD_POSITION = "ADD_POSITION",
	REMOVE_POSITION = "REMOVE_POSITION",
	REMOVE_POSITION_PRESAIL = "REMOVE_POSITION_PRESAIL",
	REMOVE_CHARACTERISTIC = "REMOVE_CHARACTERISTIC",
	REMOVE_CHARACTERISTIC_PRESAIL = "REMOVE_CHARACTERISTIC_PRESAIL",
	CALC_ORDER = "CALC_ORDER",
	CALC_PRESAIL = "CALC_PRESAIL",
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
			const exist = state.order.position.find(x => x.product.ID == data.product.ID);
			if (exist) { // если уже добавлено
				data.characteristics.forEach(char => {
					const exist_char = exist.characteristics.find(x => x.ID == char.ID);
					if (exist_char) {  // усли у тавара уже добавлена характеристика, то проссумировать количество
						exist_char.count = exist_char.count + char.count
					} else { // добавить новую характиристику 
						exist.characteristics.push( Object.assign({}, char));
						
					}
				})
			} else
				state.order.position.push(data)
		}
	},
	[OrderMutations.CALC_PRESAIL] (state): void { // Если в массиве с позициями количество больше чем остаток - переместить разницу в массив position_presail
		state.order.position.forEach(pos => {
			pos.characteristics.forEach(char => {
				if (char.count > char.RESIDUE) {
					const presail_count = char.count - char.RESIDUE
					char.count = char.RESIDUE
					const exist = state.order.position_presail.find(x => x.product.ID == pos.product.ID);
					if (exist) { // если уже добавлен продукт
						const exist_char = exist.characteristics.find(x => x.ID == char.ID);
						if (exist_char) {  // усли у тавара уже добавлена характеристика, то проссумировать количество
							exist_char.count = exist_char.count + presail_count
						} else { // добавить новую характиристику 
							exist.characteristics.push( Object.assign({}, char));
							const e = exist.characteristics.find(x=> x.ID == char.ID)
							if (e) e.count = presail_count
						}
					} else { //добавить новый продукт
						const new_pos = <OrderStatePosition>{
							product: pos.product,
							characteristics: []
						}
						new_pos.characteristics.push( Object.assign({}, char))
						new_pos.characteristics[0].count = presail_count
						state.order.position_presail.push(new_pos)
					}
				}
			})
		})
	},
	[OrderMutations.REMOVE_POSITION] (state, ID: number): void{
		state.order.position=state.order.position.filter(x=> x.product.ID !== ID);
	},
	[OrderMutations.REMOVE_POSITION_PRESAIL] (state, ID: number): void{
		state.order.position_presail=state.order.position_presail.filter(x=> x.product.ID !== ID);
	},
	[OrderMutations.REMOVE_CHARACTERISTIC] (state, data: OrderStatePosition): void{
		state.order.position.forEach(pos => {
			if (data.product.ID == pos.product.ID)
				pos.characteristics = pos.characteristics.filter(x=> x.ID !== data.characteristics[0].ID)
		});
	},
	[OrderMutations.REMOVE_CHARACTERISTIC_PRESAIL] (state, data: OrderStatePosition): void{
		state.order.position_presail.forEach(pos => {
			if (data.product.ID == pos.product.ID)
				pos.characteristics = pos.characteristics.filter(x=> x.ID !== data.characteristics[0].ID)
		});
	},
	[OrderMutations.CALC_ORDER] (state): void{
		state.order.position = state.order.position.filter(x=> x.characteristics.length > 0)
		state.order.position_presail = state.order.position_presail.filter(x=> x.characteristics.length > 0)
		let total = 0;
		let total_count = 0;
		let total_valume = 0;
		let total_weight = 0;

		state.order.position.forEach(pos => {
			let total_pos = 0;
			let total_count_pos = 0;
			const total_valume_pos = Number(pos.product.VALUME);
			const total_weigth_pos = Number(pos.product.WEIGHT);
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
	[OrderMutations.ADD_ORDER] (state, data: NewOrder): void{
		state.new_order = data;
	},
	[OrderMutations.CLEAN_ADD_ORDER] (state){
		state.new_order = Object.assign({}, DefaultNewOrder);
	},
	[OrderMutations.SET_ORDER_ERROR] (state, data: string|null): void{
		state.error = data
	}, 
	[OrderMutations.CLEAN_ORDER_ERROR] (state): void{
		state.error = null;
	},
	[OrderMutations.CLEAN_ORDER] (state): void{
		state.order = Object.assign({}, DefaultOrder)
		state.order.position = []
		state.order.position_presail = []
	},
	[OrderMutations.ADD_ORDER_PARTNER_ID] (state, data: string): void{
		state.partner_id = data;
	}

}