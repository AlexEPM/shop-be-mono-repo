import {PublishCommand, PublishCommandInput, SNSClient} from '@aws-sdk/client-sns';
import process from 'process';
import {Product} from '../../domain/typings';

export const sendNotifications = async (product: Product, snsClient: SNSClient) => {
    const publishCommandInput: PublishCommandInput = {
        Subject: '[Product successful created]',
        Message: `New product "${product.title}" was created.`,
        TopicArn: process.env.SNS_ARN,
        MessageAttributes: {
            'type': { DataType: 'String', StringValue: product.type },
            'price': { DataType: 'Number', StringValue: Number(product.price).toString() }
        }
    };
    const publishCommand = new PublishCommand(publishCommandInput);

    await snsClient.send(publishCommand);
};
