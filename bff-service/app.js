import express from 'express';
import * as process from 'process';

import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import router from './routes/common.routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/', productRouter);
app.use('/', cartRouter);
app.use('/*', router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
