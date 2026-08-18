export type Project = {
  name: string;
  role: string;
  blurb: string;
  href?: string;
  hrefLabel: string;
  stack: string[];
  accent: string;
  image?: string;
  imageAlt?: string;
  note?: string;
};

/** Newest / most recent enterprise work first */
export const projects: Project[] = [
  {
    name: "Caesars",
    role: "Director of Engineering · Caesars Entertainment",
    blurb: "Guest experiences across bookings, Rewards, and destinations.",
    href: "https://www.caesars.com/",
    hrefLabel: "caesars.com",
    stack: ["React", "AEP", "Personalization"],
    accent: "#8B1E2D",
    image: "/work/caesars.png",
    imageAlt: "Caesars Rewards homepage with Sportsbook hero",
  },
  {
    name: "LinkedIn Careers",
    role: "Solution Architect · Hoodoo Digital",
    blurb: "Mission storytelling and job discovery for LinkedIn talent.",
    href: "https://careers.linkedin.com/",
    hrefLabel: "careers.linkedin.com",
    stack: ["AEM", "React"],
    accent: "#0A66C2",
    image: "/work/linkedin-careers.png",
    imageAlt: "LinkedIn Careers homepage with employee mission stories",
  },
  {
    name: "Lionbridge",
    role: "Solution Architect · Hoodoo Digital",
    blurb: "Global language and AI services marketing site.",
    href: "https://www.lionbridge.com/",
    hrefLabel: "lionbridge.com",
    stack: ["AEM", "Integrations"],
    accent: "#FF5A00",
    image: "/work/lionbridge.png",
    imageAlt: "Lionbridge homepage — Think Big. Be Bold. Go Beyond.",
  },
  {
    name: "CenturyLink",
    role: "Solution Architect · Hoodoo Digital",
    blurb: "Residential internet offers and conversion flows.",
    href: "https://www.centurylink.com/",
    hrefLabel: "centurylink.com",
    stack: ["AEM", "JavaScript"],
    accent: "#0047BB",
    image: "/work/centurylink.png",
    imageAlt: "CenturyLink homepage with internet speed offers",
  },
  {
    name: "Walmart employee site",
    role: "Solution Architect · Hoodoo Digital",
    blurb: "Internal employee portal—platform and integrations.",
    hrefLabel: "Internal",
    stack: ["AEM", "Enterprise CMS"],
    accent: "#0071CE",
    note: "Private",
  },
  {
    name: "Pluralsight",
    role: "AEM Developer · Pluralsight",
    blurb: "Marketing platform, components, and personalization.",
    href: "https://www.pluralsight.com/",
    hrefLabel: "pluralsight.com",
    stack: ["AEM", "React", "Target"],
    accent: "#F15B2A",
    image: "/work/pluralsight.png",
    imageAlt: "Pluralsight homepage — Build skills. Work smarter.",
  },
  {
    name: "Adobe Document Cloud",
    role: "AEM Developer · Adobe",
    blurb: "Acrobat DC launch presence on acrobat.adobe.com.",
    hrefLabel: "Retired",
    stack: ["AEM", "Target", "Analytics"],
    accent: "#E34B36",
    image: "/work/adobe-document-cloud.png",
    imageAlt: "Adobe Document Cloud homepage featuring Hello, Document Cloud hero",
    note: "Retired",
  },
];

export const recentBuilds: Project[] = [
  {
    name: "SoulGPT",
    role: "Product build",
    blurb: "Private AI reflection platform for web.",
    href: "https://soulgpt.ai",
    hrefLabel: "soulgpt.ai",
    stack: ["Expo", "Hono", "Neon"],
    accent: "#0D8A7C",
  },
  {
    name: "ChadWallet",
    role: "Take-home",
    blurb: "Social Solana trading on mainnet.",
    href: "https://chadwallet-takehome-seven.vercel.app",
    hrefLabel: "Live preview",
    stack: ["Next.js", "Privy"],
    accent: "#FF5C2B",
  },
];

export const aboutParagraphs = [
  "My path runs through Adobe Experience Manager. At Adobe I helped shape the Document Cloud web presence that put Acrobat at the center of how businesses create, share, and sign documents online. Since then I’ve partnered with remarkable companies—Pluralsight, Hoodoo, and Caesars—on high-traffic websites and Experience Cloud platforms.",
  "AEM is full-stack work for me: platform APIs, the stack underneath, and the front end—so pages stay fast, responsive, and easy to find. I’m Adobe Certified Expert for AEM Sites as both Developer and Business Practitioner, and a Certified ScrumMaster.",
];

export const snapshotFacts = [
  { label: "Location", value: "Ventura, CA" },
  { label: "Availability", value: "Full-time · Remote / Hybrid" },
  { label: "Focus", value: "AEM · Platforms · Engineering leadership" },
];

export const certifications = [
  "ACE — AEM Sites Developer",
  "ACE — AEM Sites Business Practitioner",
  "Certified ScrumMaster · Scrum Alliance",
];

export const skillKeywords = [
  "Adobe Experience Manager",
  "Adobe Experience Cloud",
  "AEM",
  "Document Cloud",
  "JavaScript",
  "TypeScript",
  "React",
  "HTML/CSS",
  "Adobe Target",
  "Adobe Analytics",
  "Integrations",
  "Agile",
];
