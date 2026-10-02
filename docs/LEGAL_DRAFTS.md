# Legal drafts — pending owner review

`/privacy` and `/disclaimer` are **drafts**. They are not legal advice and they have not been adopted as the practice’s policy.

Jackson needs to read them before launch. He may also want a lawyer or his professional association to review them. Until he approves them:

- The pages keep their draft banners.
- `docs/LAUNCH_STATUS.md` keeps privacy review under NEEDS JACKSON.
- Do not remove the draft wording just to make the site look finished.

The copy lives in `src/content/site.ts` (`privacy` and `disclaimer`) so names, ABN, AHPRA number, and emails stay in one place.

What the drafts try to cover, for his review:

- Privacy Act 1988 (Cth) and the Australian Privacy Principles, in plain language.
- Health information, including the Health Records Act 2001 (Vic) as a pointer, not a full restatement.
- The website form collects only a first contact: name, phone, and optional email, suburb, language, NDIS-plan flag, and a short reason. It asks people not to send health information that way.
- Home Motion Physiotherapy is the registered business name of Wai Wa Law, sole trader, ABN 75 612 731 757.
- General AHPRA registration PHY0004088824. No expiry date.
- The site does not claim to be an NDIS registered provider and does not guarantee funding.
- Email for the domain is hosted with Google Workspace, which may store messages outside Australia. The website host is not chosen yet.

After he approves the text, replace the “pending owner review” status with the date he adopts it, and remove the draft banner on those two pages only. Leave `site.draft` true until the rest of the launch checklist is done.
