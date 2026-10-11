# Cursor Automation — UI settings (checklist)

Create at: [cursor.com/automations/new](https://cursor.com/automations/new)

## 1. Name

`Daily DSA — Implement (JavaScript)`

## 2. Trigger

| Field | Recommended value |
|-------|-------------------|
| Type | **Scheduled** |
| Cron | `0 7 * * *` (07:00 UTC daily) |

Use `0 6 * * *` only if you **disabled** GitHub Actions scaffold and use the full-stack prompt instead.

## 3. Repository (required for code changes)

| Field | Value |
|-------|--------|
| Mode | **Single repository** |
| Repository | This repo (after you create/link GitHub) |
| Branch | `main` |

Scheduled automations default to **no repo** — you must attach the repo or the agent cannot push code.

## 4. Environment

Link the **Cloud Environment** for this repository (Dashboard → Cloud Agents → Environments).

This repo includes `.cursor/environment.json`:

```json
{ "install": "node --version && npm run test:ci" }
```

After linking GitHub, trigger one **environment build** so agents boot with Node ready.

## 5. Tools

| Tool | Setting |
|------|---------|
| Pull request creation | **On** |
| Memories | Optional (off keeps runs predictable) |
| Computer use | Off (not needed) |
| Slack | Optional — post PR link to your channel |

## 6. Model

Use a capable coding model (e.g. Composer / Claude Sonnet class). Daily single-problem runs are small but need reliable test loops.

## 7. Run as

| Account type | Effect |
|--------------|--------|
| **Me** | PRs under your GitHub user; billed to you |
| **Service account** (teams) | PRs as `cursor`; team billing |

## 8. Prompt

Paste the full text from **one** of:

- `automation/templates/cursor-daily-implement.prompt.md` — **recommended** (works with GitHub Actions scaffold at 06:00 UTC)
- `automation/templates/cursor-daily-full-stack.prompt.md` — single automation, no GHA

Copy from below the `---` line in the template file (the prompt body only).

## 9. Activate

Save → **Activate** → run **Test** once manually from the automations page.

Inspect runs: [cursor.com/agents](https://cursor.com/agents)

## 10. GitHub prerequisites

1. [Integrations → GitHub](https://cursor.com/dashboard?tab=integrations) — install app, grant repo access.
2. Push this project to GitHub (Create repo in Cursor or add remote).
3. Enable **Actions** for `daily-dsa.yml` and `ci.yml`.

## Daily timeline (recommended)

| Time (UTC) | System | Action |
|------------|--------|--------|
| 06:00 | GitHub Actions | `npm run daily` → commit scaffold |
| 07:00 | Cursor Automation | implement → PR |
| On PR | GitHub Actions CI | `npm run test:ci` |
