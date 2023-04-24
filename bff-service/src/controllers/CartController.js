import CartService from 'bff-service/src/services/CartService.js';

class CartController {
    async create(req, res) {
        try {
            const createdCart = await CartService.create(req.body);
            res.json(createdCart);
        } catch (e) {
            console.log('some error', JSON.stringify(e));

            if (e.response) {
                const { status, data } = e.response;

                res.status(status).json(data);
            } else {
                res.status(500).json({ error: e.message});
            }
        }
    }

    async getCart(req, res) {
        try {
            const cart = await CartService.getOne(req.query.userId);
            res.json(cart);
        } catch (e) {
            console.log('some error', JSON.stringify(e));

            if (e.response) {
                const { status, data } = e.response;

                res.status(status).json(data);
            } else {
                res.status(500).json({ error: e.message});
            }
        }
    }

    async checkout(req, res) {
        try {
            const cart = await CartService.checkout(req.body);
            res.json(cart);
        } catch (e) {
            console.log('some error', JSON.stringify(e));

            if (e.response) {
                const { status, data } = e.response;

                res.status(status).json(data);
            } else {
                res.status(500).json({ error: e.message});
            }
        }
    }

    async update(req, res) {
        try {
            const updatedPost = await CartService.update(req.body);
            res.json(updatedPost);
        } catch (e) {
            console.log('some error', JSON.stringify(e));

            if (e.response) {
                const { status, data } = e.response;

                res.status(status).json(data);
            } else {
                res.status(500).json({ error: e.message});
            }
        }
    }

    async delete(req, res) {
        try {
            const deletedPost = await CartService.delete(req.query.userId);
            res.json(deletedPost);
        } catch (e) {
            console.log('some error', JSON.stringify(e));

            if (e.response) {
                const { status, data } = e.response;

                res.status(status).json(data);
            } else {
                res.status(500).json({ error: e.message});
            }
        }
    }
}

export default new CartController();
