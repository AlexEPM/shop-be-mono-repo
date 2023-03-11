import {middyfy} from '@libs/lambda';
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import {ProductsDynamoDbService} from '../../services/products-dynamo-db-service';
import {addRequestToLog, errorResponse, successfulResponse} from '../../utils';

export const productService = new ProductsDynamoDbService();

export const getProductsList = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        addRequestToLog(event);

        const products = await productService.getAllProducts();

        return successfulResponse(products);
    } catch (e) {
        console.log(`getProductsList() error: ${e.message}`);
        console.log(e);
        return errorResponse(e);
    }
};

export const main = middyfy(getProductsList);
