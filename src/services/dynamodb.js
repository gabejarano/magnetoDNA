const AWS = require('aws-sdk');
const config = require('config');

AWS.config.update({
    region: config.get('DYNAMO_DB.region'),
    accessKeyId: config.get('DYNAMO_DB.accessKeyId'),
    secretAccessKey: config.get('DYNAMO_DB.secretAccessKey'),
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoClient;