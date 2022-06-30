import { CatalogMenu, Catalog } from "/src/models/Catalog";

export interface CatalogState {
    menu: CatalogMenu|{};
    catalog: Catalog;
    pageCount: number;
}