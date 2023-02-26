export type ProductId = string;

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

export interface Product {
    id: ProductId,
    title: string,
    description: string,
    price: number,
    img: string,
    count: number
}

export interface IProductService {
    getAllProducts: () => Promise<Product[]>,
    getProductById: (id: ProductId) => Promise<Product>,
}
