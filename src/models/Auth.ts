// API response /auth
//

import { ResponseError } from "./Error";

// Input Data
export interface AuthRequest{
	login: string,
	password: string
}


// Output Data
export interface AuthResponse{
	response: Auth,
	error: ResponseError|null
}

export interface Auth{
	token: string
}
