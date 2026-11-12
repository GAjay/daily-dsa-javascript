import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { maxSubArray } from "./solution.js";

describe("maxSubArray", () => {
  it("classic kadane", () => {
    assert.equal(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]), 6);
  });

  it("single element", () => {
    assert.equal(maxSubArray([1]), 1);
  });

  it("all negative pick max", () => {
    assert.equal(maxSubArray([-2,-1]), -1);
  });
});
