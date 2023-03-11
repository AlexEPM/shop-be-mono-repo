import {middyfy} from '@libs/lambda';

import {ProductsDynamoDbService} from '../../services/products-dynamo-db-service';
import {addRequestToLog, errorResponse, successfulResponse} from '../../utils';
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';

export const productService = new ProductsDynamoDbService();

export const getProductById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        addRequestToLog(event);

        const { productId } = event.pathParameters;

        const product = await productService.getProductById(productId);

        if(product) {
            return successfulResponse(product);
        }

        return successfulResponse({ message: 'Product not found' }, 404);
    } catch (e) {
        console.log(`getProductsById() error: ${e.message}`);
        console.log(e);
        return errorResponse(e);
    }
};

export const main = middyfy(getProductById);
