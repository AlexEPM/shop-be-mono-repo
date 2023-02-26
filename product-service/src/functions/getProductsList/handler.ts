import {middyfy} from '@libs/lambda';
import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {ProductsService} from '../../services/products-service';
import {errorResponse, successfulResponse} from '../../utils';

export const productService = new ProductsService();

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
    try {
        const products = await productService.getAllProducts();

        return successfulResponse(products);
    } catch (e) {
        console.log(`getProductsList() error: ${e.message}`);
        console.log(e);
        return errorResponse(e);
    }
};

export const main = middyfy(getProductsList);
