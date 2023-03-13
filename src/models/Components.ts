import {ShipmentsAddress} from "/src/models/Shipments";

export interface Sliders{
	id: number;
	src: string;
}

export interface SelectInputData{
	id: number|string;
	name: string;
}

export interface SearchData{
	id: number|string;
	search: string;
}
export const DateFromRuLocale = (date: string) => {
	return new Date(date.split('.')[2]+'-'+date.split('.')[1]+'-'+date.split('.')[0])
}

// приводит строковую цену к виду XXX.XX ₽
export const PriceFormat = (price: string|number, currency?: boolean): string => {
	let p = Number(price).toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2})
	p = p.replace(',','.')
	return  currency ? p+' ₽': p
}