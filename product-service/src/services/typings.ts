export type ProductId = string;

export interface IProduct {
    id: ProductId,
    title: string,
    description: string,
    price: number,
    logo: string,
    count: number,
}

export interface IProductService {
    getAllProducts: () => Promise<IProduct[]>,
    getProductById: (id: ProductId) => Promise<IProduct>,
}
