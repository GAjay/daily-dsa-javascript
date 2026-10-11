#!/usr/bin/env node
/**
 * Same steps as .github/workflows/daily-dsa.yml (scaffold + commit + push).
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { cwd: root, stdio: "inherit", ...opts });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

run(process.execPath, [path.join(__dirname, "daily.js")]);

const status = spawnSync("git", ["diff", "--cached", "--quiet"], { cwd: root });
spawnSync(process.execPath, [path.join(__dirname, "configure-git-author.js")], {
  cwd: root,
  stdio: "inherit",
});

run("git", ["add", "problems/", "automation/state.json"]);

const staged = spawnSync("git", ["diff", "--cached", "--quiet"], { cwd: root });
if (staged.status === 0) {
  console.log("Nothing new to commit (already scaffolded for today UTC)");
  process.exit(0);
}

const date = new Date().toISOString().slice(0, 10);
run("git", ["commit", "--no-verify", "-m", `dsa(auto): scaffold ${date}`]);
run("git", ["push", "origin", "HEAD"]);

console.log("Daily scaffold committed and pushed.");
