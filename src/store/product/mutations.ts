import { Found } from "/src/models/Product";
import { MutationTree } from "vuex";
import { ProductState, DEFAULT_PRODUCT } from "./types";


export enum ProductMutations {
	SET_SEARCH_PRODUCT_RESULT = "SET_SEARCH_PRODUCT_RESULT",
	SET_SEARCH_PRODUCT_CLEAR = "SET_SEARCH_PRODUCT_CLEAR",
	SET_PRODUCT_RESULT = "SET_PRODUCT_RESULT",
	SET_PRODUCT_CLEAR = "SET_PRODUCT_CLEAR",
	SET_PRODUCT_ARTICLES = "SET_PRODUCT_ARTICLES",
	SET_PRODUCT_FOUND_ERR_STR = "SET_PRODUCT_FOUND_ERR_STR",
}

export const mutations: MutationTree<ProductState> = {
	[ProductMutations.SET_SEARCH_PRODUCT_RESULT](state, data) {
		state.search_product_result = data;
		state.product_offers = data.OFFERS;
		state.product_found = data.FOUND;
		state.product = data.PRODUCT;
		state.product_images = data.IMAGES;
		state.product_protect = data.PROTECT;
		state.product_video_link = data.VIDEO;
	},
	[ProductMutations.SET_SEARCH_PRODUCT_CLEAR](state) {
		state.search_product_result = [];
		state.product_offers = [];
		state.product_found = [];
		state.product = DEFAULT_PRODUCT;
		state.product_images = [];
		state.product_protect = [];
		state.product_video_link = '';
	},
	[ProductMutations.SET_PRODUCT_RESULT](state, data){
		state.product = data.PRODUCT;
		state.product_images = data.IMAGES;
		state.product_offers = data.OFFERS;
		state.product_protect = data.PROTECT;
		state.product_video_link = data.VIDEO;
	},
	[ProductMutations.SET_PRODUCT_CLEAR](state){
		state.product = DEFAULT_PRODUCT;
		state.product_images = [];
		state.product_offers = [];
		state.product_protect = [];
		state.product_video_link = '';
	},
	[ProductMutations.SET_PRODUCT_ARTICLES](state, data: Found[]){
		state.product_articles = data.map(x => {return {article: x.ARTICLE, name: x.NAME}});
	},
	[ProductMutations.SET_PRODUCT_FOUND_ERR_STR](state, data: string){
		state.product_found_err_str = data;
	},

}