// API response /auth
//
// Input Data
export interface AuthData{
	login: string,
	password: string
}


// Output Data
export interface Auth{
	response: AuthResponse,
	error: AuthError|null
}

export interface AuthResponse{
	token: string
}


export interface AuthError{
	code: number,
	message: string
}