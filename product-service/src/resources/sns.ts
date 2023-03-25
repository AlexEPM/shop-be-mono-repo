export const sns = {
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
};
