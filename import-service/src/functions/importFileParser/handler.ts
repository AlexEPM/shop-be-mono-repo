import {S3CreateEvent} from 'aws-lambda';
import {S3Client} from '@aws-sdk/client-s3';
import {SQSClient} from '@aws-sdk/client-sqs';
import * as process from 'process';
import middy from '@middy/core';
import * as console from 'console';
import {copyParsedFile, deleteParsedFile, executeFileParse} from './helper';

const region = process.env.REGION;
const bucket = process.env.BUCKET;

const s3Client = new S3Client({ region });
const sqsClient = new SQSClient({ region });

const importFileParser = async (event: S3CreateEvent) => {
    console.log('importFileParser event: ', event);

    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

    try {
        await executeFileParse(s3Client, bucket, key, sqsClient, process.env.QUEUE_URL);
        await copyParsedFile(s3Client, bucket, key);
        await deleteParsedFile(s3Client, bucket, key);
    } catch (e) {
        console.log(e);
    }
};

export const main = middy(importFileParser);
