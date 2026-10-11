#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const identityPath = path.join(__dirname, "..", "automation", "git-identity.json");

const name = process.env.GIT_AUTHOR_NAME;
const email = process.env.GIT_AUTHOR_EMAIL;

let authorName = name;
let authorEmail = email;

if (!authorName || !authorEmail) {
  if (!fs.existsSync(identityPath)) {
    console.error("Missing automation/git-identity.json and GIT_AUTHOR_NAME/EMAIL");
    process.exit(1);
  }
  const identity = JSON.parse(fs.readFileSync(identityPath, "utf8"));
  authorName = authorName ?? identity.name;
  authorEmail = authorEmail ?? identity.email;
}

for (const key of ["user.name", "user.email"]) {
  const value = key === "user.name" ? authorName : authorEmail;
  const r = spawnSync("git", ["config", key, value], { stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

console.log(`Git author set to: ${authorName} <${authorEmail}>`);
