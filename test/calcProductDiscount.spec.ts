import { expect, test } from 'vitest'
import { calcProductDiscount } from '../src/func/calcProductDiscount';
import { ProductDiscountStatus } from '../src/models/Product';

const productDiscountVariableDataProvider = [...Array(21).keys()];
const personalDiscountVariableDataProvider = [...Array(21).keys()];

//Always return zero
const productStatusVariableDataProvider_AlwaysReturnZero = [
    ProductDiscountStatus.Activity,
    ProductDiscountStatus.Outlet,
    ProductDiscountStatus.Discount,
];

productStatusVariableDataProvider_AlwaysReturnZero.forEach((status) => {
    productDiscountVariableDataProvider.forEach((productDiscount, idx) => {
        personalDiscountVariableDataProvider.forEach((companyDiscount, subIdx) => {
            test(`Always return zero: (status: ${status}, productDiscount: ${productDiscount}, companyDiscount: ${companyDiscount})`, () => {
                expect(calcProductDiscount(status, productDiscount, companyDiscount)).toBe(0);
            });
        });
    });
});

// product discount avalible
const productStatusVariableDataProvider_ = [
    ProductDiscountStatus.Empty,
    ProductDiscountStatus.New
];

productStatusVariableDataProvider_.forEach((status) => {
    productDiscountVariableDataProvider.forEach((productDiscount, idx) => {
        personalDiscountVariableDataProvider.forEach((companyDiscount, subIdx) => {
            if(productDiscount == 0){
                test(`productDiscount eq zeroo: (status: ${status}, productDiscount: ${productDiscount}, companyDiscount: ${companyDiscount}): companyDiscount[${companyDiscount}]`, () => {
                    expect(calcProductDiscount(status, productDiscount, companyDiscount)).toBe(companyDiscount);
                });
            }else{

                if(companyDiscount >= productDiscount){
                    test(`companyDiscount greate/eq then productDiscount: (status: ${status}, productDiscount: ${productDiscount}, companyDiscount: ${companyDiscount}): productDiscount[${productDiscount}]`, () => {
                        expect(calcProductDiscount(status, productDiscount, companyDiscount)).toBe(productDiscount);
                    });
                }else{
                    test(`companyDiscount less then productDiscount: (status: ${status}, productDiscount: ${productDiscount}, companyDiscount: ${companyDiscount}): companyDiscount[${companyDiscount}]`, () => {
                        expect(calcProductDiscount(status, productDiscount, companyDiscount)).toBe(companyDiscount);
                    });
                }


            }
        });
    });
});

const productStatusVariableDataProvider = [
    ProductDiscountStatus.Soon,
    ProductDiscountStatus.Upgrade,
    ProductDiscountStatus.Request,
    ProductDiscountStatus.Expansion,
    ProductDiscountStatus.None
];

productStatusVariableDataProvider.forEach((status) => {
    productDiscountVariableDataProvider.forEach((productDiscount, idx) => {
        personalDiscountVariableDataProvider.forEach((companyDiscount, subIdx) => {
            test(`Always return zero: (status: ${status}, productDiscount: ${productDiscount}, companyDiscount: ${companyDiscount})`, () => {
                expect(calcProductDiscount(status, productDiscount, companyDiscount)).toBe(0);
            });
        });
    });
});