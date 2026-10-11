#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const problemsDir = path.join(__dirname, "..", "problems");

function isImplemented(problemDir) {
  const files = fs.readdirSync(problemDir).filter((f) => f.endsWith(".js") && !f.endsWith(".test.js"));
  return files.some((f) => {
    const text = fs.readFileSync(path.join(problemDir, f), "utf8");
    return !text.includes("Not implemented");
  });
}

const testFiles = [];
for (const name of fs.readdirSync(problemsDir)) {
  const dir = path.join(problemsDir, name);
  if (!fs.statSync(dir).isDirectory()) continue;
  if (!isImplemented(dir)) {
    console.log(`skip (not implemented): ${name}`);
    continue;
  }
  for (const f of fs.readdirSync(dir)) {
    if (f.endsWith(".test.js")) testFiles.push(path.join(dir, f));
  }
}

if (testFiles.length === 0) {
  console.log("No implemented problems to test");
  process.exit(0);
}

const result = spawnSync(process.execPath, ["--test", ...testFiles], {
  stdio: "inherit",
});

process.exit(result.status ?? 1);
