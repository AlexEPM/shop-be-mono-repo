import middy from '@middy/core';
import {SQSEvent, SQSHandler} from 'aws-lambda';
import {validateProductStructure} from '../../utils';
import {v4 as uuid} from 'uuid';
import {SNSClient} from '@aws-sdk/client-sns';
import * as process from 'process';
import {sendNotifications} from './helper';
import {ProductsDynamoDbService} from '../../services/products-dynamo-db-service';

export const productService = new ProductsDynamoDbService();
export const snsClient = new SNSClient({ region: process.env.REGION });

export const catalogBatchProcess: SQSHandler = async (event: SQSEvent) => {
    try {
        console.log(event);

        for (const record of event.Records) {
            const newProductCandidate = JSON.parse(record.body);
            const productStructureValidationResult = validateProductStructure(newProductCandidate);

            if (productStructureValidationResult) {
                console.log(
                    `Required field '${productStructureValidationResult}' missing in request data structure!`
                );
                return;
            }

            newProductCandidate.id = uuid();

            await productService.createProduct(newProductCandidate);
            await sendNotifications(newProductCandidate, snsClient);
        }
    } catch (e) {
        console.log(e);
    }
};

export const main = middy(catalogBatchProcess);
