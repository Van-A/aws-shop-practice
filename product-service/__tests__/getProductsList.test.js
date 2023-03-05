const getProductsList = require("../getProductsList");
const productsMock = require("../productsMock");

describe("getProductsList", () => {
  it("should return products list", async () => {
    const data = await getProductsList();
    const body = JSON.parse(data.body);
    expect(body).toEqual(productsMock);
  });
});
