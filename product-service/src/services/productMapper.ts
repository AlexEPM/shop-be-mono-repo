import {ProductDTO } from './typings';
import {Product} from '../domain/typings';

export interface IProductMapper {
    fromProductDTOtoProduct(productDTO: ProductDTO): Product;
}


export const fromProductDTOtoProduct = (productDTO: ProductDTO): Product => {
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
