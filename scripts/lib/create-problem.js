import fs from "node:fs";
import path from "node:path";

function formatArgsForCall(args) {
  return args.map((a) => JSON.stringify(a)).join(", ");
}

function formatTestBody(entry, test) {
  const fn = entry.functionName;
  const call = `${fn}(${formatArgsForCall(test.args)})`;

  if (test.inPlace) {
    const idx = test.argIndex ?? 0;
    const cloneExpr = `structuredClone(${JSON.stringify(test.args[idx])})`;
    const argsClone = test.args.map((a, i) => (i === idx ? cloneExpr : JSON.stringify(a)));
    const inPlaceCall = `${fn}(${argsClone.join(", ")})`;
    return `
    const input = ${cloneExpr};
    const args = ${JSON.stringify(test.args)};
    args[${idx}] = input;
    ${fn}(...args);
    assert.deepEqual(input, ${JSON.stringify(test.expected)});`;
  }

  return `
    assert.equal(${call}, ${JSON.stringify(test.expected)});`;
}

/**
 * @param {string} problemsDir
 * @param {string} date ISO date YYYY-MM-DD
 * @param {import('../../automation/catalog.json').problems[0] | object} entry
 */
export function createProblemFolder(problemsDir, date, entry) {
  const slug = entry.slug;
  const folderName = `${date}-${slug}`;
  const problemDir = path.join(problemsDir, folderName);

  if (fs.existsSync(problemDir)) {
    return { created: false, folderName, problemDir };
  }

  const fnName = entry.functionName;
  const readme = entry.readme
    ? `# ${entry.title}

## Problem

${entry.readme}

## Examples

\`\`\`
${entry.examples ?? "Add examples."}
\`\`\`

## Constraints

${entry.constraints ?? "- "}

## Notes

Implement \`${fnName}\` in \`solution.js\`.
`
    : `# ${slug.replace(/-/g, " ")}

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
`;

  const signature = entry.signature ?? "/**\n * @param {*} input\n * @returns {*}\n */";
  const params = entry.params ?? "input";

  const tests = entry.tests ?? [
    { name: "example case", args: [null], throws: "Not implemented" },
  ];

  const testCases = tests
    .map((t) => {
      if (t.throws) {
        return `
  it(${JSON.stringify(t.name)}, () => {
    assert.throws(() => ${fnName}(${formatArgsForCall(t.args)}), /${t.throws}/);
  });`;
      }
      return `
  it(${JSON.stringify(t.name)}, () => {${formatTestBody(entry, t)}
  });`;
    })
    .join("\n");

  fs.mkdirSync(problemDir, { recursive: true });

  fs.writeFileSync(path.join(problemDir, "README.md"), readme);

  fs.writeFileSync(
    path.join(problemDir, "solution.js"),
    `${signature}
export function ${fnName}(${params}) {
  throw new Error("Not implemented");
}
`
  );

  fs.writeFileSync(
    path.join(problemDir, `${slug}.test.js`),
    `import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ${fnName} } from "./solution.js";

describe(${JSON.stringify(fnName)}, () => {${testCases}
});
`
  );

  return { created: true, folderName, problemDir, slug, title: entry.title ?? slug };
}
