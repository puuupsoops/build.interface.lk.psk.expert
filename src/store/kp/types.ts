import { KP } from "/src/models/KP"

export interface KPState {
    kp: KP,
    file: any,
}

export const DefaultKP:KP = {
    offer: {
        executor: '',
        customer: '',
        n:        '',
        date:     -1,
        comment:  '',
        position: []
    },
    header: true,        //true,
    as:     'PDF'              //PDF
}

