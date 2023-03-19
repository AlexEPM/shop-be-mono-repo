import {SQSEvent, SQSRecord} from 'aws-lambda';
import {catalogBatchProcess, productService, snsClient} from '../handler';
import process from 'process';
import {PublishCommand, PublishCommandInput} from '@aws-sdk/client-sns';
import {TransactWriteItemsCommandOutput} from '@aws-sdk/client-dynamodb';

describe('catalogBatchProcess', () => {
    const product = {
        title: 'test product',
        type: 'test',
        description: 'test product description',
        price: 11.2,
        img: 'https://test_product.jpg',
        rating: 4.5,
        count: 22
    };

    const event: SQSEvent = {
        Records: [
            {
                body: JSON.stringify(product),
                ...{} as SQSRecord
            }
        ]
    };

    beforeEach(() => {
        jest.clearAllMocks();

        jest.spyOn(productService, 'createProduct')
            .mockResolvedValue({} as TransactWriteItemsCommandOutput);
        jest.spyOn(snsClient, 'send');
    });

    describe('successful cases', () => {
        it('should create product', async () => {
            await catalogBatchProcess(event, null, null);

            expect(productService.createProduct).toHaveBeenCalledWith(
                expect.objectContaining(
                    JSON.parse(event.Records[0].body)
                ));
        });

        it('should send notification in case if no error occurred', async () => {
            await catalogBatchProcess(event, null, null);

            expect(snsClient.send).toHaveBeenCalledWith(expect.any(PublishCommand));
        });

        it('should send success notification with given parameters', async () => {
            const testSnsArn = 'test::SNS::ARN';
            process.env.SNS_ARN = testSnsArn;

            const publishCommandInput: PublishCommandInput = {
                Subject: '[Product successful created]',
                Message: `New product "${product.title}" was created.`,
                TopicArn: testSnsArn,
                MessageAttributes: {
                    'type': { DataType: 'String', StringValue: product.type },
                    'price': { DataType: 'Number', StringValue: Number(product.price).toString() }
                }
            };

            const publishCommand = new PublishCommand(publishCommandInput);

            jest.spyOn(snsClient, 'send').mockImplementation(() => Promise.resolve({}));

            await catalogBatchProcess(event, null, null);

            expect(JSON.stringify((snsClient.send as jest.Mock).mock.calls[0][0]))
                .toEqual(JSON.stringify(publishCommand));
        });
    });

    describe('failure cases', () => {
        it('should not create product in case if input data is invalid', async () => {
            event.Records[0].body = '';

            await catalogBatchProcess(event, null, null);

            expect(productService.createProduct).not.toHaveBeenCalled();
        });

        it('should not send success notification in case if input data is invalid', async () => {
            event.Records[0].body = '';

            await catalogBatchProcess(event, null, null);

            expect(productService.createProduct).not.toHaveBeenCalled();
        });

        it('should not create product in case if input product structure is invalid', async () => {
            event.Records[0].body = JSON.stringify({ title: 'test product' });

            await catalogBatchProcess(event, null, null);

            expect(productService.createProduct).not.toHaveBeenCalled();
        });

        it('should not send success notification in case if input product structure is invalid', async () => {
            event.Records[0].body = JSON.stringify({ title: 'test product' });

            await catalogBatchProcess(event, null, null);

            expect(productService.createProduct).not.toHaveBeenCalled();
        });

        it('should not send success notification in case if product was not created', async () => {
            jest.spyOn(productService, 'createProduct').mockRejectedValue(new Error());

            await catalogBatchProcess(event, null, null);

            expect(snsClient.send).not.toHaveBeenCalled();
        });
    });
});
