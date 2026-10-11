# Automation

Daily problem scaffolding without manual `new-day` typing.

## How it works

1. **`automation/catalog.json`** — ordered list of problems (README + tests included).
2. **`automation/state.json`** — `catalogIndex` (next problem) and `lastRunDate`.
3. **`npm run daily`** — if no folder exists for **today (UTC)**, creates `problems/YYYY-MM-DD-<slug>/` from the next catalog entry and bumps the index.

Idempotent: running twice on the same day does nothing.

## Commands

```bash
# Create today's problem from the catalog
npm run daily

# Preview without writing files
npm run daily -- --dry-run

# Simulate a specific date (testing)
npm run daily -- --date=2026-12-01
```

Manual one-off (uses catalog content when slug matches):

```bash
npm run new-day -- valid-parentheses
```

## GitHub Actions

| Workflow | Purpose |
|----------|---------|
| **`daily-dsa.yml`** | Cron + manual dispatch: runs `npm run daily`, commits `problems/` + `state.json` |
| **`ci.yml`** | Runs `npm test` on push/PR |

### Enable on GitHub

1. Push this repo to GitHub.
2. **Settings → Actions → General** — allow workflows.
3. Scheduled workflows only run on the **default branch** (`main`).
4. Optionally run once: **Actions → Daily DSA → Run workflow**.

### Timezone

Edit the `cron` in `daily-dsa.yml`. GitHub uses **UTC**.

## Extend the catalog

Add an object to `catalog.json` → `problems`:

- `slug`, `title`, `functionName`
- `readme`, `examples`, `constraints`
- `signature`, `params`
- `tests`: `{ name, args, expected }` or `{ inPlace: true, argIndex: 0 }` for in-place problems

No code changes required — the next `npm run daily` picks it up when its turn arrives.

## Optional: Cursor Cloud Agent

For **implemented solutions** (not just scaffolds), schedule a Cursor Automation or a timer follow-up with a prompt like:

> Run `npm run daily`, implement today's `solution.js` until `npm test` passes, commit and push.

Scaffold automation stays in GitHub Actions; solving stays in the agent or you.
