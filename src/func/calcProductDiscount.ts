import { ProductDiscountStatus } from "../models/Product";

/**
 * Функция расчитывает применимую скидку к товару 
 * 
 * @param status Текстовый код Статуса товара в базе данных
 * @param max_discount Максимальная скидка, которая распростронияется на товар
 * @param company_discount Скидка у клиента компании
 * @returns Скидка целым числом
 */
export function calcProductDiscount(
    status: string,
    max_discount: number,
    company_discount: number

): number {
    const productDiscount = max_discount;
    const companyDiscount = company_discount;

    switch (status) {
        case ProductDiscountStatus.Outlet: // Outlet
        case ProductDiscountStatus.Discount: // Discount
        case ProductDiscountStatus.Activity:
            return 0;
        case ProductDiscountStatus.Empty: // - четрочка, отсутствие скидки
        case ProductDiscountStatus.New: // New collection
            if(productDiscount == 0)
                return companyDiscount ?? 0;
            return companyDiscount >= productDiscount ? productDiscount : companyDiscount 

        case ProductDiscountStatus.Soon: // Soon
        case ProductDiscountStatus.Upgrade: // Upgrade
        case ProductDiscountStatus.Request: // Под заказ
        case ProductDiscountStatus.Expansion: // Расширение ассортимента
        case ProductDiscountStatus.None: // '' пустота
        default:
            return 0
    }

    /*
	if (status == 'Outlet' || status == 'Discount'){
        return 0;
    }

    if(productDiscount == 0 && status == '-'){
        return companyDiscount ?? 0;
    }

    return companyDiscount > productDiscount ? productDiscount : companyDiscount
    */
}