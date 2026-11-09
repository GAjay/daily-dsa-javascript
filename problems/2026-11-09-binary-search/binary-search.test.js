import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { search } from "./solution.js";

describe("search", () => {
  it("found", () => {
    assert.equal(search([-1,0,3,5,9,12], 9), 4);
  });

  it("not found", () => {
    assert.equal(search([-1,0,3,5,9,12], 2), -1);
  });

  it("single hit", () => {
    assert.equal(search([5], 5), 0);
  });
});
