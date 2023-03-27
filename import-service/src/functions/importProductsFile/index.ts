import {handlerPath} from '@libs/handler-resolver';

export const importProductsFile = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        authorizer: {
          identitySource: 'method.request.header.Authorization',
          identityValidationExpression: '^Basic [-0-9a-zA-Z\\._]*$',
          resultTtlInSeconds: 0,
          arn: '${self:provider.environment.AUTHORIZER_ARN}',
          type: 'token',
        },
      },
    },
  ],
};
