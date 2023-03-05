import {Product, ProductId} from '../domain/typings';
import {DynamoDBClient, TransactWriteItemsCommandOutput} from '@aws-sdk/client-dynamodb';

export interface IProductService {
    dynamoDBClient: DynamoDBClient;
    getAllProducts: () => Promise<Product[]>,
    getProductById: (id: ProductId) => Promise<Product>,
    createProduct: (product: Product) => Promise<TransactWriteItemsCommandOutput>
}
