import {getProductById, productService} from '../handler';
import {APIGatewayProxyEvent} from "aws-lambda";

describe('getProductById', () => {
    const event: APIGatewayProxyEvent = {
        pathParameters: {
            productId: '1'
        },
        ...{} as APIGatewayProxyEvent
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('successful case', () => {
        const mockProductServiceData =
            {
                id: '1',
                title: 'product 1',
                description: 'product 1',
                price: 2,
                img: 'imgUrl_1',
                count: 2
            };

        beforeEach(() => {
            jest.spyOn(productService, 'getProductById').mockResolvedValue(mockProductServiceData);
        });

        it('should return product', async () => {
            const response = await getProductById(event);
            expect(JSON.parse(response.body)).toEqual(mockProductServiceData);
        });

        it('should return status 200', async () => {
            const response = await getProductById(event);
            expect(response.statusCode).toEqual(200);
        });
    });

    describe('product not found case', () => {
        beforeEach(() => {
            jest.spyOn(productService, 'getProductById').mockResolvedValue(undefined);
        });

        it('should return Product not found', async () => {
            const response = await getProductById(event);
            expect(JSON.parse(response.body)).toEqual({ message: 'Product not found'});
        });

        it('should return status 404', async () => {
            const response = await getProductById(event);
            expect(response.statusCode).toEqual(404);
        });
    });

    describe('error case', () => {
        beforeEach(() => {
            jest.spyOn(productService, 'getProductById').mockResolvedValue(
                Promise.reject('error')
            );
        });

        it('should return Internal server error', async () => {
            const response = await getProductById(event);
            expect(JSON.parse(response.body)).toEqual({ message: 'Internal server error' });
        });

        it('should return status 500', async () => {
            const response = await getProductById(event);
            expect(response.statusCode).toEqual(500);
        });
    });
});
