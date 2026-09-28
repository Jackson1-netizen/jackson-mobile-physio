# Optional automatic backup (Windows)

This is **optional**. Do **not** enable any scheduled task from this repo automatically.

## Goal

Daily local checkpoint: append `docs/DAILY_LOG.md`, commit project changes, push to `origin` if configured.

## Command

From the repository root:

```powershell
npm run checkpoint
```

## Windows Task Scheduler (manual setup)

1. Open **Task Scheduler** → Create Task.  
2. Trigger: Daily at a time you are usually online.  
3. Action: Start a program  
   - Program: `cmd.exe`  
   - Arguments: `/c cd /d C:\path\to\repo && npm run checkpoint >> C:\path\to\repo\checkpoint.log 2>&1`  
4. Conditions: only run if network available (optional).  
5. **Do not** store passwords in the task; use your normal Git credential helper.

## Notes

- Checkpoint refuses to commit if `.env` appears in `git status`.  
- On push failure, fix conflicts manually — the script will not force-push.  
