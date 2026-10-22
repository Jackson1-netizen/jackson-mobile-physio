## Working branch

- 当前网站以 `Jackson1-netizen/jackson-mobile-physio` 的 `agent/HOME-002-about-enquiry` 为工作分支；2026-10-21 的基线是 `f2da9b2`。
- 今后先核对并同步该分支，在其最新提交上修改；不要把 `main` 或 `cursor/design-option-2-b759` 当作当前网站，也不要自行另建工作分支。
- 用户要求上传修改时，推送回 `agent/HOME-002-about-enquiry`。推送前重新检查远端是否有新提交，禁止强制推送；发布上线与域名切换仍须另外授权。

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
