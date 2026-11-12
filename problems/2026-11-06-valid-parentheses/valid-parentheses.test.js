import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isValid } from "./solution.js";

describe("isValid", () => {
  it("simple pair", () => {
    assert.equal(isValid("()"), true);
  });

  it("multiple types", () => {
    assert.equal(isValid("()[]{}"), true);
  });

  it("wrong close", () => {
    assert.equal(isValid("(]"), false);
  });

  it("nested", () => {
    assert.equal(isValid("([{}])"), true);
  });
});
