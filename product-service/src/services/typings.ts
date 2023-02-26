import {Product, ProductId} from '../domain/typings';

export interface ProductDTO {
    id: ProductId,
    title: string,
    type: string,
    description: string,
    price: number,
    img: string,
    rating: number
    count: number,
}

export interface IProductService {
    getAllProducts: () => Promise<Product[]>,
    getProductById: (id: ProductId) => Promise<Product>,
}
