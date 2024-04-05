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

    if(productDiscount == 0 && status == '-'){
        return companyDiscount ?? 0;
    }

	if (status == 'Outlet' || status == 'Discount'){
        return 0
    }

    return companyDiscount < productDiscount ? productDiscount : companyDiscount
}