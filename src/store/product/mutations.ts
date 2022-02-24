import { Found, ProductArticles } from "@/models/Product";
import { MutationTree } from "vuex";
import { ProductState, DEFAULT_PRODUCT } from "./types";


export enum ProductMutations {
	SET_SEARCH_PRODUCT_RESULT = "SET_SEARCH_PRODUCT_RESULT",
	SET_SEARCH_PRODUCT_CLEAR = "SET_SEARCH_PRODUCT_CLEAR",
	SET_PRODUCT_RESULT = "SET_PRODUCT_RESULT",
	SET_PRODUCT_CLEAR = "SET_PRODUCT_CLEAR",
	SET_PRODUCT_ARTICLS = "SET_PRODUCT_ARTICLS",
	SET_PROFUCT_FOUND_ERR_STR = "SET_PROFUCT_FOUND_ERR_STR",
}

export const mutations: MutationTree<ProductState> = {
	[ProductMutations.SET_SEARCH_PRODUCT_RESULT](state, data) {
		state.search_product_result = data;
		state.product_offers = data.OFFERS;
		state.product_found = data.FOUND;
		state.product = data.PRODUCT;
		state.product_images = data.IMAGES;
		state.product_protect = data.PROTECT;
	},
	[ProductMutations.SET_SEARCH_PRODUCT_CLEAR](state) {
		state.search_product_result = [];
		state.product_offers = [];
		state.product_found = [];
		state.product = DEFAULT_PRODUCT;
		state.product_images = [];
		state.product_protect = [];
	},
	[ProductMutations.SET_PRODUCT_RESULT](state, data){
		state.product = data.PRODUCT;
		state.product_images = data.IMAGES;
		state.product_offers = data.OFFERS;
		state.product_protect = data.PROTECT;
	},
	[ProductMutations.SET_PRODUCT_CLEAR](state){
		state.product = DEFAULT_PRODUCT;
		state.product_images = [];
		state.product_offers = [];
		state.product_protect = [];
	},
	[ProductMutations.SET_PRODUCT_ARTICLS](state, data: Found[]){
		state.product_articls = data.map(x => {return {article: x.ARTICLE, name: x.NAME}});
	},
	[ProductMutations.SET_PROFUCT_FOUND_ERR_STR](state, data: string){
		state.product_found_err_str = data;
	},

}