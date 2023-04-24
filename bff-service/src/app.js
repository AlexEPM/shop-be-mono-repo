import express from 'express';
import * as process from 'process';

import productRouter from '../src/routes/product.routes.js';
import cartRouter from '../src/routes/cart.routes.js';
import router from '../src/routes/common.routes.js';
import dotenv from 'dotenv';

dotenv.config({path: '../.env'});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/', productRouter);
app.use('/', cartRouter);
app.use('/*', router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
