import { getProductsList } from '@functions/getProductsList/handler';
import { ProductsService } from '../../../services/products-service';

describe('getProductsList', () => {

    it('should return product list with status 200', async () => {
        const baseEvent = {
            body: null,
            headers: {},
            multiValueHeaders: {},
            httpMethod: 'GET',
            isBase64Encoded: false,
            path: 'products',
            pathParameters: null,
            queryStringParameters: null,
            multiValueQueryStringParameters: null,
            stageVariables: null,
            requestContext: undefined,
            resource: '',
        };

        const mResponse = {};
        const mockGetAllProducts = jest.fn().mockResolvedValueOnce(mResponse)
        const mockProductService: ProductsService = jest.fn().mockImplementation(() => {
            return {getAllProducts: mockGetAllProducts};
        });

        //const productService = new ProductsService();
        // const productService = jest.fn();
        // const retrieveDataSpy = jest.spyOn(productService, 'getAllProducts').mockResolvedValueOnce(mResponse);

        const response = await getProductsList(baseEvent);
        expect(response.statusCode).toEqual(200);
        expect(JSON.parse(response.body)).toEqual({});
    });
});
