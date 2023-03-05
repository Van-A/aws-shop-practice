'use strict';
const productsMock = require("./productsMock");

module.exports = async (event) => {
    return {
      statusCode: 200,
      body: JSON.stringify(productsMock),
    };
  };