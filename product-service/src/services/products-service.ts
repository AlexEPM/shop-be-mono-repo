import { getProducts } from '../mock-utils';
import { IProductService } from './typings';
import {ProductMapper} from './productMapper';
import {Product, ProductId} from '../domain/typings';

export class ProductsService implements IProductService {

    getAllProducts(): Promise<Product[]> {
        const productsDTO = getProducts();
        return Promise.resolve(productsDTO.map(
            (productDTO) => ProductMapper.fromProductDTOtoProduct(productDTO)
        ));
    }

    getProductById(id: ProductId): Promise<Product> {
        const productsDTO = getProducts();
        const productDTO = productsDTO.find(product => product.id === id);
        const product = productDTO ? ProductMapper.fromProductDTOtoProduct(productDTO) : productDTO;

        return Promise.resolve(product);
    }
}
