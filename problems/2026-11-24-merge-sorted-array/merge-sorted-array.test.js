import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { merge } from "./solution.js";

describe("merge", () => {
  it("standard merge", () => {
    const input = structuredClone([1,2,3,0,0,0]);
    const args = [[1,2,3,0,0,0],3,[2,5,6],3];
    args[0] = input;
    merge(...args);
    assert.deepEqual(input, [1,2,2,3,5,6]);
  });
});
