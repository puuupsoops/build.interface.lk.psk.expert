import {DefaultOrder, OrderStateOrder} from "/src/store/order/types";
import getCompanyDiscount from './getCompanyDiscount'

export const orderCalc = (order: OrderStateOrder, partnerId?: string): OrderStateOrder => {
    order.position = order.position.filter(x=> x.characteristics.length > 0)
    order.position_presail = order.position_presail.filter(x=> x.characteristics.length > 0)
    let total = 0
    let total_discount = 0
    let total_count = 0
    let total_volume = 0
    let total_weight = 0



    order.position.forEach(pos => {
        let total_pos = 0
        let total_discount_pos = 0
        let total_count_pos = 0


        const total_volume_pos = pos.product.VALUME
        const total_weight_pos = pos.product.WEIGHT
        pos.characteristics.forEach( c => {
            total_pos = total_pos + c.PRICE * c.count
            c.discount = partnerId ? getCompanyDiscount(partnerId, c.ORGGUID, pos.product.STATUS) : 0
            if (c.MAX_DISCOUNT!= 0 && c.discount > c.MAX_DISCOUNT ) c.discount =  c.MAX_DISCOUNT
            c.price_discount = c.PRICE-c.discount*(c.PRICE/100)

            total_discount_pos = total_discount_pos +c.price_discount * c.count
            total_count_pos = total_count_pos + c.count;
        });
        pos.total = total_pos
        pos.total_discount = total_discount_pos
        pos.count = total_count_pos

        total = total + total_pos
        total_discount = total_discount + total_discount_pos
        total_count = total_count + total_count_pos
        total_volume = total_volume_pos * total_count_pos
        total_weight = total_weight_pos * total_count_pos
    });

    order.position_presail.forEach(pos => {
        let total_pos = 0
        let total_discount_pos = 0
        let total_count_pos = 0

        const total_volume_pos = pos.product.VALUME
        const total_weight_pos = pos.product.WEIGHT
        pos.characteristics.forEach( c => {
            total_pos = total_pos + c.PRICE * c.count
            c.discount = partnerId ? getCompanyDiscount(partnerId, c.ORGGUID, pos.product.STATUS) : 0
            if (c.MAX_DISCOUNT!= 0 && c.discount > c.MAX_DISCOUNT ) c.discount =  c.MAX_DISCOUNT
            c.price_discount = c.PRICE-c.discount*(c.PRICE/100)

            total_discount_pos = total_discount_pos +c.price_discount * c.count
            total_count_pos = total_count_pos + c.count
        });
        pos.total = total_pos
        pos.total_discount= total_discount_pos
        pos.count = total_count_pos

        total = total + total_pos
        total_discount = total_discount + total_discount_pos
        total_count = total_count + total_count_pos
        total_volume = total_volume_pos * total_count_pos
        total_weight = total_weight_pos * total_count_pos
    });

    order.count = order.position.length;
    order.total = total;
    order.total_discount = total_discount
    order.total_count = total_count;
    order.total_volume = Number(total_volume.toFixed(3));
    order.total_weight = Number(total_weight.toFixed(3));

    if (total == 0 && order.position_presail.length == 0 ) {
        order = Object.assign({}, DefaultOrder)
        order.position = []
        order.position_presail = []
    }
    // Добавить стоимость доставки к цене .
    order.total_discount = order.total_discount ? order.total_discount + order.delivery.cost : order.total//
    order.total = order.total + order.delivery.cost

    return order
}