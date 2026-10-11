import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { twoSum } from "./solution.js";

function assertPair(nums, target, expected) {
  const result = twoSum(nums, target);
  assert.equal(result.length, 2);
  const [i, j] = result;
  assert.notEqual(i, j);
  assert.equal(nums[i] + nums[j], target);
  if (expected) {
    assert.deepEqual([...result].sort(), [...expected].sort());
  }
}

describe("twoSum", () => {
  it("finds indices for classic example", () => {
    assertPair([2, 7, 11, 15], 9, [0, 1]);
  });

  it("works when answer is not at the start", () => {
    assertPair([3, 2, 4], 6, [1, 2]);
  });

  it("handles negative numbers", () => {
    assertPair([-1, -2, -3, -4, -5], -8, [2, 4]);
  });
});
