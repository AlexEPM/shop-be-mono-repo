import {middyfy} from '@libs/lambda';

import {ProductsService} from '../../services/products-service';
import {errorResponse, successfulResponse} from '../../utils';
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';

export const productService = new ProductsService();

export const getProductById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
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
