import { ResponseError } from "./Error";

// API response /manager 
export interface ProfileResponse{
	response: {
        personal: ProfilePersonal,
        notifications:{
            order:
                {
                    email: ProfileNotifications,
                    lk:    ProfileNotifications
                },
            }
        },
	error: ResponseError|null
}
export interface ProfilePersonal {
    name:       string;
    lastname:   string;
    patronymic: string;
    email:      string;
    phone:      string;
    image:      string;
}

export interface ProfileNotifications {
    created:   boolean,
    changed:   boolean,
    states:    boolean
}
