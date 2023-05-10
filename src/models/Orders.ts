
import { ResponseError } from "./Error";

// Input Data


// Output Data
export interface OrdersResponse{
	
}



export interface Orders {
    id:                  string; // !deprecated <string> временно оставлено пустым
    name:                string; // имя заказа
    partner_name:        string; // имя контрагента
    partner_guid:        string; // идентификатор контрагента
    user_id:             number; // дентификатор пользователя в битрикс
    date:                string; // дата создания заказа
    status:              string; // статус заказа текстом
    status_code:         number; // код статуса заказа
    n:                   number; // идентификатор общего заказа в таблице заказов Битрикс
    checks:              Check[] | null; //массив со счетами
    reserved:            Boolean; // Признак того что заказ в резерве
    comment:             String;
    shipment_name:       string|null, // До транспортной, Доставка, Самовывоз
    shipment_id:         number|null,
    delivery_terms:      string|null, // Другая, ПЭК, Байкал (НЕ ИСПОЛЬЗУЕТСЯ), Деловые линии, ЦЭП
    delivery_terms_id:   number|null,
    delivery_terms_code: string|null,
    upd?:                string
}

export interface Check {
    id:                      number; // идентификатор позиции заказа в битрикс 
    guid:                    string; // идентификатор позиции заказа в 1С базе (для получения документов)
    status:                  number; // мнемонический код статуса позиции заказа из 1С
    organization_id:         string; // уникальный идентификатор организации-склада (ФРО/ЭС)
    n:                       string; // <string> Номер документа в базе 1С
    doc_status?:     OrdersDocStatus;
}

export interface OrdersDocStatus {
    id:          string;
    StatusSchet: boolean;
    StatusUPD:   boolean;
    StatusSF:    boolean;
    StatusUPK:   boolean;
}