# Cursor Automation prompt — Daily implement (copy everything below the line)

Use with **Scheduled** trigger after GitHub Actions scaffolds the problem (recommended: GHA `06:00 UTC`, this automation `07:00 UTC`).

---

You implement **today's daily DSA problem** in this JavaScript repository.

Read `AGENTS.md` first and follow it exactly.

## Context

- Problems live under `problems/YYYY-MM-DD-<slug>/` (date is **UTC**).
- Scaffolding may already exist from GitHub Actions (`npm run daily`).
- Catalog: `automation/catalog.json`. Rotation state: `automation/state.json`.

## Workflow

1. `git fetch origin main && git checkout main && git pull origin main`
2. Run `npm run daily` (idempotent — creates today's folder if missing).
3. Run `npm run today` and parse the JSON output.
   - If `found` is false, run step 2 again; if still missing, stop with an error summary.
   - If `implemented` is **true**, run the `testCommand` from that JSON; if all pass, reply **"No changes needed"** and **do not** commit or open a PR.
4. Read `README.md` in today's folder.
5. Implement **only** `solution.js` for that problem until its tests pass:
   - Use the `testCommand` from `npm run today`.
6. Run `npm run test:ci` to ensure nothing else regressed.
7. Do **not** edit unrelated files, tests, catalog, or automation scripts.

## Quality bar

- All tests for today's problem must pass before you commit.
- No new npm dependencies.
- No weakening or deleting tests.
- If stuck after reasonable debugging, stop with a clear failure summary — **do not** open an empty PR.

## Git author (required)

- Commit with `npm run commit -- "feat(daily): implement YYYY-MM-DD <slug>"` after `git add` (never plain `git commit`).
- Author must be **gajay** only (`automation/git-identity.json`).
- **Do not** add `Co-authored-by`, Cursor, cursor bot, or any co-author lines to commits or PRs.
- Commit message body: plain text only — no tool attribution.

## Git delivery (required)

- Branch name: `daily/YYYY-MM-DD-<slug>` (UTC date and slug from `npm run today`).
- Commit message: `feat(daily): implement YYYY-MM-DD <slug>`
- Push the branch to `origin`.
- **Open a pull request** against `main`.
- PR title: `Daily: YYYY-MM-DD — <short title from README>`
- PR body must include:
  - Problem slug and folder path
  - Approach in 2–4 sentences
  - Exact test commands run and that they passed

## Final message to user

End with a short summary:

- slug
- branch name
- PR URL (or "No changes needed")
