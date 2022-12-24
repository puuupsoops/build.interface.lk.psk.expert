import { KP } from "/src/models/KP"

export interface KPState {
    kp: KP,
    file: any,
    file_type: string,
    org_name: string,
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
    additionally: {
        delay: false,
        delayCalendarValue: 0,
        delayWorkValue: 0,
        delivery: false,
        deliveryValue: 0,
        pickup: false,
        prepayment:false,
        prepaymentValue: 0
    },
    header: true,        //true,
    as:     'PDF',       //PDF
}

