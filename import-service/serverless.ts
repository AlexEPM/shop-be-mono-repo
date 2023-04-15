import type { AWS } from '@serverless/typescript';
import {importProductsFile} from '@functions/importProductsFile';
import * as process from 'process';
import {importFileParser} from '@functions/importFileParser';
import {authorizationApiGateway} from './src/resources';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: [
    'serverless-esbuild',
    'serverless-dotenv-plugin',
    'serverless-auto-swagger'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      REGION: process.env.REGION,
      BUCKET: process.env.BUCKET,
      QUEUE_URL: 'https://sqs.${self:provider.region}.amazonaws.com/${aws:accountId}/${env:SQS_NAME}',
      AUTHORIZER_ARN: 'arn:aws:lambda:${self:provider.region}:${aws:accountId}:function:${env:AUTHORIZATION_SERVICE_NAME}-${opt:stage, self:provider.stage}-${env:AUTHORIZER_NAME}'
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['s3:ListBucket'],
        Resource: ['arn:aws:s3:::files-upload-bucket']
      },
      {
        Effect: 'Allow',
        Action: ['s3:*'],
        Resource: ['arn:aws:s3:::files-upload-bucket/*']
      },
      {
        Effect: 'Allow',
        Action: 'sqs:SendMessage',
        Resource: ['arn:aws:sqs:${self:provider.region}:${aws:accountId}:catalogItemsQueue.fifo']
      },
    ]
  },
  functions: { importProductsFile, importFileParser },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    autoswagger: {
      generateSwaggerOnDeploy: false,
      basePath: '/dev',
      host: 'emcyw15lh2.execute-api.eu-west-1.amazonaws.com'
    }
  },
  resources: {
    Resources: {
      ...authorizationApiGateway
    }
  }
};

module.exports = serverlessConfiguration;
