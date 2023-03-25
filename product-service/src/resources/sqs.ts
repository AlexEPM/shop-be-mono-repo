export const sqs = {
    SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
            QueueName: 'catalogItemsQueue.fifo',
            ContentBasedDeduplication: true,
            FifoQueue: true,
            DelaySeconds: 0,
            MaximumMessageSize: 262144,
            MessageRetentionPeriod: 1209600,
            ReceiveMessageWaitTimeSeconds: 20,
            VisibilityTimeout: 170
        }
    }
};
