import {APIGatewayProxyEvent} from 'aws-lambda';

export const addRequestToLog = ({
                                    requestContext: { path, httpMethod, accountId },
                                    pathParameters,
                                    queryStringParameters,
                                    body
                                }: APIGatewayProxyEvent)=> {
    console.log(
        {
            requestPath: path,
            method: httpMethod,
            accountId,
            pathParameters,
            queryStringParameters,
            body
        }
    );
};
