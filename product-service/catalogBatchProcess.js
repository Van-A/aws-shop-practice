const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();

const catalogBatchProcess = async (event) => {
  const promises = [];
  try {
    const products = event.Records.map((record) => JSON.parse(record.body));

    products.forEach((product) => {
      promises.push(
        dynamo
          .put({
            TableName: process.env.PRODUCTS_TABLE_NAME,
            Item: { ...product, id: AWS.util.uuid.v4() },
          })
          .promise()
      );
    });

    await Promise.all(promises);
    await sns.publish({
      Subject: 'catalogBatchProcess succeeded',
      Message: 'All Good',
      TopicArn: process.env.SNS_ARN
    }).promise();
    console.log('catalogBatchProcess succeeded');
  } catch (err) {
    console.log(err.message || "unknown error");
  }
};

module.exports = catalogBatchProcess;
