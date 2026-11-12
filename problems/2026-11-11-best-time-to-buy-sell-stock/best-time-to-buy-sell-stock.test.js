import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { maxProfit } from "./solution.js";

describe("maxProfit", () => {
  it("normal profit", () => {
    assert.equal(maxProfit([7,1,5,3,6,4]), 5);
  });

  it("decreasing", () => {
    assert.equal(maxProfit([7,6,4,3,1]), 0);
  });

  it("two days", () => {
    assert.equal(maxProfit([1,2]), 1);
  });
});
