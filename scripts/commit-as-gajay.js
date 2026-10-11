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

const stagedCheck = spawnSync("git", ["diff", "--cached", "--quiet"]);
if (stagedCheck.status === 0) {
  console.error("Nothing staged. Run git add first.");
  process.exit(1);
}

// --no-verify skips Cursor's commit-msg hook that appends Co-authored-by
run(["commit", "--no-verify", "-m", message]);

console.log(run(["log", "-1", "--oneline"]).trim());
