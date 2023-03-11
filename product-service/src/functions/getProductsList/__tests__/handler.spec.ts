import {getProductsList, productService} from '../handler';

describe('getProductsList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('successful case', () => {
        const mockProductServiceData = [
            {
                id: '1',
                title: 'product 1',
                description: 'product 1',
                price: 2,
                img: 'imgUrl_1',
                count: 2
            },
            {
                id: '2',
                title: 'product 2',
                description: 'product 2',
                price: 3,
                img: 'imgUrl_2',
                count: 3
            }
        ];

        beforeEach(() => {
            jest.spyOn(productService, 'getAllProducts').mockResolvedValue(mockProductServiceData);
        });

        it('should return product list', async () => {
            const response = await getProductsList();
            expect(JSON.parse(response.body)).toEqual(mockProductServiceData);
        });

        it('should return status 200', async () => {
            const response = await getProductsList();
            expect(response.statusCode).toEqual(200);
        });
    });

    describe('error case', () => {
        beforeEach(() => {
            jest.spyOn(productService, 'getAllProducts').mockResolvedValue(
                Promise.reject('error')
            );
        });

        it('should return Internal server error', async () => {
            const response = await getProductsList();
            expect(JSON.parse(response.body)).toEqual({ message: 'Internal server error' });
        });

        it('should return status 500', async () => {
            const response = await getProductsList();
            expect(response.statusCode).toEqual(500);
        });
    });
});
