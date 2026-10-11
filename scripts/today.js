#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const problemsDir = path.join(root, "problems");

function todayUtc() {
  return new Date().toISOString().slice(0, 10);
}

const date = process.argv.find((a) => a.startsWith("--date="))?.slice(8) ?? todayUtc();
const prefix = `${date}-`;

if (!fs.existsSync(problemsDir)) {
  console.error(JSON.stringify({ error: "no problems directory", date }));
  process.exit(1);
}

const folder = fs.readdirSync(problemsDir).find((name) => name.startsWith(prefix));

if (!folder) {
  console.log(
    JSON.stringify(
      {
        date,
        found: false,
        hint: "Run: npm run daily",
      },
      null,
      2
    )
  );
  process.exit(2);
}

const problemDir = path.join(problemsDir, folder);
const slug = folder.slice(prefix.length);
const readmePath = path.join(problemDir, "README.md");
const solutionPath = fs
  .readdirSync(problemDir)
  .find((f) => f.endsWith(".js") && !f.endsWith(".test.js"));
const solutionFull = solutionPath ? path.join(problemDir, solutionPath) : null;
const implemented =
  solutionFull &&
  fs.existsSync(solutionFull) &&
  !fs.readFileSync(solutionFull, "utf8").includes("Not implemented");

const testFiles = fs.readdirSync(problemDir).filter((f) => f.endsWith(".test.js"));

console.log(
  JSON.stringify(
    {
      date,
      found: true,
      folder,
      slug,
      path: `problems/${folder}`,
      readme: `problems/${folder}/README.md`,
      solution: solutionFull ? `problems/${folder}/${solutionPath}` : null,
      tests: testFiles.map((f) => `problems/${folder}/${f}`),
      implemented: Boolean(implemented),
      testCommand: `node --test ${testFiles.map((f) => `problems/${folder}/${f}`).join(" ")}`,
    },
    null,
    2
  )
);
