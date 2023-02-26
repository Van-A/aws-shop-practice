"use strict";
const productsMock = require("./productsMock");

module.exports = async (event) => {

  const { productId } = event.pathParameters;
  const product = productsMock.find((product) => product.id === productId);
  
  if (!product) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "product not found" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};