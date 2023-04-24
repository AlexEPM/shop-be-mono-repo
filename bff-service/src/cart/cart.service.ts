import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CartService {
    CART_URL = `${process.env['cart']}/cart`;

    async getCart(userId) {
        const result = await axios.get(`${this.CART_URL}/${userId}`);

        return await result.data;
    }

    async create(cart) {
        const result = await axios.post(this.CART_URL, cart);

        return result.data;
    }

    async checkout(cart) {
        const result = await axios.post(`${this.CART_URL}/checkout`, cart);

        return result.data;
    }

    async delete(userId) {
        if (!userId) {
            throw new Error('Id is not specified');
        }

        const result = await axios.delete(`${this.CART_URL}/${userId}`);

        return result.data;
    }
}
