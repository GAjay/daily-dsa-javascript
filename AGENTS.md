# Cloud Agent instructions (Daily DSA — JavaScript)

This repo is a **daily DSA practice** project. Automations and agents should follow these rules.

## Environment

- **Node.js 20+** (no `npm install` — zero dependencies).
- Tests: built-in `node:test` and `node:assert/strict`.

## Commands

| Command | When to use |
|---------|-------------|
| `npm run daily` | Create today's scaffold (idempotent, UTC date) |
| `npm run today` | Print JSON path/metadata for today's problem |
| `npm test` | Run **all** problem tests (includes unimplemented → failures expected) |
| `npm run test:ci` | Run tests only for **implemented** solutions (CI behavior) |
| `node --test problems/<folder>/*.test.js` | Run one problem only |

## Git author (required)

All commits must appear as **gajay** only — not Cursor, not bots, no co-authors.

Before every commit:

```bash
node scripts/configure-git-author.js
```

Identity is defined in `automation/git-identity.json` (override with `GIT_AUTHOR_NAME` / `GIT_AUTHOR_EMAIL`).

**Never** add `Co-authored-by`, `Signed-off-by` for tools, or "Cursor" / "cursor bot" in commit messages, PR titles, or PR bodies. Use plain commit messages only.

## Daily automation workflow

1. `git pull origin main`
2. `npm run daily` — skip if today's folder already exists
3. `npm run today` — locate `problems/YYYY-MM-DD-<slug>/`
4. Edit **`solution.js`** only (unless tests are wrong). Remove `throw new Error("Not implemented")`.
5. Run tests for **that folder** until green, then `npm run test:ci`.
6. Commit with: `npm run commit -- "feat(daily): implement YYYY-MM-DD <slug>"` (strips any `Co-authored-by` lines).
7. Open a PR to `main` as **gajay** (Run automation as **Me**, not service account / `cursor` bot).

## Do not

- Refactor unrelated problems or shared scripts.
- Reorder `automation/catalog.json` or hand-edit `automation/state.json` unless fixing automation.
- Disable or weaken tests to force green builds.
- Add npm dependencies without an explicit user request.

## Layout

- `problems/YYYY-MM-DD-slug/` — `README.md`, `solution.js`, `*.test.js`
- `automation/catalog.json` — problem definitions for scaffolds
- `automation/state.json` — rotation index (updated by `npm run daily`)

## If already done

If `solution.js` is implemented and that folder's tests pass, **stop** with "no changes needed" — no empty commit or PR.

## Docs

- Human setup: `automation/SETUP.md`
- Cursor prompt (copy-paste): `automation/templates/cursor-daily-implement.prompt.md`
