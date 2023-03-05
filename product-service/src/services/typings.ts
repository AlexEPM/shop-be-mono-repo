import {Product, ProductId} from '../domain/typings';
import {DynamoDBClient, PutItemCommandOutput} from '@aws-sdk/client-dynamodb';

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

export interface ProductCreatedReport {
    productDBResult: PutItemCommandOutput,
    stockDBResult: PutItemCommandOutput
}

export interface IProductService {
    dynamoDBClient: DynamoDBClient;
    getAllProducts: () => Promise<Product[]>,
    getProductById: (id: ProductId) => Promise<Product>,
    createProduct: (product: Product) => Promise<ProductCreatedReport>
}
