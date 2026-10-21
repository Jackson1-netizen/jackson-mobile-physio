# Google Maps 服务地区地图

工作分支：`agent/HOME-002-about-enquiry`。此次改动基于 `f2da9b2`，不要改到 `main` 或旧设计分支。

## 本次行为

- 首页与 `/areas/` 使用同一个组件。保留 HOME-002 的其他页面、较清晰的首页图片、咨询表单及流程。
- 按 Jackson 确认恢复为 8 个主要地区与 14 个邻近地区。只有主要列表产生地图标记、聚合与范围；原来主要列表中的 Balwyn、Forest Hill、Caulfield 保留为下方邻近咨询入口，所有 22 个地区均保留。邻近地区点击进入预填地区的咨询页，不会添加地图标记。
- Google 原生道路底图保留其道路、公园、水域色彩。橙色标记属于 Home Motion；地图数据、Google 标志和版权信息保持原样。
- 缩小时主要地区的相邻标记会聚合。点击数字放大，或从主要列表选择地区。标记短暂下落，减少动态效果时不播放。所有位置是大约的郊区中心，不是诊所地址或服务边界；没有请求设备定位。
- 地图延迟加载；网络失败、密钥未配置或验证失败时，文字列表、现有地区页面、咨询入口及 Google Maps 外链仍可使用。

## 启用真正的 Google 底图

1. 在 Google Cloud 项目启用 Maps JavaScript API，并按 Google 的要求配置计费和预算提醒。这项操作由账户持有人完成。
2. 建立浏览器 API 密钥；API 限制只允许 Maps JavaScript API。网站限制只加入实际使用的来源，例如本机 `http://127.0.0.1:4721/*`、当前真实预览地址，以及正式启用时的 `https://homemotionphysio.com.au/*`。不要为方便测试开放任意来源。
3. 本地在被 Git 忽略的 `.env.local` 写入 `PUBLIC_GOOGLE_MAPS_API_KEY=实际密钥`，重启后台开发服务。
4. 部署平台也需配置同名变量并重新构建。不要把密钥写入组件、文档或 Git。浏览器密钥会随构建发送到浏览器，因此来源和 API 限制是必要配置；它不是服务器秘密凭证。
5. 不需要 Map ID、Places API、Geocoding API 或路由 API。使用官方 Maps JavaScript API 和 OverlayView 渲染可键盘操作的标记。

官方设置说明：[Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/get-api-key)。

## 配置密钥后的验收

- 验证真实 Google 底图及版权信息能显示；控制台没有认证、计费、来源限制或 CSP 错误。
- 在首页和 `/areas/` 验证 8 个主要地区产生标记、聚合、缩放及“所有地区”按钮正常；14 个邻近地区仅保留咨询入口，外链跟随主要地区选择。
- 验证手机滚动不被地图抢占，文字和提示框不越界；验证键盘、焦点与中英切换。
- 断网或阻断 Google 后仍能选择地区和进入咨询；恢复后可重试。
- 未配置真实密钥时，仅可确认无密钥回退、页面布局和使用测试替身的地图交互，不能据此宣称 Google 实际加载已通过。

## 发布状态

此分支的 GitHub 推送不代表正式上线。Netlify ignore 脚本已准备受默认关闭开关控制的 HOME-002 非生产预览；具体设置见 [待批准提案](STAGING_PREVIEW_PROPOSAL.md)。本次没有更改 Netlify/Google Cloud 设置、切换生产分支、合并 PR、绑定域名或解除 noindex。`PR #10` 现有质量检查会随同一分支的新提交更新。

隐私政策仅把地图供应商从 Esri 更新为 Google Maps，并更新相应日期；其他已批准的法律与保险说明保持原状。

安全头按 Google 官方 allowlist CSP 指南加入地图所需的 Google 来源及 `unsafe-eval`；原有 `unsafe-inline` 保留。表单仅提交到本站、禁止外站嵌入和设备定位等限制继续生效。真实密钥启用后仍需检查控制台 CSP 报错。

## 本次本地检查

2026-10-21 更新：Jackson 提供本地 `.env.local` 后，在 4721 端口的桌面首页、`/areas/` 与 390px 首页验证了真实 Google 底图；均为 `ready`、8 个主要标记、14 个 Nearby 咨询入口、Google 标志可见，控制台及页面错误为零。未输出密钥或带密钥的请求 URL。Netlify 的真实响应头与 CSP 仍须待批准后验收。

以下为前次版本记录，不代表本次仍使用 22 个地图标记。

- `npm run check` 与 `npm run build` 通过；构建验证了 Netlify 表单和草稿 noindex。
- 5 种视口（320–1680px）验证了无密钥回退、22 个地区选项、链接、咨询地区预填及无横向溢出。
- Google SDK 测试替身验证了自定义标记、聚合、列表联动、键盘操作、中英切换及认证失败回退；这不等于真实 Google 底图验收。
- 地图组件的自动无障碍检查通过，范围为本次组件；未据此宣称全站无障碍认证。
- 已同步隐私政策日期与 Google Maps 供应商断言，并让测试通过 Node 调用 npm CLI，修复 Windows 的 `.cmd` 启动问题。本机全套 `npm test` 17 项通过；草稿副本与模拟上线副本均已验证，实际项目继续保持 `draft = true`。GitHub 另有 Linux 质量检查。
