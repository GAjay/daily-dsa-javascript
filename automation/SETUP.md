# Full setup — Daily DSA automation (ready base)

End-to-end checklist: **GitHub scaffold + Cursor implement + CI**. Estimated manual setup: one-time ~15–20 minutes.

## What you get

| Layer | What runs | Result |
|-------|-----------|--------|
| **GitHub Actions** | `daily-dsa.yml` @ 06:00 UTC | New `problems/YYYY-MM-DD-slug/` + updated `state.json` on `main` |
| **Cursor Automation** | Your schedule @ 07:00 UTC | Implements `solution.js`, opens PR |
| **GitHub Actions CI** | `ci.yml` on push/PR | Tests all **implemented** problems |

---

## Step 1 — GitHub repository

1. In Cursor, click **Create repo** (or create an empty repo on GitHub).
2. Push `main`:

   ```bash
   git push -u origin main
   ```

3. On GitHub: **Settings → Actions → General** → allow workflows.

4. **Actions → Daily DSA → Run workflow** once. You should see a commit like `dsa(auto): scaffold …` (or skip if today already exists).

---

## Step 2 — GitHub integration in Cursor

1. Open [Cursor Dashboard → Integrations → GitHub](https://cursor.com/dashboard?tab=integrations).
2. Install the GitHub app and grant access to this repository (**read/write**).

---

## Step 3 — Cloud Environment

1. Dashboard → **Cloud Agents** → **Environments** → add/link this repo.
2. Confirm `.cursor/environment.json` is present (Node smoke + `test:ci` on build).
3. Trigger an **environment build** and wait until it succeeds.
4. Optional: run a manual Cloud Agent on `main` with prompt: `Run npm run test:ci and report result.`

---

## Step 4 — Cursor Automation (prompt template)

1. Open [cursor.com/automations/new](https://cursor.com/automations/new).
2. Apply every row in **`automation/templates/cursor-automation-settings.md`**.
3. For **Prompt**, open **`automation/templates/cursor-daily-implement.prompt.md`**, copy everything **below the `---` line**, paste into the automation prompt field.
4. Save and **Activate**.
5. Click **Run now** once and verify a PR appears (or "no changes needed" if today is already solved).

---

## Step 5 — Verify locally

```bash
node --version          # 20+
npm run daily -- --dry-run
npm run today
npm run test:ci
npm test                # includes unimplemented scaffolds (may fail until you solve)
```

---

## File map (automation base)

```
AGENTS.md                          ← agent rules (Cursor reads this)
.cursor/environment.json           ← cloud build install step
automation/catalog.json            ← problem rotation
automation/state.json              ← next index (committed by GHA)
automation/templates/
  cursor-daily-implement.prompt.md ← paste into Cursor Automation
  cursor-daily-full-stack.prompt.md
  cursor-automation-settings.md    ← UI checklist
scripts/daily.js                   ← scaffold
scripts/today.js                   ← npm run today
.github/workflows/daily-dsa.yml
.github/workflows/ci.yml
```

---

## Customize

| Goal | Change |
|------|--------|
| More problems | Add entries to `automation/catalog.json` |
| Different time | Edit `cron` in `daily-dsa.yml` and automation schedule |
| One automation only | Use `cursor-daily-full-stack.prompt.md`, disable GHA schedule |
| IST-friendly cron | 06:00 UTC = 11:30 IST; set automation ~1h after scaffold |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Automation doesn't touch code | Set **Single repository** + branch `main` on the automation |
| No PR | Enable **Pull request creation** tool |
| Agent can't find today's folder | Run GHA Daily DSA first; or use full-stack prompt |
| CI fails on PR | Implement until `npm run test:ci` passes locally |
| Duplicate folder same day | Expected: `npm run daily` is idempotent (one folder per UTC day) |

---

## Optional: Slack

Enable **Send to Slack** on the automation and add to the prompt footer:

> Post a one-line message with the PR URL or "No changes needed".

---

When all steps are green, your **ready base** runs daily with no manual scaffolding.
