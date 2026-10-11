#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createProblemFolder } from "./lib/create-problem.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const problemsDir = path.join(root, "problems");
const catalogPath = path.join(root, "automation", "catalog.json");

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

let entry = { slug, functionName: slugToCamel(slug), params: "input" };

if (fs.existsSync(catalogPath)) {
  const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  const fromCatalog = catalog.problems?.find((p) => p.slug === slug);
  if (fromCatalog) entry = fromCatalog;
}

const result = createProblemFolder(problemsDir, date, entry);

if (!result.created) {
  console.error(`Already exists: problems/${result.folderName}`);
  process.exit(1);
}

console.log(`Created problems/${result.folderName}/`);
console.log("Next: edit README.md if needed, implement solution.js, run npm test");

function slugToCamel(slug) {
  return slug
    .split("-")
    .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");
}
