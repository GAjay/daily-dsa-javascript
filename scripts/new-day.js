#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const problemsDir = path.join(root, "problems");

const slugArg = process.argv[2];
if (!slugArg || slugArg.startsWith("-")) {
  console.error("Usage: npm run new-day -- <slug>");
  console.error("Example: npm run new-day -- valid-parentheses");
  process.exit(1);
}

const slug = slugArg
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const date = new Date().toISOString().slice(0, 10);
const folderName = `${date}-${slug}`;
const problemDir = path.join(problemsDir, folderName);

if (fs.existsSync(problemDir)) {
  console.error(`Already exists: problems/${folderName}`);
  process.exit(1);
}

const fnName = slug
  .split("-")
  .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
  .join("");

fs.mkdirSync(problemDir, { recursive: true });

fs.writeFileSync(
  path.join(problemDir, "README.md"),
  `# ${slug.replace(/-/g, " ")}

## Problem

Describe the problem here.

## Examples

\`\`\`
Input:
Output:
\`\`\`

## Constraints

- 

## Notes

Implement \`${fnName}\` in \`solution.js\`.
`
);

fs.writeFileSync(
  path.join(problemDir, "solution.js"),
  `/**
 * @param {*} input
 * @returns {*}
 */
export function ${fnName}(input) {
  throw new Error("Not implemented");
}
`
);

fs.writeFileSync(
  path.join(problemDir, `${slug}.test.js`),
  `import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ${fnName} } from "./solution.js";

describe("${fnName}", () => {
  it("example case", () => {
    assert.throws(() => ${fnName}(null), /Not implemented/);
  });
});
`
);

console.log(`Created problems/${folderName}/`);
console.log("Next: edit README.md, implement solution.js, run npm test");
