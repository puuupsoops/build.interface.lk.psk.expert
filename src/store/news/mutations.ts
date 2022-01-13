import { News } from "@/models/News";
import { MutationTree } from "vuex";
import { NewsState } from "./types";


export enum NewsMutations {
	SET_NEWS = "SET_NEWS",
}

export const mutations: MutationTree<NewsState> = {
	[NewsMutations.SET_NEWS] (state, data: News[]){
		state.news=data;
	},
}