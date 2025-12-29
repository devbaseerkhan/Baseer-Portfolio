import type {
  AchievementRecord,
  LogRecord,
  ProjectRecord,
} from "./contentTypes";

export const fallbackProjects: ProjectRecord[] = [
  {
    id: "arze-store",
    title: "Arze Store",
    category: "React Website",
    status: "done",
    summary:
      "Bold typography, smooth animations, and fast transitions across the product story.",
    description:
      "Boosted the product story with bold typography, delightful animations, and ultra-fast page transitions.",
    published: "Published 3 months ago",
    tech_stack: ["Next.js", "React", "TypeScript", "JS", "Git"],
    image_url:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23ff5f6d'/><stop offset='100%' stop-color='%23ffc371'/></linearGradient></defs><rect width='1600' height='900' fill='url(%23g)'/><circle cx='420' cy='280' r='160' fill='rgba(255,255,255,0.22)'/><rect x='560' y='380' rx='32' ry='32' width='540' height='240' fill='rgba(0,0,0,0.35)'/></svg>",
    live_url: "#",
    brief: "One sentence explanation for what the project is.",
    about:
      "The team encountered challenges including unexpected system crashes, hardware malfunctions, and compatibility issues.",
    files: [
      { name: "homepage.jpg", size: "231kB" },
      { name: "archive view.jpg", size: "231kB" },
      { name: "user-facing part.jpg", size: "231kB" },
      { name: "dashboard home view.jpg", size: "231kB" },
    ],
    order_index: 1,
  },
  {
    id: "vermillion",
    title: "Vermillion Fashion",
    category: "React Website",
    status: "in_progress",
    summary: "Editorial layout with immersive color theming.",
    description:
      "Editorial-inspired layout with layered imagery, silky scrolling, and immersive color theming.",
    published: "Published 3 months ago",
    tech_stack: ["Next.js", "React", "TypeScript", "CSS", "Git"],
    image_url:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'><defs><linearGradient id='g2' x1='10%' y1='0%' x2='90%' y2='100%'><stop offset='0%' stop-color='%2304040c'/><stop offset='50%' stop-color='%23232038'/><stop offset='100%' stop-color='%23b53b4f'/></linearGradient></defs><rect width='1600' height='900' fill='url(%23g2)'/><rect x='180' y='220' width='1240' height='460' fill='rgba(255,255,255,0.08)'/><text x='280' y='480' fill='%23f05f69' font-size='180' font-family='Arial Black'>VERMILLION</text></svg>",
    live_url: "#",
    brief: "Blends editorial layout with immersive color theming and bold typography.",
    about:
      "Curated a fashion-first commerce experience with layered imagery, silky scrolling, and expressive copy to tell the brand story.",
    files: [
      { name: "hero.jpg", size: "180kB" },
      { name: "lookbook.jpg", size: "210kB" },
      { name: "checkout.jpg", size: "160kB" },
    ],
    order_index: 2,
  },
  {
    id: "thunderfoot",
    title: "Thunderfoot Studio",
    category: "React Website",
    status: "done",
    summary: "Modular studio site with CMS-driven sections and glassy device mocks.",
    description:
      "Crafted a modular portfolio with CMS-driven sections, device mocks, and crisp glassmorphism.",
    published: "Published 3 months ago",
    tech_stack: ["Next.js", "React", "TypeScript", "GSAP", "Git"],
    image_url:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'><defs><linearGradient id='g3' x1='0%' y1='0%' x2='100%' y2='0%'><stop offset='0%' stop-color='%23222'/><stop offset='50%' stop-color='%23454545'/><stop offset='100%' stop-color='%23707070'/></linearGradient></defs><rect width='1600' height='900' fill='url(%23g3)'/><rect x='280' y='210' width='1040' height='480' rx='24' fill='rgba(0,0,0,0.45)'/><rect x='340' y='260' width='480' height='320' rx='18' fill='rgba(255,255,255,0.06)'/><rect x='860' y='340' width='240' height='180' rx='12' fill='rgba(255,255,255,0.08)'/></svg>",
    live_url: "#",
    brief: "Modular studio site with CMS-driven sections and glassy device mocks.",
    about:
      "Built a modular studio experience with CMS-driven case studies, layered glassmorphism panels, and device mockups.",
    files: [
      { name: "landing.jpg", size: "240kB" },
      { name: "studio-grid.jpg", size: "210kB" },
      { name: "case-study.jpg", size: "220kB" },
    ],
    order_index: 3,
  },
  {
    id: "spectra",
    title: "Spectra Dashboard",
    category: "React Website",
    status: "current",
    summary: "Data-dense dashboard with micro-interactions and live theming.",
    description:
      "Data-dense control panel with micro-interactions, real-time theming, and resilient responsive grids.",
    published: "Published 1 month ago",
    tech_stack: ["Next.js", "React", "TypeScript", "Tailwind", "Git"],
    image_url:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'><defs><linearGradient id='g4' x1='0%' y1='0%' x2='0%' y2='100%'><stop offset='0%' stop-color='%23142a3b'/><stop offset='100%' stop-color='%23070f18'/></linearGradient></defs><rect width='1600' height='900' fill='url(%23g4)'/><rect x='220' y='220' width='1160' height='460' rx='28' fill='rgba(255,255,255,0.04)'/><rect x='280' y='280' width='380' height='140' rx='14' fill='rgba(111,199,255,0.18)'/><rect x='700' y='280' width='540' height='320' rx='18' fill='rgba(255,255,255,0.08)'/></svg>",
    live_url: "#",
    brief: "Data-dense dashboard with micro-interactions and live theming.",
    about:
      "Responsive grids, live theming, and micro-interactions that keep controls feeling tactile.",
    files: [
      { name: "overview.jpg", size: "200kB" },
      { name: "controls.jpg", size: "190kB" },
      { name: "reports.jpg", size: "210kB" },
    ],
    order_index: 4,
  },
];

export const fallbackAchievements: AchievementRecord[] = [
  {
    id: "legendary-stars",
    title: "1000 stars on my project",
    status: "achieved",
    rarity: "legendary",
    achieved_on: "14 / 02 / 2022",
    description:
      "I have contributed to Gutenberg, Moment.js and React repositories in GitHub.",
    order_index: 1,
  },
  {
    id: "personal-website",
    title: "Release personal website",
    status: "achieved",
    rarity: "epic",
    achieved_on: "14 / 02 / 2022",
    description:
      "The site you are looking at right now — yes, I did it! And it took me a few months.",
    order_index: 2,
  },
  {
    id: "oss-plugin",
    title: "Developed my open source plugin",
    status: "achieved",
    rarity: "rare",
    description: "Created a JS library for managing absolute positioned elements.",
    order_index: 3,
  },
  {
    id: "markup-master",
    title: "Master of markup",
    status: "achieved",
    rarity: "epic",
    description:
      "Ship semantic, accessible HTML paired with efficient styling systems.",
    order_index: 4,
  },
  {
    id: "speed-demon",
    title: '"Speed demon"',
    status: "in_progress",
    rarity: "rare",
    description: "Make builds, bundles, and runtime interactions feel instant.",
    order_index: 5,
  },
  {
    id: "pixel-perfect-1",
    title: "Pixel-perfect perfectionist",
    status: "achieved",
    rarity: "epic",
    description: "Match comps to the pixel while preserving responsive sanity.",
    order_index: 6,
  },
  {
    id: "accessibility",
    title: "Accessibility advocate",
    status: "todo",
    rarity: "uncommon",
    description: "AA+ compliance, full keyboard flows, screen reader parity.",
    order_index: 7,
  },
  {
    id: "browser-compat",
    title: '"Browser compatibility"',
    status: "in_progress",
    rarity: "rare",
    description: "Polyfills, graceful degradation, and evergreen builds.",
    order_index: 8,
  },
  {
    id: "worth-noting",
    title: "Additional worth noting event",
    status: "todo",
    rarity: "uncommon",
    description: "Queued milestone in the next sprint cycle.",
    order_index: 9,
  },
  {
    id: "code-quality",
    title: "Code quality guardian",
    status: "in_progress",
    rarity: "rare",
    description: "Static analysis, linting, testing, and DX guardrails.",
    order_index: 10,
  },
  {
    id: "milestone",
    title: "Another awesome milestone",
    status: "achieved",
    rarity: "epic",
    achieved_on: "14 / 02 / 2022",
    description: "Another major project landed with polish.",
    order_index: 11,
  },
];

export const fallbackLogs: LogRecord[] = [
  {
    id: "log-latest",
    title: "Log Entry: Project Development Update",
    body: "The development team has been working tirelessly on the latest iteration of the project. Significant progress has been made in the areas of neural interface integration, machine learning algorithms, and quantum computing.\n\nThe team has encountered several challenges during the development process, including unexpected system crashes, hardware malfunctions, and unanticipated compatibility issues across new device drivers.\n\nNext steps include further testing, tuning the ML models, and tightening the integration with new device drivers.",
    tag: "progress",
    location: "Research Facility, Planet X-17",
    status: "In Development",
    published_at: "2007-04-25",
    project: "Arze Store",
  },
  {
    id: "log-previous-1",
    title: "Log Entry: New Project Started",
    body: "Kickoff with initial planning and setup.",
    tag: "note",
    location: "Remote",
    status: "Initiated",
    published_at: "2007-04-20",
    project: "Vermillion Fashion",
  },
  {
    id: "log-previous-2",
    title: "Log Entry: Visual Updates",
    body: "Updated UI polish and theme adjustments.",
    tag: "design",
    location: "Remote",
    status: "In Progress",
    published_at: "2007-04-18",
    project: "Thunderfoot Studio",
  },
];
