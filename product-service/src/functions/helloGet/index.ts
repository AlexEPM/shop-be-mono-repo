import {handlerPath} from '@libs/handler-resolver';

export const helloGet = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'hello'
      },
    },
  ],
};
