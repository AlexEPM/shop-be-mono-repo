import * as process from 'process';
import * as console from 'console';
import {Callback, Context} from 'aws-lambda';
import {APIGatewayTokenAuthorizerEvent} from 'aws-lambda/trigger/api-gateway-authorizer';

export const basicAuthorizer =
    async (
        event: APIGatewayTokenAuthorizerEvent,
        // @ts-ignore
        context: Context,
        callback: Callback
    ): Promise<void> => {
      console.log('Authorization event', JSON.stringify(event));

      if (event['type'] !== 'TOKEN') {
        callback('Unfuthorized');
      }

      try {
        const authorizationToken = event.authorizationToken;
        const encodedCredentials = authorizationToken.split(' ')[1];
        const buffer = Buffer.from(encodedCredentials, 'base64');
        const plainCredentials = buffer.toString('utf-8').split(':');
        const userName = plainCredentials[0];
        const password = plainCredentials[1];
        const storedUserPassword = process.env[userName];
        const effect = !storedUserPassword || storedUserPassword != password ? 'Deny' : 'Allow';
        const policy = generatePolicy(encodedCredentials, event.methodArn, effect);

        callback(null, policy);
      } catch (e) {
        console.log(e);
        callback(`Unauthorized ${e.message}`);
      }
    };

const generatePolicy = (principalId, resource, effect = 'Allow') => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    }
  };
};
