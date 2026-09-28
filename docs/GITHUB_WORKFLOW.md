# GitHub workflow (two computers)

**Private** repository: `jackson-mobile-physio` (intended GitHub path: `jacks0n-g/jackson-mobile-physio` once created).

Until GitHub `origin` is connected, this clone may still use Cursor Origin (`origin.cursor.com`). After you create the private repo, switch `origin` as below.

## One-time: create private repo and connect (on your computer)

```bash
gh auth login
# Choose: GitHub.com → HTTPS → Login with browser (recommended)

gh repo create jackson-mobile-physio --private --source=. --remote=github --push
# Or if repo already exists empty on GitHub:
git remote add github git@github.com:jacks0n-g/jackson-mobile-physio.git
git push -u github cursor/bootstrap-jackson-mobile-physio-e489
git push -u github main
```

To make GitHub the primary remote (optional):

```bash
git remote rename origin cursor-origin
git remote rename github origin
```

**Clone URL (private, HTTPS):** `https://github.com/jacks0n-g/jackson-mobile-physio.git`  
**Clone URL (private, SSH):** `git@github.com:jacks0n-g/jackson-mobile-physio.git`

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
git push -u origin <branch-name>
```

Or use the safe checkpoint helper (also appends `docs/DAILY_LOG.md`):

```bash
npm run checkpoint
```

**Never** force-push. If `pull --rebase` or `push` conflicts, stop and resolve manually.

## Clone on a second computer

```bash
git clone https://github.com/jacks0n-g/jackson-mobile-physio.git
cd jackson-mobile-physio
npm install
git checkout cursor/bootstrap-jackson-mobile-physio-e489   # or main after merge
npm run dev
```

Use SSH clone URL if you prefer SSH keys. Authenticate with `gh auth login` or Git credential manager — do not store PATs in the repo.
