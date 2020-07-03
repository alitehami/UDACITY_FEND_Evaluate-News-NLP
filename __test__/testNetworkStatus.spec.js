import { changeStatus } from "../src/client/js/networkStatus.js";

describe("Testing the Network Status functionality", () => {
  test("Testing the handleSubmit() function", () => {
  expect(changeStatus).toBeDefined();
  });
});
