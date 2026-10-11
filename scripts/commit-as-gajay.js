#!/usr/bin/env node
/**
 * Commit as gajay with no Co-authored-by or Cursor trailers.
 * Usage: npm run commit -- "subject line" ["optional body paragraph"]
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

spawnSync(process.execPath, [path.join(__dirname, "configure-git-author.js")], {
  stdio: "inherit",
});

const subject = process.argv[2];
const body = process.argv[3];

if (!subject) {
  console.error('Usage: npm run commit -- "subject" ["body"]');
  process.exit(1);
}

const message = body ? `${subject}\n\n${body}` : subject;

function run(args) {
  const r = spawnSync("git", args, { encoding: "utf8" });
  if (r.status !== 0) {
    if (r.stderr) process.stderr.write(r.stderr);
    process.exit(r.status ?? 1);
  }
  return r.stdout;
}

const staged = run(["diff", "--cached", "--quiet"]);
// diff --cached --quiet exits 1 if there are staged changes
const status = spawnSync("git", ["diff", "--cached", "--quiet"]);
if (status.status === 0) {
  console.error("Nothing staged. Run git add first.");
  process.exit(1);
}

run(["commit", "-m", message]);

const full = run(["log", "-1", "--format=%B"]);
const cleaned = full
  .split("\n")
  .filter((line) => !/^\s*co-authored-by:/i.test(line))
  .filter((line) => !/^\s*signed-off-by:.*cursor/i.test(line))
  .join("\n")
  .replace(/\n{3,}/g, "\n\n")
  .trimEnd();

if (cleaned !== full.trimEnd()) {
  run(["commit", "--amend", "-m", cleaned]);
}

console.log(run(["log", "-1", "--oneline"]).trim());
