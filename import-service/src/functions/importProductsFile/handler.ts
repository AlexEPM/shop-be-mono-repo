import {middyfy} from '../../libs';
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import {PutObjectCommand, PutObjectCommandInput, S3Client} from '@aws-sdk/client-s3';
import * as process from 'process';
import {errorResponse, successfulResponse} from '../../libs/response-utils';
import {addRequestToLog} from '../../libs/log-utils';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';

export const importProductsFile = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  addRequestToLog(event);

  const queryStringParameters = event.queryStringParameters;

  if (!queryStringParameters || !queryStringParameters.name) {
    return errorResponse(new Error('Bad Request: Query parameter "name" not found'), 400);
  }

  if (!process.env.BUCKET || !process.env.REGION) {
    return errorResponse(new Error('Internal Server Error: environment variables are not specified'));
  }

  const { name } = queryStringParameters;

  const s3Client = new S3Client({region: process.env.REGION});

  const input: PutObjectCommandInput = {
    Bucket: process.env.BUCKET,
    Key: `uploaded/${name}`,
    ContentType: 'text/csv'
  };

  const command = new PutObjectCommand(input);

  try {
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

    return successfulResponse(signedUrl);
  } catch (e) {
    return errorResponse(e);
  }
};

export const main = middyfy(importProductsFile);
