export type ProductId = string;

export interface Product {
    id: ProductId,
    title: string,
    description: string,
    price: number,
    img: string,
    count: number
}
