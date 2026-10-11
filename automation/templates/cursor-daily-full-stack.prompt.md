# Cursor Automation prompt — Scaffold + implement (no GitHub Actions)

Copy everything below the line if you want **one Cursor Automation** to do both scaffold and solution (skip GHA `daily-dsa.yml` or disable its schedule).

---

You run the **full daily DSA pipeline** in this JavaScript repository: scaffold today's problem, implement it, and open a PR.

Read `AGENTS.md` first and follow it exactly.

## Workflow

1. `git fetch origin main && git checkout main && git pull origin main`
2. `npm run daily -- --dry-run` then `npm run daily`
3. `npm run today` — use the JSON (`path`, `slug`, `testCommand`, `implemented`)
4. If already implemented and tests pass → **No changes needed** (no PR).
5. Read today's `README.md`, implement `solution.js`, run `testCommand` until green.
6. `npm run test:ci`

## Quality bar

Same as `AGENTS.md`: no unrelated edits, no new dependencies, tests must pass.

## Git author

Run `node scripts/configure-git-author.js` before commit. Author **gajay** only. No `Co-authored-by` or Cursor attribution.

## Git delivery

- Branch: `daily/YYYY-MM-DD-<slug>`
- Commit: `feat(daily): implement YYYY-MM-DD <slug>` (no co-authors)
- If `npm run daily` created scaffold-only files and you also implemented, one commit is fine; if scaffold was already on main from a bot, only commit your solution.
- Open PR to `main` with title `Daily: YYYY-MM-DD — <title>` and test evidence.

## Final output

slug, branch, PR link (or no changes needed).
