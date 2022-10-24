import { NewOrder } from "/src/models/Order";
import { MutationTree } from "vuex";
import { DefaultNewOrder, DefaultOrder, OrderState, OrderStateDelivery, OrderStateOrder, OrderStatePosition, OrderStatePositionOffer } from "./types";
import { state as CompanyState} from '/src/store/company/state'

const getCompanyDiscount = (uid: string, guid: string, status: string): number => {
	if (status == 'Outlet' || status == 'Discount' || status == 'Activity') return 0
	if (uid){
		const company = CompanyState.companys.find(x => x.uid === uid)
		const res = company && company.storages ? company.storages.find(x => x.guid === guid): null
		return res?res.discount:0
	} else { return 0 }
}

export enum OrderMutations {
	CREATE_ORDER = "CREATE_ORDER",
	CREATE_ORDER_FROM_DETAIL = "CREATE_ORDER_FROM_DETAIL",
	EDIT_ORDER = "EDIT_ORDER",
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
	ADD_ORDER_TO_DRAFT = "ADD_ORDER_TO_DRAFT",
	DEL_ORDER_FROM_DRAFT = "DEL_ORDER_FROM_DRAFT",
	DEL_ALL_DRAFT = "DEL_ALL_DRAFT",
	USE_DRAFT = "USE_DRAFT",
	ADD_ORDER_DETAIL = "ADD_ORDER_DETAIL",
	CLEAN_ORDER_DETAIL = "CLEAN_ORDER_DETAIL",
	SET_ORDER_REQUEST_SERT = "SET_ORDER_REQUEST_SERT",
	SET_ORDER_COMMENT = "SET_ORDER_COMMENT",
	SET_ORDER_DELIVERY = "SET_ORDER_DELIVERY",
}

export const mutations: MutationTree<OrderState> = {
	[OrderMutations.CREATE_ORDER](state): void{
		state.order.id = (new Date()).getTime()
		state.error = null;
	},
	[OrderMutations.ADD_POSITION] (state, data: OrderStatePosition): void{
		//console.log(data)
		if (data.characteristics.length > 0)
		{
			const exist = state.order.position.find(x => x.guid == data.guid);
			if (exist) { // если уже добавлено
				data.characteristics.forEach(char => {
					const exist_char = exist.characteristics.find(x => x.guid == char.guid);
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
			pos.characteristics.forEach((char, index, object) => {
				if (char.RESIDUE == 0) {
					object.splice(index, 1);
				}
				if (char.count > char.RESIDUE) {
					const presail_count = char.count - char.RESIDUE
					char.count = char.RESIDUE
					const exist = state.order.position_presail.find(x => x.guid == pos.guid);
					if (exist) { // если уже добавлен продукт
						const exist_char = exist.characteristics.find(x => x.guid == char.guid);
						if (exist_char) {  // усли у тавара уже добавлена характеристика, то проссумировать количество
							exist_char.count = exist_char.count + presail_count
						} else { // добавить новую характиристику 
							exist.characteristics.push( Object.assign({}, char));
							const e = exist.characteristics.find(x=> x.guid == char.guid)
							if (e) e.count = presail_count
						}
					} else { //добавить новый продукт
						const new_pos = <OrderStatePosition>{
							guid: pos.guid,
							article: pos.article,
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
	[OrderMutations.REMOVE_POSITION] (state, guid: string): void{
		state.order.position=state.order.position.filter(x=> x.guid !== guid);
	},
	[OrderMutations.REMOVE_POSITION_PRESAIL] (state, guid: string): void{
		state.order.position_presail=state.order.position_presail.filter(x=> x.guid !== guid);
	},
	[OrderMutations.REMOVE_CHARACTERISTIC] (state, data: OrderStatePosition): void{
		state.order.position.forEach(pos => {
			if (data.guid == pos.guid)
				pos.characteristics = pos.characteristics.filter(x=> x.GUID !== data.characteristics[0].GUID )
		});
	},
	[OrderMutations.REMOVE_CHARACTERISTIC_PRESAIL] (state, data: OrderStatePosition): void{
		state.order.position_presail.forEach(pos => {
			if (data.guid == pos.guid)
				pos.characteristics = pos.characteristics.filter(x=> x.GUID !== data.characteristics[0].GUID)
		});
	},
	[OrderMutations.CALC_ORDER] (state): void{
		state.order.position = state.order.position.filter(x=> x.characteristics.length > 0)
		state.order.position_presail = state.order.position_presail.filter(x=> x.characteristics.length > 0)
		let total = 0
		let total_discount = 0
		let total_count = 0
		let total_valume = 0
		let total_weight = 0
		
		

		state.order.position.forEach(pos => {
			let total_pos = 0
			let total_discount_pos = 0
			let total_count_pos = 0
			
			
			const total_valume_pos = pos.product.VALUME
			const total_weigth_pos = pos.product.WEIGHT
			pos.characteristics.forEach( c => {
				total_pos = total_pos + c.PRICE * c.count
				c.discount = getCompanyDiscount(state.partner_id, c.ORGGUID, pos.product.STATUS)
				c.price_discount = c.PRICE-c.discount*(c.PRICE/100)
				
				total_discount_pos = total_discount_pos +c.price_discount * c.count
				total_count_pos = total_count_pos + c.count;
			});
			pos.total = total_pos
			pos.total_discount = total_discount_pos
			pos.count = total_count_pos

			total = total + total_pos
			total_discount = total_discount + total_discount_pos
			total_count = total_count + total_count_pos
			total_valume = total_valume_pos * total_count_pos
			total_weight = total_weigth_pos * total_count_pos
		});
		
		state.order.position_presail.forEach(pos => {
			let total_pos = 0
			let total_discount_pos = 0
			let total_count_pos = 0
			
			const total_valume_pos = pos.product.VALUME
			const total_weigth_pos = pos.product.WEIGHT
			pos.characteristics.forEach( c => {
				total_pos = total_pos + c.PRICE * c.count
				c.discount = getCompanyDiscount(state.partner_id, c.ORGGUID, pos.product.STATUS)
				c.price_discount = c.PRICE-c.discount*(c.PRICE/100)
				
				total_discount_pos = total_discount_pos +c.price_discount * c.count
				total_count_pos = total_count_pos + c.count
			});
			pos.total = total_pos
			pos.total_discount= total_discount_pos
			pos.count = total_count_pos

			total = total + total_pos
			total_discount = total_discount + total_discount_pos
			total_count = total_count + total_count_pos
			total_valume = total_valume_pos * total_count_pos
			total_weight = total_weigth_pos * total_count_pos
		});

		state.order.count = state.order.position.length;
		state.order.total = total;
		state.order.total_discount = total_discount
		state.order.total_count = total_count;
		state.order.total_valume = Number(total_valume.toFixed(3));
		state.order.total_weight = Number(total_weight.toFixed(3));
		
		if (total == 0 && state.order.position_presail.length == 0 ) {
			state.order = Object.assign({}, DefaultOrder)
			state.order.position = []
			state.order.position_presail = []
		}
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
	},
	[OrderMutations.ADD_ORDER_TO_DRAFT] (state): void{
		state.order_drafts.push(state.order)
		localStorage.setItem('orders_drafts', JSON.stringify(state.order_drafts));
	},
	[OrderMutations.DEL_ORDER_FROM_DRAFT] (state, id: number): void{
		state.order_drafts = state.order_drafts.filter(x=>x.id!=id)
		localStorage.setItem('orders_drafts', JSON.stringify(state.order_drafts));
	},
	[OrderMutations.DEL_ALL_DRAFT] (state): void{
		state.order_drafts = []
		localStorage.setItem('orders_drafts', JSON.stringify(state.order_drafts));
	},
	[OrderMutations.USE_DRAFT] (state, id: number): void{
		const draft = JSON.stringify(state.order_drafts.find(x=>x.id==id))
		if (draft) {
			state.order = <OrderStateOrder>JSON.parse(draft ) 
			state.order.id = (new Date()).getTime()
		}
	},
	[OrderMutations.ADD_ORDER_DETAIL] (state, data: OrderStateOrder): void{
		if (data.position != null || data.position_presail != null) {
			state.order_detail.id = data.id
			state.order_detail.count = data.count
			state.order_detail.partner_id = data.partner_id
			state.order_detail.request_certificate = data.request_certificate
			state.order_detail.comment = data.comment
			state.order_detail.delivery =  Object.assign({}, data.delivery)

			let total = 0
			let total_discount= 0
			let total_presail = 0
			let total_presail_discount= 0
			if (data.position)
				state.order_detail.position = data.position.map( (x: any ) => {
					let total_price = 0
					let total_count = 0
					x.characteristics.forEach( (c: any) => {
						total = total + c.fullprice * Number(c.quantity)
						total_price = total_price + c.price * Number(c.quantity);
						total_count = total_count + Number(c.quantity);
					});
					
					total_discount = total_discount + total_price
					return  <OrderStatePosition>{
						product:{ NAME: x.name, PRICE: 0},
						count: total_count, 
						total: total_price,
						guid: x.guid,
						article: x.article,
						characteristics: x.characteristics.map((c: any) => {
							return {
								CHARACTERISTIC: c.title,
								PRICE: c.price,
								RESIDUE: c.available,
								GUID: c.guid,
								count: c.quantity,
								ORGGUID: c.orgguid,
								fullprice: c.fullprice
							}
						})
					}
			})
				
			if (data.position_presail)
				state.order_detail.position_presail = data.position_presail.map( (x: any ) => {
					let total_price = 0
					let total_count = 0
					x.characteristics.forEach( (c: any) => {
						total_presail = total_presail + c.fullprice * Number(c.quantity)
						total_price = total_price + c.price * Number(c.quantity);
						total_count = total_count + Number(c.quantity);
					});
					
					total_presail_discount = total_presail_discount + total_price
					return  <OrderStatePosition>{
						product:{ NAME: x.name, PRICE: 0},
						count: total_count, 
						total: total_price,
						guid: x.guid,
						article: x.article,
						characteristics: x.characteristics.map((c: any) => {
							return {
								CHARACTERISTIC: c.title,
								PRICE: c.price,
								count: c.quantity,
								GUID: c.guid,
								ORGGUID: c.orgguid,
								fullprice: c.fullprice
							}
						})
					}
			})
			state.order_detail.total = total
			state.order_detail.total_discount = total_discount
			state.order_detail.total_presail = total_presail
			state.order_detail.total_presail_discount = total_presail_discount
	
		}
	},
	[OrderMutations.CLEAN_ORDER_DETAIL] (state): void {
		state.order_detail = Object.assign({}, DefaultOrder)
	},
	[OrderMutations.CREATE_ORDER_FROM_DETAIL](state): void{
		state.order = Object.assign({}, state.order_detail) 
		state.order.position.forEach(x => {
			x.characteristics.forEach(c => {
				if (c.fullprice) c.PRICE = c.fullprice
			})
		})
		state.order.position_presail.forEach(x => {
			x.characteristics.forEach(c => {
				if (c.fullprice) c.PRICE = c.fullprice
			})
		})
		state.order.id = (new Date()).getTime()
		state.error = null
		
	},
	[OrderMutations.EDIT_ORDER](state, data): void{
		state.order = Object.assign({}, state.order_detail)
		
		state.order.id = data.n
		state.order.date = data.date
		state.order.edit = true
		state.error = null
		
	},
	[OrderMutations.SET_ORDER_REQUEST_SERT] (state, data: boolean){
		state.order.request_certificate = data
	},
	[OrderMutations.SET_ORDER_COMMENT] (state, data: string){
		state.order.comment = data
	},
	[OrderMutations.SET_ORDER_DELIVERY] (state, data: OrderStateDelivery){
		state.order.delivery = data
	}
}