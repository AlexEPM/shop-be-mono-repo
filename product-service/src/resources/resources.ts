export const resources = {
    ProductsTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            TableName: 'products',
            AttributeDefinitions: [
                { AttributeName: 'id', AttributeType: 'S' },
                { AttributeName: 'title', AttributeType: 'S' },
            ],
            KeySchema: [
                { AttributeName: 'id', KeyType: 'HASH' },
                { AttributeName: 'title', KeyType: 'RANGE' },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: '5',
                WriteCapacityUnits: '5'
            },
            Tags: [
                {
                    Key: "STAGE",
                    Value: "Zero"
                }
            ]
        }
    },
    StocksTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            TableName: 'stocks',
            AttributeDefinitions: [
                { AttributeName: 'product_id', AttributeType: 'S' }
            ],
            KeySchema: [
                { AttributeName: 'product_id', KeyType: 'HASH' }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: '5',
                WriteCapacityUnits: '5'
            },
            Tags: [
                {
                    Key: "STAGE",
                    Value: "Zero"
                }
            ]
        }
    },
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
    },
    SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
            TopicName: 'createProductTopic'
        }
    },
    SNSCommonSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
            Endpoint: 'oleksandr_balabanov@epam.com',
            Protocol: 'email',
            TopicArn: {
                Ref: 'SNSTopic'
            }
        }
    },
    SNSBakerySubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
            Endpoint: 'test.aws002200@gmail.com',
            Protocol: 'email',
            TopicArn: {
                Ref: 'SNSTopic'
            },
            FilterPolicyScope: 'MessageAttributes',
            FilterPolicy: {
                'type': ['bakery'],
                'price': [{'numeric': ['>=', 15]}]
            }
        }
    }
}
