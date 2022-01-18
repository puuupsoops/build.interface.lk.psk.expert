
import { ResponseError } from "./Error";

// Input Data


// Output Data
export interface OrdersResponse{
	
}

export interface Orders {
    id:           string; // id из 1С базы, нужно будет для вытягивания документов или иных запросов в будущем
    name:         string; // Наименование
    partner_name: string; // Контрагент
    partner_guid: string; // Идентификатор контрагента, предоставляется для фильтрации
    user_id:      number; // ИД пользователя, опционально
    date:         string; // Дата создания, будем отображать вместе со временем, по канонам магазинов
    status:       string; // Статус, текстом
    status_code:  number; // Статус кодом, нужен для фильтрации в будущем
    n:            number; // Номер, в поле НОМЕР
    checks:       any[];  // тут будет всё остальное, то что вложено документы счета и т.д. ещё не определились с 1С-ником, ничего не готово по этому поводу.
}

