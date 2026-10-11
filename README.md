# Daily DSA (JavaScript)

Practice data structures and algorithms in **modern JavaScript** (ES modules) with the built-in Node.js test runner—no Jest or Vitest required.

**GitHub:** https://github.com/GAjay/daily-dsa-javascript

## Requirements

- [Node.js](https://nodejs.org/) **20+**

## Quick start

```bash
npm test
```

Run tests for one problem:

```bash
node --test problems/2026-10-11-two-sum/two-sum.test.js
```

## Folder layout

Each day (or each problem) lives in its own folder under `problems/`:

```
problems/
  YYYY-MM-DD-slug/
    README.md      # problem statement, examples, constraints
    solution.js    # your implementation (exported functions)
    solution.test.js
```

Shared helpers (optional) go in `lib/`.

## Add a new day

Scaffold an empty problem from a slug:

```bash
npm run new-day -- binary-search
# creates problems/2026-10-11-binary-search/
```

Then edit `README.md`, implement `solution.js`, and run `npm test`.

## Workflow tips

1. Read `README.md` in the problem folder.
2. Implement exports in `solution.js` (see the starter `twoSum` example).
3. Run `npm test` until green.
4. Commit with a message like `dsa: 2026-10-11 two sum`.

## Automation (daily scaffold + Cursor)

**Start here:** **[automation/SETUP.md](automation/SETUP.md)** — GitHub Actions + Cursor Automation prompt template + Cloud Environment.

See also [automation/README.md](automation/README.md).

```bash
npm run daily              # today's problem from catalog (idempotent)
npm run daily -- --dry-run # preview next slug
```

**GitHub:** `.github/workflows/daily-dsa.yml` runs on a cron (06:00 UTC) and commits the new folder + `automation/state.json`. `.github/workflows/ci.yml` runs `npm run test:ci` (only **implemented** solutions—scaffolds do not fail CI).

1. Create/link your GitHub repo and push `main`.
2. Enable Actions → run **Daily DSA** once manually to verify.
3. Implement each day's `solution.js`; use `npm test` locally (all problems, including drafts).

## License

MIT
