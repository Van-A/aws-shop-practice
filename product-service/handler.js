"use strict";
const getProductsList = require("./getProductsList");
const getProductsById = require("./getProductsById");
const createProduct = require("./createProduct");
const catalogBatchProcess = require("./catalogBatchProcess");

module.exports = {
  getProductsList,
  getProductsById,
  createProduct,
  catalogBatchProcess,
};
