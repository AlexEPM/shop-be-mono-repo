import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProductsService {
    PRODUCTS_URL = process.env['products'];

    async getAll() {
        const result = await axios.get(`${this.PRODUCTS_URL}/products`);

        return await result.data;
    }

    async getOne(productId) {
        if (!productId) {
            throw new Error('Id is not specified');
        }

        const result = await axios.get(`${this.PRODUCTS_URL}/product/${productId}`);

        return result.data;
    }

    async create(product) {
        const result = await axios.post(`${this.PRODUCTS_URL}/products`, product);

        return result.data;
    }
}
