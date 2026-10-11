# Actions only you can complete (~3 minutes)

The agent finished everything in the repository and started a Cloud Environment build. These steps require **your** Cursor/GitHub account in the browser.

## 1. GitHub repository

**Live repo:** https://github.com/GAjay/daily-dsa-javascript

If GitHub Actions workflows are missing, authorize **`workflow`** scope once (`gh auth refresh -h github.com -s workflow`) then from the project: `git push github main`.

## 2. Connect GitHub to Cursor (if not already)

Open: [cursor.com/dashboard?tab=integrations](https://cursor.com/dashboard?tab=integrations) → **GitHub** → grant access to the new repo.

## 3. Activate Cloud Environment

Open: [cursor.com/dashboard?tab=cloud-agents](https://cursor.com/dashboard?tab=cloud-agents) → **Environments** → find **Daily DSA** (or this repo) → **Activate** the latest successful build (build id is in the agent summary).

## 4. Create the Cursor Automation (copy-paste)

1. Open [cursor.com/automations/new](https://cursor.com/automations/new)
2. Set fields from [templates/cursor-automation-settings.md](templates/cursor-automation-settings.md)
3. Paste prompt from [templates/cursor-daily-implement.prompt.md](templates/cursor-daily-implement.prompt.md) (body below `---`)
4. **Activate** → **Run now**

## 5. Verify GitHub Actions

On GitHub: **Actions** → **Daily DSA** → **Run workflow** once.

---

After step 1–4, the system runs daily without manual work.
