import Router from 'express';
import apicache from 'apicache';

import ProductsController from 'bff-service/src/controllers/ProductController.js';

const productRoutes = new Router();
const cache = apicache.middleware;

productRoutes.get('/products', cache('2 minutes'), ProductsController.getAll);
productRoutes.get('/product', ProductsController.getOne);
productRoutes.post('/products', ProductsController.create);

export default productRoutes;
