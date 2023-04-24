import Router from 'express';
import CartController from 'bff-service/src/controllers/CartController.js';

const cartRoutes = new Router();

cartRoutes.get('/cart', CartController.getCart);
cartRoutes.put('/cart', CartController.create);
cartRoutes.post('/cart/checkout', CartController.checkout);
cartRoutes.delete('/cart', CartController.delete);

export default cartRoutes;
