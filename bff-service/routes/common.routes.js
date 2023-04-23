import Router from 'express';
import CommonController from '../controllers/CommonController.js';

const routes = new Router();

routes.get('/', CommonController.reject);

export default routes;
