import {Product} from '../domain/typings';

export interface IProductMapper {
    fromProductDTOtoProduct(productDTO: any): Product;
}


export const fromProductDTOtoProduct = (productDTO: any): Product => {
    const {
        id,
        title,
        description,
        price,
        img,
        count
    } = productDTO;

    return {
        id,
        title,
        description,
        price,
        img,
        count
    }
};

export const ProductMapper: IProductMapper = {
    fromProductDTOtoProduct
};
