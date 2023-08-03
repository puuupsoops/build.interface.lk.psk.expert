import { Found, Offer, Product, ProductFound, ProductArticles, Protect } from "/src/models/Product"

export interface ProductState {
	search_product_result: ProductFound[],
	product_offers: Offer[],
	product_found: Found[],
	product: Product,
	product_images: string[],
	product_protect: Protect[],
	product_articles: ProductArticles[],
	product_found_err_str: string,
	product_video_link: string
}
export const DEFAULT_PRODUCT = <Product>{
	ID:              '',
	UID:             '',
	NAME:            '',
	TYPE:			 '',
	ARTICLE:         '',
	PRICE:           0,
	PRICE_OPT:       0,
	WEIGHT:          0,
	VALUME:          0,
	DETAIL_TEXT:     '',
	STATUS:          '',
	VIDEO:           '',
	CHARACTERISTICS: [],
}