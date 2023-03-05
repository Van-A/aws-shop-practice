const getProductsById = require("../getProductsById");
const productsMock = require("../productsMock");

describe("getProductsById", () => {
  it("should return the product", async () => {
    const data = await getProductsById({pathParameters: {productId: '7567ec4b-b10c-48c5-9345-fc73348a80a1'}});
    const body = JSON.parse(data.body);

    const productMock = productsMock.find(product => product.id === '7567ec4b-b10c-48c5-9345-fc73348a80a1')
    expect(body).toMatchObject(productMock);
  });

  it("should return an error", async () => {
    const data = await getProductsById({pathParameters: {productId: '123'}});
    const body = JSON.parse(data.body);

    expect(body).toEqual({"message": "product not found"});
  });
});
