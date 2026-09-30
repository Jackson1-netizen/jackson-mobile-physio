/** UI and marketing copy — English, Traditional Chinese, Simplified Chinese */

import { site } from "./site";
import { concept1Purpose } from "./concept1-home";

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
          `There is no online booking system. Phone Jackson or email ${site.publicEmail} to discuss availability. Hours are by appointment. The mailbox is being set up, so please call if you do not hear back.`,
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
    email: "Email",
    optional: "(optional)",
    requiredNote: "Fields marked * are required.",
    continue: "Continue",
    unavailableNotice:
      "This website does not send email yet. You can check your details here, then call Jackson on",
    unavailableEmailLead: "or write to",
    unavailableTitle: "Your enquiry has not been sent",
    unavailableBody: "Please call Jackson to make your enquiry:",
    composeLead: "Or open your email app to write to",
    mailboxNote: "That inbox is being set up and may not receive mail until domain email is configured.",
    mailtoTitle: "Opening your email app",
    mailtoBody:
      "Your email app should open with your enquiry filled in. Please check it and press send in your email app. If nothing opens, call Jackson:",
    noscript: "Online enquiries need JavaScript. Please call Jackson:",
    errorSummary: "Some details need checking. Please review the highlighted fields.",
    errors: {
      nameRequired: "Please enter your name.",
      phoneRequired: "Please enter a phone number so Jackson can call you back.",
      phoneInvalid: "Please enter a valid phone number (at least 8 digits).",
      emailInvalid: "Please enter a valid email address, or leave this field blank.",
      messageRequired: "Please tell us briefly how we can help.",
    },
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
  /** Homepage (`/`) copy. English here is the source rendered by src/components/home/*. */
  hm: {
    skipLink: "Skip to main content",
    header: {
      primaryNav: "Primary",
      mobileNav: "Mobile menu",
      menu: "Menu",
      languageGroup: "Language",
      logoLabel: `${site.displayBrand} home`,
    },
    hero: {
      support:
        "Personalised, evidence-based physiotherapy care in Melbourne's eastern suburbs. Helping you move better, stay independent and enjoy everyday life.",
      chips: ["Home & community visits", "All ages welcome", "NDIS & private clients"],
      ahpra: "AHPRA registered physiotherapist",
      photoAlt:
        "Jackson providing mobile physiotherapy at home, supporting walking practice with a walking frame",
    },
    services: {
      heading: "Our Services",
      supporting: "Supporting your movement, function and independence.",
      enquire: "Ask about a service",
      cards: [
        { title: "Mobile Physiotherapy", body: "One-on-one care at home and in the community." },
        { title: "Mobility & Balance", body: "Improve safety and confidence in daily activities." },
        { title: "Strength & Functional Capacity", body: "Build strength for independence." },
        {
          title: "Rehabilitation After Hospitalisation",
          body: "Support your recovery and return to everyday life.",
        },
        {
          title: "Neurological & Disability-Related",
          body: "Tailored physiotherapy for your individual goals.",
        },
        { title: "Home Exercise Programs", body: "Practical and individualised exercise plans." },
      ],
    },
    areas: {
      heading: "Service Areas",
      lead: "Home and community visits across Melbourne's eastern suburbs",
      cardLabel: "Home Motion contact card",
      mapCaption: "Interactive map of the eastern suburbs service area — no private address pin.",
      mapLabel: "Service area map",
    },
    referrers: {
      heading: "For Referrers",
      lead: "I work collaboratively with GPs, specialists and allied health professionals to support shared clients with timely, goal-oriented physiotherapy care.",
      registration: "AHPRA registered physiotherapist.",
      points: [
        "Clear communication and progress updates",
        "Goal-oriented, client-centred care",
        "Flexible and responsive service",
      ],
      cta: "Referrer information",
    },
    how: {
      kicker: "How our service works",
      heading: "Simple, flexible and tailored to you.",
      steps: [
        {
          title: "Get in touch",
          body: "Make an enquiry and share your suburb, language and needs. You speak with Jackson — not a call centre.",
        },
        {
          title: "We arrange a visit",
          body: "We talk through goals, location and funding context, then arrange a home or community appointment if suitable.",
        },
        {
          title: "Personalised care",
          body: "You receive assessment and a practical plan in your environment, with the same physiotherapist for follow-up visits.",
        },
      ],
    },
    why: {
      kicker: "Why choose Home Motion",
      heading: "Why Choose Home Motion?",
      intro: concept1Purpose.body,
      items: [
        {
          title: "Care at home",
          body: "Physiotherapy where you live and move — no clinic visit required.",
        },
        { title: "Personalised approach", body: site.differentiator },
        {
          title: "Greater independence",
          body: "Practical goals focused on mobility, function and everyday tasks that matter to you.",
        },
        {
          title: "Local and flexible",
          body: `Home and community visits across ${site.serviceAreas.region}, by appointment.`,
        },
      ],
    },
    about: {
      languagesList: site.languages.join(", "),
      qualificationLabels: site.qualifications.map((q) => q.label),
      qualificationValues: site.qualifications.map((q) => q.value),
      ahpraNotice: site.ahpraNotice,
      portraitAlt: "Jackson, Home Motion mobile physiotherapist, in a Home Motion polo",
    },
    photos: {
      sitToStandAlt: "Jackson coaching sit-to-stand practice at home during a physiotherapy visit",
      gaitAlt: "Jackson supporting standing and gait practice during a home physiotherapy visit",
    },
    mobileBar: { label: "Quick contact" },
    footer: {
      rights: site.footer.copyrightSuffix,
      privacy: site.footer.privacyLinkLabel,
    },
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
        answer: `沒有網上預約系統。請致電 Jackson，或電郵 ${site.publicEmail} 討論時間。服務時間為預約制。該郵箱仍在設置中，如未收到回覆請致電。`,
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
    email: "電郵",
    optional: "（選填）",
    requiredNote: "標有 * 的欄位必須填寫。",
    continue: "繼續",
    unavailableNotice: "本網站目前不會代為傳送電郵。您可先在此核對資料，然後致電 Jackson：",
    unavailableEmailLead: "或寫信至",
    unavailableTitle: "查詢尚未傳送",
    unavailableBody: "請致電 Jackson 進行查詢：",
    composeLead: "或開啟電郵程式寫信至",
    mailboxNote: "該郵箱仍在設置中，域名電郵尚未開通前可能收不到信件。",
    mailtoTitle: "正在開啟您的電郵程式",
    mailtoBody:
      "您的電郵程式應會開啟，並已填好查詢內容。請檢查後在電郵程式內按「傳送」。如沒有開啟，請致電 Jackson：",
    noscript: "網上查詢需要啟用 JavaScript。請致電 Jackson：",
    errorSummary: "部分資料需要修正，請檢查已標示的欄位。",
    errors: {
      nameRequired: "請輸入您的姓名。",
      phoneRequired: "請輸入電話號碼，方便 Jackson 回電。",
      phoneInvalid: "請輸入有效的電話號碼（最少 8 位數字）。",
      emailInvalid: "請輸入有效的電郵地址，或留空此欄。",
      messageRequired: "請簡述我們可以如何協助您。",
    },
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
  hm: {
    skipLink: "跳至主要內容",
    header: {
      primaryNav: "主要導覽",
      mobileNav: "流動版選單",
      menu: "選單",
      languageGroup: "語言",
      logoLabel: "Home Motion 主頁",
    },
    hero: {
      support:
        "為墨爾本東區提供以實證為本、切合個人需要的物理治療，助您活動得更好、保持獨立，享受日常生活。",
      chips: ["上門及社區探訪", "歡迎所有年齡人士", "NDIS 及私人客戶"],
      ahpra: "AHPRA 註冊物理治療師",
      photoAlt: "Jackson 上門提供物理治療，協助使用助行架進行步行練習",
    },
    services: {
      heading: "我們的服務",
      supporting: "支援您的活動能力、身體功能及獨立生活。",
      enquire: "查詢服務",
      cards: [
        { title: "上門物理治療", body: "在家中及社區提供一對一照護。" },
        { title: "活動能力及平衡", body: "提升日常活動時的安全感和信心。" },
        { title: "肌力及功能能力", body: "鍛鍊肌力，保持獨立生活。" },
        { title: "出院後康復", body: "支援您康復，重返日常生活。" },
        { title: "神經及殘疾相關物理治療", body: "按您的個人目標度身制定物理治療。" },
        { title: "家居運動計劃", body: "實用及個人化的運動計劃。" },
      ],
    },
    areas: {
      heading: "服務地區",
      lead: "為墨爾本東區提供上門及社區探訪",
      cardLabel: "Home Motion 聯絡卡",
      mapCaption: "東區服務範圍互動地圖 — 不顯示任何私人地址。",
      mapLabel: "服務地區地圖",
    },
    referrers: {
      heading: "轉介人士",
      lead: "我與家庭醫生、專科醫生及其他專職醫療人員合作，為共同服務的客戶提供及時、以目標為本的物理治療。",
      registration: "AHPRA 註冊物理治療師。",
      points: ["清晰溝通，定期匯報進度", "以目標為本、以客戶為中心的照護", "靈活及迅速回應的服務"],
      cta: "轉介資料",
    },
    how: {
      kicker: "服務流程",
      heading: "簡單、靈活，切合您的需要。",
      steps: [
        {
          title: "聯絡我們",
          body: "提出查詢，並告訴我們您所在的郊區、語言及需要。您會直接與 Jackson 溝通 — 並非電話中心。",
        },
        {
          title: "安排到訪",
          body: "我們會了解您的目標、地點及資助情況，如合適便安排上門或社區預約。",
        },
        {
          title: "個人化照護",
          body: "在您熟悉的環境接受評估並獲得實用計劃，之後的跟進亦由同一位物理治療師負責。",
        },
      ],
    },
    why: {
      kicker: "為何選擇 Home Motion",
      heading: "為何選擇 Home Motion？",
      intro:
        "我們在墨爾本東區的家居及社區提供一對一物理治療 — 重視清晰溝通和實際目標，並可使用英語、廣東話及普通話。與您溝通的人，就是為您提供治療的人。",
      items: [
        { title: "上門照護", body: "在您生活和活動的地方接受物理治療 — 無需前往診所。" },
        {
          title: "個人化方式",
          body: "查詢時您會直接與負責治療的物理治療師溝通 — 並非電話中心或輪更團隊。",
        },
        { title: "更獨立自主", body: "以活動能力、身體功能及對您重要的日常事務為實際目標。" },
        { title: "本地而靈活", body: "於墨爾本東區提供上門及社區探訪，需預約。" },
      ],
    },
    about: {
      languagesList: "英語、廣東話、普通話",
      qualificationLabels: ["物理治療資歷", "AHPRA 註冊", "專業保險"],
      qualificationValues: { "1": "已註冊", "2": "按執業要求投保" },
      ahpraNotice: "AHPRA 物理治療師註冊已獲批。Jackson 是 AHPRA 註冊物理治療師。",
      portraitAlt: "Home Motion 上門物理治療師 Jackson，身穿 Home Motion Polo 衫",
    },
    photos: {
      sitToStandAlt: "Jackson 在上門物理治療期間，於家中指導由坐到站的練習",
      gaitAlt: "Jackson 在上門物理治療期間，協助站立及步態練習",
    },
    mobileBar: { label: "快速聯絡" },
    footer: {
      rights: "版權所有。",
      privacy: "私隱政策（草稿）",
    },
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
        answer: `没有网上预约系统。请致电 Jackson，或发送邮件至 ${site.publicEmail} 讨论时间。服务时间为预约制。该邮箱仍在设置中，如未收到回复请致电。`,
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
    email: "电子邮箱",
    optional: "（选填）",
    requiredNote: "标有 * 的项目为必填项。",
    continue: "继续",
    unavailableNotice: "本网站目前不会代为发送邮件。您可以先在这里核对信息，然后致电 Jackson：",
    unavailableEmailLead: "或写信至",
    unavailableTitle: "咨询尚未发送",
    unavailableBody: "请致电 Jackson 进行咨询：",
    composeLead: "或打开邮件应用写信至",
    mailboxNote: "该邮箱仍在设置中，域名邮件尚未开通前可能收不到信件。",
    mailtoTitle: "正在打开您的邮件应用",
    mailtoBody:
      "您的邮件应用应会打开，并已填好咨询内容。请检查后在邮件应用中点击“发送”。如果没有打开，请致电 Jackson：",
    noscript: "在线咨询需要启用 JavaScript。请致电 Jackson：",
    errorSummary: "部分信息需要修改，请检查已标出的项目。",
    errors: {
      nameRequired: "请输入您的姓名。",
      phoneRequired: "请输入电话号码，方便 Jackson 回电。",
      phoneInvalid: "请输入有效的电话号码（至少 8 位数字）。",
      emailInvalid: "请输入有效的电子邮箱地址，或留空此项。",
      messageRequired: "请简要说明我们可以如何帮助您。",
    },
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
  hm: {
    skipLink: "跳到主要内容",
    header: {
      primaryNav: "主导航",
      mobileNav: "移动端菜单",
      menu: "菜单",
      languageGroup: "语言",
      logoLabel: "Home Motion 主页",
    },
    hero: {
      support:
        "为墨尔本东区提供循证、因人而异的物理治疗，帮助您活动得更好、保持独立，享受日常生活。",
      chips: ["上门及社区探访", "欢迎所有年龄人士", "NDIS 及私人客户"],
      ahpra: "AHPRA 注册物理治疗师",
      photoAlt: "Jackson 上门提供物理治疗，协助使用助行架进行步行练习",
    },
    services: {
      heading: "我们的服务",
      supporting: "支持您的活动能力、身体功能及独立生活。",
      enquire: "咨询服务",
      cards: [
        { title: "上门物理治疗", body: "在家中及社区提供一对一照护。" },
        { title: "活动能力与平衡", body: "提升日常活动时的安全感和信心。" },
        { title: "肌力与功能能力", body: "锻炼肌力，保持独立生活。" },
        { title: "出院后康复", body: "支持您康复，重返日常生活。" },
        { title: "神经及残障相关物理治疗", body: "根据您的个人目标量身定制物理治疗。" },
        { title: "居家运动计划", body: "实用且个性化的运动计划。" },
      ],
    },
    areas: {
      heading: "服务地区",
      lead: "为墨尔本东区提供上门及社区探访",
      cardLabel: "Home Motion 联系卡",
      mapCaption: "东区服务范围互动地图 — 不显示任何私人地址。",
      mapLabel: "服务地区地图",
    },
    referrers: {
      heading: "转介方",
      lead: "我与全科医生、专科医生及其他专职医疗人员合作，为共同服务的客户提供及时、以目标为导向的物理治疗。",
      registration: "AHPRA 注册物理治疗师。",
      points: ["清晰沟通，定期反馈进展", "以目标为导向、以客户为中心的照护", "灵活、及时响应的服务"],
      cta: "转介信息",
    },
    how: {
      kicker: "服务流程",
      heading: "简单、灵活，贴合您的需要。",
      steps: [
        {
          title: "联系我们",
          body: "提交咨询，并告诉我们您所在的郊区、语言及需要。您会直接与 Jackson 沟通 — 而不是呼叫中心。",
        },
        {
          title: "安排上门",
          body: "我们会了解您的目标、地点及资助情况，如合适便安排上门或社区预约。",
        },
        {
          title: "个性化照护",
          body: "在您熟悉的环境中接受评估并获得实用计划，后续跟进也由同一位物理治疗师负责。",
        },
      ],
    },
    why: {
      kicker: "为何选择 Home Motion",
      heading: "为何选择 Home Motion？",
      intro:
        "我们在墨尔本东区的居家及社区提供一对一物理治疗 — 注重清晰沟通和实际目标，并可使用英语、粤语及普通话。与您沟通的人，就是为您提供治疗的人。",
      items: [
        { title: "上门照护", body: "在您生活和活动的地方接受物理治疗 — 无需前往诊所。" },
        {
          title: "个性化方式",
          body: "咨询时您会直接与负责治疗的物理治疗师沟通 — 并非电话中心或轮更团队。",
        },
        { title: "更加独立", body: "以活动能力、身体功能及对您重要的日常事务为实际目标。" },
        { title: "本地且灵活", body: "在墨尔本东区提供上门及社区探访，需预约。" },
      ],
    },
    about: {
      languagesList: "英语、粤语、普通话",
      qualificationLabels: ["物理治疗资历", "AHPRA 注册", "专业保险"],
      qualificationValues: { "1": "已注册", "2": "按执业要求投保" },
      ahpraNotice: "AHPRA 物理治疗师注册已获批。Jackson 是 AHPRA 注册物理治疗师。",
      portraitAlt: "Home Motion 上门物理治疗师 Jackson，身穿 Home Motion Polo 衫",
    },
    photos: {
      sitToStandAlt: "Jackson 在上门物理治疗期间，在家中指导从坐到站的练习",
      gaitAlt: "Jackson 在上门物理治疗期间，协助站立及步态练习",
    },
    mobileBar: { label: "快速联系" },
    footer: {
      rights: "版权所有。",
      privacy: "隐私政策（草稿）",
    },
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
