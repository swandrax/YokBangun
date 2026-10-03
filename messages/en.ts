import type { Messages } from "./id";

/**
 * English (B2) — plain, conversational, and specific.
 * Must mirror messages/id.ts; the `Messages` type keeps the shapes in sync.
 */
const en: Messages = {
  meta: {
    siteTitle: "yokBangun — Digital Product, AI & Maintenance Services",
    siteDescription:
      "yokBangun builds digital products, practical AI services, integrations, and maintenance for small and growing businesses, communities, and sector-specific organisations in Indonesia.",
    pages: {
      services: {
        title: "Services",
        description:
          "Digital products, practical AI, maintenance, and integration for businesses and organisations that want to work in a more organised way.",
      },
      aiServices: {
        title: "AI Services",
        description:
          "AI for information search, customer support, document processing, and workflow automation, used only where it genuinely helps.",
      },
      products: {
        title: "Products",
        description:
          "Digital products we are developing for small businesses, cooperatives, resident services, and service businesses, with an honest status for each.",
      },
      sectors: {
        title: "Sector Solutions",
        description:
          "Digital solutions for small businesses, home businesses, cooperatives, neighbourhood associations, villages, districts, communities, education, and health services.",
      },
      work: {
        title: "Work & Case Studies",
        description:
          "How we approach a problem: the starting point, what we build, the technology we use, and the outcome we aim for.",
      },
      partnership: {
        title: "Partnership",
        description:
          "yokBangun is open to product collaboration, technology integration, sector implementation, applied research, and long-term growth partnerships.",
      },
      about: {
        title: "About",
        description:
          "yokBangun is a digital product and service company from Indonesia. growth with u: we build, maintain, and grow digital products together with our clients.",
      },
      contact: {
        title: "Discuss Your Project",
        description: "Tell us what you are trying to build. We can help define what should be built first.",
      },
      technical: {
        title: "Technical Notes",
        description:
          "How yokBangun builds, runs, and maintains digital products: stack, security, deployment, and AI practices.",
      },
    },
  },

  common: {
    skipToContent: "Skip to main content",
    homeLabel: "yokBangun, back to home",
    menu: "Menu",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    mainNav: "Main navigation",
    languageLabel: "Choose language",
    learnMore: "Learn more",
    seeAll: "See all",
    breadcrumbHome: "Home",
    breadcrumbLabel: "Breadcrumb",
    required: "required",
    optional: "optional",
    scrollHint: "Scroll to see more sectors",
    previous: "Previous",
    next: "Next",
  },

  nav: {
    home: "Home",
    services: "Services",
    aiServices: "AI Services",
    products: "Products",
    sectors: "Sectors",
    work: "Work",
    partnership: "Partnership",
    about: "About",
    contact: "Contact",
    technical: "Technical Notes",
    cta: "Discuss Your Project",
  },

  hero: {
    eyebrow: "Digital Products · AI Services · Maintenance · Sector Solutions",
    titleLead: "Build better digital products.",
    titleAccent: "Grow with the right support.",
    description:
      "yokBangun helps small and growing businesses build digital products, practical AI services, and systems that can improve as their business grows.",
    primaryCta: "Discuss Your Project",
    secondaryCta: "Explore Services",
    graphic: {
      label:
        "Diagram of how yokBangun works: starting from business needs, a product is built, run together with data and AI, maintained, and then keeps growing.",
      stagesLabel: "Stages",
      center: "growth with u",
      nodes: {
        business: "Business",
        product: "Digital Product",
        customer: "Customer",
        ai: "AI",
        data: "Data",
        operations: "Operations",
        maintenance: "Maintenance",
        growth: "Growth",
      },
      stages: [
        { key: "business", label: "Business", description: "Start from what the business needs and how it works." },
        { key: "build", label: "Build", description: "A digital product used by customers and the team." },
        { key: "operate", label: "Operate", description: "Operations, data, and AI working together." },
        { key: "improve", label: "Improve", description: "Kept stable and improved over time." },
        { key: "grow", label: "Grow", description: "Extended as the business grows." },
      ],
    },
  },

  positioning: {
    label: "How we work, in short",
    items: [
      "For businesses without their own tech team",
      "Built step by step, starting with what matters most",
      "Still supported after launch",
      "Familiar with how Indonesian businesses and organisations work",
    ],
  },

  whatWeBuild: {
    eyebrow: "What we build",
    title: "Four kinds of work, one team from first build to long-term care.",
    description:
      "Some clients come to us for their first website. Others need help tidying up an application that is already running. We match the work to where your business is right now.",
    categories: [
      {
        key: "digital-products",
        title: "Digital Products",
        description: "Digital products built around business operations, users, and the current stage of growth.",
        items: [
          "Company profile website",
          "Landing page",
          "Customer & service portals",
          "Internal dashboard",
          "Business management application",
          "Product catalogue",
          "Booking system",
          "Community platform",
          "Resident service portal (civicGov)",
          "API-connected applications",
          "Mobile-ready web application",
        ],
      },
      {
        key: "ai-services",
        title: "AI Services",
        description: "Assistants, document search, and automation, added only to the parts of the work that actually benefit.",
        items: [
          "Business AI assistant",
          "Customer FAQ assistant",
          "AI search for company documents",
          "Internal knowledge assistant",
          "Workflow automation",
          "Document classification",
          "Text summarisation",
          "Product information assistant",
          "AI API integration",
          "Hand-over to a human agent",
        ],
      },
      {
        key: "maintenance",
        title: "Product & Maintenance",
        description:
          "A digital product does not stop after launch. We help maintain, improve, and extend it as the business changes.",
        items: [
          "Application maintenance",
          "Bug fixing",
          "Dependency & security updates",
          "Performance improvement",
          "Backup review",
          "Monitoring",
          "API maintenance",
          "Feature iteration & UI improvements",
          "Content updates",
          "Technical support",
        ],
      },
      {
        key: "integration",
        title: "Integration & Digital Operations",
        description:
          "Connecting the systems you already use (payments, data, external services) so work doesn't get recorded twice.",
        items: [
          "API integration",
          "Payment integration",
          "Data integration",
          "Internal systems",
          "Business workflow digitisation",
          "External service integration",
          "Basic data dashboards",
          "Database-backed applications",
        ],
      },
    ],
  },

  ai: {
    eyebrow: "AI Services",
    title: "Practical AI for real work.",
    description:
      "We integrate AI where it can genuinely help the work, including information search, customer support, document processing, and workflow automation.",
    useCasesTitle: "Where it helps",
    useCases: [
      {
        title: "Customer FAQ assistant",
        description:
          "Answers repeated questions on your website or WhatsApp, and hands over to a person when the question goes beyond what it knows.",
      },
      {
        title: "Company document search",
        description: "Finds answers in SOPs, catalogues, or internal archives without opening files one by one.",
      },
      {
        title: "Document sorting & summaries",
        description: "Groups letters, reports, or complaints, then writes short summaries for a staff member to review.",
      },
      {
        title: "Product information assistant",
        description: "Helps customers find the right product or service, based on your own catalogue data.",
      },
      {
        title: "Workflow automation",
        description: "Cuts repetitive steps such as data entry, reminders, and drafting replies.",
      },
      {
        title: "AI API integration",
        description: "Connects AI models to applications you already run, with clear limits on access and cost.",
      },
    ],
    principlesTitle: "How we use AI",
    principles: [
      { title: "Start with the problem, not the model.", description: "We first look at which part of the work takes time, and whether AI really helps there." },
      { title: "A person can always step in.", description: "Every assistant has a hand-over path to staff, and important decisions stay with people." },
      { title: "Answers come from your data.", description: "Assistants answer from the documents you provide, and the source can be checked." },
      { title: "If a simple rule does the job, we won't force AI into it.", description: "A clear form or ordinary automation is often cheaper and more reliable." },
    ],
    cta: "Explore AI Services",
  },

  maintenance: {
    eyebrow: "Product & Maintenance Services",
    title: "A digital product does not stop after launch.",
    description:
      "We help maintain, improve, and extend it as the business changes. That's what growth with u means to us: we don't hand over an app and disappear.",
    stepsLabel: "After launch",
    steps: [
      { title: "Monitor", description: "We watch errors, load times, and uptime so problems show up before users complain." },
      { title: "Fix", description: "We fix bugs, update dependencies, and close security gaps on a regular schedule." },
      { title: "Look after", description: "We review backups, keep APIs running, and update content when needed." },
      { title: "Improve", description: "We add features and refine the interface based on how the product is really used." },
    ],
    includesTitle: "What maintenance includes",
    includes: [
      "Application maintenance",
      "Bug fixing",
      "Dependency updates",
      "Security updates",
      "Performance improvement",
      "Backup review",
      "Monitoring",
      "API maintenance",
      "Feature iteration",
      "UI improvements",
      "Content updates",
      "Technical support",
    ],
    takeover: "We can also take over products built by other teams, after an initial review of the code and infrastructure.",
    cta: "Discuss Maintenance",
  },

  sectors: {
    eyebrow: "Sector Solutions",
    title: "Every sector has different problems. That's where we start.",
    description:
      "Each sector works in its own way. Here are problems we often see, the modules we usually recommend, and the outcome we aim for.",
    labels: {
      problem: "Common problem",
      solution: "Recommended module",
      outcome: "Example outcome we aim for",
    },
    outcomeNote:
      "These are goals, not measured results. Every implementation is measured against its own starting point.",
    viewAll: "See all sectors",
    items: [
      {
        key: "umkm",
        name: "Small businesses (UMKM)",
        tag: "",
        summary:
          "Websites, digital catalogues, simple operations, and automation that help small businesses work better and become easier to discover.",
        problem: "Products are hard to find, and daily operations are spread across chats, spreadsheets, and handwritten notes.",
        solution: "Website, product catalogue, simple dashboard, WhatsApp integration, and operational automation.",
        outcome: "Customers find products more easily, and orders are recorded in one place.",
      },
      {
        key: "home-business",
        name: "Home businesses",
        tag: "",
        summary: "A light catalogue and order log, without having to learn a complicated system.",
        problem: "Orders arrive through personal chats, stock and payments are noted loosely, and it's hard to separate from household matters.",
        solution: "A simple catalogue, order form, and lightweight stock and payment records.",
        outcome: "Owners can see orders and income without scrolling through many conversations.",
      },
      {
        key: "koperasi",
        name: "Cooperatives (Koperasi)",
        tag: "",
        summary: "Member, savings, and loan records kept tidy, and members can check their own data.",
        problem: "Member, savings, and loan data still live in ledgers or spreadsheets held by one or two officers.",
        solution: "Member records, savings and loan tracking, periodic reports, and member access to check balances.",
        outcome: "Reports take less time to prepare, and members can check their own records.",
      },
      {
        key: "rt-rw",
        name: "Neighbourhood associations (RT/RW)",
        tag: "civicGov",
        summary: "Announcements, dues, and cover-letter requests that no longer get lost in group chats.",
        problem: "Announcements get buried in WhatsApp groups, dues are recorded by hand, and letter requests need an in-person visit.",
        solution: "Resident portal, announcements, dues records, and a letter-request workflow.",
        outcome: "Residents know the status of their requests, and officers stop answering the same questions again and again.",
      },
      {
        key: "desa-kelurahan",
        name: "Villages & urban wards",
        tag: "civicGov",
        summary: "Administrative services, resident information, and complaints that are recorded and trackable.",
        problem: "Administrative services, population data, and complaints are handled separately, so they are hard to track.",
        solution: "Resident information portal, letter request workflow, service status tracking, complaints channel, and document templates.",
        outcome: "Requests and complaints are recorded properly, with a status residents can see.",
      },
      {
        key: "kecamatan",
        name: "Sub-districts (Kecamatan)",
        tag: "civicGov",
        summary: "Cross-village data summaries with a consistent reporting format.",
        problem: "Reports from many villages arrive in different formats and are re-compiled by hand.",
        solution: "Area data dashboard, standard reporting forms, and administrative follow-up tracking.",
        outcome: "Cross-area summaries no longer start from zero every period.",
      },
      {
        key: "komunitas",
        name: "Resident communities",
        tag: "",
        summary: "Activities, members, and community funds that stay on record when the committee changes.",
        problem: "Activities, membership, and community funds are scattered across chats, forms, and officers' personal notes.",
        solution: "Community platform, event registration, member records, and simple cash reports.",
        outcome: "New officers can continue the work without losing earlier records.",
      },
      {
        key: "pendidikan",
        name: "Education",
        tag: "",
        summary: "School information, admissions, and parent communication from one clear source.",
        problem: "School information, admissions, and communication with parents still rely on paper and group chats.",
        solution: "School website, online admissions, parent information portal, and internal document search.",
        outcome: "Parents get information from one clear source.",
      },
      {
        key: "kesehatan",
        name: "Health services",
        tag: "",
        summary: "Schedules, queues, and service information people can check before they arrive.",
        problem: "Queues, service schedules, and information for patients or residents are hard to access before visiting.",
        solution: "Booking and queue system, service information, schedule reminders, and a simple service dashboard.",
        outcome: "Patients know the schedule before they come, and staff have a clearer list of visits.",
      },
      {
        key: "usaha-desa",
        name: "Village small businesses",
        tag: "",
        summary: "An online shopfront for village products that can be shared with buyers outside the area.",
        problem: "Village products are hard to sell outside the area, and business records aren't well organised yet.",
        solution: "Village product catalogue, order page, sales records, and payment integration.",
        outcome: "Village products have a shopfront that can be shared with buyers from other areas.",
      },
      {
        key: "jasa",
        name: "Service businesses",
        tag: "",
        summary: "Bookings, schedules, and customer follow-ups that don't slip through the cracks.",
        problem: "Schedules, bookings, and follow-ups are handled by phone and chat, so things are easily missed.",
        solution: "Booking system, customer portal, automatic reminders, and an FAQ assistant.",
        outcome: "Fewer missed or double-booked appointments.",
      },
      {
        key: "menengah",
        name: "Growing medium-sized businesses",
        tag: "",
        summary: "Connected systems and older applications that stay well maintained.",
        problem: "There are more and more systems, data isn't connected, and the internal team struggles to maintain older applications.",
        solution: "Internal dashboard, system integration, application maintenance, and workflow automation.",
        outcome: "The team can focus on operations instead of copying data between apps.",
      },
    ],
    civicGov: {
      eyebrow: "Sector category",
      title: "civicGov",
      description:
        "civicGov is our solution category for neighbourhood associations, villages, urban wards, and sub-districts. It focuses on everyday resident services: information, letters, complaints, and local data.",
      capabilitiesTitle: "Capabilities we can set up",
      capabilities: [
        "Resident information portal",
        "Letter request workflow",
        "Community announcements",
        "Complaint and report workflow",
        "Administration tracking",
        "Local data dashboard",
        "Service request status",
        "Document templates",
      ],
      disclaimer:
        "civicGov is not an official government system. Each implementation follows local regulations and can be connected to official systems where permitted.",
    },
  },

  process: {
    eyebrow: "How we work",
    title: "Step by step, out in the open, and still here after launch.",
    description: "No single process fits every project. But the way we think it through usually follows this order.",
    steps: [
      { key: "understand", title: "Understand", description: "We start with how your business runs, who uses it, and the problem that really needs solving." },
      { key: "define", title: "Define", description: "We agree on the most sensible first version to build." },
      { key: "build", title: "Build", description: "We build and test the product in small, reviewable steps." },
      { key: "launch", title: "Launch", description: "We prepare deployment and real-world use." },
      { key: "maintain", title: "Maintain", description: "We keep the product stable and relevant after launch." },
      { key: "grow", title: "Grow", description: "We add improvements based on real needs and real usage." },
    ],
  },

  work: {
    eyebrow: "Work & Case Studies",
    title: "From the first problem to what we built.",
    description:
      "Every case study follows the same order: the starting point, what we built, the technology used, the outcome, and where it stands now.",
    illustrativeNote:
      "For now, case studies are shown as illustrative scenarios. Client case studies will be published once each client has given permission.",
    labels: {
      sector: "Sector",
      problem: "Problem",
      built: "What we built",
      technology: "Technology",
      outcome: "Outcome",
      intendedOutcome: "Intended outcome",
      status: "Current status",
    },
    filterLabel: "Filter by sector",
    filterAll: "All",
    empty: "No case studies for this sector yet.",
    loading: "Loading case studies…",
    error: "Case studies couldn't be loaded. Please refresh the page.",
    cta: "See all work",
  },

  products: {
    eyebrow: "Products",
    title: "Products we are developing.",
    description:
      "Besides custom projects, we are preparing a few ready-to-use products for needs that come up often. We describe their status as it really is.",
    labels: {
      forWhom: "For whom",
      problem: "Problem solved",
      capabilities: "Main capabilities",
      status: "Status",
    },
    filterLabel: "Filter by status",
    filterAll: "All",
    loading: "Loading products…",
    error: "Products couldn't be loaded. Please refresh the page.",
    empty: "No products with this status yet.",
    legendTitle: "What the statuses mean",
    cta: "See all products",
  },

  status: {
    concept: { label: "Concept", description: "Still being designed and validated." },
    prototype: { label: "Prototype", description: "Can be tried in a limited way for discussion and testing." },
    pilot: { label: "Pilot", description: "Being tested with real users on a small scale." },
    active: { label: "Active", description: "In use and still being developed." },
    maintenance: { label: "Maintenance", description: "Stable and maintained on a regular schedule." },
    illustrative: { label: "Illustrative scenario", description: "An example approach, not a published client project." },
  },

  partnership: {
    eyebrow: "Partnership & Growth",
    title: "Growing further with the right partners.",
    description:
      "yokBangun is open to product collaboration, technology integration, sector implementation, applied research, and long-term growth partnerships.",
    types: [
      { key: "technology", title: "Technology partners", description: "Platform, API, payment, or infrastructure providers who want their products used more widely by small businesses and organisations." },
      { key: "business", title: "Business partners", description: "Agencies, consultants, or service providers who need a product and maintenance team for their clients." },
      { key: "community", title: "Community partners", description: "Communities, associations, and small-business mentors who want their members to be more digitally ready." },
      { key: "institution", title: "Institutions", description: "Education, health, or public-service organisations that need a sector-specific implementation." },
      { key: "research", title: "Research collaborations", description: "Applied research with universities or institutes, especially on digital and AI adoption in small businesses." },
      { key: "investor", title: "Potential investors", description: "We're open to conversations with people interested in the long-term growth of digital products for small businesses and resident services." },
    ],
    cta: "Explore Partnership",
    altCta: "Start a Conversation",
    howTitle: "How a collaboration usually works",
    how: [
      { title: "Introduction", description: "We get to know each other's goals, strengths, and limits." },
      { title: "First scope", description: "We agree on one small collaboration with a clear result." },
      { title: "Test together", description: "We run that collaboration and review it openly." },
      { title: "Continue", description: "If it works, we expand the partnership step by step." },
    ],
    form: {
      title: "Tell us about the collaboration you have in mind",
      name: "Name",
      organisation: "Organisation",
      email: "Email",
      type: "Partnership type",
      typePlaceholder: "Choose a partnership type",
      message: "What would you like to collaborate on?",
      messagePlaceholder: "Tell us briefly about your organisation and the idea.",
      submit: "Send",
      submitting: "Sending…",
      success: "Thank you. We've received your message and will reply to the email address you gave us.",
      error: "Your message wasn't sent. Please check your connection and try again.",
    },
  },

  why: {
    eyebrow: "Why yokBangun",
    title: "What we look after in every project.",
    reasons: [
      { title: "Still here after launch", description: "Maintenance and further development are part of how we work, not an extra at the end." },
      { title: "Start with a sensible first version", description: "We don't build everything at once. The first version focuses on the most important problem." },
      { title: "Plain language", description: "We explain technical decisions in everyday language, so you can take part in them." },
      { title: "Your code and data stay yours", description: "Accounts, code, and data are registered in your name, with handover documentation." },
      { title: "AI only when it helps", description: "We suggest AI when it really reduces work, not because everyone is talking about it." },
      { title: "We know the local context", description: "Customers who prefer WhatsApp, QRIS payments, RT/RW structures. We design for how things actually work here." },
    ],
  },

  contact: {
    eyebrow: "Discuss Your Project",
    title: "Tell us what you are trying to build.",
    description:
      "You don't need a full brief. Tell us where your business is now, and we can help define what should be built first.",
    afterTitle: "After you send a message",
    after: [
      "We read your message and reply, with follow-up questions if needed.",
      "A short online call to understand your needs and current situation.",
      "A suggested first step, including a rough scope.",
    ],
    directTitle: "Direct contact",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    form: {
      name: "Name",
      organisation: "Business / Organisation",
      email: "Email",
      whatsapp: "WhatsApp",
      whatsappHint: "For example: 0812xxxxxxx or +62812xxxxxxx",
      sector: "Sector",
      sectorPlaceholder: "Choose a sector",
      sectorOther: "Other",
      need: "What do you need?",
      needPlaceholder: "For example: we want customer orders to stop being spread across many chats.",
      stage: "Project stage",
      stages: [
        { value: "exploring", label: "Just exploring" },
        { value: "planning", label: "Planning" },
        { value: "has-product", label: "Already have a product" },
        { value: "maintenance", label: "Need maintenance" },
        { value: "ai", label: "Need AI integration" },
        { value: "partner", label: "Need a partner" },
      ],
      submit: "Send message",
      submitting: "Sending…",
      success: "Thank you. We've received your message and will reply by email or WhatsApp.",
      error: "Your message wasn't sent. Please check your connection and try again.",
      privacy: "We only use your details to reply to this message.",
      errorSummary: "A few fields need your attention.",
    },
  },

  validation: {
    required: "Please fill in this field.",
    email: "Please enter a valid email address.",
    whatsapp: "Please enter a valid WhatsApp number.",
    tooShort: "Please tell us a little more (at least 10 characters).",
    tooLong: "This is too long.",
    choose: "Please choose one option.",
  },

  footer: {
    description:
      "To become a practical digital partner that helps businesses and organisations build useful digital products, services, and operations that can grow over time.",
    servicesTitle: "Services",
    companyTitle: "Company",
    contactTitle: "Contact",
    contactText: "Tell us what you need through the form. We'll get back to you as soon as we can.",
    rights: "All rights reserved.",
    madeIn: "Built in Indonesia.",
  },

  about: {
    eyebrow: "About yokBangun",
    title: "A digital product and service company for businesses that keep growing.",
    intro:
      "yokBangun builds digital products and services for businesses, organisations, and service companies, especially those that need technology but don't have their own tech team.",
    visionTitle: "Vision",
    vision:
      "To become a practical digital partner that helps businesses and organisations build useful digital products, services, and operations that can grow over time.",
    meaningTitle: "What growth with u means",
    meaning: [
      "Many digital products stop growing once they are handed over. The website isn't updated, bugs are left alone, and the app is slowly abandoned.",
      "We want to work differently. We build, maintain, improve, and grow the product together with our clients, as their business changes.",
    ],
    illustrationAlt:
      "Illustration of an Indonesian neighbourhood street with a small shop, a cooperative office, a health post, a school, and a community hall, with residents going about their day.",
    purposeTitle: "What we do",
    purposes: [
      { title: "Build practical digital products", description: "For businesses that need technology but don't have a large tech team." },
      { title: "Maintain and improve after launch", description: "Ongoing maintenance and improvement, so the product stays useful." },
      { title: "Bring in AI when it actually helps", description: "For repetitive work, information search, and services that need to be easier to run." },
    ],
    audienceTitle: "Who we work with",
    audience:
      "Small and home businesses, growing medium-sized businesses, cooperatives, neighbourhood associations, villages and urban wards, sub-districts, resident communities, schools, health services, village businesses, and service companies.",
    cta: "Discuss Your Project",
  },

  servicesPage: {
    eyebrow: "Services",
    title: "What we can build and look after for you.",
    description:
      "Four connected service areas. You can start with one and add others when you need them.",
    scopeTitle: "How we decide the scope",
    scope: [
      "We ask about your business process and users first, then talk about features.",
      "The first version is small enough to use and review quickly.",
      "We talk about maintenance costs from the start, not after the product is finished.",
    ],
  },

  aiPage: {
    notPromiseTitle: "What we don't promise",
    notPromise: [
      "AI is not always right. We design review steps and limits instead of assuming every answer is correct.",
      "AI doesn't replace your team. It helps with repetitive work so people can focus on decisions that need judgement.",
      "Not every problem needs AI. Sometimes a better form is enough.",
    ],
    approachTitle: "How an AI project runs",
    approach: [
      { title: "Check the need", description: "Make sure AI really helps, and decide how to measure it." },
      { title: "Prepare the data", description: "Tidy up the documents and data the answers will come from." },
      { title: "Test small", description: "Try it with real users in a limited scope." },
      { title: "Monitor", description: "Track answer quality, cost, and cases that need a person." },
    ],
  },

  technical: {
    eyebrow: "Technical Notes",
    title: "Technical details for IT teams and partners.",
    description:
      "This page is for readers who want to know how we build and run products. If you're a business owner, the rest of the site covers what you need.",
    sections: [
      {
        title: "Our usual stack",
        items: [
          "Frontend: Next.js, React, TypeScript",
          "Backend: Node.js-based APIs or services you already use",
          "Database: PostgreSQL for operational data",
          "Integration: REST APIs, webhooks, payment gateways, WhatsApp Business API",
        ],
      },
      {
        title: "Deployment & infrastructure",
        items: [
          "Vercel or Cloudflare for web applications, chosen by need and cost",
          "Preview deployments for every change before it reaches production",
          "Provider-specific configuration kept separate so the app can move",
          "Domains, accounts, and credentials registered in the client's name",
        ],
      },
      {
        title: "Security & maintenance",
        items: [
          "Regular dependency updates and security patches",
          "Scheduled backups and restore testing",
          "Role-based access control for internal dashboards",
          "Error and uptime monitoring",
        ],
      },
      {
        title: "AI practices",
        items: [
          "Retrieval from client documents, with traceable sources",
          "Conversation logging for quality review, with consent",
          "Cost limits and rate limits per application",
          "Hand-over path to a human agent",
        ],
      },
      {
        title: "Handover",
        items: [
          "Technical documentation and user guides",
          "Code repository in the client's organisation account",
          "Architecture notes and a list of integrations",
        ],
      },
    ],
  },

  notFound: {
    title: "Page not found.",
    description: "The page you're looking for may have moved, or the address may have a typo.",
    cta: "Back to home",
  },
};

export default en;
