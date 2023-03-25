import * as process from 'process';
import * as console from 'console';
import {Callback, Context} from 'aws-lambda';
import {APIGatewayTokenAuthorizerEvent} from 'aws-lambda/trigger/api-gateway-authorizer';

export const basicAuthorizer =
    async (
        event: APIGatewayTokenAuthorizerEvent,
        context: Context,
        callback: Callback
    ): Promise<void> => {
      console.log('Authorization event', JSON.stringify(event));
      console.log(event, context, callback)
      console.log('typeof callback = ', typeof callback)

      if (event['type'] !== 'TOKEN') {
        callback('Unfuthorized');
      }

      try {
        const authorizationToken = event.authorizationToken;

        console.log('authorizationToken = ', authorizationToken);

        const encodedCredentials = authorizationToken.split(' ')[1];
        const buffer = Buffer.from(encodedCredentials, 'base64');

        console.log('buffer = ', buffer.toString('utf-8'));

        const plainCredentials = buffer.toString('utf-8').split(':');
        const userName = plainCredentials[0];
        const password = plainCredentials[1];

        console.log(`userName: ${userName} and password: ${password}`);


        const storedUserPassword = process.env[userName];
        console.log(`storedPassword: ${password}`);
        console.log(!storedUserPassword || storedUserPassword != password);
        console.log(storedUserPassword != password);
        console.log('storedUserPassword = ', storedUserPassword);
        console.log('password = ', password);

        const effect = !storedUserPassword || storedUserPassword != password ? 'Deny' : 'Allow';
        const policy = generatePolicy(encodedCredentials, event.methodArn, effect);

        console.log('policy = ', JSON.stringify(policy));

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
