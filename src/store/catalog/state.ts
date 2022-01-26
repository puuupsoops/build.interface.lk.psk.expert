import { CatalogState } from "./types";

export const state: CatalogState = {
    menu: {},
    catalog: {
        products: [],
        count:    0,
        total:    0,
        page:     0,
    },
    pageCount: 0,
}