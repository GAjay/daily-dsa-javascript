import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { reverseString } from "./solution.js";

describe("reverseString", () => {
  it("hello", () => {
    const input = structuredClone(["h","e","l","l","o"]);
    const args = [["h","e","l","l","o"]];
    args[0] = input;
    reverseString(...args);
    assert.deepEqual(input, ["o","l","l","e","h"]);
  });

  it("odd length", () => {
    const input = structuredClone(["a","b","c"]);
    const args = [["a","b","c"]];
    args[0] = input;
    reverseString(...args);
    assert.deepEqual(input, ["c","b","a"]);
  });
});
