import { Position } from "./Order"

export interface KP {
	offer: {
        executor: string,   //Общество с ограниченной ответственностью 'Эксперт Спецодежда', ИНН 7724345355, КПП 502901001, 141044, Московская обл, Мытищи г, деревня Грибки, улица Ангарская, владение № 8, строение 15, оф. 239,
        customer: string,   //Общество с ограниченной ответственностью 'Объединенный инженерный центр',
        n:        string,   //1,
        date:     number,   //17461231231,
        comment:  string,   //1. Наличие товара уточняйте перед оплатой;\n 2.Срок действия коммерческого предложения 3 дня.\n,
        position: Position[]
    },
    additionally : {
        prepayment: boolean,        // флаг предоплаты <Boolean>: true или false
        prepaymentValue: number,    // процент предоплаты, в виде коэффициента <Float>: 0.25 = 25%
        delay: boolean,             // флаг отсрочки <Boolean>:  
        delayWorkValue: number,     // рабочих дней отсрочки <Integer>
        delayCalendarValue: number, // календарных дней отсрочки <Integer>
        pickup : boolean ,          // флаг самовывоза <Boolean>: true или false
        delivery: boolean ,         // флаг доставки <Boolean>: true или false
        deliveryValue : number      // стоимость доставки <Float>
          
      },
    header: boolean,        //true,
    as:     string              //PDF
}


export enum KP_TYPES {
    ORDER = 'ORDER',        //Кп на основе уже умеющегося заказа
    DRAFT = 'DRAFT',        //КП  основе сохраненного черновика
    ORDER_POS = 'ORDER_POS' // КП из собранного, но еще не оформленного заказа
}