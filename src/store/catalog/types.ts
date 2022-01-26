import { CatalogMenu, Catalog } from "@/models/Catalog";

export interface CatalogState {
    menu: CatalogMenu|{};
    catalog: Catalog;
    pageCount: number;
}