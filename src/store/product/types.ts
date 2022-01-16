import { Found, Offer, Product, ProductFound, Protect } from "@/models/Product"

export interface ProductState {
	search_product_result: ProductFound[],
	product_offers: Offer[],
	product_found: Found[],
	product: Product,
	product_images: string[],
	product_protect: Protect[]
}
export const DEFAULT_PRODUCT = {
	ID:              0,
	UID:             '',
	NAME:            '',
	ARTICLE:         '',
	PRICE:           0,
	WEIGHT:          0,
	VALUME:          0,
	DETAIL_TEXT:     '',
	STATUS:          '',
	CHARACTERISTICS: [],
}