// https://psk.expert/test/api/dashboard/catalog_page/ajax_menu.php

export interface CatalogMenuResponse{
	data: CatalogMenu,
}

export interface CatalogMenu {
	spetsodezhda:                       CatalogMenuItem;
	"obuv-rabochaya":                   CatalogMenuItem;
	"zashchita-ruk":                    CatalogMenuItem;
	"sredstva-individualnoy-zashchity": CatalogMenuItem;
	"prochie-tovary":                   CatalogMenuItem;
	professionalnaya:                   CatalogMenuItem;
}

export interface CatalogMenuItem {
	id:   number;
	name: string;
	sub:  CatalogMenuItemSub[];
}

export interface CatalogMenuItemSub {
	id:   number;
	name: string;
	code: string;
}

// https://psk.expert/test/api/dashboard/catalog_page/ajax.php?SECTION=muzhskaya&PAGE=1

export interface CatalogResponse{
	data: Catalog;
}
export interface CatalogRequest{
	SECTION: string;
	PAGE: number;
}
export interface Catalog {
	products: CatalogProduct[];
	count:    number;
	total:    number;
	page:     number;
}

export interface CatalogProduct {
	id:          string;
	title:       string;
	description: string;
	image:       string;
	material:    string;
	article:     string;
	prices:      Prices;
}

export interface Prices {
	special:   string;
	wholesale: string;
	retail:    string;
}
