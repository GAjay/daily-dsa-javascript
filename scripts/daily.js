#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createProblemFolder } from "./lib/create-problem.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const problemsDir = path.join(root, "problems");
const statePath = path.join(root, "automation", "state.json");
const catalogPath = path.join(root, "automation", "catalog.json");

function todayUtc() {
  return new Date().toISOString().slice(0, 10);
}

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function saveState(state) {
  fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);
}

function findTodayFolder(date) {
  if (!fs.existsSync(problemsDir)) return null;
  const prefix = `${date}-`;
  return fs.readdirSync(problemsDir).find((name) => name.startsWith(prefix)) ?? null;
}

const dryRun = process.argv.includes("--dry-run");
const dateArg = process.argv.find((a) => a.startsWith("--date="));
const date = dateArg ? dateArg.slice("--date=".length) : todayUtc();

const state = loadJson(statePath);
const catalog = loadJson(catalogPath);
const problems = catalog.problems;

if (!problems?.length) {
  console.error("automation/catalog.json has no problems");
  process.exit(1);
}

const index = state.catalogIndex % problems.length;
const entry = problems[index];
const existing = findTodayFolder(date);

if (dryRun) {
  console.log(
    JSON.stringify(
      {
        date,
        wouldSkip: Boolean(existing),
        existingFolder: existing,
        catalogIndex: index,
        slug: entry.slug,
        title: entry.title,
      },
      null,
      2
    )
  );
  process.exit(0);
}

if (existing) {
  console.log(`SKIP: already have problems/${existing}/ for ${date}`);
  process.exit(0);
}

const result = createProblemFolder(problemsDir, date, entry);

if (!result.created) {
  console.error(`Failed to create folder for ${date}-${entry.slug}`);
  process.exit(1);
}

state.catalogIndex = index + 1;
state.lastRunDate = date;
saveState(state);

console.log(`Created problems/${result.folderName}/ (${entry.title})`);
console.log("Run: npm test");
