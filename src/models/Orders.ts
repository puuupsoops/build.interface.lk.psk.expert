export interface Orders {
	name:           string;
	partner:        string;
	id:             number;
	date_created:   string;
	state:          string;
	bills:          Bill[]
}

export interface Bill{
	bill:           string;
}