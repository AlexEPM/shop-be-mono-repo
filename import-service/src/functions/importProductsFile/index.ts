import { handlerPath } from '@libs/handler-resolver';
//import schema from './schema';

export const importProductsFile = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import'/*,
        request: {
          schemas: {
            'application/json': schema,
          },
        },*/
      },
    },
  ],
};
