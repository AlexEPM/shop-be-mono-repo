import { handlerPath } from '@libs/handler-resolver';

export const getProductsById = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: '/product/{productId}'
      },
    },
  ],
};
