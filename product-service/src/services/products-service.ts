import { getProducts } from '../mock-utils';
import { IProduct, IProductService, ProductId } from './typings';

export class ProductsService implements IProductService {

    getAllProducts(): Promise<IProduct[]> {
        return Promise.resolve(getProducts());
    }

    getProductById(id: ProductId): Promise<IProduct> {
        const products = getProducts();

        return Promise.resolve(products.find( product => product.id === id ));
    }
}
