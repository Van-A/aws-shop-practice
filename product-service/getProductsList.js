const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

const scan = async (tableName) => {
  const scanResults = await dynamo
    .scan({
      TableName: tableName,
    })
    .promise();
  return scanResults.Items;
};

module.exports = async (event) => {
  const products = await scan(process.env.PRODUCTS_TABLE_NAME);
  const stocks = await scan(process.env.STOCKS_TABLE_NAME);

  const stocksMap = stocks.reduce((acc, stock) => {
    acc[stock.product_id] = stock.count;
    return acc;
  }, {});
  const productsAndCount = products.map((product) => ({
    ...product,
    count: stocksMap[product.id],
  }));

  return {
    statusCode: 200,
    body: JSON.stringify(productsAndCount),
  };
};
