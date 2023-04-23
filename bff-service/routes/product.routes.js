import Router from 'express';
import ProductsController from '../controllers/ProductController.js';

const productRoutes = new Router();

productRoutes.get('/products', ProductsController.getAll);
productRoutes.get('/product', ProductsController.getOne);
productRoutes.post('/products', ProductsController.create);

export default productRoutes;
