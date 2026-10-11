# Cloud Agent environment

## Config

`.cursor/environment.json`:

```json
{
  "install": "node --version\nnpm run test:ci"
}
```

No `npm install` — zero dependencies. Node 20+ from the base image.

## Repositories

| Remote | URL |
|--------|-----|
| GitHub (primary) | https://github.com/GAjay/daily-dsa-javascript |
| Cursor | linked via dashboard environment |

In **Cursor → Cloud Agents → Environments**, attach **GAjay/daily-dsa-javascript** if automations should clone from GitHub.

## After setup

1. Open the **Environment** card in this agent thread and click **Save** (after the agent proposes `environmentJson`).
2. **Activate** the latest successful build.
3. Optional: trigger **Verify** from the Builds page.

## Daily automations

Use environment with Node + passing `test:ci` on build. Implement automation: `automation/templates/cursor-daily-implement.prompt.md`.
