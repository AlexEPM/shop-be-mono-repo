import {IProductService} from './typings';
import {ProductMapper} from './product-mapper';
import {Product, ProductId, Stock} from '../domain/typings';
import {
    DynamoDBClient,
    QueryCommand,
    ScanCommand,
    TransactWriteItemsCommand,
    TransactWriteItemsCommandOutput
} from '@aws-sdk/client-dynamodb';
import {marshall, unmarshall} from '@aws-sdk/util-dynamodb';

import * as process from 'process';

const getQueryCommandProductById = (tableName: string, idField: string, id: ProductId) => {
    const queryParams = {
        KeyConditionExpression: `${idField} = :id`,
        ExpressionAttributeValues: {
            ':id': {
                "S": id
            }
        },
        TableName: tableName
    };

    return new QueryCommand(queryParams);
};

const getItemsTransactionCommand = (product: Product, stock: Stock) => {
    return new TransactWriteItemsCommand(
        {
            TransactItems: [
                {
                    Put: {
                        Item: marshall(product),
                        TableName: process.env.PRODUCTS_TABLE,
                    },
                },
                {
                    Put: {
                        Item: marshall(stock),
                        TableName: process.env.STOCKS_TABLE,
                    },
                },
            ],
        }
    )
};

export class ProductsDynamoDbService implements IProductService {
    dynamoDBClient: DynamoDBClient;

    constructor() {
        this.dynamoDBClient = new DynamoDBClient(process.env.REGION);
    }

    async getAllProducts(): Promise<Product[]> {
        const productsDBResult = await this.dynamoDBClient.send(
            new ScanCommand({TableName: process.env.PRODUCTS_TABLE}
            ));
        const stocksDBResult = await this.dynamoDBClient.send(
            new ScanCommand({TableName: process.env.STOCKS_TABLE}
            ));

        const productsResult = productsDBResult.Items.map((productItem) => unmarshall(productItem));
        const stocksResult = stocksDBResult.Items.map((stockItem) => unmarshall(stockItem));

        const commonResult = productsResult.map((productItem) => {
            const stock = stocksResult.find((stockItem) =>
                stockItem.product_id === productItem.id);

            if (stock) {
                return {
                    ...productItem,
                    count: stock.count
                }
            }

            return productItem;
        });

        return commonResult.map(
            (productDTO) => ProductMapper.fromProductDTOtoProduct(productDTO)
        );
    }

    async getProductById(id: ProductId): Promise<Product> {
        const productDBResult = await this.dynamoDBClient.send(
            getQueryCommandProductById(process.env.PRODUCTS_TABLE, 'id', id)
        );
        const stockDBResult = await this.dynamoDBClient.send(
            getQueryCommandProductById(process.env.STOCKS_TABLE, 'product_id', id)
        );

        const productDBResultItem = productDBResult.Items[0];

        if (productDBResultItem) {
            const productResult = unmarshall(productDBResultItem);
            const stockResult = stockDBResult.Items.length
                ? unmarshall(stockDBResult.Items[0])
                : {count: 0};

            const commonProduct = {
                ...productResult,
                count: stockResult.count
            };

            const product = ProductMapper.fromProductDTOtoProduct(commonProduct);

            return product;
        }

        return undefined;
    }

    async createProduct(product: Product): Promise<TransactWriteItemsCommandOutput> {
        const stock: Stock = {
          product_id: product.id,
          count: 0
        };

        const createProductTransactionResult =  await this.dynamoDBClient.send(
            getItemsTransactionCommand(product, stock)
        )

        return createProductTransactionResult;
    }
}
