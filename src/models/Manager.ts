import { ResponseError } from "./Error";

// API response /manager 
export interface ManagerResponse{
	response: Manager,
	error: ResponseError|null
}
export interface Manager {
    image:   string;
    phone2:  string;
    email:   string;
    contact: string;
    phone1:  string;
    name:    string;
    header:  Header;
}

export interface Header {
    name:    string;
    contact: string;
    email:   string;
    phone1:  string;
    phone2:  string;
}
