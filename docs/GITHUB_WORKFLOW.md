# GitHub workflow (two computers)

> **2026-10-02:** This GitHub repository is **public**. The notes below were written when it was treated as private. Do not commit secrets, patient information, or private inboxes.

Repository: [Jackson1-netizen/jackson-mobile-physio](https://github.com/Jackson1-netizen/jackson-mobile-physio)

- **GitHub (`github` remote):** `https://github.com/Jackson1-netizen/jackson-mobile-physio.git` — primary for Jackson’s machines.
- **Cursor Origin (`origin` remote):** cloud agent / project Origin — keep for Cursor sessions unless you rename remotes.

Phase 1 lives on `cursor/bootstrap-jackson-mobile-physio-e489`; `main` on GitHub matches that tip (Origin `main` was init-only).

## One-time: clone on a second computer

```bash
gh auth login
# Choose: GitHub.com → HTTPS → Login with browser (recommended)

git clone https://github.com/Jackson1-netizen/jackson-mobile-physio.git
cd jackson-mobile-physio
npm install
git checkout cursor/bootstrap-jackson-mobile-physio-e489   # or main (same Phase 1 tip)
npm run dev
```

**Clone URL (private, HTTPS):** `https://github.com/Jackson1-netizen/jackson-mobile-physio.git`  
**Clone URL (private, SSH):** `git@github.com:Jackson1-netizen/jackson-mobile-physio.git`

If this clone still has only Cursor Origin, add GitHub:

```bash
git remote add github https://github.com/Jackson1-netizen/jackson-mobile-physio.git
git fetch github
git checkout cursor/bootstrap-jackson-mobile-physio-e489
```

To make GitHub the primary remote (optional):

```bash
git remote rename origin cursor-origin
git remote rename github origin
```

Do not commit tokens or `.env` files. Never force-push.

## Start of session (any computer)

```bash
git pull --rebase
npm install
npm run dev
```

## End of session

```bash
git status
git add <files>   # or git add -A when appropriate
git commit -m "Describe what changed"
git push github <branch-name>
git push origin <branch-name>   # if Cursor Origin is still configured
```

Or use the safe checkpoint helper (also appends `docs/DAILY_LOG.md`):

```bash
npm run checkpoint
```

**Never** force-push. If `pull --rebase` or `push` conflicts, stop and resolve manually.
