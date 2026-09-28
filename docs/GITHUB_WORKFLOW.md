# GitHub workflow (two computers)

Private repo initially. Work on feature branches; merge via pull request when ready.

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
git push -u origin <branch-name>
```

Or use the safe checkpoint helper (also appends `docs/DAILY_LOG.md`):

```bash
npm run checkpoint
```

**Never** force-push. If `pull --rebase` or `push` conflicts, stop and resolve manually.

## Clone on a second computer

```bash
git clone <repository-url>
cd <repo-folder>
npm install
git checkout cursor/bootstrap-jackson-mobile-physio-e489   # or your active branch
npm run dev
```

Replace `<repository-url>` with the URL shown in your Git hosting settings after the repo is linked.
