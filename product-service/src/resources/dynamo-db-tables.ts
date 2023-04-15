export const tables = {
    ProductsTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            TableName: 'products',
            AttributeDefinitions: [
                {AttributeName: 'id', AttributeType: 'S'},
                {AttributeName: 'title', AttributeType: 'S'},
            ],
            KeySchema: [
                {AttributeName: 'id', KeyType: 'HASH'},
                {AttributeName: 'title', KeyType: 'RANGE'},
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
                {AttributeName: 'product_id', AttributeType: 'S'}
            ],
            KeySchema: [
                {AttributeName: 'product_id', KeyType: 'HASH'}
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
    }
};
