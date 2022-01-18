import { Orders } from "@/models/Orders";
import { MutationTree } from "vuex";
import { OrdersState } from "./types";


export enum OrdersMutations {
	SET_ORDERS = "SET_ORDERS",
}

export const mutations: MutationTree<OrdersState> = {

    [OrdersMutations.SET_ORDERS](state, data: Orders[]){
        state.orders = data
    }

}