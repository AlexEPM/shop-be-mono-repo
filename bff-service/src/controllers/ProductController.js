import ProductService from 'bff-service/src/services/ProductService.js';

class ProductController {
    async create(req, res) {
        try {
            const createdProduct = await ProductService.create(req.body);
            res.json(createdProduct);
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

    async getAll(req, res) {
        try {
            const products = await ProductService.getAll();
            res.json(products);
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

    async getOne(req, res) {
        try {
            const product = await ProductService.getOne(req.query.productId);
            res.json(product);
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

export default new ProductController();
