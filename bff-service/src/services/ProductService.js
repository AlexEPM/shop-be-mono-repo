import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({path: '../.env'});

const PRODUCTS_URL = process.env['products'];

class ProductService {
    async getAll() {
        const result = await axios.get(`${PRODUCTS_URL}/products`);

        return await result.data;
    }

    async getOne(id) {
        if (!id) {
            throw new Error('Id is not specified');
        }

        const result = await axios.get(`${PRODUCTS_URL}/product/${id}`);

        return result.data;
    }

    async create(product) {
        const result = await axios.post(`${PRODUCTS_URL}/products`, product);

        return result.data;
    }
}

export default new ProductService();
