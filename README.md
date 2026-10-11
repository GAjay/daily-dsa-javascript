# Daily DSA (JavaScript)

Practice data structures and algorithms in **modern JavaScript** (ES modules) with the built-in Node.js test runner—no Jest or Vitest required.

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

## Automate daily problems (optional)

To push a new problem every day on GitHub:

1. Create a GitHub repo and connect this project (or add `origin` pointing at your repo).
2. Enable GitHub Actions on the repo.
3. Use a scheduled workflow (see `.github/workflows/daily-problem.yml.example`) that runs `npm run new-day` and opens a commit—or run a Cloud Agent / cron with the same commands.

You still review and implement solutions; automation only scaffolds the folder and keeps the streak.

## License

MIT
