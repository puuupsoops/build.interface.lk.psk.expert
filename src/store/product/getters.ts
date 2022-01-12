import { GetterTree } from "vuex"
import { RootState } from "@/store"
import { ProductState } from "./types"

export const getters: GetterTree<ProductState, RootState> = {
	isProduct: state => state.product.ID !== '',
	getProductSearchResult: state => state.search_product_result,
	getProductOffers: state => state.product_offers.length != 0 ? state.product_offers : 
											[{
												ID: 0,
												CHARACTERISTIC:'Только предзаказ',
												RESIDUE: 0,
												PRICE: state.product.PRICE,
												PPDATA: '',
												GUID: null,
												ORGGUID: null,
											}],
	getProductFound: state => state.product_found.filter(x => x.ARTICLE !==null),
	getProduct: state => state.product,
	getProductImages: state => state.product_images,
	getProductProtect: state => state.product_protect,
	getPtoductToCart: state => ({
		product: state.product,
		product_found: state.product_found,
		product_offers: state.product_offers,
		product_images: state.product_images,
		product_protect: state.product_protect,
	}),
}