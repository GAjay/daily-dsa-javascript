# Add GitHub Actions workflows (one-time)

Code is on GitHub, but **workflow files** need the `workflow` OAuth scope.

## 1. Authorize workflow scope

```bash
gh auth refresh -h github.com -s workflow
```

Complete the browser device login when prompted.

## 2. Push full `main` (includes `.github/workflows/`)

```bash
gh auth setup-git
git push github main:main
```

## 3. Run daily scaffold once

```bash
gh workflow run daily-dsa.yml -R GAjay/daily-dsa-javascript
```

Or use **Actions → Daily DSA → Run workflow** on GitHub.
