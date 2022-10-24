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
export const DateFromRuLocale = (date: string) =>{
	return new Date(date.split('.')[2]+'-'+date.split('.')[1]+'-'+date.split('.')[0])
} 