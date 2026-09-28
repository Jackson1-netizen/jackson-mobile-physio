/** UI and marketing copy — English, Traditional Chinese, Simplified Chinese */

import { site } from "./site";

export const localeLabels = {
  en: "English",
  "zh-Hant": "繁體",
  "zh-Hans": "简体",
} as const;

export type Locale = keyof typeof localeLabels;

export const defaultLocale: Locale = "en";

const en = {
  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    howItWorks: "How it works",
    ndis: "NDIS",
    areas: "Service areas",
    faq: "FAQ",
    contact: "Contact",
    refer: "Refer",
    forReferrers: "For Referrers",
    referralSheet: "Referral sheet",
  },
  cta: {
    call: "Call",
    email: "Email",
    referParticipant: "Refer a participant",
    sendEnquiry: "Send enquiry",
    discussNeeds: "Discuss your needs",
  },
  hero: {
    regionLabel: "Melbourne Eastern Suburbs",
    languagesLabel: "Languages",
    fundingNote:
      "NDIS plan-managed & self-managed enquiries welcome · Not an NDIS registered provider",
  },
  sections: {
    about: "About",
    services: "Services",
    howItWorks: "How it works",
    ndis: "NDIS enquiries",
    areas: "Service areas",
    faq: "Frequently asked questions",
    contact: "Contact",
    referrers: "Referrers & coordinators",
    reviews: "Reviews",
    enquiry: "Send an enquiry",
  },
  about: {
    heading: "Meet Jackson",
    practitionerLabel: "Practitioner",
    qualificationsLabel: "Qualifications",
    languagesLabel: "Languages",
    role: site.tagline,
    paragraphs: [...site.aboutParagraphs],
    differentiator: site.differentiator,
    contactCta: site.contactCta,
    hydroCaption:
      "Illustrative aquatic-setting care only. Home Motion is a mobile home and community physiotherapy service — we do not run a pool clinic.",
  },
  services: {
    intro: site.servicesIntro,
  },
  ndis: {
    lead: site.ndisDescription,
    planManaged: "Self-managed NDIS participants",
    planManagedDesc:
      "You may enquire if you self-manage your NDIS plan and wish to engage a physiotherapist directly.",
    planManaged2: "Plan-managed NDIS participants",
    planManaged2Desc:
      "Enquiries welcome where your plan manager can arrange payment with an independent physiotherapist.",
    notRegistered: "Not an NDIS registered provider",
    notRegisteredDesc:
      "WAI WA LAW is not registered with the NDIS Commission. We cannot bill NDIA-managed plans directly. Please confirm funding with your coordinator before services start.",
    noGuarantee:
      "Funding eligibility and availability must be confirmed before care begins. Nothing on this site guarantees NDIS approval or outcomes.",
  },
  areas: {
    intro:
      "Home and community visits across Melbourne's eastern suburbs. This is a mobile service — we do not publish a clinic address.",
    viewSuburb: "Mobile physio in",
    allAreas: "Browse all service areas",
  },
  howItWorks: {
    intro:
      "A straightforward path from first contact to care in your own environment — with the same physiotherapist throughout.",
    steps: [
      {
        title: "Contact",
        description:
          "Call, email, or send an enquiry. You speak with Jackson — not a call centre — to discuss location, language, and timing.",
      },
      {
        title: "Initial discussion",
        description:
          "We clarify your goals, funding context (including NDIS if relevant), and whether a home or community visit suits you.",
      },
      {
        title: "Assessment visit",
        description:
          "Jackson attends your home or agreed community setting for assessment, in English, Cantonese, or Mandarin as preferred.",
      },
      {
        title: "Your plan",
        description:
          "You receive a clear, practical plan aligned with your priorities — mobility, strength, balance, or everyday function.",
      },
      {
        title: "Ongoing sessions",
        description:
          "Follow-up visits continue with the same clinician, adjusted as your needs and environment change.",
      },
    ],
  },
  faq: {
    items: [
      {
        question: "Do you have a clinic I can visit?",
        answer:
          "No — WAI WA LAW is mobile only. Appointments are at your home or an agreed community location across the eastern suburbs.",
      },
      {
        question: "Which suburbs do you cover?",
        answer:
          "We regularly visit Box Hill, Doncaster, Blackburn, Ringwood, Burwood, Glen Waverley, Mitcham, Nunawading, and surrounding areas. Contact us to confirm travel for your address.",
      },
      {
        question: "Can I use NDIS funding?",
        answer:
          "Enquiries are welcome from self-managed and plan-managed participants. We are not an NDIS registered provider and cannot service NDIA-managed plans directly. Confirm funding with your coordinator before starting.",
      },
      {
        question: "Which languages are available?",
        answer:
          "Consultations can be conducted in English, Cantonese (廣東話), or Mandarin (普通話), including with family or support workers present when helpful.",
      },
      {
        question: "Is AHPRA registration confirmed?",
        answer:
          "Yes. AHPRA physiotherapy registration has been granted. Jackson is an AHPRA-registered physiotherapist.",
      },
      {
        question: "Do I need a GP referral?",
        answer:
          "A referral is not always required for private enquiries. Support coordinators and GPs may still use our referral sheet to share participant details — contact us to discuss.",
      },
      {
        question: "How do I book?",
        answer:
          "There is no online booking system. Phone or email Jackson to discuss availability. Hours are by appointment.",
      },
    ],
  },
  reviews: {
    emptyTitle: "Reviews after launch",
    emptyBody:
      "When the practice is live and clients choose to share feedback, links to verified Google reviews will appear here. We do not display testimonials until they are real.",
  },
  enquiry: {
    intro:
      "Share a brief message — Jackson will respond when available. For urgent medical emergencies, call 000.",
    name: "Your name",
    phone: "Phone",
    suburb: "Suburb",
    message: "How can we help?",
    ndisLabel: "NDIS participant (plan-managed or self-managed)",
    language: "Preferred language",
    languageOptions: ["English", "Cantonese", "Mandarin", "No preference"],
    privacyNote: "Do not include sensitive clinical details in this form unless necessary.",
  },
  referrers: {
    lead: site.referrersCta,
    body: "Support coordinators, recovery coaches, GPs, and families are welcome to enquire about potential referrals.",
    sheetLink: "Open printable referral sheet",
  },
  footer: {
    backHome: "Back to home",
  },
  draftBanner: {
    short: "Draft preview — not indexed",
  },
  home: {
    eyebrow: "Mobile physiotherapy",
    h1Lead: "Expert physiotherapy",
    h1Mid: "in the comfort of",
    h1Em: "home.",
    support:
      "Independent mobile physiotherapy in Melbourne's eastern suburbs. When you enquire, you speak directly with Jackson — the physiotherapist who personally delivers your care. Appointments in English, Cantonese and Mandarin.",
    primaryCta: "Make an enquiry",
    secondaryCta: "Learn about our services",
    chips: [
      "Home & community visits",
      "English / Cantonese / Mandarin",
      "Personalised one-to-one care",
    ],
  },
} as const;

const zhHant = {
  nav: {
    home: "主頁",
    about: "關於",
    services: "服務",
    howItWorks: "流程",
    ndis: "NDIS",
    areas: "服務地區",
    faq: "常見問題",
    contact: "聯絡",
    refer: "轉介",
    forReferrers: "轉介夥伴",
    referralSheet: "轉介表",
  },
  cta: {
    call: "致電",
    email: "電郵",
    referParticipant: "轉介參加者",
    sendEnquiry: "發送查詢",
    discussNeeds: "討論您的需要",
  },
  hero: {
    regionLabel: "墨爾本東區",
    languagesLabel: "語言",
    fundingNote: "歡迎 NDIS 自管及計劃管理查詢 · 非 NDIS 註冊服務提供者",
  },
  sections: {
    about: "關於",
    services: "服務",
    howItWorks: "服務流程",
    ndis: "NDIS 查詢",
    areas: "服務地區",
    faq: "常見問題",
    contact: "聯絡",
    referrers: "轉介者及協調員",
    reviews: "評價",
    enquiry: "發送查詢",
  },
  about: {
    heading: "認識 Jackson",
    practitionerLabel: "治療師",
    qualificationsLabel: "資歷",
    languagesLabel: "語言",
    role: "上門物理治療",
    paragraphs: [
      "Jackson（Wai Wa Law）在墨爾本東區提供個人化上門物理治療，專注家居及社區照護，並可提供英語、廣東話及普通話預約。",
      "Jackson 具社區及殘疾服務經驗，重視切合個人需要的實用照護，以活動能力、功能及日常生活目標為本。",
    ],
    differentiator:
      "查詢時您會直接與負責治療的物理治療師溝通 — 並非電話中心或輪更團隊。",
    contactCta:
      "正在尋找墨爾本東區上門物理治療？歡迎聯絡我們，討論您的需要、地點及可預約時間。",
    hydroCaption:
      "圖片僅作水中照護情境示意。Home Motion 為上門及社區物理治療服務，並非水療診所。",
  },
  services: {
    intro:
      "以下為評估時可能討論的支援例子。具體照護按個人計劃；概不保證任何治療或結果。",
  },
  ndis: {
    lead: "歡迎自管及計劃管理的 NDIS 參加者查詢。開始服務前須確認資助資格及可預約時段。",
    planManaged: "NDIS 自管參加者",
    planManagedDesc: "若您自管 NDIS 計劃並希望直接聘用物理治療師，歡迎查詢。",
    planManaged2: "NDIS 計劃管理參加者",
    planManaged2Desc: "若您的計劃經理可與獨立物理治療師安排付款，歡迎查詢。",
    notRegistered: "非 NDIS 註冊服務提供者",
    notRegisteredDesc:
      "WAI WA LAW 未在 NDIS 委員會註冊，無法直接為 NDIA 管理的計劃開帳。開始服務前請與協調員確認資助安排。",
    noGuarantee: "開始照護前須確認資助資格及可預約時段。本網站不保證 NDIS 批准或治療結果。",
  },
  areas: {
    intro: "於墨爾本東區提供上門及社區物理治療。本為流動服務，不設固定診所地址。",
    viewSuburb: "上門物理治療：",
    allAreas: "查看所有服務地區",
  },
  howItWorks: {
    intro: "由首次聯絡至在熟悉環境接受照護，全程由同一位物理治療師跟進。",
    steps: [
      {
        title: "聯絡",
        description: "致電、電郵或提交查詢。您會直接與 Jackson 溝通，討論地點、語言及時間。",
      },
      {
        title: "初步了解",
        description: "了解您的目標、資助情況（包括 NDIS），以及上門或社區評估是否合適。",
      },
      {
        title: "評估到訪",
        description: "Jackson 到您家中或約定的社區地點進行評估，可選英語、廣東話或普通話。",
      },
      {
        title: "您的計劃",
        description: "按您的優先事項制定清晰、實用的計劃 — 活動、肌力、平衡或日常功能。",
      },
      {
        title: "持續治療",
        description: "由同一位治療師跟進，並按需要與環境變化調整。",
      },
    ],
  },
  faq: {
    items: [
      {
        question: "是否有診所可以前往？",
        answer: "沒有 — 僅提供上門服務。預約在您的家中或東區約定的社區地點進行。",
      },
      {
        question: "覆蓋哪些郊區？",
        answer:
          "我們經常到訪 Box Hill、Doncaster、Blackburn、Ringwood、Burwood、Glen Waverley、Mitcham、Nunawading 及周邊地區。請聯絡我們確認您的地址。",
      },
      {
        question: "可以使用 NDIS 資助嗎？",
        answer:
          "歡迎自管及計劃管理的參加者查詢。我們非 NDIS 註冊提供者，無法直接服務 NDIA 管理的計劃。開始前請與協調員確認。",
      },
      {
        question: "可使用哪些語言？",
        answer: "可使用英語、廣東話或普通話進行諮詢，有需要時家人或支援人員可在場。",
      },
      {
        question: "AHPRA 註冊是否已確認？",
        answer: "是。AHPRA 物理治療師註冊已獲批。Jackson 是已註冊物理治療師。",
      },
      {
        question: "需要家庭醫生轉介嗎？",
        answer: "私人查詢不一定需要轉介。協調員及家庭醫生仍可使用轉介表 — 歡迎聯絡我們。",
      },
      {
        question: "如何預約？",
        answer: "沒有網上預約系統。請致電或電郵 Jackson 討論時間。服務時間為預約制。",
      },
    ],
  },
  reviews: {
    emptyTitle: "上線後顯示評價",
    emptyBody: "執業後若客戶願意分享，將在此連結至經核實的 Google 評價。我們不會展示虛假見證。",
  },
  enquiry: {
    intro: "請簡述您的需要 — Jackson 會在方便時回覆。緊急醫療情況請致電 000。",
    name: "姓名",
    phone: "電話",
    suburb: "郊區",
    message: "我們如何協助？",
    ndisLabel: "NDIS 參加者（計劃管理或自管）",
    language: "偏好語言",
    languageOptions: ["英語", "廣東話", "普通話", "無偏好"],
    privacyNote: "除非必要，請勿在此表格填寫敏感臨床資料。",
  },
  referrers: {
    lead: "歡迎支援協調員、復康教練、家庭及其他醫療專業人士就潛在轉介查詢。",
    body: "歡迎支援協調員、復康教練、家庭醫生及家屬就潛在轉介查詢。",
    sheetLink: "開啟可列印轉介表",
  },
  footer: {
    backHome: "返回主頁",
  },
  draftBanner: {
    short: "草稿預覽 — 未公開索引",
  },
  home: {
    eyebrow: "上門物理治療",
    h1Lead: "專業物理治療",
    h1Mid: "在家中安心接受",
    h1Em: "服務。",
    support:
      "墨爾本東郊獨立上門物理治療。查詢時由 Jackson 本人接聽，亦由他親自提供護理。可使用英語、粵語或普通話。",
    primaryCta: "查詢預約",
    secondaryCta: "了解服務",
    chips: ["上門及社區探訪", "英語 / 粵語 / 普通話", "一對一個人化護理"],
  },
} as const;

const zhHans = {
  nav: {
    home: "主页",
    about: "关于",
    services: "服务",
    howItWorks: "流程",
    ndis: "NDIS",
    areas: "服务地区",
    faq: "常见问题",
    contact: "联系",
    refer: "转介",
    forReferrers: "转介伙伴",
    referralSheet: "转介表",
  },
  cta: {
    call: "致电",
    email: "邮件",
    referParticipant: "转介参加者",
    sendEnquiry: "发送咨询",
    discussNeeds: "讨论您的需要",
  },
  hero: {
    regionLabel: "墨尔本东区",
    languagesLabel: "语言",
    fundingNote: "欢迎 NDIS 自管及计划管理咨询 · 非 NDIS 注册服务提供者",
  },
  sections: {
    about: "关于",
    services: "服务",
    howItWorks: "服务流程",
    ndis: "NDIS 咨询",
    areas: "服务地区",
    faq: "常见问题",
    contact: "联系",
    referrers: "转介者及协调员",
    reviews: "评价",
    enquiry: "发送咨询",
  },
  about: {
    heading: "认识 Jackson",
    practitionerLabel: "治疗师",
    qualificationsLabel: "资历",
    languagesLabel: "语言",
    role: "上门物理治疗",
    paragraphs: [
      "Jackson（Wai Wa Law）在墨尔本东区提供个性化上门物理治疗，专注家居及社区照护，并可提供英语、粤语及普通话预约。",
      "Jackson 具社区及残疾服务经验，重视切合个人需要的实用照护，以活动能力、功能及日常生活目标为本。",
    ],
    differentiator: "咨询时您会直接与负责治疗的物理治疗师沟通 — 并非电话中心或轮更团队。",
    contactCta:
      "正在寻找墨尔本东区上门物理治疗？欢迎联系我们，讨论您的需要、地点及可预约时间。",
    hydroCaption:
      "图片仅作水中照护情境示意。Home Motion 为上门及社区物理治疗服务，并非水疗诊所。",
  },
  services: {
    intro: "以下为评估时可能讨论的支援例子。具体照护按个人计划；概不保证任何治疗或结果。",
  },
  ndis: {
    lead: "欢迎自管及计划管理的 NDIS 参加者咨询。开始服务前须确认资助资格及可预约时段。",
    planManaged: "NDIS 自管参加者",
    planManagedDesc: "若您自管 NDIS 计划并希望直接聘用物理治疗师，欢迎咨询。",
    planManaged2: "NDIS 计划管理参加者",
    planManaged2Desc: "若您的计划经理可与独立物理治疗师安排付款，欢迎咨询。",
    notRegistered: "非 NDIS 注册服务提供者",
    notRegisteredDesc:
      "WAI WA LAW 未在 NDIS 委员会注册，无法直接为 NDIA 管理的计划开票。开始服务前请与协调员确认资助安排。",
    noGuarantee: "开始照护前须确认资助资格及可预约时段。本网站不保证 NDIS 批准或治疗结果。",
  },
  areas: {
    intro: "于墨尔本东区提供上门及社区物理治疗。本为流动服务，不设固定诊所地址。",
    viewSuburb: "上门物理治疗：",
    allAreas: "查看所有服务地区",
  },
  howItWorks: {
    intro: "由首次联系到在熟悉环境接受照护，全程由同一位物理治疗师跟进。",
    steps: [
      {
        title: "联系",
        description: "致电、邮件或提交咨询。您会直接与 Jackson 沟通，讨论地点、语言及时间。",
      },
      {
        title: "初步了解",
        description: "了解您的目标、资助情况（包括 NDIS），以及上门或社区评估是否合适。",
      },
      {
        title: "评估到访",
        description: "Jackson 到您家中或约定的社区地点进行评估，可选英语、粤语或普通话。",
      },
      {
        title: "您的计划",
        description: "按您的优先事项制定清晰、实用的计划 — 活动、肌力、平衡或日常功能。",
      },
      {
        title: "持续治疗",
        description: "由同一位治疗师跟进，并按需要与环境变化调整。",
      },
    ],
  },
  faq: {
    items: [
      {
        question: "是否有诊所可以前往？",
        answer: "没有 — 仅提供上门服务。预约在您的家中或东区约定的社区地点进行。",
      },
      {
        question: "覆盖哪些郊区？",
        answer:
          "我们经常到访 Box Hill、Doncaster、Blackburn、Ringwood、Burwood、Glen Waverley、Mitcham、Nunawading 及周边地区。请联系我们确认您的地址。",
      },
      {
        question: "可以使用 NDIS 资助吗？",
        answer:
          "欢迎自管及计划管理的参加者咨询。我们非 NDIS 注册提供者，无法直接服务 NDIA 管理的计划。开始前请与协调员确认。",
      },
      {
        question: "可使用哪些语言？",
        answer: "可使用英语、粤语或普通话进行咨询，有需要时家人或支持人员可在场。",
      },
      {
        question: "AHPRA 注册是否已确认？",
        answer: "是。AHPRA 物理治疗师注册已获批。Jackson 是已注册物理治疗师。",
      },
      {
        question: "需要全科医生转介吗？",
        answer: "私人咨询不一定需要转介。协调员及全科医生仍可使用转介表 — 欢迎联系我们。",
      },
      {
        question: "如何预约？",
        answer: "没有网上预约系统。请致电或邮件 Jackson 讨论时间。服务时间为预约制。",
      },
    ],
  },
  reviews: {
    emptyTitle: "上线后显示评价",
    emptyBody: "执业后若客户愿意分享，将在此链接至经核实的 Google 评价。我们不会展示虚假见证。",
  },
  enquiry: {
    intro: "请简述您的需要 — Jackson 会在方便时回复。紧急医疗情况请致电 000。",
    name: "姓名",
    phone: "电话",
    suburb: "郊区",
    message: "我们如何协助？",
    ndisLabel: "NDIS 参加者（计划管理或自管）",
    language: "偏好语言",
    languageOptions: ["英语", "粤语", "普通话", "无偏好"],
    privacyNote: "除非必要，请勿在此表格填写敏感临床资料。",
  },
  referrers: {
    lead: "欢迎支持协调员、康复教练、家庭及其他医疗专业人士就潜在转介咨询。",
    body: "欢迎支持协调员、康复教练、全科医生及家属就潜在转介咨询。",
    sheetLink: "打开可打印转介表",
  },
  footer: {
    backHome: "返回主页",
  },
  draftBanner: {
    short: "草稿预览 — 未公开索引",
  },
  home: {
    eyebrow: "上门物理治疗",
    h1Lead: "专业物理治疗",
    h1Mid: "在家中安心接受",
    h1Em: "服务。",
    support:
      "墨尔本东郊独立上门物理治疗。查询时由 Jackson 本人接听，亦由他亲自提供护理。可使用英语、粤语或普通话。",
    primaryCta: "查询预约",
    secondaryCta: "了解服务",
    chips: ["上门及社区探访", "英语 / 粤语 / 普通话", "一对一个人化护理"],
  },
} as const;

export const messages = {
  en,
  "zh-Hant": zhHant,
  "zh-Hans": zhHans,
} as const;

/** Flatten nested keys for client-side lookup (e.g. "nav.about") */
export function flattenMessages(
  obj: Record<string, unknown>,
  prefix = "",
): Record<string, string | readonly string[]> {
  const out: Record<string, string | readonly string[]> = {};
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(out, flattenMessages(value as Record<string, unknown>, path));
    } else if (typeof value === "string") {
      out[path] = value;
    }
  }
  return out;
}

export function getNestedValue(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}
