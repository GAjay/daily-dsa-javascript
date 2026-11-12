import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { climbStairs } from "./solution.js";

describe("climbStairs", () => {
  it("two steps", () => {
    assert.equal(climbStairs(2), 2);
  });

  it("three steps", () => {
    assert.equal(climbStairs(3), 3);
  });

  it("one step", () => {
    assert.equal(climbStairs(1), 1);
  });
});
