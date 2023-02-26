import {middyfy} from '@libs/lambda';
import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';

import {ProductsService} from '../../services/products-service';
import {errorResponse, successfulResponse} from '../../utils';

const productService = new ProductsService();

const getProductsById: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
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

export const main = middyfy(getProductsById);
