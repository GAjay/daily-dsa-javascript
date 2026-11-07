import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { containsDuplicate } from "./solution.js";

describe("containsDuplicate", () => {
  it("has duplicate", () => {
    assert.equal(containsDuplicate([1,2,3,1]), true);
  });

  it("all unique", () => {
    assert.equal(containsDuplicate([1,2,3,4]), false);
  });

  it("duplicate at end", () => {
    assert.equal(containsDuplicate([1,1]), true);
  });
});
