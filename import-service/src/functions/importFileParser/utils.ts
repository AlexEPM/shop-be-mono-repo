import {
    CopyObjectCommand,
    CopyObjectCommandInput,
    DeleteObjectCommand,
    DeleteObjectCommandInput,
    GetObjectCommand,
    GetObjectCommandInput,
    S3Client
} from '@aws-sdk/client-s3';
import {parse} from 'csv-parse';
import {Readable} from 'stream';
import * as console from 'console';

export const executeFileParse = async (s3Client: S3Client, bucket: string, key: string) => {
    return new Promise<void>(async (resolve, reject) => {
        const getObjectCommandInput: GetObjectCommandInput = {
            Bucket: bucket,
            Key: key,
            ResponseContentType: 'text/csv'
        };

        const getObjectCommand = new GetObjectCommand(getObjectCommandInput);

        const parser = parse({
            comment: "#",
            columns: true,
            relaxQuotes: true,
            escape: "\\",
            quote: "'",
            delimiter: ",",
            ltrim: true,
            rtrim: true,
            recordDelimiter: "\n",
            skipEmptyLines: true,
            relaxColumnCount: true
        });

        const file = await s3Client.send(getObjectCommand);
        const fileStream = (file.Body as Readable);

        fileStream
            .pipe(parser)
            .on('data', (data) => {
                console.log(`${bucket}: ${key}`, data);
            })
            .on('end', () => {
                console.log(`${bucket}: ${key} parsing completed`);
                resolve();
            })
            .on('error', (error) => {
                console.log(`${bucket}: ${key} error: `, error);
                reject(error);
            })
    });
};

export const copyParsedFile = async (s3Client: S3Client, bucket: string, key: string) => {
    const copyObjectCommandInput: CopyObjectCommandInput = {
        Bucket: bucket,
        CopySource: `${bucket}/${key}`,
        Key: key.replace('uploaded', 'parsed')
    };

    const copyObjectCommand = new CopyObjectCommand(copyObjectCommandInput);

    await s3Client.send(copyObjectCommand);

    return Promise.resolve();
};

export const deleteParsedFile = async (s3Client: S3Client, bucket: string, key: string) => {
    const deleteObjectCommandInput: DeleteObjectCommandInput = {
        Bucket: bucket,
        Key: key
    };

    const deleteObjectCommand = new DeleteObjectCommand(deleteObjectCommandInput);

    await s3Client.send(deleteObjectCommand);

    return Promise.resolve();
};