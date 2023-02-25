import { ProductState, DEFAULT_PRODUCT } from "./types";

export const state: ProductState = {
	search_product_result: [],
	product_offers: [],
	product_found: [],
	product: DEFAULT_PRODUCT,
	product_images: [],
	product_protect: [],
	product_articles: [],
	product_found_err_str: '',
	product_video_link: ''
}