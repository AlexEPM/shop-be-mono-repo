import type {AWS} from '@serverless/typescript';

import {catalogBatchProcess, createProduct, getProductById, getProductsList} from './src/functions';
import {sns, sqs, tables} from './src/resources';
import * as process from "process";

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: [
    'serverless-esbuild',
    'serverless-auto-swagger',
    'serverless-dotenv-plugin',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    stage: process.env.STAGE,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PRODUCTS_TABLE_NAME: process.env.PRODUCTS_TABLE,
      STOCKS_TABLE_NAME: process.env.STOCKS_TABLE,
      SNS_ARN: {
        Ref: 'SNSTopic'
      }
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:DescribeTable',
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem'
        ],
        Resource: [
          'arn:aws:dynamodb:${self:provider.region}:*:table/*'
        ]
      },
      {
        Effect: 'Allow',
        Action: ['sns:Publish'],
        Resource: { Ref: 'SNSTopic' }
      }
    ],
  },
  functions: {
    getProductsList,
    getProductById,
    createProduct,
    catalogBatchProcess
  },
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
      concurrency: 10
    },
    autoswagger: {
      generateSwaggerOnDeploy: false,
      typefiles: ['./src/domain/typings.ts'],
      basePath: '/dev',
      host: 'qmbbj6kgxd.execute-api.eu-west-1.amazonaws.com'
    }
  },
  resources: {
    Resources: {
      ...tables,
      ...sqs,
      ...sns
    }
  }
};

module.exports = serverlessConfiguration;
