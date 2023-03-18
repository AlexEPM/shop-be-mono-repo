export type ProductId = string;

export interface Product {
    id: ProductId,
    title: string,
    type?: string,
    description: string,
    price: number,
    img: string,
    rating?: number,
    count: number
}

export interface Stock {
    product_id: ProductId,
    count: number
}
