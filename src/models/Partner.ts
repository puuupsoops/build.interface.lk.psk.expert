
// API response /partners

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
    storages?:     Storage[];
}

export interface Storage {
    guid:      string;
    name:      string;
    spent:     number;
    contract:  string;
    deferment: number;
    debt:      number;
    balance:   number;
    discount:  number;
    date:      string;
    documents: Document[];
}

export interface Document {
    expires:      string;
    expires_str?: string;
    date:         string;
    date_str:     string;
    number:       string;
    debt:         number;
}

export interface CompanysList{
	id: number|string;
	name: string;
}