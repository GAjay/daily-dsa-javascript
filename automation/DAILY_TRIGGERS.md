# Daily triggers (active setup)

Three layers run **every day (UTC)**:

| Time (UTC) | Trigger | What happens |
|------------|---------|--------------|
| **06:00** | GitHub Actions `daily-dsa.yml` | `npm run daily` → commit scaffold as **gajay** (needs GitHub repo + Actions enabled) |
| **06:00** | Cursor timer `daily-dsa-scaffold-utc` | Same as `npm run daily:commit` on this agent (backup if GHA not linked) |
| **07:00** | Cursor timer `daily-dsa-implement-utc` | Implement today's `solution.js` → PR as **gajay** |

## Run manually now

```bash
# Scaffold only (no commit)
npm run daily

# Scaffold + commit + push (same as 06:00 job)
npm run daily:commit

# Preview next catalog problem
npm run daily -- --dry-run
```

GitHub: **Actions → Daily DSA → Run workflow**.

## Cursor timers on this chat

Subscribed on this Cloud Agent session:

- `daily-dsa-scaffold-utc` — cron `0 6 * * *`
- `daily-dsa-implement-utc` — cron `0 7 * * *`

List or remove: Cursor subscriptions MCP / dashboard for this agent.

For a **standalone** daily bot, also create [Cursor Automation](https://cursor.com/automations/new) with `templates/cursor-daily-implement.prompt.md` (runs even when this chat is closed).

## Timezone

All cron expressions are **UTC**. Example: 06:00 UTC ≈ 11:30 IST.

## Today (UTC)

```bash
npm run today
```

If `implemented: false`, solve locally or wait for the 07:00 implement timer.
