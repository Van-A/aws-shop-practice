const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

const createProduct = async (item) => {
  const itemToCreate = {
    ...item,
    id: AWS.util.uuid.v4(),
  };
  await dynamo
    .put({
      TableName: process.env.PRODUCTS_TABLE_NAME,
      Item: itemToCreate,
    })
    .promise();
  return itemToCreate;
};

module.exports = async (event) => {
  try {
    const item = JSON.parse(event.body);
    const result = await createProduct(item);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e.message),
    };
  }
};
