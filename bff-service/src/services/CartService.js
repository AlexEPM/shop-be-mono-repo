import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({path: '../.env'});

const CART_URL = `${process.env['cart']}/cart`;

class CartService {
    async create(cart) {
        const result = await axios.post(CART_URL, cart);

        return result.data;
    }

    async getOne(userId) {
        if (!userId) {
            throw new Error('Id is not specified');
        }

        const result = await axios.get(`${CART_URL}/${userId}`);

        return result.data;
    }

    async update(cart) {
        const result = await axios.put(CART_URL, cart);

        return result.data;
    }

    async checkout(cart) {
        const result = await axios.post(`${CART_URL}/checkout`, cart);

        return result.data;
    }

    async delete(id) {
        if (!id) {
            throw new Error('Id is not specified');
        }

        const result = await axios.delete(`${CART_URL}/${id}`);

        return result.data;
    }
}

export default new CartService();
