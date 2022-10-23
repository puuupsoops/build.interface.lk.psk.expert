
// API response /partners

import { normalizeClass } from "vue";
import { ResponseError } from "./Error";

// Output Data
export interface PartnerResponse{
	response: Partner[],
	error: ResponseError|null
}

export interface Partner {
    uid:           string;
    name:          string;
    city:          string;
    phone:         string;
    email:         string;
    address:       string;
    inn:           string;
    bik:           string;
    payment:       string;
    correspondent: string;
    managerName:   string;
    managerUid:    string;
    storages?:     StorageCompany[];
}

export interface StorageCompany {
    guid:      string;
    name:      string;
    spent:     number;
    contract:  string;
    deferment: number;
    debt:      number;
    balance:   number;
    discount:  number;
    date:      string;
    case:      string; // "отсрочка", // <String> Вид взаиморасчетов
    percent:   number; //0, // <Float> Процент предоплаты 
    limit:     string; //1500000", // <String> Лимит 
    documents: Document[];
}

export interface Document {
    expires:       string;
    expires_date?: Date;
    date:          string;
    number:        string;
    debt:          number;
}

export interface CompanysList{
	id: number|string;
	name: string;
}

export function normalizeCompanyName(name: string):string {
    return name ? name
                    .replace(/Общество с ограниченной ответственностью/, 'ООО')
                    .replace(/Акционерное общество/, 'АО')
                    .replace(/Индивидуальный предприниматель/, 'ИП') :''
}